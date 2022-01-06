import { useState, useEffect } from 'react'
import { auth } from './firebaseClient'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

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
    setLoading(true)
  }

  const SignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const CreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
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
    SignOut,
    handleError
  }
}