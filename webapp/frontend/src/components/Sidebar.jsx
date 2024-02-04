// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuIcon, LogoIcon, LogoText,MessageIcon, ArrowDown, UsersIcon, MapMark, MapMono, ArrowRight, ArrowLeft, CalendarIcon, MapMain, LogoutIcon, Notification, SettingsIcon } from '../common/icons/icons';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'



const Sidebar = (props) => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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

  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsActive(!isActive);
    setIsDropdownOpen(!isDropdownOpen);
  }


  return (
    <aside className={`aside ${sidebarClass}`} style={sidebarStyles}>
        
      <div className="nav-logo">
        <NavLink className="nav-logo-a" to="/dashboard">
          <LogoIcon className={"sidebar-logo-icon"} />
          <LogoText className={"sidebar-logo-text"} />
        </NavLink>
        <button className="toggle-sidebar-button" onClick={props.toggleSidebar} >
        {props.isSidebarOpen ? <ArrowLeft   className="nav-icon" /> : <ArrowRight  className="nav-icon-menu"/>}
      </button> 
      </div>
      <div className="shadow-box"></div>
      <div className="nav-profile">
        <div className="nav-profile-user">
            <div className="nav-profile-user-avatar">
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
            <div className="nav-top-user-info">
                <div className='nav-top-user-name role'>
                {user && user.profile && user.profile.contracts.length > 0
              ? user.profile.contracts[0].position
              : 'Brak stanowiska'}   
                </div>
                <div className='nav-top-user-name name'>
                     {user && `${user.name} ${user.surname}`}
                </div>
            </div>
            
        </div>
        <div className="nav-profile-more">
        
        <NavLink className="nav-profile-setting" data-tooltip-id="nav-tooltip" data-tooltip-content="Powiadomienia"><Notification  className="nav-icon-top" className2="uim-tertiary" className3="uim-primary"/></NavLink>
        <NavLink className="nav-profile-setting" to="/me" data-tooltip-id="nav-tooltip" data-tooltip-content="Wiadomości"><MessageIcon  className="nav-icon-top" className2="uim-tertiary" className3="uim-primary"/></NavLink>
        <NavLink className="nav-profile-setting" to="/me" data-tooltip-id="nav-tooltip" data-tooltip-content="Ustawienia Konta"><SettingsIcon  className="nav-icon-top" className2="uim-tertiary" className3="uim-primary"/></NavLink>  

        <button onClick={logout} className="nav-profile-setting-button" data-tooltip-id="nav-tooltip" data-tooltip-content="Wyloguj sie">
        <LogoutIcon className="nav-icon-top"   />
        </button>
       

            
        </div>
      </div>
     
{/* 
      <div className="menu-title">
        Dashboard
      </div> */}
      <div className="border-line"></div>
      <div className="nav-content">
        <ul className="nav-ul">
          <li className={"sidebar-menu-li " + (location.pathname === '/dashboard' ? 'active-side' : null)}  >
            <NavLink className="nav-a"  to="/dashboard" data-tooltip-id="nav-tooltip" data-tooltip-content="Strona główna">
              <MenuIcon className="nav-icon stroke" />
              <span className="nav-text"  > Strona główna</span>
            </NavLink>
          </li>
          <li  className={"sidebar-menu-li dropdown-btn " + (isActive ? "active" : " ") + (location.pathname === '/users' ? 'active-side' : null)}    onClick={toggleDropdown}>
            <NavLink className="nav-a"  to="/users" data-tooltip-id="nav-tooltip" data-tooltip-content="Pracownicy"> 
              <UsersIcon  className="nav-icon" className1="stroke-nav" />
              <span  className="nav-text " >Pracownicy 
              {/* <ArrowDown className="drop-arrow"/> */}
               </span>
            </NavLink>
            {/* <ul class="sidebar-submenu-ul dropdown-container" style={{ display: isDropdownOpen ? "block" : "none" }}>
              <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="/users">Pracownicy</NavLink></li>
              <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="">Usuń pracownika</NavLink></li>
              <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="/adduser">Dodaj użytkownika</NavLink></li>
            </ul> */}
          </li>
          <li className={"sidebar-menu-li " + (location.pathname === '/routes' ? 'active-side' : null)}  >
            <NavLink className="nav-a"  to="/routes" data-tooltip-id="nav-tooltip" data-tooltip-content="Trasy">
              <MapMark className="nav-icon" />
              <span className="nav-text"  > Trasy</span>
            </NavLink>
          </li>
          <li className={"sidebar-menu-li " + (location.pathname === '/calendar' ? 'active-side' : null)}  >
            <NavLink className="nav-a"  to="/calendar" data-tooltip-id="nav-tooltip" data-tooltip-content="Kalendarz">
              <CalendarIcon className="nav-icon"  />
              <span className="nav-text"  > Kalendarz</span>
            </NavLink>
          </li>
          <li className={"sidebar-menu-li " + (location.pathname === '/map' ? 'active-side' : null)}  >
            <NavLink className="nav-a"  to="/map" data-tooltip-id="nav-tooltip" data-tooltip-content="Mapa">
              <MapMain className="nav-icon"  className1="stroke-nav" className2="stroke-nav" className3="stroke-nav" />
              <span className="nav-text"  > Mapa</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* <div className="menu-title">
        Ustawienia
      </div> */}
       <div className="border-line"></div>






       {!props.isSidebarOpen && (
          <>
            <Tooltip id="nav-tooltip" place="right" effect="solid" />
          </>
        )}
    </aside>
  );
};

export default Sidebar;
