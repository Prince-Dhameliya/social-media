import React, { useEffect, useState} from 'react'
import Post from '../Post/Post'
import './Posts.css'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts, getTimelineSavedPosts } from '../../actions/postAction'
import Media from '../SkeletonPost/SkeletonPost'
import NavigationBar from '../NavigationBar/NavigationBar.js'
import FollowersCard from '../FollowersCard/FollowersCard'


const Posts = ({location, allPosts}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  let {savedPosts, posts, loading} = useSelector((state)=>state.postReducer);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getTimelinePosts(user._id))
      dispatch(getTimelineSavedPosts(user._id))
  },[user._id,dispatch,location])

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

    if(!posts) return "no Posts";

    if(location === "allposts"){
      posts = allPosts;
    }
    if(location === "posts"){
      if(params.id) posts = allPosts.filter((post)=>post.userId === params.id)
    }
    else if(location === "saved"){
      posts = savedPosts;
    }

  return (
    <>
      <div className="Posts">
        {loading ? <Media/>
          : (
            <>
            {posts[0]!==undefined && (<Post key={0} data={posts[0]} />)}
            {posts[1]!==undefined && (<Post key={1} data={posts[1]} />)}
            
            {location === undefined && screenSize.dynamicWidth < 700 && (<FollowersCard/>)}

            {posts.map((post,id)=>{
              if(id>1){
                return <Post key={id} data={post} />
              }
              return null;
            })}
            </>)
        }
        <NavigationBar/>
      </div>
    </>
  )
}

export default Posts