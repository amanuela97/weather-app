import { withProtected } from '../utils/withAuth'
import ProfileCards from '../components/ProfileCards'
import { useAuth } from '../utils/AuthUserContext'


function Profile() {
  const { authUser } = useAuth()
  return (
    <div className='flex h-screen justify-center items-center'>
      <ProfileCards
        displayName={authUser?.displayName}
        email={authUser?.email}
        photoURL={authUser?.photoURL}

      />
    </div>
  )
}

export default withProtected(Profile)