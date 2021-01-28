import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { SocketProvider } from './utils/SocketContext'

import Navbar from './components/Navbar'
import RightPanel from './components/RightPanel'
import MakeTweet from './components/MakeTweet'
import Explore from './components/Explore'
import Notification from "./components/Notification"
// all profile-related components
import Profile from './components/Profile/Profile'
import Network from './components/Profile/Network'
import Followers from './components/Profile/Followers'
import Following from './components/Profile/Following'

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
                            <Route exact path="/explore">
                                <Explore />
                            </Route>
                            <Route exact path="/notifications">
                                <Notification />
                            </Route>
                            <Route path="/:username">
                                <Profile />
                            </Route>
                            <Route path="/:username/followers">
                                <Network Component={Followers} Type="followers" />
                            </Route>
                            <Route path="/:username/following">
                                <Network Component={Following} Type="following" />
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