import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {

  const [state, setState] = useState('Login');
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password:''
  })

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const signup = async () => {
    let responseData;
      
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data )

    if(responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    } else {
      alert(responseData.message)
    }
  }

  const login = async () => {
    let responseData;
      
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data )

    if(responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    } else {
      alert(responseData.message)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? <input type="text" name='username' value={formData.username} onChange={changeHandler}  placeholder='Your Name...' /> : <></>}
          <input type="email"  name='email' value={formData.email} onChange={changeHandler} placeholder='Email...' />
          <input type="password"  name='password' value={formData.password} onChange={changeHandler} placeholder='Password...' />
        </div>
        <button onClick={() => {state === 'Sign Up' ? signup() : login()}} >Continue</button>
        {state === 'Sign Up' ? <p className='loginsignup-login'>Already have an account? <span onClick={() => {setState('Login')}}  style={{ cursor: 'pointer'}} >Login Here</span></p>
          : <p className='loginsignup-login'>Create a new Account <span onClick={()=> {setState('Sign Up')}} style={{ cursor: 'pointer'}} >Click Here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
