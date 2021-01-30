import React, { Suspense } from 'react'
import { useUserContext } from './utils/UserContext'
import Loading from './components/Loading'

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'))
const UnAuthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'))

const App = () => {
  const { user } = useUserContext()
  console.log('from app component: ', user)
  return (
    <div className="min-h-screen min-w-screen bg-twitterBlue text-white">
      <Suspense fallback={<Loading />}>
        {user ? (
          <AuthenticatedApp />
        ) : (
            <UnAuthenticatedApp />
          )}
      </Suspense>
    </div>
  );
}

export default App;
