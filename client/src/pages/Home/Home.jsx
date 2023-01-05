import React from 'react'
import HomeSide from '../../Components/HomeSide/HomeSide';
import NavigationMain from '../../Components/NavigationMain/NavigationMain';
import './Home.css'

const Home = () => {
  return (
    <div className="Home">
        <NavigationMain />
        <HomeSide />
    </div>
  )
}

export default Home