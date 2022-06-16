import React, { useEffect } from "react";
import { Layout, Input, Form, Select, Button } from "antd";
import { NavLink } from "react-router-dom";
import {
  FacebookFilled,
  GoogleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import "assets/css/login-signup.scss";

const { Content } = Layout;

const { Option } = Select;

const login = (props) => {
  const { onLoginForgot, onFinishLogin, LoginSignup, loader } = props;

  return (
    <>
      <section className="login-dashboard user-login">
        <div className="login-box">
          <NavLink to={"/"} className="back_to_page">
            <CloseOutlined />
          </NavLink>
          <div className="login-box-center">
            <div className="login-headers">
              <div>
                <NavLink to={"/"}>
                  <img
                    src={require("../../assets/img/logo-clolor.png")}
                    alt=""
                  />
                </NavLink>
              </div>

              <h2>Sign in</h2>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinishLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
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
                <NavLink to={"/auth?type=forgot"}>Forgot?</NavLink>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loader}
              >
                Sign In
              </Button>
            </Form>
            <span className="or">&nbsp;</span>
            {/*
                        <span className="or">(OR)</span>
                        <div className="contactsocial">
                            <span className="btns facebook">
                                <FacebookFilled /> Connect with Facebook
                            </span>
                            <span className="btns google">
                                <GoogleOutlined /> Connect with Google
                            </span>
                        </div>
                        */}

            <NavLink to={"/auth?type=signup"} className="new">
              New around here? <span>Sign up</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default login;
