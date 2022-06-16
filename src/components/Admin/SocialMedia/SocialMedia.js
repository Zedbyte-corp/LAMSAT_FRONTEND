import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Card, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import Actions from 'redux/admin/settings/actions';

const AdminSocialMedia = () => {
  const dispatch = useDispatch();
  const { isSettingpage, social_media } = useSelector(
    (state) => state.AppSettings,
  );
  const [UpdateForm] = Form.useForm();

  useEffect(() => {
    if (isSettingpage) {
      dispatch({
        type: Actions.GET_SOCIAL_DETAILS,
      });
    }
    UpdateForm.resetFields();
  }, [UpdateForm, social_media]);

  const onFinishFailed = (errorInfo) => {};

  const onFinishSocialMedia = (values) => {
    if (values) {
      dispatch({
        type: Actions.UPDATE_SOCIAL_MEDIA,
        payload: values,
      });
      //UpdateForm.resetFields();
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
        <h2 className="dash_title">Social Media</h2>
        <div className="dashboard-content">
          <Card>
            <div className="dashboard-form s-center">
              <Form
                name="basic"
                initialValues={social_media}
                form={UpdateForm}
                layout="vertical"
                onFinish={onFinishSocialMedia}
                onFinishFailed={onFinishFailed}
              >
                <Row className="center-row" gutter="30">
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'FacebooK Url'}
                      name={'facebook'}
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
                      label={'Instagram Url'}
                      name={'instagram'}
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
                      label={'Twitter Url'}
                      name={'twitter'}
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
                      label={'Snapchat Url'}
                      name={'google_plus'}
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

export default AdminSocialMedia;
