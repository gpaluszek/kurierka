import React, { useState, useEffect } from "react";
import axios from "axios";
import {AvatarWoman, AvatarMan} from "../common/icons/icons.jsx"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Userlist = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const express = require('express');
const app = express();
const port = 5000;

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.uuid === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID:</th>
            <th>Imie Nazwisko</th>
            <th>Stanowisko</th>
            <th>Oddział</th>
            <th>Email</th>
            <th>Doświadczenie</th>
            <th>Umowa</th>
            <th>Opcje</th>
          </tr>
        </thead>
        
        <tbody>
          {user.map((user, index) => (
            <tr key={user.uuid} className="employee-tr">
              <td>
                 {index + 1} 
         
              </td>
              <td className="employee-profile">      {
               user.sex === "kobieta"?
                <div className="user-avatar">
                <AvatarWoman className="employee-icon"/>
                </div>
               :
                <AvatarMan className="employee-icon"/>
               }
              {user && `${user.name} ${user.surname}`}</td>
              <td>{user.position} {user.role}</td>
              <td>Mników</td>
              <td></td>
              <td>1rok</td>
              <td> </td>
              <td>
     

             
              {user.typeContract}
           
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
