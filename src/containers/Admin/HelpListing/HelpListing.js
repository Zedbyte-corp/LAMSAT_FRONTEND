import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Button } from 'antd';

const AdminHelpListing = () =>{
    return <div>
        Help Listing
        <br/>
        <NavLink to={'/listing'}>Listing Page</NavLink>
        <br/>
        <NavLink to={'/dashboard'}>Dashboard Page</NavLink>
    </div>
}

export default AdminHelpListing;