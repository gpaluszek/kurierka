import React, {useState} from 'react'
import MeProfile from '../components/Me/MeProfile.jsx';
import Layout from "./Layout";

const MeProfiles = ({children}) => {

  return (
    <Layout>
        <MeProfile />
    </Layout>
  )
}

export default MeProfiles