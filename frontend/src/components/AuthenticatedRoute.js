import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from '../utils/UserContext'

import Loading from './Loading'
import Navbar from './Navbar'
import RightPanel from './RightPanel'

const AuthenticatedRoute = ({ component: Component, path: Path }) => {
    const { user, loading } = useUserContext()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return (
            <Route path={Path}>
                <div className="h-screen flex flex-row">
                    <Navbar />
                    <Component />
                    <RightPanel />
                </div>
            </Route>
        )
    }

    return <Redirect to="/login" />
}

export default AuthenticatedRoute