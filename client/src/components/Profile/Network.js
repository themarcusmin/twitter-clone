import React, { Fragment, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Loading from '../Loading'
import backArrow from './svg/backArrow.svg'

/**
 * function:
 * 1 - query for params:username to render header (username & fullname) 
 * 2 - toggle between followers and following
 */

const Network = ({ Component, Type }) => {
    console.log("network rendered")
    const history = useHistory()
    const { username } = useParams()
    // toggle navbar between followers and following
    const [activeNav, setActiveNav] = useState(Type)
    const cssNav = (currentNav) => {
        return activeNav === currentNav ? "active-profile-nav" : "inactive-profile-nav"
    }
    // fullname & username
    const [header, setHeader] = useState(null)

    useEffect(() => {
        // fetch profile data
        async function fetchData() {
            const response = await fetch(`/api/profile/${username}/fullname`, {
                method: 'GET'
            })
            const data = await response.json()
            setHeader(data)
        }
        fetchData()
    }, [username])

    return (
        <Fragment>
            {/* header */}
            <div className="sticky-header px-0 w-full h-auto default-tweet-border border-b-0 flex flex-col">
                <div className="flex flex-row px-4 py-2 space-x-3 place-self-start place-items-center">
                    <button onClick={() => history.goBack()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                        <img className="w-4 h-4" src={backArrow} alt="Back Button" />
                    </button>
                    <div className="flex flex-col">
                        {header ? (
                            <Fragment>
                                <div className="font-bold">{`${header.fullname}`}</div>
                                <div className="text-xs text-gray-400">{`@${header.username}`}</div>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <div className="bg-gray-600 w-20 h-4 rounded-md mb-2" />
                                    <div className="bg-gray-600 w-10 h-4 rounded-md" />
                                </Fragment>
                            )}
                    </div>
                </div>
                {/* toggler */}
                <div className="h-12 w-full flex flex-row text-sm">
                    <div onClick={() => {
                        setActiveNav("followers")
                        history.replace(`/${username}/followers`)
                    }} className={cssNav("followers")}>
                        Followers
                    </div>
                    <div onClick={() => {
                        setActiveNav("following")
                        history.replace(`/${username}/following`)
                    }} className={cssNav("following")}>
                        Following
                    </div>
                </div>
            </div>
            {/* list of followers / following */}
            {
                header ? (
                    <Component userID={header._id} />
                ) : (
                        <Loading />
                    )
            }
        </Fragment>
    )
}

export default Network