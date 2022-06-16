import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Button } from 'antd';

const AdminListing = () =>{
    return <div>
        Listing
        <br/>
        <NavLink to={'/listing-help'}>Listing Help Page</NavLink>
        <br/>
        <NavLink to={'/dashboard'}>Dashboard Page</NavLink>
    </div>
}

export default AdminListing;