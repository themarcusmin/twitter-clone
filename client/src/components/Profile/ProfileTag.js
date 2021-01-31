import React from 'react'
import FollowButton from './FollowButton'
import userLogo from '../../styles/user.svg'

const ProfileTag = ({ user }) => {
    console.log("from ptag: ", user)
    return (
        <div className="relative h-auto w-full flex flex-row space-x-4 p-4 default-tweet-border border-l-0  border-r-0 cursor-pointer">
            <img className="w-10 h-10" src={userLogo} alt="Profile Icon" />
            <div className="w-full flex flex-col mb-2">
                <div className="font-bold text-sm">{user.fullname}</div>
                <div className="text-xs text-gray-400">
                    {`@${user.username}`}
                    <span className="bg-twitterLightBlue mx-1 px-1 rounded-md">Follows you</span>
                </div>
                <FollowButton follow={user.followingStatus} small={true} />
            </div>
        </div>
    )
}

export default ProfileTag