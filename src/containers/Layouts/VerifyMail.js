import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, Button, Layout, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom';
import actions from 'redux/auth/actions';
import { history, store } from "redux/store";

import 'assets/css/login-signup.scss';

const { Content } = Layout;

const { Option } = Select;

const VerifyMail = (props) => {
    const { emailverificationkey } = useParams();
    const { onLoginForgot, onFinish, loader } = props;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        store.dispatch({
            type: actions.VERIFY_MAILID,
            emailverificationkey: emailverificationkey,
            callBackAction: () => {
                setShowSuccessMessage(true);
                console.log("sssssssssssssssssssssssss");
            },
        });
    }, []);

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

                            {!showSuccessMessage ? (
                                <>
                                    <h2>Verifying mail id.</h2>
                                    <h4>Please wait...</h4>
                                </>) : (<></>)}
                            {showSuccessMessage ? (
                                <>
                                    <h2>Thanks for verifying successfully.</h2>
                                </>) : (<></>)}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default VerifyMail;
