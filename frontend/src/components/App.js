import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from '../utils/AuthContext'

import Landing from '../auth/Landing'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import BeginPasswordReset from '../auth/BeginPasswordReset'
import SendPasswordReset from '../auth/SendPasswordReset'

import AuthenticatedRoute from './AuthenticatedRoute'
import MakeTweet from './MakeTweet'
import Explore from './Explore'
import Notification from "./Notification"
import Profile from "./Profile"

const App = () => {
  return (
    <div className="min-h-screen min-w-screen bg-twitterBlue text-white">
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
}

export default App;
