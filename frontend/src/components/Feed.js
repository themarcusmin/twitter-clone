import React, { useState } from 'react'
import userLogo from '../styles/user.svg'

const Feed = ({ data }) => {
    const { name, username, createdAt, content } = data
    // Toggle heart svg
    const [liked, setLiked] = useState(false)
    const likedSVG = (bool) => {
        return bool ? "liked-feed-true" : "liked-feed-false"
    }

    return (
        <div className="h-auto w-full flex flex-row space-x-4 p-4 default-tweet-border">
            <img className="w-8 h-8" src={userLogo} alt="Profile Icon" />
            <div className="w-full flex flex-col space-y-4">
                <div className="font-bold text-xs">
                    {name}
                    <span className="mx-2">{`@${username}`}</span>
                    <span>{createdAt}</span>
                </div>
                <div className="text-sm break-all">{content}</div>
                <div onClick={() => setLiked(!liked)} className="group cursor-pointer border border-transparent hover:bg-red-400 hover:bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center">
                    <svg className={likedSVG(liked)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Feed;