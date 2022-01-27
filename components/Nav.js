/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu } from '@headlessui/react'
import {  MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../utils/AuthUserContext'
//import appLogo from '../public/appLogo.png'
//import Image from 'next/image'

const CustomButton = ({ text, action }) => {
  const router = useRouter()
  const reRoute = () => {
    router.replace('/login')
  }
  return(
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={action ? action : reRoute}
    >
      {text}
    </button>
  )
}

export default function Nav() {
  const router = useRouter()
  const path = router.pathname
  const { authUser, loading, SignOut } = useAuth()


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = [
    { name: 'Home', href: '/', current:  path === '/' },
    { name: 'Profile', href: '/profile', current: path === '/profile' },
  ]
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {/* <div className="flex-shrink-0 flex items-center">
                  <Image
                    className="hidden lg:block h-8 w-auto"
                    src={appLogo}
                    alt="Workflow"
                    height={22}
                    width={100}
                  />
                </div> */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                      >
                        <a
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >{item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* login/logout */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    {authUser ?
                      <CustomButton text={'Logout'} action={SignOut} /> : <CustomButton text={'Login'} action={null}/>
                    }
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                >
                  <a
                    as="a"
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}