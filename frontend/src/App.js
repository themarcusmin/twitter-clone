import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { UserProvider } from './utils/UserContext'

// import PublicRoute from './PublicRoute'
import Landing from './components/Landing'
import Login from './auth/Login'
import Signup from './auth/Signup'
import BeginPasswordReset from './auth/BeginPasswordReset'
import SendPasswordReset from './auth/SendPasswordReset'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import MakeTweet from './components/MakeTweet'
import Explore from './components/Explore'
import Notification from "./components/Notification"
import Profile from "./components/Profile"

const App = () => {
  return (
    <div className="min-h-screen min-w-screen bg-twitterBlue text-white">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/begin_password_reset">
              <BeginPasswordReset />
            </Route>
            <Route path="/send_password_reset">
              <SendPasswordReset />
            </Route>
            <AuthenticatedRoute path="/home" component={MakeTweet} />
            <AuthenticatedRoute path="/explore" component={Explore} />
            <AuthenticatedRoute path="/notifications" component={Notification} />
            <AuthenticatedRoute path="/profile" component={Profile} />
            {/* dynamic profile route */}
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
