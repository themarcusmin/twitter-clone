import React, { useState } from 'react'

const FollowButton = ({ follow }) => {
    // unfollow button on hover
    const [hovering, setHovering] = useState(false)

    return (
        follow ? (
            <button onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="profile-following">
                {hovering ? ("Unfollow") : ("Following")}
            </button>
        ) : (
                <button className="profile-follow">
                    Follow
                </button>
            )
    )
}

export default FollowButton