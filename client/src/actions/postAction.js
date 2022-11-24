import * as PostApi from '../api/PostRequest'

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({type: "RETREIVING_START"})
    try {
        const {data} = await PostApi.getTimelinePosts(id);
        dispatch({type: "RETREIVING_SUCCESS", data: data})
    } catch (error) {
        dispatch({type: "RETREIVING_FAIL"})
        console.log(error);
    }
}

export const commentPost = (id, data) => async (dispatch) => {
    dispatch({type: "COMMENTING_START"})
    try {
        await PostApi.commentPost(id, data);
        dispatch({type: "COMMENTING_SUCCESS", id: id, data: data})
    } catch (error) {
        dispatch({type: "COMMENTING_FAIL"})
        console.log(error);
    }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
    dispatch({type: "COMMENTDELETING_START"})
    try {
        await PostApi.deleteComment(postId, commentId);
        dispatch({type: "COMMENTDELETING_SUCCESS", commentId: commentId, postId:postId})
    } catch (error) {
        dispatch({type: "COMMENTDELETING_FAIL"})
        console.log(error);
    }
}

export const likePost = (postId, userId) => async (dispatch) => {
    try {
        await PostApi.likePost(postId, userId);
        dispatch({type: "LIKE_POST", data: userId, Id:postId})    
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = (postId, userId) => async (dispatch) => {
    try {
        await PostApi.dislikePost(postId, userId);
        dispatch({type: "DISLIKE_POST", data: userId, Id:postId})    
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id,userId) => async (dispatch) => {
    dispatch({type: "DELETING_START"})
    try {
        await PostApi.deletePost(id, userId);
        dispatch({type: "DELETING_SUCCESS", data: id})
    } catch (error) {
        dispatch({type: "DELETING_FAIL"})
        console.log(error);
    }
}