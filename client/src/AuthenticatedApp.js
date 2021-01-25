import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { SocketProvider } from './utils/SocketContext'

import Navbar from './components/Navbar'
import RightPanel from './components/RightPanel'
import MakeTweet from './components/MakeTweet'
import Explore from './components/Explore'
import Notification from "./components/Notification"
import Profile from './components/Profile/Profile'

const AuthenticatedApp = () => {
    return (
        <SocketProvider>
            <Router>
                <Switch>
                    <div className="h-screen flex flex-row">
                        <Navbar />
                        <div className="overflow-y-auto scrollbar w-screen md:w-2/4 sm:w-3/6 border-white">
                            <Route path="/home">
                                <MakeTweet />
                            </Route>
                            <Route path="/explore">
                                <Explore />
                            </Route>
                            <Route path="/notifications">
                                <Notification />
                            </Route>
                            <Route path="/profile/:username">
                                <Profile />
                            </Route>
                            <Route path="/">
                                <Redirect to="/home" />
                            </Route>
                        </div>
                        <RightPanel />
                    </div>
                </Switch>
            </Router>
        </SocketProvider>
    )
}

export default AuthenticatedApp