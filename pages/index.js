import Head from 'next/head'
import { useAuth } from '../utils/AuthUserContext'
import { withProtected } from '../utils/withAuth'
import Spinner from '../components/Spinner'


const Home = () => {

  const { authUser, loading } = useAuth()

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="weather app with daily updates to email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ?
        (<div className='flex h-screen justify-center items-center'>
          <Spinner/>
        </div>) :
        (
          <div className='h-screen mt-14'>
            <h1 className='mb-8 text-center text-2xl font-bold leading-7 text-indigo-500 sm:text-3xl sm:truncate'>
              Welcome, {authUser.displayName}
            </h1>
            <h3 className="text-center text-xl font-normal leading-normal mb-8 text-indigo-500">
              Weather-App sends weather updates for the next day to your email address.
            </h3>
            <h3 className="text-center text-2xl font-bold leading-normal mb-2 text-indigo-500">
              How it works:
            </h3>
            <div className='list-decimal text-center list-outside mb-12'>
              <li className='text-indigo-500 mb-2'>go to your account settings</li>
              <li className='text-indigo-500'>set how often you want to recieve weather updates by changing the frequency to one of two options</li>
              <div className='list-disc list-outside mb-2'>
                <li className='text-indigo-500'><span className='font-bold'>daily:</span>  receive updates daily</li>
                <li className='text-indigo-500'><span className='font-bold'>monthly:</span> receive updates on day 1 of the month</li>
              </div>
              <li className='text-indigo-500 mb-2'>choose the location for which you want to receive weather updates</li>
              <li className='text-indigo-500 mb-2'>toggle the status <span className='font-bold'>ON</span> if you want to start receiving updates via email and <span className='font-bold'>OFF</span> if you do not</li>
              <li className='text-indigo-500 mb-2'>Lastly, make sure to save your account settings</li>
            </div>
            <h1 className='mb-8 text-center text-2xl font-bold leading-7 text-indigo-500 sm:text-3xl sm:truncate'>
              Enjoy 😉
            </h1>
          </div>
        )}
    </>
  )
}

export default withProtected(Home)
