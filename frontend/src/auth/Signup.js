import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import twitterLogo from '../styles/twitterLogo.png'

const Signup = () => {
    const usernameRef = useRef()
    const fullnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordAgainRef = useRef()

    const { signup, error, setError } = useAuth()

    const handleRegister = async (e) => {
        e.preventDefault();
        // error: password check
        if (passwordRef.current.value !== passwordAgainRef.current.value) {
            return setError("Passwords do not match")
        }
        await signup(usernameRef.current.value, fullnameRef.current.value, emailRef.current.value, passwordRef.current.value)
    }

    return (
        <div className="py-3 px-5 md:px-20">
            <form onSubmit={handleRegister} className="flex flex-col items-center space-y-4">
                <img className="w-10 h-10" src={twitterLogo} alt="Twitter Logo" />
                <br />
                <div className="font-bold text-xl">Create your account</div>
                <input ref={usernameRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="text" placeholder="Username" required />
                <input ref={fullnameRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="text" placeholder="Full Name" required />
                <input ref={emailRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="email" placeholder="Email" required />
                <input ref={passwordRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="password" placeholder="Password" required />
                <input ref={passwordAgainRef} className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="password" placeholder="Confirm Password" required />
                <button type="submit" className="md:w-1/2 w-full rounded-full bg-twitterBtn hover:bg-twitterBtnHover font-bold text-sm py-2 focus:outline-none">
                    Register
                </button>
                <div className="text-twitterBtn">
                    <Link to="/login">
                        <div className="cursor-pointer hover:underline">Already Have an Account? Login</div>
                    </Link>
                </div>
                {error && (
                    <div className="md:w-1/2 w-full rounded-md py-1 bg-red-500 text-center">{error}</div>
                )}
            </form>
        </div>
    )
}

export default Signup