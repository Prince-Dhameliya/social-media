import { Skeleton } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import "./StoryScrollers.css"

const StoryScroller = ({person}) => {
    return (
        <div className="StoryContainer">
            <div className="StoryProfile">
                <img className="StoryUserIcon" src={person?.profilePicture} alt="" />
                <svg className="StoryBorder" viewBox='0 0 100 100'>
                    <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                    </linearGradient> 
                    </defs>
                    <circle cx="50" cy="50" r="40" fill='none' strokeWidth="3px" stroke="url(#gradient)"/>
                </svg>
            </div>
            <span className="StoryUserName">{person?.username}</span>
        </div>
    )
}

const StoryScrollers = ({persons,personsLoading}) => {
    const {user} = useSelector((state)=>state.authReducer.authData);

    const storyPersons = persons.filter((person) => {
        const storyUser = person._id;
        if(user.following.includes(storyUser) || storyUser === user._id) return true;
        else return false;
    });

    let StoryContainer = document.querySelectorAll(".StoryContainer");
    StoryContainer.forEach(story=>{
        story.addEventListener("click", ()=>{
            let storyBorder = story.querySelector(".StoryBorder");
            storyBorder.classList.add("ActiveStory");

            setTimeout(()=>{
                storyBorder.classList.remove("ActiveStory")
            },3000)
        })
    })

    let userFollowing = user.following.length + 1;

  return (
    <div>
        <div className="StoryScroller">
            {!personsLoading? (storyPersons?.map((person, id)=>{
                return <StoryScroller key={id} person={person}/>
            }))
            : 
            <>
            {Array(userFollowing).fill(true).map((_, i) => 
            <div className="StoryContainer" key={i}>
                <div className="StoryProfile">
                    <Skeleton animation="wave" variant="circular" width={60} height={60} style={{ marginTop: 3,border: "1px solid var(--lineColor)"}} />
                </div>
                <Skeleton animation="wave" height={20} width="80%" />
            </div>)}
            </>
            }
        </div>
    </div>
  )
}

export default StoryScrollers