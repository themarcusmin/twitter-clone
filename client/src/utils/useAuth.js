import { useState } from 'react'
import { useUserContext } from './UserContext'
import { useHistory } from 'react-router-dom'

export default function useAuth() {
    const [error, setError] = useState(null)
    const { setUser } = useUserContext()
    const history = useHistory()

    // setUser is applied on GET request rather than POST request @ login or signup for a consistent user experience
    const setUserContext = async () => {
        try {
            const response = await fetch('/api/auth/currentUser', {
                method: 'GET'
            })
            const data = await response.json()
            setUser(data.user)
            history.push('/home')
        } catch (err) {
            setError(err)
        }
    }

    // GET request for logging out
    const removeUserContext = () => {
        setUser(null)
        history.push('/')
    }

    const login = async (email, password) => {
        setError("")
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await response.json()
            if (data.errors) {
                setError(data.errors.email || data.errors.password)
            }
            if (data.user) {
                await setUserContext()
            }
        } catch (err) {
            setError(err)
        }
    }

    const signup = async (username, fullname, email, password) => {
        setError("")
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ username, fullname, email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            if (data.errors) {
                setError(data.errors.email || data.errors.fullname || data.errors.password || data.errors.username)
            }
            if (data.user) {
                await setUserContext()
            }
        } catch (err) {
            setError(err)
        }
    }

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'GET' })
            const data = await response.text()
            if (data) {
                removeUserContext()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return {
        signup,
        login,
        logout,
        error,
        setError
    }
}