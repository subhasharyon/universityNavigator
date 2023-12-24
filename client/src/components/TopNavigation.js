import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TopNavigation() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  let logout = () => {

    localStorage.removeItem('token');

    window.location.href = '/';

  }

  return (
    <div>
      <header>
        <h2>CollegeNavigatorPro</h2>
        <div>
          <FontAwesomeIcon icon={faBars} className='icon' onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className='dropdown'>
              <Link to='/edit'>UpdateProfile</Link>
              <p className='logoutbtn' onClick={logout}>Logout</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default TopNavigation;
