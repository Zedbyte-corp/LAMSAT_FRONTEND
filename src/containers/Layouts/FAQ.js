import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Collapse } from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/cms.scss";
import { CaretRightOutlined, LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import actions from "redux/Details/actions";
import { history, store } from 'redux/store';
import { getLocaleMessages } from 'redux/helper';
import dompurify from 'dompurify';
const sanitizer = dompurify.sanitize;

const { Content } = Layout;
const { Panel } = Collapse;

const LoginForm = () => {
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const { faqDetail} = useSelector(state=>state.DetailPage);
  useEffect(()=>{
   if(1){
     store.dispatch({
       type: actions.GET_FAQ_DETAILS_COMMON
     })
   }
 },[])
  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="cms-page">
            <div className="container">
              <Link to="/" className="bc-to-home">
                <LeftOutlined /> Back to Home
              </Link>
              <div className="bb-box">
                <h2>FAQ</h2>

                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  accordion
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                >
                {
                  faqDetail ? ( faqDetail.length > 0 && faqDetail.map((list, keyVal) => {

                    return (
                        <Panel
                      header={list.language[0].question}
                      key={keyVal}
                      className="site-collapse-custom-panel"
                    ><p>
                      <div dangerouslySetInnerHTML={ {__html: list.language[0].answer} } />
                    </p></Panel>);
                  })
                ) : (
                  <h2>Loading...</h2>
                )
              }

                </Collapse>
              </div>
            </div>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
