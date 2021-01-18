import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import twitterLogo from '../styles/twitterLogo.png'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const { login, error } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <div className="py-8 px-5 md:px-20">
            <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
                <img className="w-10 h-10" src={twitterLogo} alt="Twitter Logo" />
                <br />
                <div className="font-bold text-xl">Log in to Twitter</div>
                <input ref={emailRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="email" placeholder="Email" required />
                <input ref={passwordRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="password" placeholder="Password" required />
                <button type="submit" className="md:w-1/2 w-full rounded-full bg-twitterBtn hover:bg-twitterBtnHover font-bold text-sm py-2 focus:outline-none">
                    Log in
                </button>
                <div className="flex flex-row space-x-3 text-twitterBtn">
                    <Link to="/begin_password_reset">
                        <div className="cursor-pointer hover:underline">Forgot Password?</div>
                    </Link>
                    <div>|</div>
                    <Link to="/signup">
                        <div className="cursor-pointer hover:underline">Sign up for Twitter</div>
                    </Link>
                </div>
                {error && (
                    <div className="md:w-1/2 w-full rounded-md py-1 bg-red-500 text-center">{error}</div>
                )}
            </form>
        </div>
    )
}

export default Login