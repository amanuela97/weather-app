import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../utils/AuthUserContext'
import { useRouter } from 'next/router'
import { Loginschema } from '../utils/validation'

function SignIn(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  const { SignInWithEmailAndPassword, handleError } = useAuth()

  const onSubmit = event => {
    event.preventDefault()

    // validate input
    const { error } = Loginschema.validate({
      email,
      password,
    })

    //set validation error and return
    if(error) {
      setError(error.details[0].message)
      return
    }
    SignInWithEmailAndPassword(email, password)
      .then(userCredential => {
        //Sign in
        router.push('/Protected')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // handle error
        const customError = handleError(errorCode)
        setError(  customError ? customError : errorMessage )
      })
  }

  return (
    <div>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="sign In page" />
      </Head>
      <form onSubmit={onSubmit}>
        <div>
          email
          <input
            type="text"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value.trim())}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value.trim())}
          />
        </div>
        <button  type="submit">Sign In</button>
        {error && <pre style={{ color: 'red' }}>{error}</pre>}
      </form>
    </div>
  )
}

export default SignIn