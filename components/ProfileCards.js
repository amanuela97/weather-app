import React from 'react'
import propTypes from 'prop-types'
import Link from 'next/link'

const ProfileCards = ({ displayName, email, photoURL }) => {
  return (
    <>
      <div className='bg-white rounded-3xl border shadow-lg p-10 max-w-xs'>
        {photoURL &&
          // eslint-disable-next-line @next/next/no-img-element
          <img className=' w-56 h-56 object-cover object-center' src={photoURL} alt="avatar"/>
        }
        <div className='py-4 px-6'>
          <h1 className='text-1xl font-semibold text-gray-800'>{displayName}</h1>
          <div className='flex items-center mt-4 text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 fill-current' viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
            </svg>
            <h1 className='px-2 text-sm'>{email}</h1>
          </div>
        </div>
        <div className='flex justify-center '>
          <Link href={'/settings'} passHref>
            <button
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
            >
          Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}


ProfileCards.propTypes = {
  displayName: propTypes.string.isRequired,
  photoURL: propTypes.string.isRequired,
  email: propTypes.string.isRequired
}


export default ProfileCards