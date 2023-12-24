import React, { useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {

    let nameInputRef = useRef();
    let emailInputRef = useRef();
    let phoneInputRef = useRef();
    let passwordInputRef = useRef();
    let cpasswordInputRef = useRef();
    let genderInputRef = useRef();
    let profileInputRef = useRef();

    let storeObject = useSelector((store)=>{
        return store
     });

     const [profilePreview, setProfilePreview] = useState('');

     useEffect(()=>{
        populateData()
     },[])

    let populateData = () => {

        if(storeObject && storeObject.userDetails){

            nameInputRef.current.value = storeObject.userDetails.name;
            emailInputRef.current.value = storeObject.userDetails.email;
            phoneInputRef.current.value = storeObject.userDetails.phone;
            genderInputRef.current.value = storeObject.userDetails.gender;
        
        }
    }

    const editData = async () => {

        let dataToSend = new FormData();

        dataToSend.append('name',nameInputRef.current.value);
        dataToSend.append('email',emailInputRef.current.value);
        dataToSend.append('phone',phoneInputRef.current.value);
        dataToSend.append('password',passwordInputRef.current.value);
        dataToSend.append('confirmPassword',cpasswordInputRef.current.value);
        dataToSend.append('gender',genderInputRef.current.value);
        dataToSend.append('profile',profileInputRef.current.files[0]);

        let response = await axios.post("/editProfile",dataToSend);

        console.log(response);
        alert(response.data.msg);


    }
  return (
    <div>
      <TopNavigation/>

     
        <div>
 <form className="form">
  <span className="title">You really like the project</span>
  <span className="sub mb">Register to get full access now</span>
 <input id="file" type="file" multiple ref={profileInputRef} onChange={()=>{
    const selectedFile = profileInputRef.current.files[0];

    if (selectedFile) {
      const selectedProfilePic = URL.createObjectURL(selectedFile);
      setProfilePreview(selectedProfilePic);
    }
 }}/>
  <label className="avatar" for="file"><span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z" opacity="0.1"></path> <path stroke-width="2" stroke="#ffffff" d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"></path> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"></path> <path stroke-width="2" stroke="#ffffff" d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"></path> </g></svg></span></label>
    <input type="text" className="input" placeholder="Enter FullName" ref={nameInputRef}/>
    <input type="email" className="input" placeholder="Enter Email" ref={emailInputRef} readOnly/>
    <input className="input" placeholder="Enter PhoneNumber" ref={phoneInputRef}/> 
    <input type="password" className="input" placeholder=" Create New password" ref={passwordInputRef}/>
    <input type="password" className="input" placeholder=" Confirm password" ref={cpasswordInputRef}/> 
    <select className="input" ref={genderInputRef}>
        <option>Select Sex</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
    </select> 
    {profilePreview && (
        <img
          className="profile-overlay"
          src={profilePreview}
          alt="Profile Preview"
        />
      )}
  <span class="sub">Already have an account ? <Link to='/'>Login</Link></span>
    <button type='button' onClick={editData}>Register</button>
</form>
        </div>
      
    </div>
  )
}

export default EditProfile