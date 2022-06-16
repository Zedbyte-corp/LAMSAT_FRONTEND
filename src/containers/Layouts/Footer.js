import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  Form,
  Select,
  Checkbox,
  Spin,
  message,
  BackTop,
} from 'antd';
import { NavLink } from 'react-router-dom';
import 'assets/css/footer.scss';
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  MobileOutlined,
  MessageOutlined,
  FacebookOutlined,
  GooglePlusOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { store } from 'redux/store';
import actions from 'redux/Layout/actions';
import {
  getLocalData,
  getLocaleMessages,
  getLocalDataType,
  checkValid,
} from 'redux/helper';

const CommonFooter = (props) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const { LayoutData, social_media, social_status, cmsList } = useSelector(
    (state) => state.Layouts
  );
  const { isLoggedIn } = useSelector((state) => state.Auth);
  //const { isSettingpage, social_media, social_status} = useSelector((state) => state.AppSettings);
  useEffect(() => {
    if (social_status) {
      store.dispatch({
        type: actions.GET_FOOTER_DETAILS,
      });

      // store.dispatch({
      //   type: actions.GET_CMS_DETAILS,
      // })
    }
  }, [social_media]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    store.dispatch({
      type: actions.SAVE_ENQUIRY,
      payload: values,
      userid:
        isLoggedIn && getLocalDataType() === 'user'
          ? parseInt(getLocalData('id'))
          : '',

      callBackAction1: (status) => {
        if (status == 200) {
          message.success(
            getLocaleMessages({ id: 'Enquiry Send Successfully!' })
          );
          setIsModalVisible(false);
        }
      },
    });
  };

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: false, message: 'Select Country code!' }]}
    >
      <Select
        defaultValue="966"
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <BackTop />

          {/*
          <div className="logo">
                    <NavLink to={{pathname: '/'}}><img src={require("../../assets/img/logo.png")} alt="" className="img-fluid" /></NavLink>
          </div>
          */}

          <div className="footer-top">
            <Row gutter="15">
              <Col sm={12} md={12}>
                <h4>About</h4>
                {/*  <a><img
                src={require("../../assets/img/logo.png")}
                alt=""
                className="img-fluid"
              /></a>*/}
                <p className="desc">
                  Lamasat is an easy and fast-to-use platform dedicated to
                  booking salon and spa appointments for ladies and children via
                  the Internet, which saves the site user effort and time by
                  ensuring the time and date of reservation and provides them
                  with the ability to see all the required service providers,
                  compare prices and know their locations.
                </p>
              </Col>
              <Col sm={12} md={6}>
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <NavLink to={{ pathname: '/partner-register' }}>
                      Partners
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={{ pathname: '/faq' }}>FAQs</NavLink>
                  </li>
                  <li>
                    {' '}
                    <a onClick={showModal}>
                      {/* {getLocaleMessages({ id: "Enquiry now" })} */}
                      Contact us
                    </a>
                  </li>
                  {cmsList &&
                    cmsList.length > 0 &&
                    cmsList.map((option, id) => {
                      return (
                        <li key={option.id}>
                          <a href={'/cmspage/' + option.id}>
                            {option.pagetitle}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </Col>
              <Col sm={12} md={6}>
                <h4>{getLocaleMessages({ id: 'Social Networks' })}</h4>
                {
                  <ul className="footer-links">
                    <li>
                      <a target="_blank" href={social_media.instagram}>
                        <InstagramOutlined />
                        {getLocaleMessages({ id: 'Instagram' })}
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href={social_media.facebook}>
                        <FacebookOutlined />
                        {getLocaleMessages({ id: 'Facebook' })}
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href={social_media.twitter}>
                        <TwitterOutlined />
                        {getLocaleMessages({ id: 'Twitter' })}
                      </a>
                    </li>
                    <li className="img_looogo">
                      <a target="_blank" href={social_media.google_plus}>
                        <img
                          src={require('../../assets/img/snapchat.png')}
                          alt=""
                          className="img-fluid"
                        />
                        {/*getLocaleMessages({ id: 'Google +' })*/}
                        Snapchat
                      </a>
                    </li>
                  </ul>
                }
              </Col>
            </Row>
          </div>
        </div>
        <div className="copy-rights">
          <p>
            {' '}
            &copy; Copyright Lamsat {new Date().getFullYear()} | All rights
            reserved.
          </p>
        </div>
      </footer>

      {/*Enquiry Now */}

      <Modal
        title={getLocaleMessages({ id: 'Contact Us' })}
        className="enquiry-modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form
          name="enquiry-form"
          className="enquiry-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name={'firstname'}
            rules={[
              {
                required: true,
                message: getLocaleMessages({ id: 'Please enter a name!' }),
              },
            ]}
          >
            <Input placeholder="Enter your Name!" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: getLocaleMessages({ id: 'Please enter email' }),
              },
            ]}
          >
            <Input placeholder="Enter Your EmailID!" />
          </Form.Item>
          <Form.Item
            name={'phone'}
            rules={[
              {
                required: true,
                //pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: getLocaleMessages({
                  id: 'Please enter mobile number',
                }),
              },
              {
                min: 6,
                message: 'Contact number should be minimum 6 digits.',
              },
              {
                max: 16,
                message: 'Contact number should be maximum 16 digits.',
              },
            ]}
          >
            <Input
              type="number"
              addonBefore={prefixSelector}
              placeholder="Enter Your Mobile Number!"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name={'message'}
            rules={[
              {
                required: true,
                message: getLocaleMessages({
                  id: 'Please input your Message!',
                }),
              },
            ]}
          >
            <TextArea placeholder="Enter Your Message" />
          </Form.Item>

          <Button type="primary" htmlType="create" className="save-btn">
            {getLocaleMessages({ id: 'Submit' })}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CommonFooter;
