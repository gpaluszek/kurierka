import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Początkowy stan bocznego paska pobierany z localStorage
    const storedSidebarState = localStorage.getItem('isSidebarOpen');
    return storedSidebarState ? JSON.parse(storedSidebarState) : false;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Zapis aktualnego stanu bocznego paska do localStorage
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <React.Fragment>
      <div className="dash-container">
        {/* Przekazanie stanu i funkcji do Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main>{children}</main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
