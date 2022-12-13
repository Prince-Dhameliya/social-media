import React, { useEffect} from 'react'
import Post from '../Post/Post'
import './Posts.css'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts } from '../../actions/postAction'
import Media from '../SkeletonPost/SkeletonPost'


import Home from '../../img/home.svg'
// import WHome from '../../img/Whitehome.svg'
// import AddObj from '../../img/AddObject.svg'
import WAddObj from '../../img/WhiteAddObject.svg'
import {Link} from "react-router-dom"

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
    <>
      <div className="Posts">
          {loading 
          ? <Media/>
          : posts.map((post,id)=>{
              return <Post key={id} data={post} />
          })}
      </div>

      <div className='NavigationBar'>
            <Link to="../home"><img src={Home} alt="" style={{width: "1.6rem", height: "1.6rem"}} /></Link>
            <Link to=""><img src={WAddObj} alt="" style={{width: "2.2rem", height: "2.2rem"}} /></Link>
            <Link to={`../Profile/${user._id}`}><img src={user.profilePicture} alt="" style={{width: "2rem", height: "2rem"}} /></Link>
      </div>
    </>
  )
}

export default Posts