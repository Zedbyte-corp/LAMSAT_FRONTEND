import React from 'react';
import { Row, Col, Card } from 'antd';
import AdminEditSettings from 'components/Admin/Settings/EditSettings';
import 'assets/css/dashboard.scss';

const Settingsupdate = () => {
    return (
        <Row>
            <Col
                offset={0}
                xs={22}
                md={22}
                lg={22}
                className="dashboard-content mg-auto"
            >
                <div key={'Edit-Settings'}>
                    <AdminEditSettings />
                </div>
            </Col>
        </Row>
    );
};
export default Settingsupdate;
