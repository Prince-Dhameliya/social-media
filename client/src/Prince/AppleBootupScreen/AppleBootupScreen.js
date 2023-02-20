import React from 'react'
import './AppleBootupScreen.css'
import Logo from '../../img/Logo.svg'

const AppleBootupScreen = () => {
  return (
    <div className='AppleBootupScreen' id='AppleBootupScreen'>
        <img src={Logo} alt="" className='logo' />
        <div className="progress"></div>
    </div>
  )
}

export default AppleBootupScreen