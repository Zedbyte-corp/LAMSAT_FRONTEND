import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Checkbox, Card, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import Actions from 'redux/admin/settings/actions';
const Smtp = (props) => {
  const dispatch = useDispatch();
  const { isSettingpage, smtp } = useSelector((state) => state.AppSettings);
  const [UpdateForm] = Form.useForm();

  useEffect(() => {
    if (isSettingpage) {
      dispatch({
        type: Actions.GET_SMTP_DETAILS,
      });
    }
    UpdateForm.resetFields();
  }, [UpdateForm, smtp]);

  const onFinishFailed = (errorInfo) => {
  };
  const onFinishSMTP = (values) => {
    if (values) {
      dispatch({
        type: Actions.UPDATE_SMTP,
        payload: values,
      });
      UpdateForm.resetFields();
    }
  };

  const onChange = (e) => {
    if (smtp.is_smtp) {
      dispatch({
        type: Actions.UPDATE_CHECKED,
        value: 0,
      });
    } else {
      dispatch({
        type: Actions.UPDATE_CHECKED,
        value: 1,
      });
    }
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
        <h2 className="dash_title">SMTP</h2>
        <div className="dashboard-content">
          <Card>
            <div className="dashboard-form s-center">
              <Form
                name="basic"
                initialValues={smtp}
                form={UpdateForm}
                layout="vertical"
                onFinish={onFinishSMTP}
                onFinishFailed={onFinishFailed}
              >
                <Row className="center-row" gutter={30}>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMTP Hostname'}
                      name={'smtp_host'}
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
                      label={'SMTP Port'}
                      name={'smtp_port'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input type="Number" placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMTP Passward'}
                      name={'smtp_password'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input.Password placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'SMTP Encryption'}
                      name={'smtp_encryption'}
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
                      label={'SMTP Username'}
                      name={'smtp_username'}
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
                    <Form.Item label={'SMTP Is Enable'} name={'is_smtp'}>
                      <Checkbox checked={smtp.is_smtp} onChange={onChange} />
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

export default Smtp;
