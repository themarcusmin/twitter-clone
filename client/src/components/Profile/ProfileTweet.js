import React, { Fragment } from 'react'
import Feed from '../Feed'

const ProfileTweet = () => {
    return (
        <Fragment>
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
            <Feed data={{ name: "ru", username: "popasf", createdAt: "now", content: "asf" }} />
        </Fragment>
    )
}

export default ProfileTweet