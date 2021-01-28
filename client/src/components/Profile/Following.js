import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

/**
 * function:
 * - use params:username to query following
 */

const Following = () => {
    let { username } = useParams()
    // console.log(userID)
    return (
        <Fragment>
            {/* <div className="sticky-header default-tweet-border">
                <div className="font-bold">Followers</div>
            </div> */}
            Following {username}
        </Fragment>
    )
}

export default Following