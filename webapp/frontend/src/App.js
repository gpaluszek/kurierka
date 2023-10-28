import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser"
import AddUser from "./pages/AddUser";
import ContractEmployee from "./pages/ContractEmployee";
import AddContract from "./pages/AddContract";
import RoutesMain from "./pages/Routes";
import Calendar from "./pages/Calendar";
import CheckpointAdd from "./pages/AddCheckpoint";
import MainGallery from "./pages/Gallery";
import AddImage from "./pages/AddImage";
import AddPoints from "./pages/AddPoints";
import AddExcel from "./pages/AddExcel";
import MeProfiles from "./pages/MeProfile";
import ChangePassword from "./components/User/ChangePassword";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/employee/:id/contracts" element={<AddContract />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/:id" element={<ContractEmployee />} />
          <Route path="/routes" element={<RoutesMain />} />
          <Route path="/routes/addpoints/:id" element={<AddPoints />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/addcheckpoint" element={<CheckpointAdd/>} />
          <Route path="/addimage" element={<AddImage/>} />
          <Route path="/gallery" element={<MainGallery/>} />
          <Route path="/addexcel" element={<AddExcel/>} />
          <Route path="/me" element={<MeProfiles/>} />
          <Route path="/me/changepassword" element={<ChangePassword/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
