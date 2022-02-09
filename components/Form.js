import { LockClosedIcon } from '@heroicons/react/solid'
import { FaGoogle } from 'react-icons/fa'
import propTypes from 'prop-types'
import Link from 'next/link'




const Form = ({ title,subtitle,href, hrefName, logo , onSubmit, submitTitle, googleSignIn, children, forgotPass }) => {
  return (
    <>
      {/*
        update template:
        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        {/*form header*/}
        <div className="max-w-md w-full space-y-8 ">
          <div className='grid place-items-center'>

            {logo && // eslint-disable-next-line @next/next/no-img-element
             <img
               className="mx-auto h-12"
               src={logo}
               alt="Workflow"
             />
            }
            {title && <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>}
            { subtitle && <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}{' '}
              {href &&
              <Link href={href}>
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  {hrefName}
                </a>
              </Link>}
            </p>}
          </div>
          {/*form inputs*/}
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              {children}
            </div>
            {/*forgot password*/}
            {forgotPass && <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href='/forgotpass'>
                  <a  className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>}
            {/*form sumbit button*/}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {submitTitle}
              </button>
            </div>
            {/*google sumbit button*/}
            {googleSignIn &&
            <>
              <div className="flex flex-col">
                <button className="mt-2 focus:outline-none" onClick={googleSignIn}>
                  <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
                    <FaGoogle size="38" className="text-red-600" />
                    <p className="ml-3">Sign in with Google</p>
                  </div>
                </button>
              </div>
            </>}
          </form>
        </div>
      </div>
    </>
  )
}

Form.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string,
  href: propTypes.string,
  hrefName: propTypes.string,
  logo: propTypes.string,
  submitTitle: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
  googleSignIn: propTypes.func,
  forgotPass: propTypes.bool.isRequired
}

export default Form