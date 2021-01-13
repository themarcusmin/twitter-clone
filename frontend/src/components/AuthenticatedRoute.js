import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

import Navbar from './Navbar'
import RightPanel from './RightPanel'

const AuthenticatedRoute = ({ component: Component, path: Path }) => {
    const { user } = useAuth()
    return (
        user ? (
            <Route path={Path}>
                <div className="h-screen flex flex-row">
                    <Navbar />
                    <Component />
                    <RightPanel />
                </div>
            </Route >
        ) : (
                <Redirect to="/login" />
            )
    )
}

export default AuthenticatedRoute