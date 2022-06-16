import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Input, Form, } from 'antd';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import actions from 'redux/auth/actions';
// import InjectMessage from 'components/utility/intlMessages';
import Header from 'containers/Layouts/Header';
import Footer from 'containers/Layouts/Footer';
import 'assets/css/style.scss';
// import Logo from 'components/OnBoarding/Logo';
// import { getLocaleMessages } from 'redux/helper';
// import { formProps } from './constant';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;



const LoginForm = () => {
  // const dispatch = useDispatch();
  // const onLogin = () => {
  //   dispatch({
  //     type: actions.AUTHENTICATE_USER,
  //   });
  // };

  const { isLoggedIn } = useSelector((state) => state.Auth);

  return (
    <>
      <Layout className={'on-boarding'}>
      
        {!isLoggedIn && <Header />}

        {/* <Content>
          <Row type={'flex'} justify={'space-around'} align="middle">
            <Col>
              <Logo />
              <Form name="login" onFinish={onLogin} {...formProps}>
                <Form.Item
                  label={<InjectMessage id={'label.emailAddress'} />}
                  name="email"
                  validateTrigger={'onBlur'}
                  rules={[
                    {
                      required: true,
                      message: (
                        <>
                          <InjectMessage id={'label.email'} />{' '}
                          <InjectMessage id={'message.cantEmpty'} />
                        </>
                      ),
                    },
                    {
                      type: 'email',
                      message: (
                        <>
                          <InjectMessage id={'message.invalid'} />{' '}
                          <InjectMessage id={'label.email'} />
                        </>
                      ),
                    },
                  ]}
                >
                  <Input placeholder={getLocaleMessages('placeholder.email')} />
                </Form.Item>

                <Form.Item
                  label={<InjectMessage id={'label.password'} />}
                  name="password"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: (
                        <>
                          <InjectMessage id={'label.password'} />{' '}
                          <InjectMessage id={'message.cantEmpty'} />
                        </>
                      ),
                    },
                  ]}
                >
                  <Input.Password
                    placeholder={getLocaleMessages('placeholder.password')}
                  />
                </Form.Item>
                <Form.Item className={'text-align-center'}>
                  <Button
                    type={'primary'}
                    loading={loader}
                    disabled={loader}
                    htmlType="submit"
                  >
                    <InjectMessage id={'label.signIn'} />
                  </Button>
                </Form.Item>
              </Form>
              <div className={'text-align-center'}>
                <Link target="_blank" to={'/forgot-password'}>
                  <InjectMessage id={'label.forgotPassword'} />
                </Link>
              </div>
            </Col>
          </Row>
        </Content> */}
          <Content> 

         {/*Baner*/}
        <Row className="d-flex flex-column justify-content-center align-items-center baner" justify={'space-around'} align="center">
        <div className="center-width">
      <h1>Find your ideal Service</h1>
      <h2>Lorem Ipsum is simply dummy text of the printing and <br /> typesetting industry.</h2>
         <Row className="d-flex flex-column">
          <Col sm={15} md={10}>
            <Form>
              <Col className="form-row baner-inner">
                <div className="form-group location no-pad">
                  <label>Select Your Location</label>
                  <SearchOutlined className='l-search' />
                  <Input type="text"className="form-control"placeholder="Search" />
                </div>
                <div className="form-group baner-button no-pad">
              <div className="baner-btn">
                <Link target="_blank" to="/" className="round-btn"><ArrowRightOutlined /></Link>
              </div>
              </div>
              </Col>
              </Form>
              </Col>
              </Row>
              </div>
              </Row>

               {/*Baner End*/}

               {/*Categories*/}

    {/*Categories End*/}

              {/*Featured Vendors */}
      <Row className="d-flex flex-column justify-content-center align-items-center featured" justify={'space-around'} align="center">
   <div className="center-width">
     <h2 className="text-lg-left title-1">Featured Vendors</h2>
         <Row>

         <Col sm={4} md={6} >
            
             <div className="featured-box">
         <img src={require("../../assets/img/hair-studio.jpg")} alt="" />
           <h3 className="featured-title">Hair Studio Barber</h3>
        </div>
        </Col>
        <Col sm={4} md={6}>
            
            <div className="featured-box">
         <img src={require("../../assets/img/redbox-borber.jpg")} alt="" />
          <h3 className="featured-title">Redbox Barbe</h3>
       </div>
       </Col>
       <Col sm={4} md={6}>
            
            <div className="featured-box">
            <img src={require("../../assets/img/srt-barber.jpg")} alt="" />
          <h3 className="featured-title">Srt Barber</h3>
       </div>
       </Col>
         <Col sm={4} md={6}>
            
            <div className="featured-box">
            <img src={require("../../assets/img/studio-barber.jpg")} alt="" />
          <h3 className="featured-title">Studio Barber</h3>
       </div>
       </Col>
       <Col sm={4} md={6}>
            
            <div className="featured-box">
              
         <img src={require("../../assets/img/box-borber.jpg")} alt="" />
          <h3 className="featured-title">Box Barber</h3>
       </div>
       </Col>
       <Col sm={4} md={6}>
            
            <div className="featured-box">
         <img src={require("../../assets/img/hair-st-barber.jpg")} alt="" />
          <h3 className="featured-title">Hair ST Barber</h3>
       </div>
       </Col>
       <Col sm={4} md={6}>
            
            <div className="featured-box">
         <img src={require("../../assets/img/hair-studio.jpg")} alt="" />
          <h3 className="featured-title">Hair Studio</h3>
       </div>
       </Col>
       <Col sm={4} md={6}>
            
            <div className="featured-box">
         <img src={require("../../assets/img/mmt-box.jpg")} alt="" />
          <h3 className="featured-title">MMT Box</h3>
       </div>
       </Col>
       </Row>
       </div>
</Row>

{/*Featured Vendors End*/}

{/*Top Rating and Reviews*/}

<Row className="d-flex flex-column justify-content-center align-items-center featured" justify={'space-around'} align="center">
   <div className="center-width">
   <h2 className="text-lg-left title-1">Top Rating and Reviews</h2>
      
         <Row>

         <Col sm={4} md={6}>
            
             <div className="featured-box">
             <img src={require("../../assets/img/hair-studio.jpg")} alt="" />
           <h3 className="featured-title">Hair Studio Barber</h3>
        </div>
       
          </Col>
          <Col sm={4} md={6}>
              <div className="featured-box">
          <img src={require("../../assets/img/redbox-borber.jpg")} alt="" />
           <h3 className="featured-title">Redbox Barber</h3>
        </div>
          </Col>
          <Col sm={4} md={6}>
            <div className="featured-box">
          <img src={require("../../assets/img/srt-barber.jpg")} alt="" />
           <h3 className="featured-title">Hair Studio Barberr</h3>
        </div>
          </Col>
          <Col sm={4} md={6}>
             <div className="featured-box">
          <img src={require("../../assets/img/studio-barber.jpg")} alt="" />
           <h3 className="featured-title">Hair Studio Barber</h3>
        </div>
          </Col>
      </Row>
      </div>
</Row>

{/*Top Rating and Reviews End*/}


{/*How work Start*/}
    <Row className=" d-flex flex-column justify-content-center align-items-center how-work" justify={'space-around'} align="center">
 <div className="center-width">

         <Row>
 <Col sm={24} md={8}>
              <div className="services-box">
         <h3>Select Service Location </h3>
         <p>Lorem Ipsum is simply dummy  typesetting industry.</p>
         <div className="right-img">
            <img src={require("../../assets/img/right-icon-1.jpg")} alt="" />
         </div>
        </div>

         <div className="services-box">
         <h3>Explore Services </h3>
         <p>Lorem Ipsum is simply dummy  typesetting industry.</p>
         <div className="right-img">
            <img src={require("../../assets/img/right-icon-2.jpg")} alt="" />
         </div>
        </div>
       
         </Col>
         <Col sm={24} md={8} className="mt-40">
              <div className="services-box">
         <h3>Explore Services</h3>
         <p>Lorem Ipsum is simply dummy  typesetting industry.</p>
         <div className="right-img">
            <img src={require("../../assets/img/right-icon-3.jpg")}  alt="" />
         </div>
        </div>

         <div className="services-box">
         <h3>Place Order </h3>
         <p>Lorem Ipsum is simply dummy  typesetting industry.</p>
         <div className="right-img">
         <img src={require("../../assets/img/right-icon-4.jpg")}  alt="" />
         </div>
        </div>
       
       </Col>

       <Col sm={24} md={8}>
              <div className="how-it-works">
           <h2 className="justify-content-center">How it Works</h2>
           <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
        </div>
          </Col>
        </Row>
      </div>
    </Row>

  {/*How work End*/}

{/*Download App*/}
    <Row className="Download d-flex flex-column justify-content-center align-items-center" justify={'space-around'} align="center" >
      <div className="center-width">

        <Row>
        <Col sm={10} md={12} >
        <img src={require("../../assets/img/app-screen.png")}  alt="" />
         </Col>
         <Col sm={24} md={12} >
            <div className="download-apps">
            <h3>Download Apps</h3>
            <p >Lorem Ipsum is simply dummy text of the printing and typesetting.Lorem Ipsum is simply dummy text of the printing and typesettin</p>
            <div className="android">
              <Link target="_blank" to="/">
              <img src={require("../../assets/img/google.png")}  alt="" />
            </Link>
            </div>
            <div className="ios">
              <Link target="_blank" to="/">
              <img src={require("../../assets/img/app-store.png")}  alt="" />
            </Link>
           </div>
           </div>
           </Col>
           </Row>
           </div>
           </Row>


             <Footer />
               
</Content>
</Layout>
              
    </>
  );
};

export default LoginForm;
