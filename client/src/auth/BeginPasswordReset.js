import React from 'react'
import { Link } from 'react-router-dom'
import twitterLogo from '../styles/twitterLogo.png'

const BeginPasswordReset = () => {
    return (
        <div className="py-8 px-5 md:px-20 w-full">
            <form className="flex flex-col space-y-4 items-center justify-center">
                <div className="flex flex-row space-x-4 items-center">
                    <img className="w-10 h-10" src={twitterLogo} alt="Twitter Logo" />
                    <div className="text-xl">Password Reset</div>
                </div>
                <br />
                <div className="md:w-1/2 w-full font-bold text-2xl">
                    Find your Twitter account
                </div>
                <div className="md:w-1/2 w-full">
                    Enter your email or username
                </div>
                <input className="md:w-1/2 w-full bg-transparent focus:border-twitterBtn focus:ring-0 rounded-md" type="text" required />
                <button type="submit" className="md:w-1/2 w-full rounded-full bg-twitterBtn hover:bg-twitterBtnHover font-bold text-sm py-2 focus:outline-none">
                    Search
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

export default BeginPasswordReset