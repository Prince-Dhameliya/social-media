import React from 'react'
import { useSelector } from 'react-redux';
import "./StoryScroller.css"

const StoryScroller = () => {
    const {user} = useSelector((state)=>state.authReducer.authData);

    let StoryContainer = document.querySelectorAll(".StoryContainer");
    StoryContainer.forEach(story=>{
        story.addEventListener("click", ()=>{
            let storyBorder = story.querySelector(".StoryBorder");
            storyBorder.classList.add("ActiveStory");

            setTimeout(()=>{
                storyBorder.classList.remove("ActiveStory")
            },10000)
        })
    })
  return (
    <div>
        <div className="StoryScroller">
            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>
            
            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>
            
            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>

            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>

            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>

            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>

            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>

            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>

            <div className="StoryContainer">
                <div className="StoryProfile">
                    <img className="StoryUserIcon" src={user?.profilePicture} alt="" />
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
                <span className="StoryUserName">{user?.username}</span>
            </div>


        </div>
    </div>
  )
}

export default StoryScroller