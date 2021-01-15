import { useState, useEffect } from 'react'

const useFindUser = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/auth/currentUser', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user)
                    setLoading(false)
                }
            }).catch(err => setLoading(false))
    }, [])

    return {
        user,
        setUser,
        loading
    }
}

export default useFindUser