import React, {useState, useEffect} from 'react';
import { HomeIcon, TickSquareIcon,UserIcon ,CalendarIcon, SettingsIcon, DocumentIcon, UsersIcon,AddUserIcon, LocationIcon, ScanIcon, RaportIcon, ActivityIcon, LogoutIcon, LogoIcon, LogoText, ArrowDown, HomeMono, UserMono, MapMono, CalendarMono, MapMarkMono, LogoutMono } from '../common/icons/icons';
import axios from 'axios';
import { NavLink,useNavigate, useLocation  } from 'react-router-dom';
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
function Navbar(props) {
  const {user} = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
  };

  const sidebarStyles = {
      width: props.isSidebarOpen ? '100%' : '50px',
      transition: 'width 0.3s ease',
      maxWidth: '255px'
    };
    const sidebarClass = props.isSidebarOpen ? "" : "sidebar-small";
    


    //drop down
    const [isActive, setIsActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    function toggleDropdown() {
      setIsActive(!isActive);
      setIsDropdownOpen(!isDropdownOpen);
    }


    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    };
  return (
     <nav className='navbar'>
      <div className='navbar-top'>
          <div className='navbar-left'>
            <div className="nav-logo">
              <NavLink className="nav-logo-a" to="/dashboard"><LogoIcon className={"sidebar-logo-icon"} /><LogoText  className={"sidebar-logo-text"}/></NavLink>
            </div>
        
          </div>
          <div className="navbar-right">
            <div className='navbar-setting'>
              <SettingsIcon className="navbar-icon-setting"/>
            </div>
            <NavLink className="" to="/me">
            {user && user.sex == "Kobieta" ? (
                            <div className="circle-avatar-women">
                              {user && `${user.name.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}
                            </div>
                          ) : (
                            <div className="circle-avatar-man">
                              {user && `${user.name.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}
                            </div>
                          )}     
            </NavLink>     
          </div>
      </div>
      <div className='navbar-down'>
      <ul className="nav-ul">
                <li className={"sidebar-menu-li " + (location.pathname === '/dashboard' ? 'active-side' : null)}  >
                    <NavLink className="nav-a"  to="/dashboard">
                    <HomeMono className="nav-icon" className2="uim-tertiary" className3="uim-primary" />
                        <span className="nav-text"  > Strona główna</span>
                    </NavLink>
                </li>
                <li  className={"sidebar-menu-li dropdown-btn " + (isActive ? "active" : " ") + (location.pathname === '/users' ? 'active-side' : null)}    onClick={toggleDropdown}>
                    <NavLink className="nav-a">
                        <UserMono  className="nav-icon" className2="uim-tertiary" className3="uim-primary"/>
                        
                    <span  className="nav-text " >Pracownicy </span>
                    </NavLink>
                   
                </li>
                <li className={"sidebar-menu-li " + (location.pathname === '/dashboards' ? 'active-side' : null)}  >
                    <NavLink className="nav-a"  to="/routes">
                    <MapMarkMono className="nav-icon" className2="uim-tertiary" className3="uim-primary" />
                        <span className="nav-text"  > Trasy</span>
                    </NavLink>
                </li>
                <li className={"sidebar-menu-li " + (location.pathname === '/dashboards' ? 'active-side' : null)}  >
                    <NavLink className="nav-a"  to="/calendar">
                    <CalendarMono className="nav-icon" className2="uim-tertiary" className3="uim-primary" />
                        <span className="nav-text"  > Kalendarz</span>
                    </NavLink>
                </li>
                <li className={"sidebar-menu-li " + (location.pathname === '/dashboards' ? 'active-side' : null)}  >
                    <NavLink className="nav-a"  to="/map">
                    <MapMono className="nav-icon" className2="uim-tertiary" className3="uim-primary" />
                        <span className="nav-text"  > Mapa</span>
                    </NavLink>
                </li>
                <li className={"sidebar-menu-li " + (location.pathname === '/dashboards' ? 'active-side' : null)}  >
                    <NavLink className="nav-a"  to="/gallery">
                    <MapMono className="nav-icon" className2="uim-tertiary" className3="uim-primary" />
                        <span className="nav-text"  > Zdjęcia</span>
                    </NavLink>
                </li>
            </ul>
      </div>
    </nav>
  )
}

export default Navbar