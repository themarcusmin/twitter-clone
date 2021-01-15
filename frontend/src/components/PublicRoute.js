// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// import { useAuth } from '../utils/AuthContext'

// const PublicRoute = ({ component: Component, path: Path }) => {
//     const { user } = useAuth()
//     console.log(user)
//     return (
//         user ? (
//             <Redirect to="/home" />
//         ) : (
//                 <Route path={Path}>
//                     <Component />
//                 </Route>
//             )
//     )
// }

// export default PublicRoute