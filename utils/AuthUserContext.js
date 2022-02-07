import { createContext, useContext } from 'react'
import useFirebaseAuth from './useFirebaseAuth'

const authUserContext = createContext({
  authUser: null,
  loading: true,
  defaultPhotoURL: '',
  uploadProgress: 0,
  SignInWithEmailAndPassword: async () => {},
  CreateUserWithEmailAndPassword: async () => {},
  SignInWithGoogle: async () => {},
  SendPasswordResetEmail: async () => {},
  SignOut: async () => {},
  handleError: async () => {},
  clearError: async () => {},
  UpdateProfile: async () => {},
  ReauthenticateWithCredential: async () => {},
  ReauthenticateWithPopup: async () => {},
  authStateChanged: async () => {},
  DeleteUser: async () => {},
  UpdatePassword: async () => {},
  UploadFile: async () => {},
  AddAccountInfo: async () => {},
  GetAccountInfo: async () => {},
})

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext)