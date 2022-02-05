import { useState, useEffect } from 'react'
import { auth, provider, storage } from './firebaseClient'
import { onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup,
  deleteUser,
  updatePassword,
} from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { async } from '@firebase/util'

const formatAuthUser = (user, providerId) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
  providerId: providerId?.providerId,
})

export default function useFirebaseAuth() {
  const defaultPhotoURL = 'https://firebasestorage.googleapis.com/v0/b/weather-app-76d35.appspot.com/o/defaultProfile.png?alt=media&token=05108468-ef51-4285-a153-3cc558b39628'
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const [providerId] = authState.providerData
    console.log('authState', authState)
    let formattedUser = formatAuthUser(authState, providerId)
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
      console.log({ credential, token, user, authUser })
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = handleError(error)
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log({ error, email, errorMessage, credential })

    })
  }

  const SendPasswordResetEmail = async (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const SignOut = async () => {
    return signOut(auth).then(clear)
  }

  const handleCustomError = (code) => {
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

    case 'auth/requires-recent-login':
      message = 'requires-recent-login'
      break
    default:
      message = undefined
    }
    return message
  }

  const handleError = (error) => {
    const errorCode = error.code
    const errorMessage = error.message
    // handle custom error
    const customError = handleCustomError(errorCode)
    return customError ? customError : errorMessage
  }

  const clearError = async (setError) => {
    setTimeout(() => {
      setError(null)
    },5000)
  }


  const UpdateProfile = async (displayName, photoURL, email) => {
    const user = auth.currentUser

    if(email && (email !== user?.email)){
      try {
        await updateEmail(user, email)
        authStateChanged(user)
      } catch (error) {
        const errorMessage = handleError(error)
        return errorMessage
      }

    }

    const updateNameOrPhoto = { displayName , photoURL }
    if (!displayName || displayName === user?.displayName) delete updateNameOrPhoto.displayName
    if (!photoURL || photoURL === user?.photoURL) delete updateNameOrPhoto.photoURL

    if(updateNameOrPhoto?.photoURL || updateNameOrPhoto?.displayName){
      try {
        await updateProfile(auth.currentUser, updateNameOrPhoto)
        authStateChanged(user)
      } catch (error) {
        const errorMessage = handleError(error)
        return errorMessage
      }
    }

    return 'updated'
  }

  const ReauthenticateWithCredential = async (email, password) => {
    const user = auth.currentUser
    try {
      const credential = EmailAuthProvider.credential(email, password)
      const result = await reauthenticateWithCredential(user, credential)
      return result
    } catch (error) {
      const errorMessage = handleError(error)
      return errorMessage
    }
  }

  const ReauthenticateWithPopup = async () => {
    const user = auth.currentUser
    try {
      const result = await reauthenticateWithPopup(user, provider)
      console.log(result)
      return result
    } catch (error) {
      const errorMessage = handleError(error)
      return errorMessage
    }
  }

  const DeleteUser = async() => {
    const user = auth.currentUser
    try {
      await deleteUser(user)
      clear()
    } catch (error) {
      const errorMessage = handleError(error)
      return errorMessage
    }
  }

  const UpdatePassword = async(newPassword) => {
    const user = auth.currentUser
    try {
      await updatePassword(user, newPassword)
      return 'pass changed'
    } catch (error) {
      const errorMessage = handleError(error)
      return errorMessage
    }
  }

  const UploadFile =  (file , setFileError , setShowModal) => {
    const user = auth.currentUser
    const storageRef = ref(storage, `${user.uid}/profilePicture/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setUploadProgress(prog)
    }, (error) => {
      const errorMessage = handleError(error)
      console.log(errorMessage)
      setUploadProgress(0)
      setFileError(errorMessage)
      clearError(setFileError)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await UpdateProfile(null, downloadURL, null)
        setUploadProgress(0)
        setShowModal(false)
      })
    })
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    defaultPhotoURL,
    uploadProgress,
    SignInWithEmailAndPassword,
    CreateUserWithEmailAndPassword,
    SignInWithGoogle,
    SendPasswordResetEmail,
    SignOut,
    handleError,
    clearError,
    UpdateProfile,
    ReauthenticateWithCredential,
    ReauthenticateWithPopup,
    authStateChanged,
    DeleteUser,
    UpdatePassword,
    UploadFile
  }
}