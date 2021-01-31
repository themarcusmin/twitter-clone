import React, { useState } from 'react'

const FollowButton = ({ follow, small }) => {
    // unfollow button on hover
    const [hovering, setHovering] = useState(false)

    return (
        follow ? (
            <button onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className={small ? "profile-followingBtn-small" : "profile-following"}>
                {hovering ? ("Unfollow") : ("Following")}
            </button>
        ) : (
                <button className={small ? "profile-followBtn-small" : "profile-follow"}>
                    Follow
                </button>
            )
    )
}

export default FollowButton