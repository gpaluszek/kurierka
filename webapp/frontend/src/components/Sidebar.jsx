import React, { useState } from 'react'
import { NavLink,useNavigate, useLocation  } from 'react-router-dom';
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon,TickSquareIcon,UserIcon ,CalendarIcon, DocumentIcon, UsersIcon,AddUserIcon, LocationIcon, ScanIcon, RaportIcon, ActivityIcon, LogoutIcon, LogoIcon, LogoText, ArrowDown, HomeMono, UserMono, MapMono, CalendarMono, MapMarkMono, LogoutMono } from '../common/icons/icons';
const Sidebar = (props) => {
    const location = useLocation();
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
      


      //drop down
      const [isActive, setIsActive] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      function toggleDropdown() {
        setIsActive(!isActive);
        setIsDropdownOpen(!isDropdownOpen);
      }


    
    return (
        
       

        <aside className={`aside ${sidebarClass}`} style={sidebarStyles}>
            <div className="nav-logo">
                <NavLink className="nav-logo-a" to="/dashboard"><LogoIcon className={"sidebar-logo-icon"} /><LogoText  className={"sidebar-logo-text"}/></NavLink>
            </div>
            <div className="shadow-box"></div>
            <div className="menu-title">
                Dashboard
            </div>
            <div className="nav-content">
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
                        
                    <span  className="nav-text " >Pracownicy <ArrowDown className="drop-arrow"/> </span>
                    </NavLink>
                    <ul class="sidebar-submenu-ul dropdown-container" style={{ display: isDropdownOpen ? "block" : "none" }}>
                        <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="/users">Pracownicy</NavLink></li>
                        <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="">Usuń pracownika</NavLink></li>
                        <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="/adduser">Dodaj użytkownika</NavLink></li>
                    </ul>
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
                    <NavLink className="nav-a"  to="/dashboard">
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
            {/* {user && user.role === "admin" && (
                <Div jakis tam menu dostepne dla admina
            )} */}

                
            </div>
            <div className="menu-title">
                Ustawienia
            </div>
            <button  onClick={logout}  className="nav-button"><LogoutMono className="nav-icon" className2="uim-tertiary" className3="uim-primary" /><span className="nav-text" >Wyloguj się</span></button>
            <div className="nav-footer">

            </div>
        </aside>

      
    )
}

export default Sidebar