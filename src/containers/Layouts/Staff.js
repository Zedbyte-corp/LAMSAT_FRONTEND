import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Checkbox,
  Button,
  Skeleton,
  Avatar
} from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import "assets/css/detail.scss";
import "assets/css/services.scss";
import {
  CheckCircleFilled,
  UserOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import actions from "redux/Details/actions";
import { history, store } from 'redux/store';

const { Content } = Layout;

const StaffListPage = () => {
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const {
    staffLoader,
    staffDetail,
  } = useSelector(state=>state.DetailPage)
  const location = useLocation();
  const [isCheckboxDisable, setCheckboxDisable] = useState(false);
  var [isCheckboxChecked, setChecked] = useState();
  const noPrefChange = () => {
    let val = isCheckboxDisable;
    setCheckboxDisable(!val)
    isCheckboxChecked = '';
    setChecked(isCheckboxChecked);
    if(localStorage.getItem('staffId')){ localStorage.removeItem('staffId');}
  };
  const checkboxChange = (val) => {
    isCheckboxChecked = val.target.value;
    setChecked(isCheckboxChecked);
    localStorage.setItem("isStaffSelected" , true);
    localStorage.setItem('staffId',val.target.value);
  }
  useEffect(() => {
    localStorage.setItem('lastpath',location.pathname);
    if(localStorage.getItem('isStaffSelected')){

    } else {
      if(localStorage.getItem('saloonId')){
          store.dispatch({
          type: actions.GET_SALOON_STAFF_DETAILS,
          payload: parseInt(localStorage.getItem('saloonId')),
        })
      } else{
        history.push({
          pathname: '/list'
        })
      }
    }
  },[])
  const getSloonName = () => {
    const saloon = JSON.parse(localStorage.getItem('saloonDetails'));
    var selectLang = localStorage.getItem('site_language');
    var arr = saloon.language;
    var langArr = arr.filter(function (el) {
      return el.languageshortname == selectLang;
    });
    return langArr[0].vendorname;
  }
  const getSloonAddress = () => {
    const saloon = JSON.parse(localStorage.getItem('saloonDetails'));
    var selectLang = localStorage.getItem('site_language');
    var arr = saloon.language;
    var langArr = arr.filter(function (el) {
      return el.languageshortname == selectLang;
    });
    return langArr[0].vendoraddress;
  }
  const getImagePath = () => {
    const saloon = JSON.parse(localStorage.getItem('saloonDetails'));
    return saloon['image_url']
  }
  const getSubTotal = () => {
    var priceArr = JSON.parse(localStorage.getItem('priceList'));
    return priceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }
  const getSubTax = () => {
    var taxArr = JSON.parse(localStorage.getItem('taxList'));
    return taxArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }
  const getTotal = () => {
    var priceArr = JSON.parse(localStorage.getItem('priceList'));
    var price = priceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    var taxArr = JSON.parse(localStorage.getItem('taxList'));
    var tax = taxArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    return price+tax;
  }
  window.addEventListener('popstate', (event) => {
    localStorage.removeItem('isServiceSelected');
  });
  const checkStaffSelect = () => {
    return { pointerEvents: localStorage.getItem('isStaffSelected') ? 'auto' : 'none' };
  }
  const getInitials = (name) => {
    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    return initials.toUpperCase();
  };
  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="detail-information select-services detail-header staff-sections">
            <div className="container">
              <Row gutter={30}>
                <Col md={16} span={15}>
                {staffLoader ?
                      <>
                        <Skeleton loading={true} active avatar paragraph={{ rows: 4, width: '100%'}} />
                      </>
                      :
                <div className="select-staff-full">
                <h2>Select Staff</h2>
                  <ul>
                      <li>
                        <Checkbox
                          onChange={noPrefChange}
                          value="A">

                          <div className="d-dlex">

                          <Avatar size={70} icon={<UserOutlined />} />

                          <span className="title">No Preference</span>
                          <CheckCircleFilled />
                          </div>
                        </Checkbox>
                      </li>

                  { staffDetail.length ?

                     staffDetail.map((staffList,index) =>
                        <li>
                          <Checkbox
                            disabled={isCheckboxDisable}
                            onChange={checkboxChange}
                            checked={isCheckboxChecked === staffList['id']}
                            value={staffList['id']}>
                            <div className="d-dlex">

                              <Avatar size={70}>
                                  <span className="initials">
                                    {getInitials(
                                      `${staffList["firstname"]} ${staffList["lastname"]}`
                                    )}
                                  </span>
                              </Avatar>

                            <span className="title">{staffList['firstname']} {staffList['lastname']}</span>
                            <CheckCircleFilled />
                            </div>
                          </Checkbox>
                        </li>
                      )

                  :
                      <li>
                        <span className="title">No staff available</span>
                      </li>

                  }
                  </ul>
                </div>

                }
                </Col>
                <Col md={8} span={15}>
                  <div className="side-carts">
                    <div className="heads">
                        <div className="img">
                              <img
                                src={getImagePath()}
                              />
                          </div>
                          <div>
                              <p className="title">{getSloonName()}</p>
                              <address>
                                {getSloonAddress()}
                              </address>
                          </div>
                      </div>

                    {/* <div className="orders">
                      <ul>
                        <li>
                          <div>
                            <h4>Haircut</h4>
                            <p>1 Hour 2 Service Womens only</p>
                          </div>
                          <div className="price">50.00 SAR</div>
                        </li>
                        <li>
                          <div>
                            <h4>Blow Dry</h4>
                            <p>1 Hour 2 Service Womens only</p>
                          </div>
                          <div className="price">20.00 SAR</div>
                        </li>
                      </ul>
                    </div> */}

                    <div className="cart-bill">
                      <p className="sub">
                          <span>Subtotal</span>{" "}
                          <span className="price bolds">{getSubTotal()} SAR</span>
                        </p>
                        <p>
                          <span>Vat(%5)</span>{" "}
                          <span className="price">{getSubTax()} SAR</span>
                        </p>
                        <p className="total bolds">
                          <span>Toal Amount</span>{" "}
                          <span className="price">{getTotal()} SAR</span>
                        </p>
                    </div>

                    <div className="booknow">
                    <Link style={checkStaffSelect()} to="checkout">
                      <Button type="primary">Book Now</Button>
                    </Link>
                    </div>
                  </div>
                </Col>
              </Row>

            </div>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default StaffListPage;
