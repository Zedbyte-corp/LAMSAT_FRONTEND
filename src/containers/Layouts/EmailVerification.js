import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";

import {
  Layout,
  Row,
  Col,
  Switch,
  Select,
  Radio,
  Checkbox,
  Button,
  Result,
  Card,
  Skeleton,
  message,
  Empty,
  DatePicker,
  TimePicker,
  Spin,
} from "antd";
import StickyBox from "react-sticky-box";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import moment from "moment";
import "assets/css/listing.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  HeartFilled,
  DownOutlined,
  StarFilled,
  HeartOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import ListingLayoutAction from "redux/ListingLayout/actions";
import { history, store } from "redux/store";
import { checkValid, getLocalData, getLocalDataType } from "redux/helper";
import { times } from "lodash";
import actions from "redux/Details/actions";
import { getRandom } from "components/utility/helper";
import GoogleMap from "../../../src/components/Shared/google-map";
import NO_IMAGE from "../../assets/img/no-image.png";
import authActions from "redux/auth/actions";

const { Content } = Layout;

const { Option } = Select;
const format = "HH:mm";
function onChange(checked) {}

const EmailVerification = () => {
  const [message, setmessage] = useState("");
  const [verifyloader, setverifyloader] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.Auth);
  const urlParams = useParams();
  useEffect(() => {
    if (urlParams) {
      setverifyloader(true);
      if (urlParams && urlParams.id && urlParams.usertype) {
        console.log("11111", urlParams);
        store.dispatch({
          type: authActions.VERIFY_EMAIL,
          payload: {
            usertype: urlParams.usertype,
            id: urlParams.id,
          },
          callBackAction: (data) => {
            if (data) {
              //console.log("dddd", data);
              setmessage("Email verified Successfully");
              setverifyloader(false);
            } else {
              setmessage("Email verification failed");
              setverifyloader(false);
            }
          },
        });
      }
    }
  }, []);

  return (
    <>
      <Layout className={"on-boarding"}>
        {/* !isLoggedIn && <Header /> */}

        <Content>
          {/* <Spin loading={verifyloader}> */}
          <section className="email_vefied">
            <div className="container">
            <div className="box">
            <div className="logo">
            <img
                    src={require("../../assets/img/logo-clolor.png")}
                    alt=""
                  />
            </div>

            <Result
    status="success"
    title={message}

  />

                  <NavLink to={"/"} className="btn btn-primary">
                  Back to Home
                </NavLink>
            
            </div>
            </div>
          </section>
          {/* </Spin> */}
        </Content>
      </Layout>
    </>
  );
};

export default EmailVerification;
