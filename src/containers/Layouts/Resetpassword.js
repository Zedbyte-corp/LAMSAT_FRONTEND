import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";

import {
  Layout,
  Form,
  Select,
  message,
  Button,
  Input,
  Spin,
} from "antd";
import "assets/css/style.scss";
import "assets/css/listing.scss";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/auth/actions";

const { Content } = Layout;

const EmailVerification = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [ID, setID] = useState();
  const [loader, setloader] = useState(false);
  const urlParams = useParams();

  const handleChangePassword = (values) => {
    setloader(true);
    if(urlParams.id)
    {
      const payload = {
          password: values.confirmpassword,
          userkey: urlParams.id
      }
      dispatch({
          type: actions.RESET_FORGOT_PASSWORD,
          payload: payload,
          callBackAction: (status) => {
            setloader(false);
            if(status === true)
            {
              props.history.push("/auth?type=login");
            }
          }
      });
    } else {
      setloader(false);
      message.error("Invalid user");
    }

  };

  return (
    <>
      <Layout className={"on-boarding"}>

        <Content>
          <section className="email_vefied">
            <div className="container">
            <div className="box">
            <div className="logo">
            <img
                src={require("../../assets/img/logo-clolor.png")}
                alt=""
            />
            </div>
            {/* <div className="modal-body-ui"> */}
              <h2>Reset Password</h2>

              <Form
                form={form}
                name="control-ref"
                onFinish={handleChangePassword}
              >
                <Form.Item
                  style={{ width: "100%" }}
                  name="newpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input password",
                    },
                    {
                        min: 6,
                        message: "Password must be minimum 6 characters.",
                      },
                      {
                        max: 16,
                        message: "Password can be maximum 16 characters.",
                      },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item
                  style={{ width: "100%" }}
                  name="confirmpassword"
                  dependencies={["newpassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input password",
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
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <br />
                <div className="ant-form-item">
                  <Button
                    className="btn btn-primary"
                    type="primary"
                    htmlType="submit"
                    disabled={loader}
                    loading={loader}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            {/* </div> */}


            {/* <NavLink to={"/"} className="btn btn-primary">
                Back to Home
            </NavLink> */}
            </div>
            </div>
          </section>
        </Content>
      </Layout>
    </>
  );
};

export default EmailVerification;
