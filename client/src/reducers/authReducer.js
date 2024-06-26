const authReducer = (
state = { authData: null, loading: false, error: false, updateLoading: true}, 
action
) => {
    switch(action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return { ...state, authData: action.data, loading: false, error: false };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true };

        case "NOTIFICATION_RETREIVING_START":
            return {...state, loading: true, error: false};
        case "NOTIFICATION_RETREIVING_SUCCESS":
            return {...state, authData: {...state.authData, user: {...state.authData.user, notification: []}}, loading: false, error: false}
        case "NOTIFICATION_RETREIVING_FAIL":
            return {...state, loading: false, error: true}

        case "NOTIFICATIONS_RETREIVING_START":
            return {...state, loading: true, error: false};
        case "NOTIFICATIONS_RETREIVING_SUCCESS":
            return {...state, authData: {...state.authData, user: {...state.authData.user, notifications: action.notifications, notification: action.notification}}, loading: false, error: false}
        case "NOTIFICATIONS_RETREIVING_FAIL":
            return {...state, loading: false, error: true}
        
        case "UPDATING_START":
            return {...state, updateLoading: true, error: false};
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action.data, updateLoading: false, error: false}
        case "UPDATING_FAIL":
            return {...state, updateLoading: false, error: true}

        case "FOLLOWING_START":
            return {...state, loading: true, error: false};
        case "FOLLOWING_SUCCESS":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]}}, loading: false, error: false}
        case "FOLLOWING_FAIL":
            return {...state, loading: false, error: true}

        case "UNFOLLOWING_START":
            return {...state, loading: true, error: false};
        case "UNFOLLOWING_SUCCESS":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter(person=>person !== action.data)]}}, loading: false, error: false}
        case "UNFOLLOWING_FAIL":
            return {...state, loading: false, error: true}

        case "LOG_OUT":
            localStorage.clear();
            return {...state, authData: null, loading: false, error: false}
        default:
            return state;
    }
};

export default authReducer