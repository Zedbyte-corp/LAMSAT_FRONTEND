import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Switch,
  Radio,
  Input,
  Form,
  Checkbox,
  Button,
  Card,
  Skeleton,
  message,
  Select,
  Spin,
} from "antd";
import { Country, State, City } from "country-state-city";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber, min, max, mobile_number
} from "react-phone-number-input";
import "assets/css/style.scss";
import "assets/css/login-signup.scss";
import {
  FacebookFilled,
  GoogleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getLocaleMessages } from "redux/helper";
import addressActions from "redux/admin/address/actions";
import { store } from "redux/store";

const { Content } = Layout;

const { Option } = Select;
const Countries = Country.getAllCountries();
const Signup = (props) => {
 
  const {
    visible,
    onFinish,
    onCancel,
    LoginSignup,
    loader,
    userCountryList,
    userCityList,
    loading,
  } = props;
  
  const getCountryId = (val) => {
    store.dispatch({
      type: addressActions.GET_USER_CITY_LIST,
      countryid: val,
    });
  };

  const selectCountry = (val) => {
    console.log(`selected country ${val}`);
    if(val) {
      let con = Countries.filter((itm) => itm.name === val);
      let ci = City.getCitiesOfCountry(con[0].isoCode);
    }
  };
  const [phvalue, setPhvalue] = useState(null);
  return (
    <>
      <section className="login-dashboard signup-dashboard">
        <div className="login-box">
          <NavLink to={"/"} className="back_to_page">
            <CloseOutlined />
          </NavLink>
          <Spin size="large" spinning={loading}>
            <div className="login-headers">
              <div>
                <NavLink to={"/"}>
                  <img
                    src={require("../../assets/img/logo-clolor.png")}
                    alt=""
                  />
                </NavLink>
              </div>

              <h2>Sign up</h2>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
              initialValues={{
                mobile_number: {
                  countrycode: "+966",
                },
              }}
            >
              <Form.Item
                name="firstname"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your First Name!",
                  },
                  {
                    pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                    message: "You can't use number here!",
                  },
                  // { min: 5, message: 'First Name must be minimum 5 characters.' },
                ]}
              >
                <Input
                  placeholder={getLocaleMessages({
                    id: "placeholder.firstName",
                  })}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your Last Name!",
                  },
                  {
                    pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                    message: "You can't use number here!",
                  },
                ]}
              >
                <Input
                  placeholder={getLocaleMessages({
                    id: "placeholder.lastName",
                  })}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    whitespace: true,
                    message: "Invalid email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Input.Group compact>
                <Form.Item
                  name={"phonenumber"}
                  rules={[
                    {
                      required: true,
                      message: "Contact number is required",
                    },
                    {
                      min: 6,
                      message: "Contact number should be minimum 6 digits.",
                    },
                    {
                      max: 13,
                      message: "Contact number should be maximum 13 digits.",
                    },
                  ]}
                >
                  <PhoneInput
                    international
                    placeholder="Enter phone number"
                    countryCallingCodeEditable={true}
                    defaultCountry="SA"
                    value={phvalue}
                    onChange={setPhvalue}
                    error={phvalue ? (isValidPhoneNumber(phvalue) ? undefined : 'Invalid phone number') : 'Phone number required'}
                  />
                </Form.Item>
              </Input.Group>

              <Form.Item
                name={"usercountryname"}
                rules={[{ required: true, message: "Country is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  autoComplete={"off"}
                  placeholder={"Please select the country"}
                  dropdownStyle={{ minWidth: "200px" }}
                  onChange={selectCountry}
                >
                  {Countries &&
                    Countries.length &&
                    Countries.map((item, index) => {
                      return (
                        <Select.Option value={item.name} key={index}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your Password!",
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
                <Input.Password type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
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
              <Form.Item
                className="terms-conditions"
                name="remember"
                valuePropName="checked"
                validateTrigger={["onSubmit"]}
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            "Please accept the terms & conditions!"
                          ),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the &nbsp;
                  <a
                    className="login-form-forgot"
                    href="/cmspage/28"
                    target="_blank"
                  >
                    Terms &amp; Conditions
                  </a>
                </Checkbox>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loader}
              >
                Sign Up
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
            <NavLink to={"/auth?type=login"} className="new">
              Already have an account? <span>Sign in</span>
            </NavLink>{" "}
            <div className="become-partner">
              <h2>Become a partner</h2>

              <NavLink to={"/partner-register"} className="new">
                Manage your business with Lamsat by{" "}
                <span> signing up as a professional</span>{" "}
              </NavLink>
            </div>
          </Spin>
        </div>
      </section>
    </>
  );
};

export default Signup;
