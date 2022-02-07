import { useState, useEffect } from 'react'
import SideNav from '../components/SideNav'
import ProfileForm from '../components/ProfileForm'
import AccountForm from '../components/AccountForm'
import { withProtected } from '../utils/withAuth'




const Settings = () => {
  const [selected, setSelected] = useState('profile')

  useEffect(() => {
    setSelected(localStorage.getItem('selectedSideNav') ? localStorage.getItem('selectedSideNav') : 'profile')
    return setSelected
  }, [])

  return (
    <div className='flex flex-col md:flex-row'>
      <SideNav
        selected={selected}
        setSelected={setSelected}
      />
      {(selected === 'profile') && <ProfileForm />}
      {(selected === 'account') && <AccountForm />}
    </div>
  )
}

export default withProtected(Settings)