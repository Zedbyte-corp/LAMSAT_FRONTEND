import React, { useState ,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Radio,
  Button,
} from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { times } from 'lodash';
import { useSelector } from "react-redux";
import moment from 'moment';
import "assets/css/style.scss";
import "assets/css/detail.scss";
import "assets/css/services.scss";

const { Content } = Layout;

const LoginForm = () => {


  const { isLoggedIn } = useSelector((state) => state.Auth);
  const [ showDate, setShowDate] = useState(moment())
  const [arrowCount,setArrowCount] = useState(0);
  const [dateValue, setDateValue] =  useState(null);
  const [dateValueString, setDateValueString] =  useState('')
  const [dateValueHour, setDateValueHour] =  useState('')
  const [dateValueMonth, setDateValuemonth] =  useState(moment().format('MMMM'))
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastpath',location.pathname);
  },[]);

  const addSubtract = ({sign}) =>{
    if(sign === 'minus'){
      if(arrowCount > 0) {
        setArrowCount(arrowCount - 1);
        let newDates=showDate.subtract(7,'days');
        setShowDate(newDates)
        setDateValuemonth(newDates.format('MMMM'))
      }
    } else if( sign === 'add') {
      setArrowCount(arrowCount + 1);
      setShowDate(showDate.add(7,'days'))
      setDateValuemonth(showDate.add(7,'days').format('MMMM'))
    }
  }
  const checkTimeSelect =() => {
    let state = false;
    if(localStorage.getItem('service_date') && localStorage.getItem('service_time')) {
      state = true;
    }
    return { pointerEvents: state ? 'auto' : 'none' };
  }
  const onChange = (event)=>{
    event.preventDefault();
    var date = event.target.value;
    var datearray = date.split("/");
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
    //var d= new Date(event.target.value).toISOString().split('T')[0];
    localStorage.setItem('service_date',newdate);
    setDateValue(event.target.dataSet)
    setDateValueString(event.target.value)
    setDateValuemonth(event.target.dataSet.format('MMMM'))
    setDateValueHour(parseInt(event.target.dataSet.endOf('hour').format('HH')))
  }
  const timeOnChange = (event) => {
    event.preventDefault();
    var time = event.target.value;
    localStorage.setItem('service_time',time);
    const saloon = JSON.parse(localStorage.getItem('service_time'));
  }
  const getSloonName = () => {

  const saloon = JSON.parse(localStorage.getItem('saloonDetails'));
  const serviceTime = (localStorage.getItem('service_time'));
  const service_date = (localStorage.getItem('service_date'))?(localStorage.getItem('service_date')):'';

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
    return `${process.env.REACT_APP_IMAGE_URL}${saloon['photopath']}`
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
  const checkStaffSelect = () => {
    let staffId = localStorage.getItem('staffId');
    return { pointerEvents: staffId ? 'auto' : 'none' };
  }
  window.addEventListener('popstate', (event) => {
    localStorage.removeItem('isStaffSelected');
    localStorage.removeItem('isServiceSelected');
  });
  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="detail-information select-services detail-header">
            <div className="container">
              <Row gutter={30}>
                <Col md={16} span={15}>
                  <div className="time-section">
                    <h2>Select Time</h2>

                    <div className="main-box">
                      <div className="box br-bottom">
                        <h3>{dateValueMonth}</h3>
                        {arrowCount > 0 && <ArrowLeftOutlined  onClick={()=>addSubtract({ sign: 'minus'})}/>}
                          <Radio.Group buttonStyle="solid" value={dateValueString}>
                            {times(7,{}).map((key,index)=>{
                              let newDates= moment(showDate).add({ day: index});
                              return <Radio.Button onChange={onChange} key={`${key}${index}`} dataSet={newDates} value={newDates.format('DD/MM/YYYY')}>
                              {newDates.format('ddd')} <span className="block">{newDates.format('DD')}</span>
                            </Radio.Button>})}
                          </Radio.Group>
                        <ArrowRightOutlined onClick={()=>addSubtract({ sign: 'add'})} />
                      </div>

                      <div className="box">
                        <h3>Available Slot</h3>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                          {moment().startOf('day').diff(moment(dateValue).startOf('day'), 'days') === 0 ?
                          <>
                            {times(24,{}).map((key,index)=>{
                            return index > 8 && index < 23 && dateValueHour < (index+1) ? <Radio.Button onChange={timeOnChange} key={`${key}${index}`} value={index+1}>
                            {index+1 > 12 ? index-11 : index+1}.00  <span className="block">{index+1 > 11 ? 'PM': 'AM' }</span>
                            </Radio.Button>: ''})}
                          </>:
                          <>
                             {times(24,{}).map((key,index)=>{
                              return index > 8 && index < 23 ? <Radio.Button onChange={timeOnChange} key={`${key}${index}`} value={index+1}>
                              {index+1 > 12 ? index-11 :index+1}.00  <span className="block">{index+1 > 11 ? 'PM': 'AM' }</span>
                            </Radio.Button>: ''})}
                          </>
                          }
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
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
                      <Link to="checkout" style={checkTimeSelect()}>
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

export default LoginForm;
