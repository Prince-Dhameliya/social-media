import React from 'react'
import './AppleBootupScreen.css'
import Logo from '../../img/Logo.svg'

const AppleBootupScreen = () => {
  return (
    <div className='AppleBootupScreen' id='AppleBootupScreen'>
        <img src={Logo} alt="" className='logo' />
        {/* <i className='fa fa-apple logo'></i> */}
        <div className="progress"></div>
    </div>
  )
}

export default AppleBootupScreen