import React, { useEffect} from 'react'
import Post from '../Post/Post'
import './Posts.css'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts } from '../../actions/postAction'
import Media from '../SkeletonPost/SkeletonPost'

const Posts = () => {
  const dispatch = useDispatch();
  
  const {user} = useSelector((state)=>state.authReducer.authData);
  let {posts, loading} = useSelector((state)=>state.postReducer);
  const params = useParams();

  useEffect(()=>{
      dispatch(getTimelinePosts(user._id))
  },[])

  if(!posts) return "no Posts";
  if(params.id) posts = posts.filter((post)=>post.userId === params.id)

  return (
    <div className="Posts">
        {loading 
        ? <Media/>
        : posts.map((post,id)=>{
            return <Post key={id} data={post} />
        })}
    </div>
  )
}

export default Posts