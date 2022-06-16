import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import {
  Layout,
  Input,
  Modal,
  Button,
  Avatar,
  Form,
  Upload,
  message,
} from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import { UserOutlined, FileImageOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import UploadImage from "react-images-upload";
import actions from "redux/UserDetail/actions";
import { getLocalData } from "redux/helper";
import { store } from "redux/store";
import CommonHeader from "./CommonHeader";
import "assets/css/style.scss";
import "assets/css/myaccount.scss";

const { Content } = Layout;

const EditProfile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const {
    editProfileLoader,
    editProfileSuccess,
    imageUploadLoader,
    userPasswordLoader,
    userPasswordSuccess,
  } = useSelector((state) => state.UserProfile);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPreviews] = useState(true);
  const [usedForm] = Form.useForm();
  const [localImage, LocalImageFunc] = useState([]);
  const [imgurl, setimgurl] = useState([]);
  const [imgname, setimgname] = useState();
  const [dummpyimg, setdummpyimg] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };
  const [form] = Form.useForm();
  console.log("veriiiii: " + getLocalData("isverifiedemail"));
  const updatedPassword = (values) => {
    dispatch({
      type: actions.UPDATE_PASSWORD,
      payload: {
        ...values,
        id: getLocalData("id"),
      },
    });
    form.resetFields();
  };

  const handleCancel = () => {
    if (!userPasswordLoader) {
      form.resetFields();
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    if (editProfileSuccess) {
      store.dispatch({
        type: actions.SET_EDIT_PROFILE_SUCCESS,
        payload: false,
      });
      usedForm.resetFields();
    }
  }, [editProfileSuccess, usedForm]);

  useEffect(() => {
    if (userPasswordSuccess) {
      store.dispatch({
        type: actions.SET_UPDATE_PASSWORD_SUCCESS,
        payload: false,
      });
      setIsModalVisible(false);
    }
  }, [userPasswordSuccess]);

  const onFinish = (values) => {
    if (imgurl.length) {
      let siteparam = new FormData();
      siteparam.set("files", imgurl[0], imgname);
      dispatch({
        type: actions.UPLOAD_IMAGE,
        payload: siteparam,
        callBackAction: (photopath_link, image_url) => {
          setimgurl([]);
          setimgname("");
          dispatch({
            type: actions.EDIT_PROFILE,
            payload: {
              id: getLocalData("id"),
              devicetoken: "web token",
              devicetype: "web type",
              ...values,
              photopath: photopath_link,
              image_url: image_url,
            },
          });
        },
      });
    } else {
      dispatch({
        type: actions.EDIT_PROFILE,
        payload: {
          id: getLocalData("id"),
          devicetoken: "web token",
          devicetype: "web type",
          ...values,
          photopath: getLocalData("photopath"),
          image_url: getLocalData("image_url"),
        },
      });
      setdummpyimg("");
    }
  };

  const props = {
    // name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file) {
        setimgurl([info.file.originFileObj]);
        setimgname(info.file.name);
        let siteparam = new FormData();
        siteparam.set("files", info.file.originFileObj, info.file.name);
        dispatch({
          type: actions.UPLOAD_IMAGE,
          payload: siteparam,
          callBackAction: (photopath_link, image_url) => {
            setdummpyimg(image_url)
          },
        });
      }
      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-1000">
              {/*Profile*/}
              <CommonHeader selectedKey={"editprofile"} />
              {/*Profile*/}
              <div className="main-box-account text-center">
                <div className="mba-editprofile">
                  {/* <Avatar size={64} icon={<UserOutlined />} src={`${process.env.REACT_APP_IMAGE_URL}${getLocalData('photopath')}`} /> */}
                  <Upload {...props} maxCount={1} className="upload_image">
                    <Avatar
                      size={75}
                      icon={<FileImageOutlined />}
                      src={dummpyimg != "" ? dummpyimg :`${getLocalData("image_url")}`}
                    />
                  </Upload>

                  <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                    form={usedForm}
                    initialValues={{
                      firstname: getLocalData("firstname"),
                      lastname: getLocalData("lastname"),
                      email: getLocalData("email"),
                      contactnumber: getLocalData("contactnumber"),
                    }}
                  >
                    <Form.Item
                      name="firstname"
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "First Name is required",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      name="lastname"
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Last Name is required",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="E-mail"
                      rules={[
                        {
                          required: true,
                          message: "Email is required",
                        },
                        {
                          type: "email",
                          message: "Invalid email",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                      {/** 
                      {getLocalData("isverifiedemail") === 1
                        ? ""
                      : "Please verify the email id."} */}
                    </Form.Item>
                    <Form.Item
                      name="contactnumber"
                      label="Mobile Number"
                      validateTrigger={["onBlur"]}
                      disabled
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Mobile number is required",
                        },
                        {
                          type: "text",
                          validator: (_, value) => {
                            let newPhoneNumber = value.trim().replace("+", "");
                            if (newPhoneNumber.length) {
                              const reg = /^-?\d*(\.\d*)?$/;
                              if (reg.test(newPhoneNumber)) {
                                if (
                                  newPhoneNumber.length >= 6 &&
                                  newPhoneNumber.length <= 15
                                ) {
                                  return Promise.resolve();
                                } else {
                                  return Promise.reject(
                                    "Phone number must be greater than 6 and less than or equal to 12 characters"
                                  );
                                }
                              } else {
                                return Promise.reject("Only numbers allowed");
                              }
                            } else {
                              return Promise.resolve();
                            }
                          },
                        },
                      ]}
                    >
                      <Input disabled placeholder="Phone Number" />
                    </Form.Item>
                    {/* <Form.Item name="photopath">
                      <UploadImage
                        withPreview={showPreviews}
                        images={localImage.length ? localImage : []}
                        singleImage={true}
                      />
                    </Form.Item> */}

                    {/*
                    <Form.Item
                      name="Password"
                      label="Password"
                      rules={[
                        {
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                      name="confirmpassword"
                      label="Confirm password"
                      rules={[
                        {
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input type="password" placeholder="Confirm password" />
                    </Form.Item>
                    */}

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={editProfileLoader || imageUploadLoader}
                        loading={editProfileLoader || imageUploadLoader}
                      >
                        Update Profile
                      </Button>
                    </Form.Item>
                  </Form>
                  <div className="text-center mt-30">
                    <Button type="link" onClick={showModal}>
                      Change Password?
                    </Button>
                  </div>
                </div>
              </div>
              {/*Profile*/}
            </div>
          </section>
          <Modal
            title="Change Password"
            visible={isModalVisible}
            onCancel={handleCancel}
            // centered
            footer={false}
            className="ant_changepassword"
            width={450}
            // destroyOnClose
          >
            <div className="modal-body-ui">
              <Form layout="vertical" form={form} onFinish={updatedPassword}>
                <Form.Item
                  label="Old Password"
                  name="oldpassword"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Old Password is required",
                    },
                    {
                      min: 6,
                      message: "Password length should be minimum 6 characters",
                    },
                    {
                      max: 16,
                      message:
                        "New password length should be maximum 16 characters",
                    },
                  ]}
                >
                  <Input.Password type="password" placeholder="Old Password" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newpassword"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "New Password is required",
                    },
                    {
                      min: 6,
                      message:
                        "New password length should be minimum 6 characters",
                    },
                    {
                      max: 16,
                      message:
                        "New password length should be maximum 16 characters",
                    },
                  ]}
                >
                  <Input.Password type="password" placeholder="New Password" />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmpassword"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Confirm Password is required",
                    },
                    {
                      min: 6,
                      message:
                        "Confirm password length should be minimum 6 characters",
                    },
                    {
                      max: 16,
                      message:
                        "Confirm password length should be maximum 16 characters",
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={userPasswordLoader}
                    loading={userPasswordLoader}
                  >
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default EditProfile;
