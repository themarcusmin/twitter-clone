import { useState, useEffect } from 'react'

const useFindUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/api/auth/currentUser', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user)
                }
            }).catch(err => console.log(err))
    }, [])

    return {
        user,
        setUser
    }
}

export default useFindUser