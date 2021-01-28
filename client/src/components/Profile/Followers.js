import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

/**
 * function:
 * - use params:username to query followers
 */

const Followers = () => {
    let { username } = useParams()

    return (
        <Fragment>
            {/* <div className="sticky-header default-tweet-border">
                <div className="font-bold">Followers</div>
            </div> */}
            Followers {username}
        </Fragment>
    )
}

export default Followers