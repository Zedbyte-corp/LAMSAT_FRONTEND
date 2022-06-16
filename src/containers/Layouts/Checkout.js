import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Input,
  Form,
  Switch,
  Radio,
  Checkbox,
  Button,
  Typography,
  Card,
  Carousel,
  Tabs,
  Anchor,
  Affix,
  message,
  Modal,
  Skeleton,
  Spin,
  Select,
} from "antd";
import { times } from "lodash";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import "assets/css/detail.scss";
import "assets/css/checkout.scss";
import SignupModal from "containers/Layouts/SignupModal";
import SigninModal from "containers/Layouts/SigninModal";
import ForgotModal from "containers/Layouts/ForgotModal";
import OTP from "containers/Layouts/OTP";
import StickyBox from "react-sticky-box";
import { store, history } from "redux/store";
import DetailPageAction from "redux/Details/actions";
import {
  checkValid,
  getLocalData,
  getLocalDataType,
  getLocaleMessages,
} from "redux/helper";
import actions from "redux/Details/actions";
import authActions from "redux/auth/actions";
import signupActions from "redux/auth/actions";
import MyInterviewWidget from "./payment";
import {
  UserOutlined,
  WalletOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Country, State, City } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const LinkScroll = Anchor.Link;
const { Content } = Layout;
const Countries = Country.getAllCountries();
const { Search, TextArea } = Input;
const { Option } = Select;

function callback(key) {}

const LoginForm = (props) => {
  const { saloonid } = useParams();
  const [categoryList, setcategory] = useState({});
  const [visaPayment, setvisaPayment] = useState(false);
  const [serviceList, setServiceList] = useState(
    JSON.parse(
      localStorage.getItem("serviceList") !== null
        ? localStorage.getItem("serviceList")
        : null
    )
  );
  const [serviceDate] = useState(
    localStorage.getItem("serviceDate") !== null
      ? localStorage.getItem("serviceDate")
      : null
  );

  if (serviceList === null) {
    history.push({
      pathname: "/",
    });
  } else if (serviceDate === null || typeof serviceDate === undefined) {
    history.push({
      pathname: "/",
    });
  }

  const {
    saloonDetail,
    voucherValidationRes,
    checkoutBookingDetails,
  } = useSelector((state) => state.DetailPage);
  // console.log("this si the value of the data checout", checkoutBookingDetails);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLVisible, setIsModalLVisible] = useState(false);
  const [isForgotVisible, setIsForgotVisible] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("");
  const [isOtpVisible, SetIsOtpVisible] = useState(false);
  const [OTPdata, setOTPdata] = useState("");
  const [suggetion, setSuggetion] = useState("");
  const location = useLocation();
  const [isOnceClicked, setIsOnceClicked] = useState(false);
  const [Address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [Cities, setCities] = useState();
  const [State, setState] = useState("");
  const [country, setCountry] = useState();
  const [Postcode, setPostcode] = useState("");
  const [checkoutId, setcheckoutId] = useState("");
  const [confirmId, setconfirmId] = useState(0);
  var [locSaloonId, setLocSaloonId] = useState(0);
  const [serviceListt, setserviceListt] = useState(
    JSON.parse(localStorage.getItem("serviceList"))
  );
  const [booking, setbooking] = useState(true);
  const [checkBookingLoader, setcheckBookingLoader] = useState(false);
  const [checkedd, setcheckedd] = useState(false);
  console.log("this is the value of countriesss", Countries);

  const CityValue = (value) => {
    setCity(value);
  };
  const AddressValue = (value) => {
    setAddress(value.target.defaultValue);
  };
  const StateValue = (value) => {
    setState(value.target.defaultValue);
  };
  const CountryValue = (val) => {
    console.log(`selected country ${val}`);
    setCountry(val);
    let con = Countries.filter((itm) => itm.isoCode === val);
    let ci = City.getCitiesOfCountry(con[0].isoCode);
    setCities(ci);
  };
  const PostcodeValue = (value) => {
    setPostcode(value.target.defaultValue);
  };
  const bookingIId = localStorage.getItem("confirmbookingid");

  const {
    subLang,
    loader,
    isLoggedIn,
    isOtp,
    isemail,
    getAppLanguageList,
    selectedLanguage,
    languageLoader,
    lastPath,
    initLoader,
  } = useSelector((state) => state.Auth);
  console.log("this is the value of the checkout key", checkoutId);
  useEffect(() => {
    if (checkoutBookingDetails.data) {
      console.log(
        "this si the value of the id",
        checkoutBookingDetails.data.bookingDetails.id
      );
      setconfirmId(checkoutBookingDetails.data.bookingDetails.id);
      localStorage.setItem("bookinDetails", checkoutBookingDetails.data);
      localStorage.setItem(
        "confirmbookingid",
        checkoutBookingDetails.data.bookingDetails.id
      );
      localStorage.setItem("bookinId", checkoutBookingDetails.data.bookingid);
      localStorage.setItem(
        "saloonName",
        checkoutBookingDetails.data.vendor_name
      );
      localStorage.setItem("serviceTime", "-");
      localStorage.setItem(
        "serviceDate",
        checkoutBookingDetails.data.bookingDetails.service_date
      );
      setcheckBookingLoader(false);
      // props.history.push(
      //   `/confirmation/${checkoutBookingDetails.data.bookingDetails.id}`
      // );
    }
  }, [checkoutBookingDetails]);

  console.log("this si the value of the conform if ", confirmId);

  console.log(
    "this is the value of the dataaa",
    city,
    Address,
    State,
    country,
    Postcode,
    checkoutId,
    paymentMethod
  );

  useEffect(() => {
    checkoutBookingDetails.data &&
      setconfirmId(
        localStorage.setItem(
          "confirmbookingid",
          checkoutBookingDetails.data.bookingDetails.id
        )
      );
  }, [confirmId]);

  useEffect(() => {
    let urlParams = new URLSearchParams(history.location.search);
    if (parseInt(saloonid)) {
      setLocSaloonId(saloonid);

      localStorage.setItem(
        "lastpath",
        location.pathname + history.location.search
      );

      store.dispatch({
        type: DetailPageAction.GET_SALOON_DETAILS,
        payload: saloonid,
        userid:
          isLoggedIn && getLocalDataType() === "user"
            ? parseInt(getLocalData("id"))
            : "",
      });

      var catArr = [];
      if (serviceList !== null) {
        serviceList.map((d, i) => {
          catArr.push(d.categoryid);
        });
      }
      setcategory(catArr);
    } else {
      history.push({
        pathname: "/",
      });
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("confirmbookingidcurrent");
    localStorage.removeItem("checkoutIdd");
    localStorage.removeItem("transactionKey");
    localStorage.removeItem("paymentMethod");
  }, []);

  const deleteService = (id) => {
    const found = serviceList.some((ch) => ch.serviceid === id);
    if (found) {
      var filtered = serviceList.filter(function (el) {
        return el.serviceid != id;
      });
      setServiceList(filtered);
    }
  };

  const minutesToHours = (totalMinutes) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return hours + " hours " + minutes + " min.";
  };

  const getSloonName = () => {
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0
    ) {
      localStorage.setItem("saloonDetails", JSON.stringify(saloonDetail));
      var selectLang = localStorage.getItem("site_language");
      var arr = saloonDetail.language;
      var langArr = arr.filter(function (el) {
        return el.languageshortname == selectLang;
      });
      return langArr[0].vendorname;
    }

    return "";
  };
  const getSloonAddress = () => {
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0
    ) {
      var selectLang = localStorage.getItem("site_language");
      var arr = saloonDetail.language;
      var langArr = arr.filter(function (el) {
        return el.languageshortname == selectLang;
      });
      return langArr[0].vendoraddress;
    }

    return "";
  };
  const getImagePath = () => {
    if (saloonDetail !== undefined) {
      return `${
        saloonDetail.image_url !== ""
          ? saloonDetail.image_url
          : saloonDetail.images
          ? saloonDetail.images[0].image_url
          : ""
      }`;
      //return `${saloonDetail['image_url']}`;
    }
  };

  const getSubTotal = () => {
    var total = 0;
    if (serviceList !== null) {
      serviceList.map((service, index) => {
        total += parseFloat(service.price);
      });
    }
    return total;
  };

  const getServicerateTotal = () => {
    var servicetotal = 0;
    if (serviceList !== null) {
      serviceList.map((service, index) => {
        servicetotal += parseFloat(service.servicerate);
      });
    }
    return servicetotal;
  };

  const getSubTax = () => {
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0
    ) {
      var serviceArr = getSubTotal();
      var vatPersentage = saloonDetail.vat / 100;
      return vatPersentage * serviceArr;
    }
    return 0;
  };

  const getTotal = () => {
    var price = getSubTotal();
    var tax = getSubTax();
    return price + tax;
  };

  const getTaxPercent = () => {
    if (typeof saloonDetail !== undefined && saloonDetail !== undefined) {
      return saloonDetail.vat;
    }

    return 0;
  };

  const showModal = ({ signupModalVisible }) => {
    setIsModalVisible(signupModalVisible);
  };

  const showLModal = ({ loginModalVisible }) => {
    setIsModalLVisible(loginModalVisible);
  };
  const onFinish = (values) => {
    values = {
      ...values,
      ...values["mobile_number"],
      confirmpassword: values["password"],
      cityid: 1,
      countryid: 1,
    };
    dispatch({
      type: signupActions.CREATE_AUTHENTICATE_USER,
      payload: values,
    });
  };

  const LoginSignup = ({ login, signup }) => {
    if (login) {
      setIsModalVisible(signup);
      setIsModalLVisible(login);
    } else if (signup) {
      setIsModalLVisible(login);
      setIsModalVisible(signup);
    }
  };

  const fOk = () => {
    setIsForgotVisible(false);
  };

  const LoginForgot = ({ login, forgot }) => {
    if (forgot) {
      setIsModalLVisible(login);
      setIsForgotVisible(forgot);
    } else if (login) {
      setIsForgotVisible(forgot);
      setIsModalLVisible(login);
    }
  };

  const onFinishLogin = (values) => {
    dispatch({
      type: signupActions.AUTHENTICATE_USER,
      payload: values,
      callBackAction: () => {
        showLModal({ loginModalVisible: false });
      },
    });
  };

  const onFinishForgot = (values) => {
    dispatch({
      type: signupActions.SEND_PASSWORD_RESET_LINK,
      payload: values,
      callBackAction: () => {
        LoginForgot({
          login: true,
          forgot: false,
        });
      },
    });
  };

  const onFinishOTP = () => {
    if (OTPdata.length === 5) {
      dispatch({
        type: signupActions.VERIFY_OTP,
        payload: {
          otp: OTPdata,
          email: isemail,
        },
        callBackAction: (status) => {
          if (status) {
            SetIsOtpVisible(false);
            setOTPdata("");
          }
        },
      });
    } else {
      message.error("please enter valid OTP");
    }
  };
  const otpOk = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to close this modal and the otp modal never open",
      okText: "ok",
      cancelText: "cancel",
      maskClosable: true,
      mask: true,
      onOk: () => {
        dispatch({
          type: actions.VERIFY_OTP_SUCCESS,
        });
      },
    });
  };

  const onChangeOTP = (value) => {
    setOTPdata(value);
  };

  const paymentOnline = (value) => {
    console.log("this is the value of payment", value);
    setcheckedd(!checkedd);
    console.log("this is the value of the payment", checkedd);
  };

  const selectedCard = (value) => {
    console.log("this is the value of the checkout data", value);
    setpaymentMethod(value);
    localStorage.setItem("paymentMethod", value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push(`/auth?type=login`);
    }
  }, []);

  const onSubmitButton = () => {
    if (paymentMethod == "") {
      message.warning("Please Select Card");
    } else if (Address == "") {
      message.warning("Please Fill Address");
    } else if (city == "") {
      message.warning("Please Fill City");
    } else if (State == "") {
      message.warning("Please Fill State");
    } else if (country == "") {
      message.warning("Please Select Country");
    } else if (Postcode == "") {
      message.warning("Please Fill Postal Code");
    } else {
      setcheckBookingLoader(true);
      dispatch({
        type: authActions.CREATE_PAYMENT_ACCOUNT,
        payload: {
          eid: paymentMethod,
          amount: parseFloat(getTotal()).toFixed(2),
          //amount: 100,
          customeraddress: Address,
          customercity: city,
          customerstate: State,
          customercountry: country,
          customerpostcode: Postcode,
        },
        callBackAction: (status) => {
          status.then((res) => {
            console.log("this is the value of the data", res);
            setcheckoutId(res.data.data.id);
            //setvisaPayment(true);
            onBookingChange();
            // setbooking(false);
          });
        },
      });
    }
  };

  const dispatch = useDispatch();

  const onBookingChange = () => {
    if (serviceList !== null && serviceList.length > 0) {
      if (isLoggedIn) {
        setIsOnceClicked(true);
        if (getLocalDataType() === "user") {
          const transactionId = localStorage.getItem("transactionKey")
            ? localStorage.getItem("transactionKey")
            : "";
          const checkoutIddd = localStorage.getItem("checkoutIdd")
            ? localStorage.getItem("checkoutIdd")
            : "";
          const payLoadData = {
            vendorid: parseInt(
              serviceList.length > 0 ? serviceList[0].saloonId : 0
            ),
            customerid: getLocalData("id"),
            service_date: moment(serviceDate).format("DD-MM-YYYY"),
            service_time: "",
            subtotal: parseFloat(getSubTotal()),
            discountvalue: 0,
            servicerate: parseFloat(getServicerateTotal()),
            actualrate: parseFloat(getSubTotal()),
            vat_percent: parseFloat(getTaxPercent()),
            vat_amount: parseFloat(getSubTax()),
            totalcost: parseFloat(getTotal()),
            payment_method: "1",
            devicetype: "WEB",
            devicetoken: "IMEI0015794545",
            guest: 1,
            categoryid: [],
            staffid: "0",
            serviceid: serviceList ? serviceList : [],
            packageid: [],
            // checkoutid: checkoutIddd && checkoutIddd,
            // eid: paymentMethod,
            // transactionkey: transactionId != "" && transactionId,
          };
          localStorage.setItem("booking_payload", JSON.stringify(payLoadData));
          setvisaPayment(true);
          setcheckBookingLoader(false);
        } else {
          // message.warning("User only added favourite");
        }
      } else {
        props.history.push("/auth?type=login");
      }
    } else {
      // message.error("Cart is empty. Please add services to place order.");
    }
  };
  const onVoucherApply = (value, e) => {
    if (value.trim() === "") {
      message.warning("Please enter voucher code.");
      e.preventDefault();
      return false;
    } else {
      let data = {
        vouchercode: value,
        totalamount: getTotal(),
        userid: getLocalData("id"),
        Bookingdate: moment(serviceDate).format("YYYY-MM-DD"),
      };
      dispatch({
        type: actions.VALIDATE_VOUCHER,
        payload: data,
      });
    }
  };
  const onSuggetionChange = (val) => {
    setSuggetion(val.target.value);
  };

  const hoursAmPmData = (timeval) => {
    if (timeval) {
      var hourdata = parseInt(timeval.split(".")[0]);
      var ampm = timeval.split(" ")[1];
      var hoursdata =
        (hourdata > 12 ? hourdata - 12 : hourdata) + ".00 " + ampm;
      // var hoursdata =
      //   (parseInt(timeval.slice(0, 2)) > 12
      //     ? parseInt(timeval.slice(0, 2)) - 12
      //     : timeval.slice(0, 2)) +
      //   '.00 ' +
      //   (parseInt(timeval.slice(0, 2)) > 12 ? 'PM' : 'AM');
      return hoursdata;
    }
  };
  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="checkout-section">
            <div className="container">
              <h2>Checkout</h2>
              <Spin size="large" spinning={checkBookingLoader}>
                <Row gutter={30}>
                  <Col md={16} span={15}>
                    <div className="checkout-box">
                      <div className="boxed">
                        <div className="icons-box">
                          <UserOutlined />
                        </div>
                        <div className="box-header">
                          <h3>{!isLoggedIn ? "Please signin" : "Logged In"}</h3>
                        </div>
                        <ul className="reset user-checkout-info">
                          <li>
                            {" "}
                            {isLoggedIn
                              ? "Email : " + getLocalData("email")
                              : ""}
                          </li>
                          <li>
                            {" "}
                            {isLoggedIn
                              ? "Name : " + getLocalData("firstname")
                              : ""}
                          </li>
                        </ul>
                      </div>
                      <div className="boxed">
                        <div className="icons-box">
                          <CalendarOutlined />
                        </div>
                        <div className="box-header">
                          <h3>Date</h3>
                        </div>
                        <p>{serviceDate}</p>
                      </div>
                      <div className="boxed lst">
                        <div className="icons-box">
                          <WalletOutlined />
                        </div>
                        <div className="box-header">
                          <h3>Payment</h3>
                          <p>
                            You can choose your payment method to place order.
                          </p>
                        </div>

                        {/* <Radio.Group
                          className="pay-aradios"
                          value={checkedd ? 2 : ""}
                        >
                          <Radio onClick={paymentOnline} value={2}>
                            Online Payment
                          </Radio>
                        </Radio.Group> */}
                        {/* {checkedd && ( */}
                        <div className="checkout_forms_design">
                          <Form.Item>
                            <Select
                              showSearch
                              placeholder="Select the card"
                              optionFilterProp="children"
                              onChange={selectedCard}
                              // filterOption={(input, option) =>
                              //   option.children
                              //     .toLowerCase()
                              //     .indexOf(input.toLowerCase()) >= 0
                              // }
                              // filterSort={(optionA, optionB) =>
                              //   optionA.children
                              //     .toLowerCase()
                              //     .localeCompare(optionB.children.toLowerCase())
                              // }
                            >
                              <Option value="visa">Visa</Option>
                              <Option value="master">Master</Option>
                              <Option value="mada">Mada</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item>
                            <TextArea
                              placeholder="Address"
                              onChange={AddressValue}
                            />
                          </Form.Item>
                          <Row gutter={30}>
                            <Col span={24}>
                              <Form.Item>
                                <Select
                                  showSearch
                                  placeholder="Select the Country"
                                  optionFilterProp="children"
                                  onChange={CountryValue}
                                >
                                  {Countries &&
                                    Countries.length &&
                                    Countries.map((item, index) => {
                                      return (
                                        <Option
                                          key={index}
                                          value={item.isoCode}
                                        >
                                          {item.name}
                                        </Option>
                                      );
                                    })}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              {country && (
                                <Form.Item
                                  name="city"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your city name!",
                                    },
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    placeholder={"Select a City"}
                                    optionFilterProp="children"
                                    onChange={CityValue}
                                  >
                                    {/* <Option value="SA">Saudi Arabia</Option>
                                  <Option value="IN">India</Option>
                                  <Option value="US">USA</Option>
                                  <Option value="GB">England</Option>
                                  <Option value="SG">Singapore</Option> */}
                                    {Cities &&
                                      Cities.length &&
                                      Cities.map((item, index) => {
                                        return (
                                          <Option key={index} value={item.name}>
                                            {item.name}
                                          </Option>
                                        );
                                      })}
                                  </Select>
                                </Form.Item>
                              )}
                            </Col>
                          </Row>
                          <Row gutter={30}>
                            <Col span={12}>
                              <Form.Item>
                                <Input
                                  placeholder="State"
                                  onChange={StateValue}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item>
                                <Input
                                  placeholder="Postcode"
                                  onChange={PostcodeValue}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          {!visaPayment && (
                            <Button
                              type="primary"
                              onClick={onSubmitButton}
                              style={{ marginBottom: "10px" }}
                            >
                              Submit
                            </Button>
                          )}
                        </div>
                        {/* )} */}
                        {visaPayment && (
                          <MyInterviewWidget
                            payment={paymentMethod}
                            confirmId={localStorage.getItem(
                              "confirmbookingidcurrent"
                            )}
                            City={city}
                            Address={Address}
                            State={State}
                            Country={country}
                            Postcode={Postcode}
                            checkoutId={checkoutId}
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col md={8} span={15}>
                    <StickyBox offsetTop={90} offsetBottom={20}>
                      {saloonDetail.id != undefined ? (
                        <div className="side-carts">
                          <div className="heads">
                            <div className="img">
                              <Link
                                to={{
                                  pathname: `/details/${locSaloonId}`,
                                }}
                              >
                                <img src={getImagePath()} />
                              </Link>
                            </div>
                            <div>
                              <p className="title">
                                <Link
                                  to={{
                                    pathname: `/details/${locSaloonId}`,
                                  }}
                                >
                                  {getSloonName()}
                                </Link>
                              </p>
                              <address>{getSloonAddress()}</address>
                            </div>
                          </div>

                          <div className="checkout-only">
                            <p>
                              {isLoggedIn
                                ? localStorage.getItem("service_date")
                                : ""}
                            </p>
                            {/*
                      <p className="lite">5h 30min duration, ends at 19:45</p>
                      */}
                            {isLoggedIn && (
                              <>
                                <div className="br-row"></div>
                                <Search
                                  placeholder="Enter Voucher Code"
                                  allowClear
                                  enterButton="Apply"
                                  size="large"
                                  onSearch={(value, e) => {
                                    onVoucherApply(value, e);
                                  }}
                                />
                                {/* <TextArea
                                  placeholder="Any Suggestions?"
                                  showCount
                                  maxLength={100}
                                  onChange={onSuggetionChange}
                                  autoSize={{ minRows: 2, maxRows: 6 }}
                                /> */}
                              </>
                            )}
                          </div>

                          <div className="orders">
                            <ul>
                              {serviceList &&
                                serviceList.map((data, i) => {
                                  return (
                                    <>
                                      <li>
                                        <div>
                                          <h4>{data.servicename}</h4>

                                          <p>
                                            Duration:{" "}
                                            {minutesToHours(data.duration)}
                                          </p>
                                          <p>
                                            at{" "}
                                            {data.service_time
                                              ? hoursAmPmData(data.service_time)
                                              : data.service_time}
                                          </p>
                                          <p>by {data.staffName}</p>

                                          <Button
                                            onClick={() =>
                                              deleteService(data.serviceid)
                                            }
                                            disabled={isOnceClicked}
                                            className="remove__button"
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                        <div className="price">{`${parseFloat(
                                          data.price
                                        ).toFixed(2)} SAR`}</div>
                                      </li>
                                    </>
                                  );
                                })}
                            </ul>
                          </div>

                          <div className="cart-bill">
                            <p className="sub">
                              <span>Subtotal</span>{" "}
                              <span className="price bolds">
                                {parseFloat(getSubTotal()).toFixed(2)} SAR
                              </span>
                            </p>
                            <p>
                              <span>Vat({getTaxPercent()}%)</span>{" "}
                              <span className="price">
                                {parseFloat(getSubTax()).toFixed(2)} SAR
                              </span>
                            </p>
                            <p className="total bolds">
                              <span>Total Amount</span>{" "}
                              <span className="price">
                                {parseFloat(getTotal()).toFixed(2)} SAR
                              </span>
                            </p>
                            {voucherValidationRes &&
                            Object.keys(voucherValidationRes).length > 0 ? (
                              <>
                                <p className="total bolds">
                                  <span>Voucher Reduction</span>{" "}
                                  <span className="price">
                                    {parseFloat(
                                      voucherValidationRes.discount
                                    ).toFixed(2)}{" "}
                                    SAR
                                  </span>
                                </p>
                                <p className="total bolds">
                                  <span>Amount to pay</span>{" "}
                                  <span className="price">
                                    {parseFloat(
                                      voucherValidationRes.finalamount
                                    ).toFixed(2)}{" "}
                                    SAR
                                  </span>
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          {/* <div className="booknow">
                          <Button
                            type="primary"
                            onClick={onBookingChange}
                            disabled={booking}
                          >
                            Book Now
                          </Button>
                        </div> */}
                        </div>
                      ) : (
                        <Skeleton paragraph={{ rows: 10 }} />
                      )}
                    </StickyBox>
                  </Col>
                </Row>
              </Spin>
            </div>
          </section>
          <SignupModal
            visible={isModalVisible}
            onCancel={() => showModal({ signupModalVisible: false })}
            onFinish={onFinish}
            LoginSignup={LoginSignup}
            loader={loader}
          />

          <SigninModal
            visible={isModalLVisible}
            onCancel={() => showLModal({ loginModalVisible: false })}
            onLoginForgot={LoginForgot}
            onFinish={onFinishLogin}
            LoginSignup={LoginSignup}
            loader={loader}
          />

          <ForgotModal
            visible={isForgotVisible}
            onCancel={fOk}
            onFinish={onFinishForgot}
            onLoginForgot={LoginForgot}
            loader={loader}
          />

          <Modal
            title={false}
            visible={isOtpVisible}
            onCancel={otpOk}
            centered
            footer={false}
            className="modal-ui-1 modal-otp"
            width="100%"
            destroyOnClose
          >
            <div className="modal-body-ui">
              <h2>OTP Verification</h2>
              <p className="sub">
                Enter the OTP you received to <br /> {isemail}{" "}
              </p>
              <div className="ant-form-item-four">
                <OTP OTPdata={OTPdata} onChangeOTP={onChangeOTP} />
              </div>
              <div className="ant-form-item">
                <Button
                  type="primary"
                  disabled={loader}
                  loading={loader}
                  onClick={onFinishOTP}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
