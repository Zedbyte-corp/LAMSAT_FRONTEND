import React from 'react';
import { Row, Col, Input, Button, Select, Card } from 'antd';
import 'assets/css/dashboard.scss';
// import { Button } from 'antd';

const { Option } = Select;
const Pushnotification = () => {
  function handleChange(value) {
  }

  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto smsize"
        >
          <h2 className="dash_title">Push Notification</h2>
          <Card>
            <div className="dashboard-form">
                <Col span={24} className="inner-content">
                  <label>App Type</label>
                  <br />
                  <Select
                    className="app-type"
                    defaultValue="Android"
                    onChange={handleChange}
                  >
                    <Option value="Android">Android</Option>
                    <Option value="Ios">Ios</Option>
                  </Select>

                  <label>SMTP Port</label>
                  <Input placeholder="" autoSize />
                  <label>SMTP Password</label>
                  <Input placeholder="" autoSize />
                </Col>
              <div className="button-center">
                <Button type="primary" htmlType="submit" className="save-btn">
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Pushnotification;
