import React from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { FacebookFilled, GoogleOutlined   } from '@ant-design/icons';

const SigninModal = (props)=>{
    const { visible, onOk, onCancel, onLoginForgot, onFinish,LoginSignup, loader } = props;
    return (
        <Modal 
            title={false} 
            visible={visible} 
            onOk={onOk} 
            onCancel={onCancel} 
            centered 
            footer={false} 
            className="modal-ui-1" 
            width="100%"
            destroyOnClose
        >
            <div className="modal-body-ui">
                <h2>Sign in</h2>
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
                            whitespace: true,
                            message: "Please input your email / mobile no!",
                        },
                        ]}
                    >
                        <Input placeholder="Email / Mobile No" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input your Password!",
                        },
                        ]}
                    >
                        <Input.Password type="password" placeholder="Password" />
                    </Form.Item>
                    <div className="text-right forgotLink">
                        <div onClick={()=>loader ? '' : onLoginForgot({ login: false, forgot: true})}>Forgot?</div>
                    </div>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={loader}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <span className="or">(OR)</span>
                <div className="contactsocial">
                    <span className="btns"><FacebookFilled /></span>
                    <span className="btns"><GoogleOutlined /></span>
                </div>
                <p className="new">New around here? <span onClick={()=>loader? '':LoginSignup({login:false,signup:true})}>Sign up</span> </p>
            </div>
        </Modal>
    )
}

export default SigninModal;