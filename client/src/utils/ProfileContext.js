import { createContext, useContext, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import ProfileReducer from './ProfileReducer'

// const initialProfile = {
//     id: "",
//     fullname: "",
//     username: "",
//     tweetCount: "",
//     signup: "",
//     followers: "",
//     following: "",
//     requesterisFollowing: null,
// }

// test and delete cmts after

const initialProfile = {
    profile: null,
    following: false,
    error: false
}

const PorfileContext = createContext(initialProfile)

export const useProfileContext = () => {
    return useContext(PorfileContext)
}

export const ProfileProvider = ({ children }) => {
    console.log("profile context rendered")
    // fetch username from the parameter
    const { username } = useParams()

    const [state, dispatch] = useReducer(ProfileReducer, initialProfile)

    useEffect(() => {
        console.log("componentdidmount profile context: ", username)
        async function fetchProfileData() {
            // setError(false)
            const response = await fetch(`/api/profile/${username}`, {
                method: 'GET'
            })
            const data = await response.json()
            // console.log("first data: ", data)
            if (data.error) {
                dispatch({ type: "error" })
            } else {
                // console.log("profile data sent: ", data)
                dispatch({ type: "set_profile", payload: data })
                // activate follow btn if the user is following the profile: either redis zscore or null
                if (data.requesterIsFollowing) {
                    dispatch({ type: "is_following" })
                }
            }
        }
        fetchProfileData()
        return () => {
            console.log("profile context unmonuted")
            // dispatch({ type: "no_error" })
        }
    }, [username])

    return (
        <PorfileContext.Provider value={[state, dispatch]}>
            {children}
        </PorfileContext.Provider>
    )
}