import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import Posts from '../Posts/Posts'
import StoryScrollers from '../StoryScroller/StoryScrollers'
import './HomeSide.css'

const HomeSide = ({persons,personsLoading,location,screenSize}) => {
  return (
    <>
      <div className="HomeSide">
          <div className="PostSide">
              <StoryScrollers persons={persons} personsLoading={personsLoading}/>
              <Posts persons={persons} location={location} screenSize={screenSize} />
          </div>
          <div className="FollowerSide">
              <FollowersCard persons={persons}/>
          </div>
      </div>
    </>
  )
}

export default HomeSide