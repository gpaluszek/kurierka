import React, {useState} from 'react'
import MePassword from '../components/Me/ChangePassword.jsx';
import Layout from "./Layout";

const changePassword = ({children}) => {

  return (
    <Layout>
        <MePassword />
    </Layout>
  )
}

export default changePassword