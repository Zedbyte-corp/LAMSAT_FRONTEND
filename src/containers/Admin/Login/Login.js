import React, { useEffect } from "react";
import { Layout, Button, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import actions from "redux/auth/actions";
import "assets/css/style.scss";
import "assets/css/login-signup.scss";
import { formProps } from "containers/OnBoarding/constant";
import { history } from "redux/store";
import authAction from "redux/auth/actions";
import { getLocaleMessages } from "redux/helper";
import { CloseOutlined } from "@ant-design/icons";
import OneSignal from "react-onesignal";

const { Content } = Layout;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [usedForm] = Form.useForm();
  const { loader, isAdminForgot } = useSelector((state) => state.Auth);

  const onLogin = (values) => {
    if (history.location.pathname === "/admin/login") {
      dispatch({
        type: actions.ADMIN_AUTHENTICATE_USER,
        payload: values,
      });
    } else if (history.location.pathname === "/vendor/login") {
      // console.log("this is the value of the vendor panel", values);
      // return;
      dispatch({
        type: actions.VENDOR_AUTHENTICATE_USER,
        payload: values,
      });
    }
  };

  const onForgot = (values) => {
    if (history.location.pathname === "/admin/login") {
      dispatch({
        type: actions.ADMIN_SEND_PASSWORD_RESET_LINK,
        payload: values,
      });
    } else if (history.location.pathname === "/vendor/login") {
      dispatch({
        type: actions.VENDOR_SEND_PASSWORD_RESET_LINK,
        payload: values,
      });
    }
  };

  const onChangeForgot = () => {
    dispatch({
      type: authAction.SET_SHOW_ADMIN_FORGOT,
      payload: true,
    });
  };

  const onChangeLogin = () => {
    dispatch({
      type: authAction.SET_SHOW_ADMIN_FORGOT,
      payload: false,
    });
  };

  useEffect(() => {
    OneSignal.init({
      appId: "8a4836b3-ad5f-4c44-9204-14e80c138099",
    });
  }, []);

  useEffect(() => {
    usedForm.resetFields();
  }, [isAdminForgot, usedForm]);

  return (
    <>
      <section className="login-dashboard admin-login">
        <div className="login-box">
          <NavLink to={"/"} className="back_to_page">
            <CloseOutlined />
          </NavLink>
          <div className="login-box-center">
            <div className="login-headers">
              <div>
                <NavLink to={"/"}>
                  <img
                    src={require("../../../assets/img/logo-clolor.png")}
                    alt=""
                  />
                </NavLink>
              </div>
            </div>

            <Form
              form={usedForm}
              onFinish={isAdminForgot ? onForgot : onLogin}
              {...formProps}
            >
              {isAdminForgot ? (
                <>
                  <h2>Forgot Password</h2>
                  <Form.Item
                    name={"email"}
                    validateTrigger={"onBlur"}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: "errorMessage.email",
                          localeLanguage: "en",
                        }),
                      },
                      {
                        type: "email",
                        message: getLocaleMessages({
                          id: "errorMessage.invalidEmail",
                          localeLanguage: "en",
                        }),
                      },
                    ]}
                  >
                    <Input
                      placeholder={getLocaleMessages({
                        id: "placeholder.email",
                        localeLanguage: "en",
                      })}
                      autoComplete={"off"}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <h2>Sign In</h2>
                  <Form.Item
                    name={"username"}
                    validateTrigger={"onBlur"}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          history.location.pathname === "/admin/login"
                            ? "Please Enter Email"
                            : "Please Enter Username",
                      },
                    ]}
                  >
                    <Input
                      placeholder={
                        history.location.pathname === "/admin/login"
                          ? getLocaleMessages({
                              id: "placeholder.email",
                              localeLanguage: "en",
                            })
                          : getLocaleMessages({
                              id: "placeholder.UserName",
                              localeLanguage: "en",
                            })
                      }
                      autoComplete={"off"}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please Enter Password", //(
                        // <>
                        //   {getLocaleMessages({
                        //     id: "errorMessage.invalidPassword",
                        //     localeLanguage: "en",
                        //   })}
                        // </>
                        // ),
                      },
                      {
                        min: 4,
                        message: "Password should be minimum 4 digits.",
                      },
                      {
                        max: 15,
                        message: "Password should be maximum 15 digits.",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={getLocaleMessages({
                        id: "placeholder.password",
                        localeLanguage: "en",
                      })}
                    />
                  </Form.Item>
                </>
              )}
              <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <span
                  onClick={() =>
                    isAdminForgot ? onChangeLogin() : onChangeForgot()
                  }
                  style={{ cursor: "pointer" }}
                >
                  {isAdminForgot
                    ? getLocaleMessages({
                        id: "label.backToLogin",
                        localeLanguage: "en",
                      })
                    : getLocaleMessages({
                        id: "label.forgotPassword",
                        localeLanguage: "en",
                      })}
                </span>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  disabled={loader}
                >
                  {getLocaleMessages({
                    id: "label.submit",
                    localeLanguage: "en",
                  })}
                </Button>
              </Form.Item>
              {history.location.pathname === "/vendor/login" && (
                <div className="become-partner">
                  <h2>Become a partner</h2>
                  <NavLink to={"/partner-register"} className="new">
                    Manage your business with Lamsat by{" "}
                    <span> signing up as a professional</span>{" "}
                  </NavLink>
                </div>
              )}
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
