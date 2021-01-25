import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './auth/Login'
import Signup from './auth/Signup'
import BeginPasswordReset from './auth/BeginPasswordReset'
import SendPasswordReset from './auth/SendPasswordReset'

const UnAuthenticatedApp = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/begin_password_reset" component={BeginPasswordReset} />
                <Route path="/send_password_reset" component={SendPasswordReset} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    )
}

export default UnAuthenticatedApp