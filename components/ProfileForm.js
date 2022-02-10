import Modal from './Modal'
import { useEffect, useState } from 'react'
import { UpdateProfileschema, Loginschema, password } from '../utils/validation'
import { useAuth } from '../utils/AuthUserContext'
import ModalComp from './ModalComp'
import InputField from './InputField'



const ProfileForm = () => {
  const { authUser: user, UpdateProfile, clearError, ReauthenticateWithCredential,
    ReauthenticateWithPopup, DeleteUser, UpdatePassword, UploadFile, uploadProgress } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName ? user?.displayName : '')
  const [email, setEmail] = useState(user?.email ? user?.email : '')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })
  const [showReAuthModal, setShowReAuthModal] = useState(false)
  const [authEmail, setauthEmail] = useState('')
  const [authPassword, setauthPassword] = useState('')
  const [authError, setAuthError] = useState(null)
  const [deletedUser, setDeletedUser] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState(null)
  const [url, setURL] = useState('')


  const submit = async (event) => {
    event.preventDefault()
    const { error } = UpdateProfileschema.validate({ displayName ,email })
    if(error) {
      setMessage({ type: 'error', message: error.details[0].message })
      clearError(setMessage)
      return
    }

    const result = await UpdateProfile(displayName, null , email)
    if(result === 'requires-recent-login'){
      setShowReAuthModal(true)
    } else  {
      if(result === 'updated'){
        setMessage({ type: 'success', message: 'profile updated :)' })
        clearError(setMessage)
        return
      }
      setMessage({ type: 'error', message: (typeof result === 'string') ? result : 'unable to update' })
      clearError(setMessage)
    }
  }


  const reAuth = async (setShowModal) => {
    if(user.providerId === 'google.com'){
      const result = await ReauthenticateWithPopup()
      handleReauthResult(result, setShowModal)
      return
    }

    const { error } = Loginschema.validate({ email: authEmail , password: authPassword })
    if(error) {
      setAuthError(error.details[0].message)
      clearError(setAuthError)
      return
    }
    const result = await ReauthenticateWithCredential(authEmail, authPassword)
    handleReauthResult(result, setShowModal)
  }

  const handleReauthResult = (result ,setShowModal) => {
    if(result && typeof result === 'string') {
      setAuthError(result)
      clearError(setAuthError)
      return
    }else if (result?.user) {
      setShowModal(false)
      setMessage({ type: 'success', message: 'successfully reauthenticated :)' })
      clearError(setMessage)
      return
    }
  }

  const deleteAccount = async (setShowModal) => {
    if(deletedUser === user.displayName){
      const result = await DeleteUser()
      if(result === 'requires-recent-login'){
        setShowModal(false)
        setShowReAuthModal(true)
      }
    } else {
      setAuthError('Enter the correct name')
      clearError(setAuthError)
    }
  }

  const changePassword = async (setShowModal) => {
    const { error } = password.validate(newPassword)
    if(error) {
      setAuthError(error.details[0].message)
      clearError(setAuthError)
      return
    }

    const result = await UpdatePassword(newPassword)
    if(result === 'requires-recent-login'){
      setShowModal(false)
      setShowReAuthModal(true)
    }else if ( result === 'pass changed'){
      setShowModal(false)
    } else {
      setAuthError(error.details[0].message)
      clearError(setAuthError)
      return
    }
  }

  const changeProfile = async (setShowModal) => {
    if(!file) {
      setFileError('no file selected')
      clearError(setFileError)
      return
    }
    const fileType = file['type']
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (!validImageTypes.includes(fileType)) {
      setFileError('invalid file type')
      clearError(setFileError)
      return
    }
    UploadFile(file, setFileError, setShowModal)
  }

  useEffect(() => {
    return () => {
      setMessage(null)
      setAuthError(null)
    }
  },[])

  return (
    <div className='sm:h-full lg:h-screen flex justify-center md:w-4/5 w-full mt-6  mb-6'>
      <div className='block rounded-lg bg-gray-100 w-5/6 text-center'>
        <label htmlFor="label" className="block mb-2 text-gray-700 font-medium text-xl mt-6"
        >Photo
        </label>
        <Modal
          type={'link'}
          title={'Change Profile Picture'}
          func={changeProfile}
        >
          <div className='justify-center border-black border-2'>
            <input type="file" onChange={({ target }) => setFile(target.files[0])} />
          </div>
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress}%` }}>
              {uploadProgress}%
            </div>
          </div>
          {fileError &&
              <div className='text-red-600 tx-sm w-full break-words overflow-hidden  justify-center mt-2' >
                <p>{fileError}</p>
              </div>}
        </Modal>
        <hr className="my-6 dark:border-gray-600" />
        <form onSubmit={submit}>
          <div className='mb-4'>
            <label htmlFor="exampleFormControlInput1" className="block mb-4  mt-6 text-gray-700 font-medium text-lg"
            >DisplayName</label
            >
            <input
              type="text"
              className="
            w-2/3
            md:w-1/2
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
              id="exampleFormControlInput1"
              placeholder="displayName"
              value={displayName}
              onChange={({ target }) => setDisplayName(target.value)}
            />
          </div>
          <div className='mb-6'>
            <label htmlFor="exampleFormControlInput1" className="block mb-4 mt-4 text-gray-700 font-medium text-lg"
            >Email</label
            >
            <input
              type="text"
              className="
            w-2/3
            md:w-1/2
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
              id="exampleFormControlInput2"
              placeholder="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <>
            {message?.message && <pre className={message.type === 'error' ? 'text-red-600 tx-sm w-full break-words overflow-hidden justify-center ' : 'text-green-600 tx-sm w-full break-words overflow-hidden justify-center ' }>
              {message.message}
            </pre>}
          </>
          {<button
            type="submit"
            className="inline-block px-6 py-2 mt-4 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
            Save
          </button>}
        </form>
        <hr className="my-6 dark:border-gray-600" />
        <div >
          <Modal
            type={'password'}
            title={'Change Password'}
            func={changePassword}
          >
            <InputField
              id="changepass"
              name="password"
              type="password"
              required={true}
              placeholder="new password"
              htmlFor="password"
              label="New password"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value.trim())}
            />
            <>
              {authError &&
              <div className='text-red-600 tx-sm w-full break-words overflow-hidden justify-center ' >
                <p>{authError}</p>
              </div>}
            </>
          </Modal>
          <Modal
            type={'delete'}
            title={'Delete Account Confirmation'}
            func={deleteAccount}
          >
            <InputField
              id="deleteUser"
              name="username"
              type="username"
              required={true}
              placeholder={user?.displayName}
              htmlFor="deleteUser"
              label="Enter name"
              value={deletedUser}
              onChange={({ target }) => setDeletedUser(target.value.trim())}
            />
            <>
              {authError &&
              <div className='text-red-600 tx-sm w-full break-words overflow-hidden  justify-center ' >
                <p>{authError}</p>
              </div>}
            </>
          </Modal>
        </div>
        {(showReAuthModal && user.providerId === 'google.com') &&
          <ModalComp type='re-auth' title='Action Requires Google Reauthenticatation' func={reAuth} setShowModal={setShowReAuthModal} >
            <h1>Reauthenticate with Google ?</h1>
          </ModalComp>}
        {(showReAuthModal && user.providerId !== 'google.com') &&
          <ModalComp type='re-auth' title='Action Requires Reauthenticatation' func={reAuth} setShowModal={setShowReAuthModal} >
            <div>
              <InputField
                id="auth-email-address"
                name="email"
                type="email"
                autoComplete="email"
                required={true}
                placeholder="Email address"
                htmlFor="auth-email-address"
                label='Email address'
                value={authEmail}
                onChange={({ target }) => setauthEmail(target.value.trim())}
              />
              <InputField
                id="auth-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required={true}
                placeholder="Password"
                htmlFor="auth-password"
                label='Password'
                value={authPassword}
                onChange={({ target }) => setauthPassword(target.value.trim())}
              />
              <>
                {authError &&
              <div className='text-red-600 tx-sm w-full break-words overflow-hidden  justify-center ' >
                <p>{authError}</p>
              </div>}
              </>
            </div>
          </ModalComp>}
      </div>
    </div>
  )
}


export default ProfileForm