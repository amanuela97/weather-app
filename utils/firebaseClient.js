import { initializeApp, getApps } from 'Firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let app
// if a Firebase instance doesn't exist, create one
if (!getApps().length) {
  app = initializeApp(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
}

const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()

export { db , auth, provider }