import React, { useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import TopNavigation from './TopNavigation';


function Login() {

  useEffect(()=>{
    if(localStorage.getItem('token')){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    }
    
    validateThruToken();
  },[])

    let loginEmailInputRef = useRef();
    let loginPasswordInputRef = useRef();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let validateThruToken = async () => {
      let dataToSend = new FormData();
      dataToSend.append('token', localStorage.getItem('token'));
    
      if (localStorage.getItem('token')) {
        try {
          let response = await axios.post('/validateThruToken', dataToSend);
    
          if (response.data.status === 'success') {
            navigate('/home');
            dispatch({ type: 'login', data: response.data.data });
          } else {
            alert(response.data.msg);
          }
        } catch (error) {
          console.error('Error in validateThruToken:', error);
        }
      }
    };
    

    let validate = async () => {

      let validateUser = new FormData();
      validateUser.append('email',loginEmailInputRef.current.value);
      validateUser.append('password',loginPasswordInputRef.current.value);

      let response = await axios.post("/validateUser",validateUser);

      console.log(response);

       if(response.data.status === 'success'){
        localStorage.setItem('token',response.data.token);
         navigate('/home');
         dispatch({type:'login', data: response.data.data});
       }else{
        alert(response.data.msg);
       }
    }

  return (
    <div>
      <TopNavigation/>
        <form className="form">
  <span className="sub mb">Login Now  to get full access now</span>
    <input type="email" className="input" placeholder="Enter Your Email" ref={loginEmailInputRef}/>
    <input type="password" className="input" placeholder="Enter Your Password" ref={loginPasswordInputRef}/> 
  <span className="sub">Don't Have an Account? <Link to='/signup'>Signup</Link></span>
    <button type='button' onClick={validate}>Login</button>
</form>
    </div>
  )
}

export default Login