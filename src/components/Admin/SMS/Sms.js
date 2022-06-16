import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Card, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import Actions from 'redux/admin/settings/actions';
import { values } from 'lodash';

const SMS = (props) => {
  const dispatch = useDispatch();
  const { isSettingpage, sms } = useSelector((state) => state.AppSettings);
  const [UpdateForm] = Form.useForm();
  useEffect(() => {
    if (isSettingpage) {
      dispatch({
        type: Actions.GET_SMS_DETAILS,
      });
    }
    UpdateForm.resetFields();
  }, [UpdateForm, sms]);


  const SendSMSMessage = (values) =>{
    dispatch({
      type: Actions.SEND_SMS,
      payload:values
  })
  }
  const onFinishSocialMedia = (values) => {
    if (values) {
      dispatch({
        type: Actions.UPDATE_SMS,
        payload: values,
      });
      UpdateForm.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {

  };
  return (
    <Row>
      <Col
        offset={0}
        xs={22}
        md={22}
        lg={22}
        className="dashboard-content mg-auto smsize"
      >
        <h2 className="dash_title">SMS</h2>
        <div className="dashboard-content">
          <Card>
            <div className="dashboard-form s-center">
              <Form
                name="basic"
                initialValues={sms}
                form={UpdateForm}
                layout="vertical"
                onFinish={onFinishSocialMedia}
                onFinishFailed={onFinishFailed}
              >
                <Row className="center-row" gutter={30}>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMS Gateway Username'}
                      name={'sms_username'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMS Gateway Password'}
                      name={'sms_password'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMS Gateway Country code'}
                      name={'sms_countrycode'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMS Gateway From'}
                      name={'sms_from'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <div className="button-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="save-btn"
                    >
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
  );
};

export default SMS;
