import { useRouter } from 'next/router'
import { useAuth } from '../utils/AuthUserContext'
import Spinner from '../components/Spinner'


export function withProtected(Component) {
  return function WithProtected(props) {
    const { authUser, loading } = useAuth()
    const router = useRouter()
    if(typeof window !== 'undefined'){
      if (!authUser) {
        !loading && router.replace('/login')
        return <Spinner/>
      }
      return <Component {...props} />
    }
    return <Spinner/>
  }
}

export function withPublic(Component) {
  return function WithPublic(props) {
    const { authUser, loading } = useAuth()
    const router = useRouter()
    if(typeof window !== 'undefined'){
      if (authUser || loading) {
        !loading && router.replace('/')
        return <Spinner/>
      }
      return <Component {...props} />
    }
    return <Spinner/>
  }
}
