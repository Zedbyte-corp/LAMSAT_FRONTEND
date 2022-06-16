import React from 'react';
import { Button, Result } from 'antd';
import { NavLink } from 'react-router-dom';
import { getLocalDataType } from 'redux/helper';

const NotFound = () => (
  <Result
    status={'404'}
    title={'404'}
    subTitle={'Sorry, the page you visited does not exist.'}
    extra={
      <Button>
        <NavLink to={getLocalDataType() === 'admin' ? '/admin/dashboard': getLocalDataType() === 'vendor' ? '/vendor/dashboard': '/'}>Back</NavLink>
      </Button>
    }
  />
);

export default NotFound;
