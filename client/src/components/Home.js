import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';
import axios from 'axios';

function Home() {

     let storeObj = useSelector((store) => {
         return store;
       })
      console.log(storeObj);

      let rankInputRef = useRef();

const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{

  setTimeout(()=>{
    setIsLoading(false);

  },1000);

},[])

let getData = async () => {
  try {
    let response = await axios.get(`/universitylist?rank=${rankInputRef.current.value}`);
    let serverData = response.data;
    console.log(serverData);
    setData(serverData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}



  return (
    <div>
      <div>
      <TopNavigation/>
      </div>
      {isLoading ? (
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
      ) : (
        <div>
          <div className='msgdiv'>
            {storeObj && storeObj.userDetails ? (
              <h3 id='welcomemsg'>Welcome back, {storeObj.userDetails.name}</h3>
            ) : (
              ''
            )}
          </div>
          <div>
            <form className='form2'>
              <p className='caption'>Uncover top-tier colleges tailored to your rank</p>
              <input type="text" name="text" className="input2" placeholder="Enter Your HallTicket Number"/>
              <input type="text" name="text" className="input2" pattern="\d+" placeholder="Enter Your Rank" ref={rankInputRef}/>
              <button className='findbtn' type='button' onClick={getData}>Find</button>
            </form>
          </div>
          {data.university && data.course && (
            <div className="cards">
              <div className="card blue">
                <p className="tip"><b>University:</b>{data.university}</p>
                <p className="second-text"><b>Course:</b>{data.course}</p>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default Home