import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Button } from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/cms.scss";
import { LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import { getLocaleMessages } from 'redux/helper';

const { Content } = Layout;

const LoginForm = () => {
  const { isLoggedIn } = useSelector((state) => state.Auth);

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="cms-page">
          <div className="container">
          <Link to="/" className="bc-to-home"><LeftOutlined /> Back to Home</Link>
          <div className="bb-box">
          <h2>Terms and Conditions</h2>
          <h4>{getLocaleMessages({id: 'terms.introduction.title'})}</h4>
          <p>{getLocaleMessages({id: 'terms.introduction.content'})}</p>

          <h4>{getLocaleMessages({id: 'terms.definitions.title'})}</h4>
          <p>{getLocaleMessages({id: 'terms.definitions.content'})}</p>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mauris vel ipsum maximus accumsan eu mollis magna. Pellentesque at tellus erat. Integer consequat sollicitudin erat sed commodo. Nullam cursus ligula congue arcu hendrerit suscipit. Mauris molestie cursus ligula, a accumsan velit blandit in. Phasellus id consectetur augue, sed consequat dui. Donec risus nunc, faucibus at iaculis et, ultricies eget enim. Suspendisse varius, enim non malesuada iaculis, nisi eros iaculis risus, at tincidunt lectus felis sed turpis. In mattis porttitor efficitur. Integer tincidunt erat vitae nisi porttitor mollis. Aenean non est nec orci ultrices ornare a eu purus.</p>

<p>Ut eget mauris vitae tortor pulvinar vestibulum quis sed velit. Sed imperdiet quam vel est facilisis, eget lacinia lectus volutpat. Quisque vitae euismod sapien, at congue magna. Maecenas metus purus, mollis quis volutpat ut, cursus in odio. Donec varius cursus ipsum, a hendrerit mauris pellentesque a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean non quam laoreet, tincidunt felis non, placerat est. Donec placerat sodales dignissim. Nunc ut lacus quis ex mattis facilisis. Maecenas varius, diam et tincidunt rhoncus, lacus velit tristique sapien, ac hendrerit nulla sapien at dui. Mauris consequat quam eu lobortis fermentum. Vestibulum tempus non ante et varius. Suspendisse at tellus quis metus hendrerit molestie vel ac nisi.</p>

<p>Proin volutpat commodo neque in tincidunt. Etiam eget orci nibh. Aenean ut viverra felis. Suspendisse ut consectetur augue. Nullam tristique lacinia libero a fringilla. Proin hendrerit ultricies ornare. Duis in enim fermentum, efficitur quam sit amet, blandit nisi. Suspendisse mollis odio orci, blandit faucibus turpis imperdiet id. Integer augue est, auctor eu maximus eu, dictum vel ipsum. Fusce nec euismod velit, eget scelerisque neque. Mauris pulvinar laoreet magna, ut egestas ligula bibendum in. Suspendisse sollicitudin ac magna in efficitur. Curabitur scelerisque lectus a sem feugiat, nec mattis massa ultricies.</p> */}

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
