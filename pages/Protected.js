import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../utils/AuthUserContext'

function Protected() {
  const { authUser, loading, SignOut } = useAuth()
  const router = useRouter()

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading, router])

  return (
    <div>
      <button onClick={SignOut}>Sign Out</button>
    </div>
  )
}

export default Protected