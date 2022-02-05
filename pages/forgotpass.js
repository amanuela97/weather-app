import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../utils/AuthUserContext'
import { Resetschema } from '../utils/validation'
import { withPublic } from '../utils/withAuth'
import Form from '../components/Form'
import InputField from '../components/InputField'
import appLogog from '../public/appLogo.png'




const Forgotpass = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })
  const { SendPasswordResetEmail, handleError, clearError } = useAuth()


  const onSubmit = (event) => {
    event.preventDefault()

    // validate input
    const { error } =  email.validate({ email })

    //set validation error and return
    if(error) {
      setMessage({
        type: 'error',
        message: error.details[0].message
      })
      return
    }

    SendPasswordResetEmail(email).then(() => {
      // Password reset email sent!
      setMessage(  {
        type: 'success',
        message: 'reset message successfully sent to email'
      })
    }).catch( async (error) => {
      const errorMessage =  handleError(error)
      setMessage(  {
        type: 'error',
        message: errorMessage
      })
    })
    //clear error afte 5 sec
    clearError(setMessage)
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <div className='h-screen'>
        <Form
          title={'Forgot your password?'}
          logo={appLogog}
          submitTitle={'Send Password Reset Email'}
          onSubmit={onSubmit}
          forgotPass={false}
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
          <>
            {message &&
          <pre className={message.type === 'error' ? 'text-red-600 tx-sm w-full break-words overflow-hidden justify-center ' : 'text-green-600 tx-sm w-full break-words overflow-hidden justify-center ' }>
            {message.message}
          </pre>}
          </>
        </Form>
      </div>
    </div>
  )
}

export default withPublic(Forgotpass)