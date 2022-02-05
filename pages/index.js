import Head from 'next/head'
import { useAuth } from '../utils/AuthUserContext'
import { withProtected } from '../utils/withAuth'



const Home = () => {

  const { authUser, loading } = useAuth()

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="weather app with daily updates to email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex h-screen justify-center items-center'>
        {!loading && <h1>{JSON.stringify(authUser, null, 4)}</h1>}
      </div>
    </>

  )
}

export default withProtected(Home)
