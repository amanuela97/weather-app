import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../utils/AuthUserContext'
import { Registerschema } from '../utils/validation'
import { withPublic } from '../utils/withAuth'
import Form from '../components/Form'
import InputField from '../components/InputField'
import appLogog from '../public/appLogo.png'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const { CreateUserWithEmailAndPassword, handleError, SignInWithGoogle, clearError } = useAuth()

  const onSubmit = event => {
    event.preventDefault()
    // validate input
    const { error } = Registerschema.validate({
      email,
      password,
      confirmPassword
    })
    //set validation error and return
    if(error) {
      setError(error.details[0].message.toString())
      return
    }
    CreateUserWithEmailAndPassword(email, password)
      .then((_) => {
        // registered
        console.log('Registered successfully')

      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // handle error
        const customError = handleError(errorCode)
        setError(  customError ? customError : errorMessage )
        //clear error after 5 sec
        clearError(setError)
      })
  }

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Head>
      <Form
        title={'Create your account'}
        subtitle={'Already have an account?'}
        href={'/login'}
        hrefName={'Sign In'}
        logo={appLogog}
        submitTitle={'Sign Up'}
        onSubmit={onSubmit}
        googleSignIn={SignInWithGoogle}
        forgotPass={true}
      >
        <InputField
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required={true}
          placeholder="Email address"
          htmlFor="email-address"
          label='Email address'
          value={email}
          onChange={({ target }) => setEmail(target.value.trim())}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required={true}
          placeholder="Password"
          htmlFor="password"
          label='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value.trim())}
        />
        <InputField
          id="confirm-Password"
          name="confirmPassword"
          type="password"
          autoComplete="current-password"
          required={true}
          placeholder="confirmPassword"
          htmlFor="confirm-Password"
          label='confirm-Password'
          value={confirmPassword}
          onChange={({ target }) => setconfirmPassword(target.value.trim())}
        />
        <>
          {error && <pre style={{ color: 'red' }}>{error}</pre>}
        </>
      </Form>
    </div>
  )
}

export default withPublic(Register)