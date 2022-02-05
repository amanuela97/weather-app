import Image from 'next/image'
import Link from 'next/link'
import checkImageHost from '../utils/checkImageHost'
import propTypes from 'prop-types'
import { useAuth } from '../utils/AuthUserContext'
import { useEffect } from 'react/cjs/react.development'



const SideNav = ({ selected, setSelected  }) => {
  const { authUser } = useAuth()
  const { displayName, photoURL } = authUser
  const style = 'md:bg-gray-100 text-gray-900 bg-gray-100'

  const setSelectedTab = (tab) => {
    localStorage.setItem('selectedSideNav', tab)
    setSelected(tab)
  }

  useEffect(() => {
  },[authUser])


  return (
    <div className="md:h-screen p-3 space-y-2 md:w-1/5  bg-gray-200 text-gray-800 w-full h-auto relative" >
      <div className="md:flex items-center p-2 space-x-4 hidden">
        {checkImageHost(photoURL) ?
          <Image className='rounded-full' src={photoURL} alt="avatar" width={48} height={48}/> :
          // eslint-disable-next-line @next/next/no-img-element
          <img className='w-12 h-12 rounded-full' src={photoURL} alt="avatar"/>
        }
        <div>
          {displayName && <h2 className="text-lg font-semibold">{displayName}</h2>}
          <span className="flex items-center space-x-1">
            <Link href="/profile" className="text-xs hover:underline text-gray-600"
            >View profile</Link>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-300">
        <ul className="md:pt-2 md:pb-4 md:space-y-1 text-sm flex justify-around flex-row md:flex-col ">
          <li className={ selected === 'profile' ? style : ''}>
            <button onClick={() => setSelectedTab('profile')} className="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Profile</span>
            </button>
          </li>
          <li className={ selected === 'account' ? style : ''}>
            <button onClick={() => setSelectedTab('account')} className="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Account</span>
            </button>
          </li>
          {/*<li className={ selected === 'theme' ? style : ''}>
            <button onClick={() => setSelectedTab('theme')} className="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span>Theme</span>
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

SideNav.propTypes = {
  displayName: propTypes.string,
  photoURL: propTypes.string,
  selected: propTypes.string.isRequired,
  setSelected: propTypes.func.isRequired,
}

export default SideNav