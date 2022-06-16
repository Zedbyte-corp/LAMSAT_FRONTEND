import React from 'react';
import { Modal, Input, Form, Button, Layout, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import 'assets/css/login-signup.scss';

const { Content } = Layout;

const { Option } = Select;

const ForgotPassword = (props) => {
    const { onLoginForgot, onFinish, loader } = props;
    return (
        <>
            <section className="login-dashboard">
                <div className="login-box">
                    <NavLink to={'/'} className="back_to_page">
                        <CloseOutlined />
                    </NavLink>
                    <div className="login-box-center">
                        <div className="login-headers">
                            <div>
                                <NavLink to={'/'}>
                                    <img
                                        src={require('../../assets/img/logo-clolor.png')}
                                        alt=""
                                    />
                                </NavLink>
                            </div>

                            <h2>Forgot Password?</h2>
                        </div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Invalid email',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your email id" />
                            </Form.Item>
                            <div className="text-right forgotLink">
                                <div>
                                    <NavLink to={'/auth?type=login'}>
                                        <span>Back to login</span>
                                    </NavLink>
                                </div>
                            </div>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    loading={loader}
                                    disabled={loader}
                                >
                                    Reset Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ForgotPassword;
