import React from 'react'
import { useUserContext } from '../utils/UserContext'
import useAuth from '../utils/useAuth'

const Logout = () => {
    const { user } = useUserContext()
    const { logout } = useAuth()

    const handleLogout = async (e) => {
        e.preventDefault()
        console.log("Logging out test")
        console.log("user...", user)
        await logout()
    }

    return (
        <div className="absolute bottom-20 left-10 w-auto border rounded-md shadow-white ring-1 ring-black ring-opacity-5">
            <form onSubmit={handleLogout}>
                <button type="submit" className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 focus:outline-none">
                    {`Log out @${user.username}`}
                </button>
            </form>
        </div>
    )
}

export default Logout