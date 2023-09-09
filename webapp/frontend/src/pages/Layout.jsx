import React, {useState} from 'react'
import Sidebar from "../components/Sidebar";
import Navbar from '../components/Navbar';



const Layout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <React.Fragment>
        <div className='dash-container'>
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <main>
              <Navbar  toggleSidebar={toggleSidebar} />

              {children}
            </main>
        </div>
    </React.Fragment>
  )
}

export default Layout