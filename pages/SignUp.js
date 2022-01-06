import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../utils/AuthUserContext'
import { useRouter } from 'next/router'
import { Registerschema } from '../utils/validation'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const { CreateUserWithEmailAndPassword, handleError } = useAuth()

  const onSubmit = event => {
    event.preventDefault()
    // validate input
    const { error } = Registerschema.validate({
      email,
      password,
      confirmPassword
    })
    //set validation error and return
    if(error !== undefined) {
      setError(error.details[0].message.toString())
      return
    }
    CreateUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed
        router.push('/Protected')
        // ...
      })
      .catch((error) => {
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
        <title>Sign Up</title>
        <meta name="description" content="sign up page" />
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
        <div>
          confirmPassword
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => setconfirmPassword(target.value.trim())}
          />
        </div>
        <button  type="submit">Sign Up</button>
        {error && <pre style={{ color: 'red' }}>{error}</pre>}
      </form>
    </div>
  )
}

export default SignUp