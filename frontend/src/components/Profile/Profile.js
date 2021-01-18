import React, { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import backArrow from './svg/backArrow.svg'
import calendar from './svg/calendar.svg'
import userLogo from '../../styles/user.svg'
// import ImageUpload from './ImageUpload'

const ProfileTweet = React.lazy(() => import('./ProfileTweet'))
const ProfileLike = React.lazy(() => import('./ProfileLike'))

const Profile = () => {
    const history = useHistory()
    let { username } = useParams()
    // async function handleProfile(e) {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append('img', e.target.files[0])
    //         const response = await fetch('http://www.localhost:4000/api/photo', {
    //             method: 'POST',
    //             body: formData
    //         })
    //         if (!response.ok) {
    //             throw new Error("FAILED...")
    //         }
    //         const data = await response.json()
    //         return data
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // toggle profile navbar between tweets and likes
    const [activeNav, setActiveNav] = useState("Tweets")
    const cssNav = (currentNav) => {
        return activeNav === currentNav ? "active-profile-nav" : "inactive-profile-nav"
    }
    return (
        <Fragment>
            {/* header */}
            <div className="sticky-header default-tweet-border flex flex-row space-x-3">
                <button onClick={() => history.goBack()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                    <img className="w-4 h-4" src={backArrow} alt="Back Button" />
                </button>
                <div className="flex flex-col">
                    <div className="font-bold">{`${username}`}</div>
                    <div className="text-xs text-gray-400">1 Tweet</div>
                </div>
            </div>
            {/* general details */}
            <div className="relative h-auto border border-gray-600 border-t-0 border-b-0 flex flex-col">
                <div className="bg-twitterProfileCover h-40 relative"></div>
                <img className="absolute w-28 h-28 top-28 left-4 border-4 border-twitterBlue rounded-full" src={userLogo} alt="Profile Icon" />
                <div className="relative h-40 flex flex-col py-2 justify-end px-3 space-y-2 text-xs text-gray-400 ">
                    <button className="absolute m-3 right-0 top-0 px-3 rounded-full border border-twitterBtn text-twitterBtn hover:bg-blue-400 hover:bg-opacity-10 font-bold text-sm py-2 focus:outline-none">
                        Edit Profile
                    </button>
                    <div className="flex flex-col">
                        <div className="text-sm font-bold text-white">FullNAMMEE</div>
                        <div className="">@username</div>
                    </div>
                    <div className="flex flex-row space-x-1">
                        <img className="h-4 w-4" src={calendar} alt="Calender Logo" />
                        <div>Joined Date</div>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div className="cursor-pointer hover:underline"><span className="text-white font-bold">10</span> Following</div>
                        <div className="cursor-pointer hover:underline"><span className="text-white font-bold">10</span> Followers</div>
                    </div>
                </div>
            </div>
            {/* navbar */}
            <div className="h-10 w-full flex flex-row text-sm border-l border-r border-gray-600">
                <div onClick={() => setActiveNav("Tweets")} className={cssNav("Tweets")}>
                    Tweets
                    </div>
                <div onClick={() => setActiveNav("Likes")} className={cssNav("Likes")}>
                    Likes
                    </div>
            </div>
            {/* render tweets or likes */}
            {
                activeNav === "Tweets" ? (
                    <ProfileTweet />
                ) : (
                        <ProfileLike />
                    )
            }
        </Fragment>
    )
}

export default Profile