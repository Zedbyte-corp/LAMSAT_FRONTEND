import React from 'react';
import { Row, Col, Input, Button, Card, Form } from 'antd';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';

const SMS = () =>{
    const onFinishSocialMedia = (values) =>{

    }
    return (
      <Row>
        <Col offset={0} xs={20} md={20} lg={20} className="dashboard-content mg-auto" >
      <div className="dashboard-content">
        <Card title="SMS">
          <div className="dashboard-form s-center">
            <Form onFinish={onFinishSocialMedia()} {...formProps}>
              <Row className="center-row">
                <Col span={12}  className="inner-content">
                  <Form.Item
                    label={'SMS Gateway Username'}
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
                <Col span={12}  className="inner-content">
                  <Form.Item
                    label={'SMS Gateway Password'}
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
                    label={'SMS Gateway Country code'}
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
                    label={'SMS Gateway From'}
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
              </Row>
                <Form.Item>
                  <div className="button-center">
                    <Button type="primary" htmlType="submit" className="save-btn">
                      Save
                    </Button>
                  </div>
                </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
      </Col>
      </Row>
    )
}

export default SMS;