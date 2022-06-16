import React from 'react';
import { Modal, Input, Form, Button } from 'antd';

const ForgotModal = (props)=>{
    const { visible, onCancel, onLoginForgot, onFinish, loader } = props;
    return (
        <Modal 
            title={false} 
            visible={visible} 
            onCancel={onCancel} 
            centered 
            footer={false} 
            className="modal-ui-1" 
            width="100%"
            destroyOnClose
        >
         <div className="modal-body-ui">
            <h2>Forgot Password</h2>
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
                            message: "Please input your email",
                        },
                        {
                            type: 'email',
                            message: "Invalid email",
                        }
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <div className="text-right forgotLink">
                    <div onClick={()=>onLoginForgot({ login: true, forgot: false})}>Back to login</div>
                </div>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loader}
                        disabled={loader}
                    >
                        Forgot Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Modal>
    )
}

export default ForgotModal;