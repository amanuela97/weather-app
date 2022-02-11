import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../utils/AuthUserContext'
import { email } from '../utils/validation'
import { withPublic } from '../utils/withAuth'
import Form from '../components/Form'
import InputField from '../components/InputField'




const Forgotpass = () => {
  const [emaill, setEmail] = useState('')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })
  const { SendPasswordResetEmail, handleError, clearError } = useAuth()


  const onSubmit = (event) => {
    event.preventDefault()

    // validate input
    console.log( typeof emaill)
    const { error } = email.validate(emaill)

    //set validation error and return
    if(error) {
      setMessage({
        type: 'error',
        message: error.details[0].message
      })
      clearError(setMessage)
      return
    }

    SendPasswordResetEmail(emaill).then(() => {
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
          logo={'/appLogo.png'}
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
            value={emaill}
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