import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

const Following = () => {
    let { username } = useParams()

    return (
        <Fragment>
            <div className="sticky-header default-tweet-border">
                <div className="font-bold">Following</div>
            </div>
        </Fragment>
    )
}

export default Following