import React from 'react'
import { Link } from 'react-router-dom'
import twitterLogo from '../styles/twitterLogo.png'

const SendPasswordReset = () => {
    return (
        <div className="py-8 px-5 md:px-20 w-full">
            <form className="flex flex-col space-y-4 items-center justify-center">
                <div className="flex flex-row space-x-4 items-center">
                    <img className="w-10 h-10" src={twitterLogo} alt="Twitter Logo" />
                    <div className="text-xl">Password Reset</div>
                </div>
                <br />
                <div className="md:w-1/2 w-full font-bold text-2xl">
                    Reset your password
                </div>
                <div className="md:w-1/2 w-full">
                    You can use the information associated with your account
                </div>
                <div className="md:w-1/2 w-full flex flex-row space-x-2 items-center">
                    <input type="checkbox" className="rounded-full focus:ring-0" required />
                    <div>Send an email to <span>w****@g***.com</span></div>
                </div>
                <button type="submit" className="md:w-1/2 w-full rounded-full bg-twitterBtn hover:bg-twitterBtnHover font-bold text-sm py-2 focus:outline-none">
                    Send
                </button>
                <Link to="/">
                    <div className="flex text-twitterBtn cursor-pointer hover:underline">
                        Back to Home
                    </div>
                </Link>
            </form>
        </div>
    )
}

export default SendPasswordReset