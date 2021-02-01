import React from 'react'
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'
import userLogo from '../../styles/user.svg'

/**
 * function:
 * - list a profile tag of fullname, username & following status regards to loggedin account
 * - link to profile page onclick
 * 
 * 
 */

const ProfileTag = ({ user }) => {
    console.log("profile tag: ", user)
    return (
        <Link to={`/${user.username}`}>
            <div className="relative h-auto w-full flex flex-row space-x-4 p-4 default-tweet-border border-l-0  border-r-0 cursor-pointer">
                <img className="w-10 h-10" src={userLogo} alt="Profile Icon" />
                <div className="w-full flex flex-col mb-2">
                    <div className="font-bold text-sm hover:underline">{user.fullname}</div>
                    <div className="text-xs text-gray-400">
                        {`@${user.username}`}
                        {user.followsBack && (
                            <span className="bg-twitterLightBlue mx-1 px-1 rounded-md">Follows you</span>
                        )}
                    </div>
                    {/* Dont show follow button if it is loggedin user */}
                    {!user.isRequester && (
                        <FollowButton follow={user.followingStatus} small={true} />
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProfileTag