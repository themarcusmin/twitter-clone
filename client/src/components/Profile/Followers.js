import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileTag from './ProfileTag'

/**
 * function:
 * - use params:username to query followers
 */

const Followers = () => {
    let { username } = useParams()
    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/profile/${username}/followers`, {
                method: 'GET'
            })
            const data = await response.json()
            console.log(data)
            setUsers(data.followers)
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
                        {`@${username} doesn't have any followers`}
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default Followers