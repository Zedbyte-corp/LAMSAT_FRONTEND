import React from 'react';
import { Row, Col, Card } from 'antd';
import AdminEditProfile from 'components/Admin/AdminProfile/EditProfile';
import AdminChangePassword from 'components/Admin/AdminProfile/ChangePassword';
import 'assets/css/dashboard.scss';

const Profileupdate = () => {
  return (
    <Row>
      <Col
        offset={0}
        xs={22}
        md={22}
        lg={22}
        className="dashboard-content mg-auto"
      >
        <div key={'Edit-profile'} className="container_minimal">
          <Card title="My Profile">
            <AdminEditProfile />
          </Card>
          <Card title="Change Password">
            <AdminChangePassword />
          </Card>
        </div>
      </Col>
    </Row>
  );
};
export default Profileupdate;
