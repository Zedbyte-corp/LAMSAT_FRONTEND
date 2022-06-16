import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout, Row, Col, Button } from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/cms.scss";
import { LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import { getLocaleMessages } from "redux/helper";
import actions from "redux/Details/actions";
import { history, store } from "redux/store";
import dompurify from "dompurify";
const sanitizer = dompurify.sanitize;
const { Content } = Layout;

const Cmspage = () => {
  const { cmsid } = useParams();
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const { cmsDetail } = useSelector((state) => state.DetailPage);
  const [cmsPageTitle,setcmsPageTitle] = useState("");
  const [cmsPageContent,setcmsPageContent] = useState("");
  useEffect(() => {

    if (parseInt(cmsid) > 0) {
      store.dispatch({
        type: actions.GET_CMS_VIEWDETAILS,
        payload: parseInt(cmsid),
      });
    } else {
      history.push({
        pathname: "/",
      });
    }
  }, []);

  var ReactDOMServer = require("react-dom/server");
  var HtmlToReactParser = require("html-to-react").Parser;

  useEffect(()=>{
    var languageID = localStorage.getItem('language_id')
    if(cmsDetail.length)
    {
      if(languageID == 1)
      {
        var title = cmsDetail.filter(data=> data.languageid == 1)
        console.log("title",title)
        if(title.length)
        {
          setcmsPageTitle(title[0].pagetitle);
          setcmsPageContent(title[0].pagecontent);
        }
      } else {
        var title = cmsDetail.filter(data=> data.languageid == 2)
        if(title.length)
        {
          setcmsPageTitle(title[0].pagetitle);
          setcmsPageContent(title[0].pagecontent);
        }
      }
    }

  },[cmsDetail])

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
                {
                  cmsPageTitle && cmsPageContent ? (
                    <>
                      <h2>{cmsPageTitle} </h2>
                      <div dangerouslySetInnerHTML={{ __html: cmsPageContent }} />
                    </>
                  ) : (
                    <h2>Loading...</h2>
                  )
                }
              </div>
            </div>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default Cmspage;
