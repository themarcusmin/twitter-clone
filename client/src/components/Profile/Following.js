import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileTag from './ProfileTag'

/**
 * function:
 * - use params:username to query following
 */

const Following = () => {
    let { username } = useParams()
    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/profile/${username}/following`, {
                method: 'GET'
            })
            const data = await response.json()
            setUsers(data.following)
        }
        fetchData()
    }, [username])

    return (
        <Fragment>
            <div className="h-full default-tweet-border">
                {users && users.map(user =>
                    <ProfileTag key={user.username} user={user} />
                )}
                {users && (users.length === 0) &&
                    <div className="flex justify-center text-lg font-bold pt-6">
                        {`@${username} isn't following anyone`}
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default Following