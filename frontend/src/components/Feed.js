import React from 'react'
import userLogo from '../styles/user.svg'

const Feed = ({ data }) => {
    const { name, username, createdAt, content } = data

    return (
        <div className="h-auto w-full border border-t-0 flex flex-row space-x-4 p-4">
            <img className="w-8 h-8" src={userLogo} alt="Profile Icon" />
            <div className="w-full flex flex-col space-y-4">
                <div className="font-bold text-xs">
                    {name}
                    <span className="mx-2">{`@${username}`}</span>
                    <span>{createdAt}</span>
                </div>
                <div className="text-sm break-all">{content}</div>
            </div>
        </div>
    )
}

export default Feed;