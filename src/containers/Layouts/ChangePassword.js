import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Layout, Input, Modal, Button, Avatar, Form } from 'antd';
import Header from 'containers/Layouts/Header';
import Footer from 'containers/Layouts/Footer';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from 'react-images-upload';
import actions from 'redux/UserDetail/actions';
import { getLocalData } from 'redux/helper';
import { store } from 'redux/store';
import CommonHeader from './CommonHeader';
import 'assets/css/style.scss';
import 'assets/css/myaccount.scss';

const { Content } = Layout;

const ChangePassword = () => {
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const updatedPassword = (values) => {
    dispatch({
      type: actions.UPDATE_PASSWORD,
      payload: {
        ...values,
        id: getLocalData('id'),
      },
    });
  };

  const handleCancel = () => {
    if (!userPasswordLoader) {
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
    if (values.photopath) {
      let siteparam = new FormData();
      siteparam.set('files', values.photopath[0], values.photopath[0].name);
      dispatch({
        type: actions.UPLOAD_IMAGE,
        payload: siteparam,
        callBackAction: (photopath_link, image_url) => {
          dispatch({
            type: actions.EDIT_PROFILE,
            payload: {
              id: getLocalData('id'),
              devicetoken: 'web token',
              devicetype: 'web type',
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
          id: getLocalData('id'),
          devicetoken: 'web token',
          devicetype: 'web type',
          ...values,
          photopath: getLocalData('photopath'),
        },
      });
    }
  };

  return (
    <>
      <Layout className={'on-boarding'}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-1000">
              {/*Profile*/}
              <CommonHeader selectedKey={'changepassword'} />
              {/*Profile*/}
              <div className="main-box-account text-center">
                <div className="mba-editprofile">
                  <Form form={usedForm} onFinish={updatedPassword}>
                    <Form.Item
                      name="oldpassword"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Old Password is required',
                        },
                        {
                          min: 6,
                          message: 'Password length should be minimum 6 characters',
                        },
                        {
                          max: 16,
                          message:
                            'New password length should be maximum 16 characters',
                        },
                      ]}
                    >
                      <Input.Password placeholder="Old Password" />
                    </Form.Item>
                    <Form.Item
                      name="newpassword"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'New Password is required',
                        },
                        {
                          min: 6,
                          message:
                            'New password length should be minimum 6 characters',
                        },
                        {
                          max: 16,
                          message:
                            'New password length should be maximum 16 characters',
                        },
                      ]}
                    >
                      <Input.Password placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                      name="confirmpassword"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Confirm Password is required',
                        },
                        {
                          min: 6,
                          message:
                            'Confirm password length should be minimum 6 characters',
                        },
                        {
                          max: 16,
                          message:
                            'Confirm password length should be maximum 16 characters',
                        },
                      ]}
                    >
                      <Input.Password placeholder="Confirm Password" />
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
              </div>
              {/*Profile*/}
            </div>
          </section>
          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default ChangePassword;
