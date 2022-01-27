import '../styles/globals.css'
import { AuthUserProvider } from '../utils/AuthUserContext'
import Nav from '../components/Nav'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Nav/>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp

