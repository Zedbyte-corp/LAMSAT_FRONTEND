import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/css/dashboard.scss';
import actions from 'redux/auth/actions';
import { getLocalData } from 'redux/helper';

const Profileupdate = () => {
  const dispatch = useDispatch(); 
  const [usedForm] = Form.useForm();
  const { profileLoader } = useSelector((state) => state.Auth);
  
  const onFinishProfile = values => {
    var data = {
      id: getLocalData('id'),
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email
    }
    dispatch({
      type: actions.ADMIN_EDIT_PROFILE,
      payload: data,
    })
  };

  return ( 
    <Col span={24}  className="inner-content profile-edit" key={'profile_form-col'}>
        <Form
            name="profile_update"
            className="login-form"
            key={'profile_form'}
            onFinish={onFinishProfile}
            initialValues={{
            email: getLocalData('email'),
            firstname: getLocalData('firstname'),
            lastname: getLocalData('lastname'),
            }}
        >
            <Form.Item
            name="firstname"
            rules={[{ required: true, message: 'Please input your firstname!' }]}
            >
            <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Firstname"
            />
            </Form.Item>
            <Form.Item
            name="lastname"
            rules={[{ required: true, message: 'Please input your lastname!' }]}
            >
            <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Lastname" 
            />
            </Form.Item>
            <Form.Item
            name="email"
            rules={[
                {
                required: true,
                message:  'Please enter your email',
                },
                {
                type: 'email',
                message: 'Invalid Email',
                },
            ]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter your email"
            />
            </Form.Item>
            <div className="button-center">
            <Form.Item >
                <Button 
                type="primary" 
                htmlType="submit"
                className="login-form-button save-btn"
                loading={profileLoader}
                disabled={profileLoader}
                >
                Update Profile
                </Button>
            </Form.Item>
            </div>
        </Form>
    </Col>
  );
};
export default Profileupdate;