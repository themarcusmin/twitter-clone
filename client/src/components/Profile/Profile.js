import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import Profile404 from './Profile404'

import backArrow from './svg/backArrow.svg'
import calendar from './svg/calendar.svg'
import userLogo from '../../styles/user.svg'

/**
 * function:
 * 1 - render loading page if fetching
 * 2 - render error page if fetching fails
 * 3 - render profile page if fetching is successful
 */

const ProfileTweet = React.lazy(() => import('./ProfileTweet'))
const ProfileLike = React.lazy(() => import('./ProfileLike'))

function UnixTimeToMonthYear(t) {
    return new Date(t).toLocaleString('default', { month: 'long', year: 'numeric' })
}

const Profile = () => {
    const history = useHistory()
    const { username } = useParams()
    const [error, setError] = useState(false)
    const [profile, setProfile] = useState(null)
    // fetch profile data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/profile/${username}`, {
                method: 'GET'
            })
            const data = await response.json()
            setProfile(data)
        }
        fetchData()
    }, [])

    // toggle profile navbar between tweets and likes
    const [activeNav, setActiveNav] = useState("Tweets")
    const cssNav = (currentNav) => {
        return activeNav === currentNav ? "active-profile-nav" : "inactive-profile-nav"
    }

    return (
        error ? (
            <Profile404 username={username} />
        ) : (
                <Fragment>
                    {/* header */}
                    <div className="sticky-header default-tweet-border flex flex-row space-x-3">
                        <button onClick={() => history.goBack()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                            <img className="w-4 h-4" src={backArrow} alt="Back Button" />
                        </button>
                        <div className="flex flex-col">
                            {profile ? (
                                <Fragment>
                                    <div className="font-bold">{`${profile.username}`}</div>
                                    <div className="text-xs text-gray-400">{`${profile.tweetCount} Tweets`}</div>
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        <div className="bg-gray-600 w-20 h-4 rounded-md mb-2" />
                                        <div className="bg-gray-600 w-10 h-4 rounded-md" />
                                    </Fragment>
                                )}
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
                                {profile ? (
                                    <Fragment>
                                        <div className="text-sm font-bold text-white">{`${profile.fullname}`}</div>
                                        <div className="">{`@${profile.username}`}</div>
                                    </Fragment>
                                ) : (
                                        <Fragment>
                                            <div className="bg-gray-600 w-20 h-4 rounded-md mb-2" />
                                            <div className="bg-gray-600 w-20 h-4 rounded-md" />
                                        </Fragment>
                                    )}
                            </div>
                            <div className="flex flex-row space-x-1">
                                {profile ? (
                                    <Fragment>
                                        <img className="h-4 w-4" src={calendar} alt="Calender Logo" />
                                        <div>{"Joined " + UnixTimeToMonthYear(parseInt(profile.signup))}</div>
                                    </Fragment>
                                ) : (
                                        <div className="bg-gray-600 w-14 h-4 rounded-md" />
                                    )}
                            </div>
                            <div className="flex flex-row space-x-2">
                                {profile ? (
                                    <Fragment>
                                        <Link to={`/profile/${username}/following`}>
                                            <div className="cursor-pointer hover:underline">
                                                <span className="text-white font-bold">
                                                    {`${profile.following}`}
                                                </span> Following
                                </div>
                                        </Link>
                                        <Link to={`/profile/${username}/followers`}>
                                            <div className="cursor-pointer hover:underline">
                                                <span className="text-white font-bold">
                                                    {`${profile.followers}`}
                                                </span> Followers
                                    </div>
                                        </Link>
                                    </Fragment>
                                ) : (
                                        <Fragment>
                                            <div className="bg-gray-600 w-14 h-4 rounded-md" />
                                            <div className="bg-gray-600 w-14 h-4 rounded-md" />
                                        </Fragment>
                                    )}
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
    )
}

export default Profile