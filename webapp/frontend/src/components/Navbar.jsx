import React, {useState, useEffect} from 'react';
import { ArrowDown, HamburgerIcon, SettingsIcon } from '../common/icons/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Navbar(props) {
  const {user} = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    };
  return (
     <nav className='navbar-top'>
      <div className='navbar-left'>
        <button className="hamburger" onClick={props.toggleSidebar}>
        <HamburgerIcon />
        </button>
      </div>
      <div className="navbar-right">
      <div className="navbar-news">

      </div>

      <div className='navbar-setting'>
        <SettingsIcon className="navbar-icon-setting"/>
      </div>
      {user && user.sex == "Kobieta" ? (
                      <div className="circle-avatar-women">
                        {user && `${user.name.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}
                      </div>
                    ) : (
                      <div className="circle-avatar-man">
                        {user && `${user.name.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}
                      </div>
                    )}          
      </div>
    </nav>
  )
}

export default Navbar