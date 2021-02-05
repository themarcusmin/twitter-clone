import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { SocketProvider } from './utils/SocketContext'

import Navbar from './components/Navbar'
import RightPanel from './components/RightPanel'
import MakeTweet from './components/MakeTweet'
import Explore from './components/Explore'
import Notification from "./components/Notification"
// nomatch route
import NoMatch from './components/NoMatch'
// profile-related components
import Profile from './components/Profile/Profile'
import Network from './components/Profile/Network'
import Followers from './components/Profile/Followers'
import Following from './components/Profile/Following'
import ProfileTweet from './components/Profile/ProfileTweet'
import ProfileLike from './components/Profile/ProfileLike'

import { ProfileProvider } from './utils/ProfileContext'

const AuthenticatedApp = () => {
    return (
        <SocketProvider>
            <Router>
                <div className="h-screen flex flex-row">
                    <Navbar />
                    <div className="overflow-y-auto scrollbar w-screen md:w-2/4 sm:w-3/6 border-white">
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route exact path="/home">
                                <MakeTweet />
                            </Route>
                            <Route exact path="/explore">
                                <Explore />
                            </Route>
                            <Route exact path="/notifications">
                                <Notification />
                            </Route>
                            <Route exact path="/:username">
                                <Profile Component={ProfileTweet} Type="Tweets" />
                            </Route>
                            <Route exact path="/:username/likes">
                                <Profile Component={ProfileLike} Type="Likes" />
                            </Route>
                            <Route path="/:username/followers">
                                <Network Component={Followers} Type="followers" />
                            </Route>
                            <Route path="/:username/following">
                                <Network Component={Following} Type="following" />
                            </Route>
                            <Route path="*">
                                <NoMatch />
                            </Route>
                        </Switch>
                    </div>
                    <RightPanel />
                </div>
            </Router>
        </SocketProvider>
    )
}

export default AuthenticatedApp