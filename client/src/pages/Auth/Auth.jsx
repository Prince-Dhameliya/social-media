import React from 'react'
import { useState } from 'react'
import Logo from '../../img/logo.png'
import './Auth.css'
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authReducer.loading);
//   console.log(loading);

  const [isSignUp, setIsSignUp] = useState(true);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState(true);

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp){
        data.password === data.confirmpassword ? dispatch(signUp(data)) : setConfirmPassword(false);
    }
    else{
        dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setConfirmPassword(true);
    setData({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpassword: "",
    });
  }
  
  return (
    <div className="Auth">
        {/* left side */}
        <div className="AuthLeft">
            <img src={Logo} alt="" />
            <div className="WebName">
                <h1>My App</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>

        {/* right side */}
        <div className="AuthRight">
            <form className="InfoForm AuthForm" onSubmit={handleSubmit} >
                <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

                {isSignUp && (
                    <div>
                        <input type="text" name="firstname" value={data.firstname} placeholder="First Name" className="InfoInput" onChange={handleChange} />
                        <input type="text" name="lastname" value={data.lastname} placeholder="Last Name" className="InfoInput" onChange={handleChange} />
                    </div>
                )}

                <div>
                    <input type="text" name="username" autoComplete='username' value={data.username} placeholder="Username" className="InfoInput" onChange={handleChange} />
                </div>

                <div>
                    <input type="password" name="password" autoComplete='new-password' value={data.password} placeholder="Password" className="InfoInput" onChange={handleChange} />
                    { isSignUp && <input type="password" autoComplete='current-password' value={data.confirmpassword} name="confirmpassword" placeholder="Confirm Password" className="InfoInput" onChange={handleChange} /> }
                </div>

                <span style={{display: confirmPassword ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px"}}>
                    * Confirm Password Is Not Same
                </span>

                <div className="SwitchAuth">
                    <span style={{fontSize: "12px", cursor: "pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()}}  >{isSignUp ? "Already have an account. Login!" : "Don't have an account? SignUp!"}</span>
                    <button className="button InfoButton" type="submit" disabled={loading}>{loading ? "Loading..." : (isSignUp ? "Sign Up" : "Log In")}</button>
                </div>
            </form>
        </div>

    </div>
  )
};

export default Auth