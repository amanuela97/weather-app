import { withProtected } from '../utils/withAuth'

function Profile() {

  return (
    <div>
      <p >Profile</p>
    </div>
  )
}

export default withProtected(Profile)