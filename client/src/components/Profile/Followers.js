import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

const Followers = () => {
    let { username } = useParams()

    return (
        <Fragment>
            <div className="sticky-header default-tweet-border">
                <div className="font-bold">{username}</div>
            </div>
        </Fragment>
    )
}

export default Followers