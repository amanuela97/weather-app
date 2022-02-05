import '../styles/globals.css'
import { AuthUserProvider } from '../utils/AuthUserContext'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <div className='flex flex-col h-screen'>
        <Nav/>
        <div className='flex-grow'>
          <Component {...pageProps}/>
        </div>
        <Footer/>
      </div>
    </AuthUserProvider>
  )
}

export default MyApp

