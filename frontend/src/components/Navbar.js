import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../auth/Logout'

import twitterLogo from '../styles/twitterLogo.png'
import userLogo from '../styles/user.svg'
import ellipsis from '../styles/ellipsis.svg'

const Navbar = () => {
    // Logout mini-modal
    const [logoutBtn, setLogoutBtn] = useState(false)
    // Toggle Navbar colors
    const [activeNav, setActiveNav] = useState("home")
    const activeSvg = (currentNav) => {
        return activeNav === currentNav ? "active-svg" : "inactive-svg"
    }
    const activeText = (currentNav) => {
        return activeNav === currentNav ? "active-text" : "inactive-text"
    }
    // const history = useHistory()
    // const { setUser } = useAuth()

    // const handleLogout = async (e) => {
    //     e.preventDefault()
    //     fetch('/api/auth/logout', { method: 'GET' })
    //         .then(res => res.json())
    //         .then(data => {
    //             history.push('/')
    //             setUser(null)
    //         })
    //         .catch(err => console.log(err))
    // }

    const handleTest = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/read-cookies')
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="relative overflow-y-hidden hidden md:block md:w-1/4">
            <div className="flex flex-col py-3 px-5 md:px-2 space-y-3 w-full justify-start">
                <Link to="/home">
                    <div className="hover:bg-gray-800 rounded-full flex items-center justify-center w-12 h-12 ml-2">
                        <img className="w-7" src={twitterLogo} alt="Twitter Logo" />
                    </div>
                </Link>
                <Link to="/home">
                    <div onClick={() => setActiveNav("home")} className="group flex flex-row space-x-3 hover:bg-gray-800 w-min rounded-full py-2 px-4">
                        <svg className={activeSvg("home")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <div className={activeText("home")}>Home</div>
                    </div>
                </Link>
                <Link to="/explore">
                    <div onClick={() => setActiveNav("explore")} className="group flex flex-row space-x-3 hover:bg-gray-800 w-min rounded-full py-2 px-4">
                        <svg className={activeSvg("explore")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <div className={activeText("explore")}>Explore</div>
                    </div>
                </Link>
                <Link to="/notifications">
                    <div onClick={() => setActiveNav("notification")} className="group flex flex-row space-x-3 hover:bg-gray-800 w-min rounded-full py-2 px-4">
                        <svg className={activeSvg("notification")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <div className={activeText("notification")}>Notifications</div>
                    </div>
                </Link>
                <Link to="/profile">
                    <div onClick={() => setActiveNav("profile")} className="group flex flex-row space-x-3 hover:bg-gray-800 w-min rounded-full py-2 px-4">
                        <svg className={activeSvg("profile")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div className={activeText("profile")}>Profile</div>
                    </div>
                </Link>
                {/* Test */}
                <button onClick={handleTest}>Read Cookie TEST</button>
                {/* Clickable Username */}
                <div onClick={() => setLogoutBtn(!logoutBtn)} className="absolute bottom-3 cursor-pointer group flex flex-row items-center hover:bg-gray-800 w-auto rounded-full py-2 px-4">
                    <img className="w-8 h-8" src={userLogo} alt="Profile Icon" />
                    <div className="mx-4 group-hover:text-blue-500 flex flex-col text-sm">
                        <div className="font-bold">Full Name</div>
                        <div>@username</div>
                    </div>
                    <img className="w-6 h-6" src={ellipsis} alt="" />
                </div>
                {/* Logout Button Visible after click */}
                {logoutBtn && (
                    <Logout />
                )}
            </div>
        </div>
    )
}

export default Navbar;