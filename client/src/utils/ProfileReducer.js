const ACTIONS = {
    NO_ERROR: "no_error",
    ERROR: "error",
    FOLLOW: "follow_user",
    UNFOLLOW: "unfollow_user",
    SET_PROFILE: "set_profile",
    IS_FOLLOWING: "is_following"
}

function ProfileReducer(state, action) {
    switch (action.type) {
        case ACTIONS.NO_ERROR:
            return { ...state, error: false }
        case ACTIONS.ERROR:
            return { ...state, error: true }
        case ACTIONS.SET_PROFILE:
            return { ...state, profile: action.payload }
        case ACTIONS.IS_FOLLOWING:
            return { ...state, following: true }
    }
}

export default ProfileReducer