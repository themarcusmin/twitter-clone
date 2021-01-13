import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from '../utils/AuthContext'

import Navbar from './Navbar'
import MakeTweet from './MakeTweet'
import Explore from './Explore'
import Notification from "./Notification"
import Profile from "./Profile"
import RightPanel from './RightPanel'

import Landing from '../auth/Landing'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import BeginPasswordReset from '../auth/BeginPasswordReset'
import SendPasswordReset from '../auth/SendPasswordReset'

import Home from './Home'

const App = () => {
  return (
    <div className="min-h-screen min-w-screen bg-twitterBlue text-white">
      {/* <div className="h-screen flex flex-row"> */}
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
            <Route path="/home">
              <Home />
            </Route>
          </Switch>

          {/* <Switch>
            <Navbar />
            <Route exact path="/home">
              <MakeTweet />
            </Route>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/notifications">
              <Notification />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <RightPanel />
          </Switch> */}

        </Router>
      </AuthProvider>
      {/* </div> */}
    </div>
  );
}

export default App;
