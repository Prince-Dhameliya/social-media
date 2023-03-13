import React, { useEffect} from 'react'
import Post from '../Post/Post'
import './Posts.css'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts, getTimelineSavedPosts } from '../../actions/postAction'
import Media from '../SkeletonPost/SkeletonPost'
import FollowersCard from '../FollowersCard/FollowersCard'
import Camera from "../../img/Camera.svg";


const Posts = ({location,persons,screenSize}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  let {posts, loading} = useSelector((state)=>state.postReducer);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getTimelinePosts(user._id))
      // dispatch(getTimelineSavedPosts(user._id))
  },[user._id,dispatch,location])

  
  if(location === "home"){
    posts = posts.filter((post) => {
      const postUser = post.userId;
      if(user.following.includes(postUser) || postUser === user._id) return true;
      else return false;
    });
  }
  else if(location === "profile"){
    if(params.id) posts = posts.filter((post)=>post.userId === params.id)
  }
  else if(location === "saved"){
    posts = posts.filter((post) => {
      if(post.saved.includes(user._id)) return true;
      else return false;
    });
  }

  if(posts.length === 0) return (
    <div className='NoPosts'>
      <img className="CameraIcon" src={Camera} alt=""/>
      <span>No posts</span>
    </div>
  );



  return (
    <>
      <div className="Posts">
        {loading ? <Media/>
          : (
            <>
            {posts[0]!==undefined && (<Post key={0} index={0+1} data={posts[0]} location={location} />)}
            {posts[1]!==undefined && (<Post key={1} index={1+1} data={posts[1]} />)}
            
            {location === "home" && screenSize.dynamicWidth < 700 && (<FollowersCard persons={persons}/>)}

            {posts.map((post,id)=>{
              if(id>1){
                return <Post key={id} index={id+1} data={post} location={location} />
              }
              return null;
            })}
            </>)
        }
      </div>
    </>
  )
}

export default Posts