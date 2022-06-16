import React from 'react';
import { Layout, Button, Row, Col, Input, Form, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/auth/actions';
import InjectMessage from 'components/utility/intlMessages';
// import 'assets/css/style.scss';
import 'assets/boxicons/css/boxicons.css';
// import Logo from 'components/OnBoarding/Logo';
// import { getLocaleMessages } from 'redux/helper';
// import { formProps } from './constant';
const { SubMenu } = Menu;
 const { Content } = Layout;

const LoginForm = () => {
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch({
      type: actions.AUTHENTICATE_USER,
    });
  };

  const { loader } = useSelector((state) => state.Auth);

  return (
    <>
      <Layout className={'on-boarding'}>
      


      <Menu mode="horizontal">
        <Menu.Item key="logo" >
        <div className="logo mr-auto">
            <a href="#"><img src={require("../../assets/img/logo.png")} alt="" className="img-fluid" /></a>
          </div>
        </Menu.Item>
        <Menu.Item key="app" >
          Singn up
        </Menu.Item>
        <Menu.Item key="app" >
          Login
        </Menu.Item>
        <SubMenu key="SubMenu" title="Choose Language">
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">English</Menu.Item>
            <Menu.Item key="setting:2">Arabic</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
        <Button
        type={'primary'}
        loading={loader}
        disabled={loader}
        onClick={()=>onLogin()}
        
      >
        <InjectMessage id={'label.signIn'} />
      </Button>
        </Menu.Item>
      </Menu>

        
          <Content> 

{/*Download App*/}
    <Row className="Download d-flex flex-column justify-content-center align-items-center" justify={'space-around'} align="center" >
      <div className="container">

        <Row>
        <Col span={12}>
        <img src={require("../../assets/img/app-screen.png")}  alt="" />
         </Col>
         <Col span={12}>
            <div className="download-apps">
            <h3>Download Apps</h3>
            <p >Lorem Ipsum is simply dummy text of the printing and typesetting.Lorem Ipsum is simply dummy text of the printing and typesettin</p>
            <div className="android">
              <a href="">
              <img src={require("../../assets/img/google.png")}  alt="" />
            </a>
            </div>
            <div className="ios">
              <a href="">
              <img src={require("../../assets/img/app-store.png")}  alt="" />
            </a>
           </div>
           </div>
           </Col>
           </Row>
           </div>
           </Row>



               
              </Content>
              </Layout>
              
    </>
  );
};

export default LoginForm;
