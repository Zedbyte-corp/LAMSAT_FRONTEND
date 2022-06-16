import React, { useEffect } from "react";
import { Form, Input, Button, Col, Spin } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import "assets/css/dashboard.scss";
import actions from "redux/auth/actions";

const AdminChangePassword = () => {
  const dispatch = useDispatch();
  const [usedForm] = Form.useForm();
  const { passwordLoader } = useSelector((state) => state.Auth);

  const onFinish = (values) => {
    dispatch({
      type: actions.ADMIN_CHANGE_PASSWORD,
      payload: values,
    });
  };

  useEffect(() => {
    usedForm.resetFields();
  }, [usedForm, passwordLoader]);

  return (
    <Col
      span={24}
      className="inner-content profile-edit"
      key={"password_form-col"}
    >
      <Spin spinning={passwordLoader}>
        <Form
          name="password_update"
          className="login-form"
          onFinish={onFinish}
          key={"password_form"}
          form={usedForm}
        >
          <Form.Item
            name="oldpassword"
            key="oldpassword"
            rules={[
              { required: true, message: "Please input your old Password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Old Password"
            />
          </Form.Item>
          <Form.Item
            name="newpassword"
            key="newpassword"
            rules={[
              { required: true, message: "Please input your New Password!" },
              {
                min: 4,
                message: "Password should be minimum 4 digits.",
              },
              {
                max: 15,
                message: "Password should be maximum 15 digits.",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            key="confirmpassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
              {
                min: 4,
                message: "Password should be minimum 4 digits.",
              },
              {
                max: 15,
                message: "Password should be maximum 15 digits.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newpassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <div className="button-center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button save-btn"
                loading={passwordLoader}
                disabled={passwordLoader}
              >
                Update Password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Col>
  );
};

export default AdminChangePassword;
