import React from 'react'
import { Link } from 'react-router-dom'
import twitterPanel from '../styles/twitterPanel.jpg'
import twitterLogo from '../styles/twitterLogo.png'

const Landing = () => {
    return (
        <div className="flex md:flex-row flex-col w-full">
            <div className="md:w-1/2 w-full flex flex-col border-b border-twitterBtn">
                <img src={twitterPanel} alt="Landing Panel" />
                <div className="py-12 px-20 space-y-5 font-bold">
                    <div>> Follow your interests</div>
                    <div>> Hear what people are talking about</div>
                    <div>> Join the conversation</div>
                </div>
            </div>
            <div className="md:w-1/2 w-full">
                <div className="flex flex-col content-center py-16 px-24 space-y-4">
                    <img className="w-10 h-10" src={twitterLogo} alt="Twitter Logo" />
                    <div className="font-bold text-2xl">See what's happening in the world right now</div>
                    <br />
                    <div className="font-semibold text-md">Join Twitter today.</div>
                    <Link to="/signup">
                        <button type="button" className="w-full rounded-full bg-twitterBtn hover:bg-twitterBtnHover font-bold text-sm py-2 focus:outline-none">
                            Sign up
                        </button>
                    </Link>
                    <Link to="/login">
                        <button type="button" className="w-full rounded-full border border-twitterBtn text-twitterBtn hover:bg-blue-400 hover:bg-opacity-10 font-bold text-sm py-2 focus:outline-none">
                            Log in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing