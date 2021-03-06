import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams, useLocation, Link } from 'react-router-dom'
import { useUserContext } from '../../utils/UserContext'

import FollowButton from './FollowButton'
import UnfollowModal from './UnfollowModal'

import Profile404 from './Profile404'
import backArrow from './svg/backArrow.svg'
import calendar from './svg/calendar.svg'
import userLogo from '../../styles/user.svg'

import { ProfileProvider } from '../../utils/ProfileContext'

/**
 * function:
 * 1 - toggle view between tweets and likes
 * 2 - render loading components if fetching
 * 3 - render error page if fetching fails
 * 4 - render profile page if fetching is successful
 * 5 - CSR of follower / following count (setProfile)
 */

function UnixTimeToMonthYear(t) {
    return new Date(t).toLocaleString('default', { month: 'long', year: 'numeric' })
}

const Profile = ({ Component, Type }) => {
    console.log("profile rendered")
    const history = useHistory()
    const location = useLocation()
    // get current user to match against params
    const { user } = useUserContext()
    const { username } = useParams()
    // if username does not exist
    const [error, setError] = useState(false)
    // if username exists
    const [profile, setProfile] = useState(null)

    // toggle profile navbar between tweets and likes
    const [activeNav, setActiveNav] = useState(Type)
    const cssNav = (currentNav) => {
        return activeNav === currentNav ? "active-profile-nav" : "inactive-profile-nav"
    }
    function handleTweetsNav() {
        setActiveNav("Tweets")
        history.replace(`/${username}`)
    }
    function handleLikesNav() {
        setActiveNav("Likes")
        history.replace(`/${username}/likes`)
    }

    // toggle follow/following/unfollow
    const [following, setFollowing] = useState(false)
    const [modal, setModal] = useState(false)
    // user attempts to follow or unfollow
    const handleFollowBtn = () => {
        if (following) {
            // options in modal: unfollow or cancel
            return setModal(true)
        } else {
            followUser()
                .then(() => setFollowing(true))
                .then(() => setProfile({ ...profile, followers: + profile.followers + 1 }))
        }
    }

    async function followUser() {
        const response = await fetch(`/api/profile/${username}/follow`, {
            method: 'POST',
            body: JSON.stringify({ followeeID: profile.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.json()
    }

    const handleUnfollowBtn = () => {
        unfollowUser()
            .then(() => setFollowing(false))
            .then(() => setModal(false))
            .then(() => setProfile({ ...profile, followers: + profile.followers - 1 }))
    }

    async function unfollowUser() {
        const response = await fetch(`/api/profile/${username}/unfollow`, {
            method: 'POST',
            body: JSON.stringify({ followeeID: profile.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.json()
    }

    useEffect(() => {
        console.log("times")
        async function fetchData() {
            setError(false)
            // fetch profile data
            const response = await fetch(`/api/profile/${username}`, {
                method: 'GET'
            })
            const data = await response.json()
            console.log("first data: ", data)
            if (data.error) {
                setError(true)
            } else {
                console.log("profile data sent: ", data)
                setProfile(data)
                // activate follow btn if the user is following the profile: either redis zscore or null
                if (data.requesterIsFollowing) {
                    setFollowing(true)
                }
            }
        }
        fetchData()
    }, [username])

    return (
        error ? (
            <Profile404 username={username} />
        ) : (
                <ProfileProvider>
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
                                {user.username === username ? (
                                    <button className="absolute m-3 right-0 top-0 px-3 rounded-full border border-twitterBtn text-twitterBtn hover:bg-blue-400 hover:bg-opacity-10 font-bold text-sm py-2 focus:outline-none">
                                        Edit Profile
                                </button>
                                ) : (
                                        <div onClick={handleFollowBtn}>
                                            <FollowButton follow={following} />
                                        </div>

                                    )}
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
                                            <Link to={`${location.pathname}/following`}>
                                                <div className="cursor-pointer hover:underline">
                                                    <span className="text-white font-bold">
                                                        {`${profile.following}`}
                                                    </span> Following
                                            </div>
                                            </Link>
                                            <Link to={`${location.pathname}/followers`}>
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
                            <div onClick={handleTweetsNav} className={cssNav("Tweets")}>
                                Tweets
                        </div>
                            <div onClick={handleLikesNav} className={cssNav("Likes")}>
                                Likes
                        </div>
                        </div>
                        {/* render inherited component: tweets or likes */}
                        <Component />
                        {modal && <UnfollowModal handleUnfollowBtn={handleUnfollowBtn} setModal={setModal} username={username} />}
                    </Fragment>
                </ProfileProvider>
            )
    )
}

export default Profile