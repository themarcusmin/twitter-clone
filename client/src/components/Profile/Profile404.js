import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import backArrow from './svg/backArrow.svg'

const Profile404 = ({ username }) => {
    const history = useHistory()

    return (
        <Fragment>
            {/* header */}
            <div className="sticky-header default-tweet-border flex flex-row space-x-3">
                <button onClick={() => history.goBack()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                    <img className="w-4 h-4" src={backArrow} alt="Back Button" />
                </button>
                <div className="flex flex-col">
                    <div className="text-md font-bold">Profile</div>
                </div>
            </div>
            {/* empty profile avatar & searched username */}
            <div className="relative h-auto border border-gray-600 border-t-0 flex flex-col">
                <div className="bg-twitterProfileCover h-40 relative"></div>
                <div className="bg-gray-700 absolute w-28 h-28 top-28 left-4 border-4 border-twitterBlue rounded-full" />
                <div className="relative h-24 flex flex-col py-2 justify-end px-5 space-y-2 font-bold">
                    {`@${username}`}
                </div>
            </div>
            <div className="h-full default-tweet-border flex flex-col items-center justify-start pt-10">
                <div className="text-lg font-bold">This account doesn't exist!</div>
                <div className="text-sm text-gray-500">Try searching for another.</div>
            </div>
        </Fragment>
    )
}

export default Profile404