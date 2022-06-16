import React from 'react';
import { Row, Col, Input, Button, Checkbox, Card, Form } from 'antd';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';

const Smtp = () =>{
  const onFinishSMTP = (values) =>{

  }
  return (
    <Row>
        <Col offset={0} xs={18} md={18} lg={18} className="dashboard-content mg-auto" >
    <div className="dashboard-content">
      <Card title="SMTP">
        <Form onFinish={onFinishSMTP()} {...formProps}>
          <Row className="center-row">
            <Col span={12} className="inner-content">
              <Form.Item
                label={'SMTP Hostname Details'} 
                name={'smtp_host'} 
                rules={
                  [
                    {
                      required: true,
                      message: 'Fields are requireds',
                    },
                  ]
                }
              >
                <Input placeholder="" />  
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                label={'SMTP Port'} 
                name={'smtp_port'} 
                rules={
                  [
                    {
                      required: true,
                      message: 'Fields are requireds',
                    },
                  ]
                }
              >
                <Input placeholder="" />  
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                label={'SMTP Passward'} 
                name={'smtp_password'} 
                rules={
                  [
                    {
                      required: true,
                      message: 'Fields are requireds',
                    },
                  ]
                }
              >
                <Input.Password placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                label={'SMTP Encryption'} 
                name={'smtp_encryption'} 
                rules={
                  [
                    {
                      required: true,
                      message: 'Fields are requireds',
                    },
                  ]
                }
              >
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                label={'SMTP Username'} 
                name={'smtp_username'} 
                rules={
                  [
                    {
                      required: true,
                      message: 'Fields are requireds',
                    },
                  ]
                }
              >
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                label={'SMTP Is Enable'} 
                name={'issmptp'}
              >
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <div className="button-center">
              <Button type="primary" htmlType="submit" className="save-btn">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </Col>
    </Row>
  )
}

export default Smtp;