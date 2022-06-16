import React from 'react';
import { Row, Col, Card } from 'antd';
import 'assets/css/dashboard.scss';

const setup = () =>{
    return(
      <div>
        <Row>
          <Col className="dashboard-content mg-auto vendor">

            < Card title="Account Setup">
            <div className="dashboard-form vendor-content">
                  <label>Account Setting</label>
                  <p>Lorem Ipsum is simply dummy text of the printing </p>
                  <label>Locations</label>
                  <p>Lorem Ipsum is simply dummy text of the printing </p>
                  <label>Resources</label>
                  <p>Lorem Ipsum is simply dummy text of the printing </p>

            </div>
            </Card>
                </Col>

        </Row>
      </div>
    )
}

export default setup;