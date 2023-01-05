const postReducer = (
    state = {posts: [],savedPosts: [], loading: false, error: false, uploading: false},
    action
) => {
    switch(action.type){
        case "UPLOAD_START":
            return {...state, uploading: true, error: false}
        case "UPLOAD_SUCCESS":
            return {...state, posts: [action.data, ...state.posts], uploading: false, error: false}
        case "UPLOAD_FAIL":
            return {...state, uploading: false, error: true}

        case "COMMENTING_START":
            return {...state, uploading: true, error: false}
        case "COMMENTING_SUCCESS":
            const commentPosts = state.posts.map(obj=>
                obj._id === action.id ? {...obj, comments: [action.data , ...obj.comments]} : obj
            );
            return {...state, posts : commentPosts, uploading: false, error: false}
        case "COMMENTING_FAIL":
            return {...state, uploading: false, error: true}

        case "COMMENTDELETING_START":
            return {...state, uploading:true, error: false}
        case "COMMENTDELETING_SUCCESS":
            const deletecommentPosts = state.posts.map(obj=>
                obj._id === action.postId ? {...obj, comments: obj.comments.filter(obj1=>obj1.commentId !== action.commentId)} : obj
            );
            return {...state, posts: deletecommentPosts, uploading: false, error: false}
        case "COMMENTDELETING_FAIL":
            return {...state, uploading: false, error: true}
            
        case "RETREIVING_START":
            return {...state, loading:true, error: false}
        case "RETREIVING_SUCCESS":
            return {...state, posts: action.data, loading:false, error: false}
        case "RETREIVING_FAIL":
            return {...state, loading: false, error: true}

        case "SAVED_RETREIVING_START":
            return {...state, loading:true, error: false}
        case "SAVED_RETREIVING_SUCCESS":
            return {...state, savedPosts: action.data, loading:false, error: false}
        case "SAVED_RETREIVING_FAIL":
            return {...state, loading: false, error: true}

        case "LIKE_POST":
            const likePosts = state.posts.map(obj=>
                obj._id === action.Id ? {...obj, likes: [...obj.likes, action.data]} : obj
            );
            return {...state, posts : likePosts, loading: false, error: false}
        case "DISLIKE_POST":
            const dislikePosts = state.posts.map(obj=>
                obj._id === action.Id ? {...obj, likes: [...obj.likes.filter(temp=>temp!==action.data)]} : obj
            );
            return {...state, posts : dislikePosts, loading: false, error: false}

        case "BOOKMARK_POST":
            const bookmarkPosts = state.posts.map(obj=>
                obj._id === action.Id ? {...obj, saved: [...obj.saved, action.data]} : obj
            );
            return {...state, posts : bookmarkPosts, loading: false, error: false}
        case "UNBOOKMARK_POST":
            const unbookmarkPosts = state.posts.map(obj=>
                obj._id === action.Id ? {...obj, saved: [...obj.saved.filter(temp=>temp!==action.data)]} : obj
            );
            return {...state, posts : unbookmarkPosts, loading: false, error: false}

        case "DELETING_START":
            return {...state, loading:true, error: false}
        case "DELETING_SUCCESS":
            return {...state, posts: state.posts.filter(obj=>obj._id!==action.data), loading: false, error: false}
        case "DELETING_FAIL":
            return {...state, loading: false, error: true}

        default:
            return state
    }
}

export default postReducer