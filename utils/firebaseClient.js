import { initializeApp, getApps, getApp } from 'Firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let app
// if a Firebase instance doesn't exist, create one
if (!getApps().length) {
  app = initializeApp(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
}else {
  app = getApp('weather-app')
}

const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()
//View your data across Google Cloud Platform services
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export { db , auth, provider }