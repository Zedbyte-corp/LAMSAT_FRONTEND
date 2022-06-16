import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layout,
  Button,
  Menu,
  Modal,
  Dropdown,
  Input,
  message,
  Select,
} from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/auth/actions";
// import InjectMessage from "components/utility/intlMessages";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import "assets/css/header.scss";
import "assets/css/modal.scss";
import "assets/css/responsive.scss";
import { getLocalDataType, getLocalData } from "redux/helper";
import { history, store } from "redux/store";
import LoginPage from "containers/Layouts/login";
import SignupPage from "containers/Layouts/signup";
import ForgotModal from "containers/Layouts/ForgotModal";
import ForgotPassword from "containers/Layouts/ForgotPassword";
import ForgotPasswordConfirmed from "containers/Layouts/ForgotPasswordConfirmed";
import OTP from "containers/Layouts/OTP";

import addressActions from "redux/admin/address/actions";
import {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import Countdown, { zeroPad } from "react-countdown";
import { Form } from "antd";

const Auth = (props) => {
  const {
    subLang,
    loader,
    isLoggedIn,
    isOtp,
    userSignupData,
    getAppLanguageList,
    selectedLanguage,
    languageLoader,
    auth_signup_success,
  } = useSelector((state) => state.Auth);
  console.log("props", props);
  console.log("userSignupData: " + JSON.stringify(userSignupData));

  const dispatch = useDispatch();
  const { userCityList, userCountryList, loading } = useSelector(
    (state) => state.Address
  );
  const [page, setPage] = useState("");
  const [isForgotVisible, setIsForgotVisible] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(isOtp);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otptext, setotptext] = useState(true);
  const [OTPdata, setOTPdata] = useState("");
  const location = useLocation();
  const lastPath = localStorage.getItem("lastpath");
  const referer = location.state && location.state.referer;

  const clockRef = useRef();
  const handleStart = () => clockRef.current?.start();
  const handlePause = () => clockRef.current?.pause();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const windowUrl = props.location.search;
    const params = new URLSearchParams(windowUrl).get("type");
    setPage(params);
    store.dispatch({
      type: addressActions.GET_USER_COUNTRY_LIST,
    });
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    setIsOtpVisible(isOtp);
    setIsResendDisabled(true);
    handleStart();
  }, [isOtp]);

  console.log("isOtp 1: " + isOtp);
  console.log("isOtp 2: " + isOtpVisible);

  const fOk = () => {
    setIsForgotVisible(false);
  };

  const onFinish = (values) => {
    let loginData = {
      email: values.email,
      password: values.password,
    };
    localStorage.setItem("loginData", JSON.stringify(loginData));

    var countryCode = "";
    if (
      values.phonenumber !== undefined &&
      typeof values.phonenumber !== undefined &&
      parsePhoneNumber(values.phonenumber) !== undefined &&
      typeof parsePhoneNumber(values.phonenumber) !== undefined
    ) {
      const countryCode1 = parsePhoneNumber(values.phonenumber);
      countryCode = countryCode1.countryCallingCode;
    }

    values["countrycode"] = countryCode;
    values["contactnumber"] = values.phonenumber;
    values["confirmpassword"] = values.password;
    values["cityid"] = 1;
    values["countryid"] = 1;
    values["usercountryname"] = values.usercountryname;
    console.log("values", values);
    setotptext(true);
    dispatch({
      type: actions.CREATE_AUTHENTICATE_USER,
      payload: values,
    });
  };
  const onFinishLogin = (values) => {
    dispatch({
      type: actions.AUTHENTICATE_USER,
      payload: values,
    });
  };
  const otpOk = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to cancel the otp verification?",
      okText: "ok",
      cancelText: "cancel",
      maskClosable: true,
      mask: true,
      onOk: () => {
        setIsOtpVisible(false);
        setIsResendDisabled(true);
        form.resetFields();
        /*
            dispatch({
              type: actions.VERIFY_OTP_SUCCESS,
              type: actions.AUTH_REMOVE_OTP,
            });
            */
      },
    });
  };

  const onFinishForgot = (values) => {
    dispatch({
      type: actions.SEND_PASSWORD_RESET_LINK,
      payload: values,
      callBackAction: () => {
        setPage("confirm");
        //Reset password email sent successfully. Please check your mail.

        LoginForgot({
          login: true,
          forgot: false,
        });
      },
    });
  };

  const LoginForgot = ({ login, forgot }) => {
    if (forgot) {
      setIsForgotVisible(forgot);
    } else if (login) {
      setIsForgotVisible(forgot);
    }
  };

  const onResendOTP = () => {
    setotptext(false);
    dispatch({
      type: actions.RESEND_OTP,
      payload: {
        contactnumber: userSignupData.contactnumber,
        countrycode: userSignupData.countrycode,
      },
      callBackAction: (status) => {
        isOtpVisible(true);
      },
    });
  };

  const onFinishOTP = (values) => {
    console.log("otp_data:", values.otp);

    dispatch({
      type: actions.VERIFY_OTP,
      payload: {
        contactnumber: userSignupData.contactnumber,
        otp: values.otp,
      },
      callBackAction: (status) => {
        props.history.push("/");
      },
    });
  };

  function handleChange(value) {}
  const onChangeOTP = (value) => {
    setOTPdata(value);
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setIsResendDisabled(false);
      return "00:00";
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  return (
    <div>
      {(() => {
        if (page == "login") {
          return (
            <LoginPage
              onLoginForgot={LoginForgot}
              onFinishLogin={onFinishLogin}
              loader={loader}
            />
          );
        } else if (page == "signup") {
          return (
            <SignupPage
              userCountryList={userCountryList}
              userCityList={userCityList}
              loading={loading}
              onFinish={onFinish}
            />
          );
        } else if (page == "forgot") {
          return (
            <ForgotPassword
              onFinish={onFinishForgot}
              onLoginForgot={LoginForgot}
              loader={loader}
            />
          );
        } else {
          return <ForgotPasswordConfirmed />;
        }
      })()}

      <ForgotModal
        visible={isForgotVisible}
        onCancel={fOk}
        onFinish={onFinishForgot}
        onLoginForgot={LoginForgot}
        loader={loader}
      />

      <Modal
        title={false}
        visible={isOtpVisible}
        onCancel={otpOk}
        centered
        footer={false}
        className="modal-ui-1 modal-otp"
        width="100%"
        destroyOnClose
      >
        <div className="modal-body-ui">
          <h2>OTP Verification</h2>
          <p className="sub">
            Enter the OTP you received to <br />{" "}
            {userSignupData ? userSignupData.contactnumber : ""}
          </p>

          <Form form={form} name="control-ref" onFinish={onFinishOTP}>
            <Form.Item
              style={{ width: "100%" }}
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please input OTP",
                },
              ]}
            >
              <Input placeholder="please enter valid OTP" />
            </Form.Item>
            <div className="ant-form-item">
              <Button
                type="primary"
                htmlType="submit"
                disabled={loader}
                loading={loader}
              >
                Submit
              </Button>
            </div>
          </Form>
          {/**<OTP OTPdata={OTPdata} onChangeOTP={onChangeOTP} /> */}

          <p style={{ textAlign: "center" }}>
            {otptext &&
            <>
            Please wait for&nbsp;
            <Countdown
              ref={clockRef}
              autoStart={true}
              date={Date.now() + 60 * 1000}
              renderer={renderer}
            />{" "}
            to resend the OTP
            </>
              }
            <Button
              className="resend_otp"
              disabled={isResendDisabled}
              loading={loader}
              type="link"
              onClick={onResendOTP}
            >
              Resend OTP
            </Button>
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default Auth;
