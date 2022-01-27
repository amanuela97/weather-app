import { useState, useEffect } from 'react'
import { auth, provider } from './firebaseClient'
import { onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth'

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const clear = () => {
    setAuthUser(null)
    setLoading(false)
  }

  const SignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const CreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const SignInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.log({ credential, token, user })
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = provider.credentialFromError(error)
      console.log({ credential, error, errorCode, errorMessage })

    })
  }

  const SendPasswordResetEmail = async (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const SignOut = async () => {
    return signOut(auth).then(clear)
  }

  const handleError = (code) => {
    let message
    // add custom error message here based on firebase error codes
    switch(code) {
    case 'auth/email-already-in-use':
      message = 'email is already in use.'
      break
    case 'auth/invalid-email':
      message = 'your email address appears to be malformed.'
      break
    case 'auth/operation-not-allowed':
      message = 'email/password sign in not enabled.'
      break
    case 'auth/weak-password':
      message = 'password is weak. Try a different password.'
      break
    case 'auth/wrong-password':
      message = 'password is wrong.'
      break
    default:
      message = undefined
    }
    return message
  }

  const clearError = async (setError) => {
    setTimeout(() => {
      setError(null)
    },5000)
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    SignInWithEmailAndPassword,
    CreateUserWithEmailAndPassword,
    SignInWithGoogle,
    SendPasswordResetEmail,
    SignOut,
    handleError,
    clearError
  }
}