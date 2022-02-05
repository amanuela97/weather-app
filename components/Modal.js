import { useState } from 'react'
import ModalComp from './ModalComp'
import propTypes from 'prop-types'

const Modal = ({ children, type, title, func }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {(type === 'delete' || type === 'password') ? (<button
        className={`
        w-full inline-block px-6 py-2 border-2 
        font-medium text-xs 
        leading-normal uppercase rounded hover:bg-black 
        hover:bg-opacity-5 focus:outline-none focus:ring-0 
        transition duration-150 ease-in-out mb-6
        ${type === 'password' ? 'border-blue-600 text-blue-800' : 'border-red-600 text-red-800'}`}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {type === 'delete' ? 'Delete Account' : 'Change Password'}
      </button>) : (
        <button
          onClick={() => setShowModal(true)}
          className='underline text-green-500 hover:text-green-600 transition duration-300 ease-in-out'>
            Change profile picture
        </button>
      )}
      {showModal ? (
        <ModalComp type={type} title={title} setShowModal={setShowModal} func={func}>{children}</ModalComp>
      ) : null}
    </>
  )
}
Modal.propTypes = {
  title: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  children: propTypes.any.isRequired,
  func: propTypes.func.isRequired,
}

export default Modal