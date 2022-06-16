import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  Skeleton,
  message,
  Spin,
} from "antd";
import QRCode from "react-qr-code";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import "assets/css/confirmation.scss";
import { store, history } from "redux/store";
import { checkValid, getLocalData, getLocalDataType } from "redux/helper";
import DetailPageAction from "redux/Details/actions";
import authActions from "redux/auth/actions";
import actions from "redux/Details/actions";
import { useDispatch } from "react-redux";
import Mymap from "../../components/Admin/VendorProfile/Mymap";
import {
  UserOutlined,
  WalletOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const LinkScroll = Anchor.Link;
const { Content } = Layout;

const { Search, TextArea } = Input;

function callback(key) {}

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const { bookingDetails, voucherValidationRes } = useSelector(
    (state) => state.DetailPage
  );

  var [locBookingId, setLocBookingId] = useState(0);
  var [bookingNo, setBookingNo] = useState("");
  var [saloonName, setSaloonName] = useState("");
  var [saloonContactno, setsaloonContactno] = useState("");
  var [saloonPhoneno, setsaloonPhoneno] = useState("");
  var [saloonaddress, setsaloonaddress] = useState("");
  var [serviceTime, setServiceTime] = useState("");
  var [serviceDate, setServiceDate] = useState("");
  var [totalcost, setTotalcost] = useState(0);
  const [bookingid, setBookingid] = useState(0);
  const [intialLoader, setintialLoader] = useState(false);
  const [paymenttitle, setpaymenttitle] = useState("");
  const [visaPayment, setvisaPayment] = useState(false);
  const [checkBookingLoader, setcheckBookingLoader] = useState(false);

  useEffect(() => {
    setintialLoader(true);
    if (parseInt(bookingid) > 0) {
      setLocBookingId(bookingid);
      dispatch({
        type: authActions.FINAL_PAYMENT_SUCCESS_CALL,
        payload: {
          bookingid: parseInt(bookingid),
          eid:
            localStorage.getItem("paymentMethod") &&
            localStorage.getItem("paymentMethod"),
          checkoutid:
            localStorage.getItem("checkoutIdd") &&
            localStorage.getItem("checkoutIdd"),
          transactionkey:
            localStorage.getItem("transactionKey") &&
            localStorage.getItem("transactionKey"),
        },
        callBackAction: (res) => {
          console.log("res", res.data);
          setintialLoader(false);
          if (res.data.data.status == true) {
            setpaymenttitle("Payment Success");
            message.success("Payment Success");
          } else {
            setpaymenttitle("Payment Failed");
            message.error("Paymemt Failed");
          }
          store.dispatch({
            type: DetailPageAction.GET_BOOKING_DETAILS,
            id: parseInt(bookingid),
          });
        },
      });
    } else {
      //   history.push({
      //     pathname: "/",
      //   });
    }
  }, [bookingid]);
  useEffect(() => {
    const payLoadData = JSON.parse(localStorage.getItem("booking_payload"));
    if(payLoadData) {
      dispatch({
        type: actions.SET_BOOKING,
        payload: payLoadData,
        callBackAction: (res) => {
          if (res) {
            localStorage.setItem(
              "confirmbookingidcurrent",
              res.data.data.bookingDetails.id
            );
            setBookingid(res.data.data.bookingDetails.id);
            setvisaPayment(true);
            // localStorage.removeItem("transactionKey");
            // localStorage.removeItem("booking_payload");
            // localStorage.removeItem("checkoutIdd");
            console.log("this is the calue od the dataaaaa rrr", res);
            setcheckBookingLoader(false);
          }
        },
      });
    }
  }, []);

  useEffect(() => {
    if (bookingDetails) setBookingNo(bookingDetails.bookingno);
    setSaloonName(getSloonName());
    setsaloonContactno(getSloonContact());
    setsaloonPhoneno(getsaloonPhoneno());
    setsaloonaddress(getSloonAddress());
    setServiceTime(
      bookingDetails.service_time !== undefined
        ? bookingDetails.service_time
        : ""
    );
    setServiceDate(
      bookingDetails.service_date !== undefined
        ? bookingDetails.service_date
        : ""
    );
    setTotalcost(
      voucherValidationRes.finalamount !== undefined
        ? voucherValidationRes.finalamount
        : bookingDetails.totalcost !== undefined
        ? bookingDetails.totalcost
        : 0
    );
    if (bookingDetails && bookingDetails.payment_status == 1) {
      setpaymenttitle("Payment Success");
    }
  }, [bookingDetails]);

  const getSloonName = () => {
    if (
      typeof bookingDetails !== undefined &&
      bookingDetails.vendor_details !== undefined &&
      bookingDetails.vendor_details.language !== undefined
    ) {
      return bookingDetails.vendor_details.language.vendorname;
    }

    return "";
  };

  const getSloonContact = () => {
    if (
      typeof bookingDetails !== undefined &&
      bookingDetails.vendor_details !== undefined &&
      bookingDetails.vendor_details.contactnumber !== undefined
    ) {
      return bookingDetails.vendor_details.contactnumber;
    }

    return "";
  };

  const getsaloonPhoneno = () => {
    if (
      typeof bookingDetails !== undefined &&
      bookingDetails.vendor_details !== undefined &&
      bookingDetails.vendor_details.saloonphone !== undefined
    ) {
      return bookingDetails.vendor_details.saloonphone
        ? bookingDetails.vendor_details.saloonphone
        : bookingDetails.vendor_details.contactnumber;
    }

    return "";
  };

  const getSloonAddress = () => {
    if (
      typeof bookingDetails !== undefined &&
      bookingDetails.vendor_details !== undefined &&
      bookingDetails.vendor_details.language !== undefined
    ) {
      return bookingDetails.vendor_details.language.vendoraddress;
    }

    return "";
  };

  var priceArr = JSON.parse(localStorage.getItem("priceList"));
  var price = 0;

  if (priceArr && priceArr.length > 0) {
    price = priceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }

  var tax = 0;
  if (taxArr && taxArr.length > 0) {
    var taxArr = JSON.parse(localStorage.getItem("taxList"));
    tax = taxArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }

  const getImagePath = () => {
    const saloon = JSON.parse(localStorage.getItem("saloonDetails"));

    return `${saloon["image_url"]}`;
  };
  var total = price + tax;

  // useEffect(() => {
  //   if (paymenttitle == "Payment Failed") {
  //     message.error("Payment Failed");
  //   }
  // }, []);

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}
          <Spin size="large" spinning={intialLoader}>
            <section className="confirmation">
              <div className="container">
                {paymenttitle == "Payment Success" && (
                  <div className="box">
                    <div className="vendor-image">
                      <div className="squares">
                        <img src={getImagePath()} />
                      </div>
                    </div>
                    <h2>Successfully Booked</h2>
                    <p className="sub">Booking details </p>

                    <p className="t_primary">
                      <span> Booking No: </span>
                      <span>
                        {" "}
                        {bookingDetails.id != undefined ? (
                          bookingNo
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Name: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonName
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Mobile No: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonContactno
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Phone No: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonPhoneno
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Address: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonaddress
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    {/* <p className="t_primary">Staff Name: XXXXXXXXX</p> */}
                    <p className="t_primary">
                      <span>Booking Date: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          `${serviceDate}`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{" "}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Amount: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          `${parseFloat(totalcost).toFixed(2)} SAR`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{" "}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Payment Status: </span>
                      <span>
                        {paymenttitle ? (
                          `${paymenttitle}`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{" "}
                      </span>
                    </p>
                    <p className="t_primary scan_qr">
                      <QRCode
                        size={150}
                        value={`https://lamsat.app/bookingdetails/${bookingDetails.id}`}
                      />
                    </p>
                    <p class="t_secondary">
                      A confirmation email has been sent to <br />{" "}
                      <b>{getLocalData("email")}</b>
                    </p>

                    <Link to="/bookings">
                      <Button type="primary">My Bookings</Button>
                    </Link>

                    <div className="main-image">
                      <img
                        src={require("../../assets/img/success-saloon.png")}
                      />
                    </div>
                    <div className="t_primary scan_qr">
                      {bookingDetails.id != undefined ? (
                        <Mymap
                          latitude={bookingDetails.vendor_details.latitude}
                          longitude={bookingDetails.vendor_details.longitude}
                        />
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}
                    </div>
                  </div>
                )}

                {paymenttitle == "Payment Failed" && (
                  <div className="box">
                    <div className="vendor-image">
                      <div className="squares">
                        <img src={getImagePath()} />
                      </div>
                    </div>
                    <h2>Booking Failed</h2>
                    <p className="sub">Booking details </p>
                    {/** fdfa */}
                    {/* <p className="t_primary">
                     <span> Booking No: </span> 
                    <span>
                      {" "}
                      {bookingDetails.id != undefined ? (
                        bookingNo
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}
                    </span>
                  </p> */}
                    <p className="t_primary">
                      <span>Saloon Name: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonName
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Mobile No: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonContactno
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Phone No: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonPhoneno
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <p className="t_primary">
                      <span>Saloon Address: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          saloonaddress
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    {/* <p className="t_primary">Staff Name: XXXXXXXXX</p> */}
                    <p className="t_primary">
                      <span>Booking Date: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          `${serviceDate}`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{" "}
                      </span>
                    </p>
                    {/* <p className="t_primary">
                    <span>Amount: </span>
                    <span>
                      {bookingDetails.id != undefined ? (
                        `${totalcost} SAR`
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}{" "}
                    </span>
                  </p> */}
                    <p className="t_primary">
                      <span>Payment Status: </span>
                      <span>
                        {paymenttitle ? (
                          `${paymenttitle}`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{" "}
                      </span>
                    </p>
                    {/* <p className="t_primary scan_qr">
                    <QRCode
                      size={150}
                      value={`https://lamsat.app/bookingdetails/${bookingDetails.id}`}
                    />
                  </p> */}
                    {/* <p class="t_secondary">
                    A confirmation email has been sent to <br />{" "}
                    <b>{getLocalData("email")}</b>
                  </p> */}

                    <Link to="/bookings">
                      <Button type="primary">My Bookings</Button>
                    </Link>

                    <div className="main-image">
                      <img
                        src={require("../../assets/img/success-saloon.png")}
                      />
                    </div>
                    <div className="t_primary scan_qr">
                      {bookingDetails.id != undefined ? (
                        <Mymap
                          latitude={bookingDetails.vendor_details.latitude}
                          longitude={bookingDetails.vendor_details.longitude}
                        />
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </Spin>
          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default BookingConfirmation;
