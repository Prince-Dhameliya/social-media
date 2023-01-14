import * as UserApi from "../api/UserRequest"

export const updateUser = (id, formData) => async(dispatch) => {
    dispatch({type: "UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS", data: data})
    } catch (error) {
        dispatch({type: "UPDATING_FAIL"})
    }
}

export const followUser = (id, data) => async (dispatch) => {
    dispatch({type: "FOLLOWING_START"})
    try {
        await UserApi.followUser(id, data)
        dispatch({type: "FOLLOWING_SUCCESS", data: id})
    } catch (error) {
        dispatch({type: "FOLLOWING_FAIL"})
        console.log(error);
    }
}

export const unFollowUser = (id, data) => async (dispatch) => {
    dispatch({type: "UNFOLLOWING_START"})
    try {
        await UserApi.unFollowUser(id, data)
        dispatch({type: "UNFOLLOWING_SUCCESS", data: id})
    } catch (error) {
        dispatch({type: "UNFOLLOWING_FAIL"})
        console.log(error);
    }
}

export const getNotifications = (id) => async (dispatch) => {
    dispatch({type: "NOTIFICATION_RETREIVING_START"})
    try {
        const {data} = await UserApi.getNotifications(id);
        dispatch({type: "NOTIFICATION_RETREIVING_SUCCESS", data : data})
    } catch (error) {
        dispatch({type: "NOTIFICATION_RETREIVING_FAIL"})
        console.log(error);
    }
}

export const getTimelineNotifications = (id) => async (dispatch) => {
    dispatch({type: "NOTIFICATIONS_RETREIVING_START"})
    try {
        const {data} = await UserApi.getTimelineNotifications(id);
        dispatch({type: "NOTIFICATIONS_RETREIVING_SUCCESS", notifications : data.notifications , notification : data.notification})
    } catch (error) {
        dispatch({type: "NOTIFICATIONS_RETREIVING_FAIL"})
        console.log(error);
    }
}

export const deleteUser = (id, data) => async (dispatch) => {
    dispatch({type: "DELETING_START"})
    try {
        await UserApi.deleteUser(id, data);
        dispatch({type: "DELETING_SUCCESS", data: id})
    } catch (error) {
        dispatch({type: "DELETING_FAIL"})
        console.log(error);
    }
}