import React from 'react';
import { Modal, Input, Form, Button, Layout, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import 'assets/css/login-signup.scss';

const { Content } = Layout;

const { Option } = Select;

const ForgotPasswordConfirmed = (props) => {
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

                            <h3>Reset email sent.</h3>
                            <h3>Please check your inbox.</h3>
                        </div>

                        <div className="text-right forgotLink">
                            <div>
                                <NavLink to={'/auth?type=login'}>
                                    <span>Back to login</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ForgotPasswordConfirmed;