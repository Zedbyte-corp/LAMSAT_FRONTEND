import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Tabs,
  Card,
  Skeleton,
  Modal,
  Button,
  Form,
  Input,
  Rate,
  message,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { times } from "lodash";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import {
  ClockCircleOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  getLocalData,
  getLocaleMessages,
  getLocalDataType,
  checkValid,
} from "redux/helper";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import moment from "moment";
import "assets/css/style.scss";
import "assets/css/myaccount.scss";
import actions from "redux/auth/actions";
import actionsDetails from "redux/Details/actions";
import { store, history } from "redux/store";
import NO_IMAGE from "../../assets/img/no-image.png";

const { TextArea } = Input;
const { Content } = Layout;
const { TabPane } = Tabs;
const LoginForm = () => {
  const { isLoggedIn, userBookingList, initLoader } = useSelector(
    (state) => state.Auth
  );

  const { raterMark, raterName, raterComments } = useSelector(
    (state) => state.DetailPage
  );

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("lastpath", location.pathname);
    store.dispatch({
      type: actions.GET_USER_BOOKING_LIST,
      id: getLocalData("id"),
    });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratePopup, setRatePopup] = useState(false);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [selectedBookingId, setSelectedBookingId] = useState(0);
  const [selectedSaloonId, setSelectedSaloonId] = useState(0);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const BookingPopUp = (bookingDetails) => {
    console.log("bookingId: " + bookingDetails.id);
    console.log("vendorid: " + bookingDetails.vendorid);

    setSelectedSaloonId(bookingDetails.vendorid);
    setSelectedBookingId(bookingDetails.id);
    //setIsModalVisible(true);
    history.push(`/bookingdetails/${bookingDetails.id}`);
  };

  const reOrder = (vendorId) => {
    store.dispatch({
      type: actions.USER_BOOKING_REORDER,
      vendorid: vendorId,
      userid: getLocalData("id"),
    });
  };

  const cancelOrder = (bookingNumber) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to cancel the booking?
      You can cancelled before 6 hours for free,
      within 6 hours it will be chargeable`,
      okText: "Yes",
      cancelText: "No",
      maskClosable: true,
      mask: true,
      onOk: () => {
        store.dispatch({
          type: actions.USER_BOOKING_CANCEL,
          id: bookingNumber,
        });
      },
    });
  };
  const [booking, setBooking] = useState();
  const showRatePopup = (bookingList) => {
    console.log(bookingList)
    setBooking(bookingList.service_details)
    setSelectedSaloonId(bookingList.vendor_details.id);
    setSelectedBookingId(bookingList.id);
    setRatePopup(true);
  };

  const onFinish = (values) => {
    let resultData = {
      userid: getLocalData("id"),
      name: getLocalData("firstname") + " " + getLocalData("lastname"),
      contactnumber: getLocalData("contactnumber"),
      email: getLocalData("email"),
      review: values.raterComments,
      rating: values.raterMark,
      vendorid: selectedSaloonId, //locSaloonId
      servicelist: booking,
      bookingid: selectedBookingId,
    };
    if (!values.raterMark) {
      message.warning("Please fill Rating");
    } else {
      store.dispatch({
        type: actionsDetails.SAVE_RATING,
        value: resultData,
        callBackAction: (res) => {
          if (res == 1) {
            setRatePopup(false);
            setSelectedBookingId(0);
            setSelectedSaloonId(0);
          }
        },
      });
    }
  };

  const onChangeText = (event, fieldName) => {
    console.log("eve ", event.target.value);
    /*
    if (fieldName == "raterComments") {
      store.dispatch({
        type: actions.RATING_DATA_COMMENT,
        value: event.target.value,
      });
    } else if (fieldName == "raterName") {
      store.dispatch({
        type: actions.RATING_DATA_NAME,
        value: event.target.value,
      });
    }
    */
  };

  const handleChangeRate = (value) => {
    console.log("mearkkkkk", value);
    /* TODO TODO TODO TODO TODO TODO TODO TODO
    store.dispatch({
      type: actions.RATING_DATA_MARK,
      val: value,
    });
    */
  };
  const hoursAmPmData = (timeval) => {
    if (timeval) {
      var hoursdata =
        (parseInt(timeval.slice(0, 2)) > 12
          ? parseInt(timeval.slice(0, 2)) - 12
          : timeval.slice(0, 2)) +
        ".00 " +
        (parseInt(timeval.slice(0, 2)) > 12 ? "PM" : "AM");
      return hoursdata;
    }
  };
  console.log(
    "userBookingList",
    userBookingList.filter((item) => item.payment_status === 1)
  );
  let bookingTotal =
    userBookingList &&
    userBookingList.length &&
    userBookingList.filter((item) => item.payment_status === 1);
  console.log("userBookingList", userBookingList, bookingTotal);

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-1000">
              {/*Profile*/}
              <CommonHeader selectedKey={"bookings"} />
              {/*Bookings*/}
              <div className="main-box-account">
                <Row gutter={60} className="bookings-sub-title">
                  <Col md={24}>
                    <h3>Bookings </h3>
                    <Modal
                      title="Details"
                      className="create_category_modal"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={false}
                    >
                      <div className="booking_details_content">
                        {userBookingList.map((key, index) => {
                          if (key.id == selectedBookingId) {
                            return (
                              <>
                                <p>
                                  <span className="leftside">
                                    Booking No :{" "}
                                  </span>
                                  <span className="right">{`${key.bookingno}`}</span>
                                </p>
                                <p>
                                  <span className="leftside">Saloon :</span>{" "}
                                  <span className="right">{`${key.vendor_details.language["vendorname"]}${index}`}</span>
                                </p>
                                <p>
                                  <span className="leftside">Price : </span>
                                  <span className="right">
                                    {`${key.actualrate}`} SAR
                                  </span>
                                </p>
                                <p>
                                  <span className="leftside">Sub Total :</span>{" "}
                                  <span className="right">
                                    {`${key.subtotal}`} SAR
                                  </span>
                                </p>
                                {/*<p>
                                  <span className="leftside">VAT % :</span>{' '}
                                  <span className="right">{`${key.vat_percent}`}</span>
                                </p>*/}
                                <p>
                                  <span className="leftside">VAT Amount :</span>{" "}
                                  <span className="right">
                                    {`${key.vat_amount}`} SAR
                                  </span>
                                </p>
                                <p>
                                  <span className="leftside">Total :</span>{" "}
                                  <span className="right">
                                    {`${key.totalcost}`} SAR
                                  </span>
                                </p>
                                <p>
                                  <span className="leftside">
                                    Payment Method :
                                  </span>{" "}
                                  <span className="right">{`${
                                    key.payment_method == 1 ? "COD" : "Online"
                                  }`}</span>
                                </p>
                                {`${key.voucher_code}` != null &&
                                `${key.voucher_code}` != "null" ? (
                                  <p>
                                    <span className="leftside">
                                      Voucher Code :
                                    </span>{" "}
                                    <span className="right">
                                      {`${key.voucher_code}` != null &&
                                      `${key.voucher_code}` != "null"
                                        ? `${key.voucher_code}`
                                        : ""}
                                    </span>
                                  </p>
                                ) : (
                                  <></>
                                )}

                                <h5>Service Details</h5>
                                {key.service_details.map(
                                  (servic_key, servic_index) => (
                                    <>
                                      <p>
                                        <span className="leftside">
                                          Date &amp; Time:
                                        </span>{" "}
                                        <span className="right">
                                          {" "}
                                          {`${servic_key.service_date}` +
                                            " & " +
                                            `${
                                              parseInt(
                                                servic_key.service_time
                                              ) >= 12
                                                ? parseInt(
                                                    servic_key.service_time
                                                  ) - 12
                                                : parseInt(
                                                    servic_key.service_time
                                                  )
                                            }` +
                                            ":00 " +
                                            (parseInt(
                                              servic_key.service_time
                                            ) >= 12
                                              ? "PM"
                                              : "AM")}
                                        </span>
                                      </p>
                                      <p>
                                        <span className="leftside">
                                          Service Name :
                                        </span>{" "}
                                        <span className="right">{`${servic_key.service_details[0].language.servicename}`}</span>
                                      </p>
                                      <p>
                                        <span className="leftside">
                                          Price &amp; Special Price :
                                        </span>{" "}
                                        <span className="right">
                                          {`${servic_key.service_details[0].price[0].price}`}{" "}
                                          SAR &amp;{" "}
                                          {`${servic_key.service_details[0].price[0].special_price}`}{" "}
                                          SAR
                                        </span>
                                      </p>
                                    </>
                                  )
                                )}
                              </>
                            );
                          }
                        })}
                      </div>
                    </Modal>

                    <Modal
                      visible={ratePopup}
                      destroyOnClose={true}
                      className=" details-modal"
                      cancelButtonProps={{ style: { display: "none" } }}
                      okButtonProps={{ style: { display: "none" } }}
                      onCancel={() => setRatePopup(false)}
                    >
                      <div className="modal-body">
                        <div className="modal-body-inner">
                          <a
                            href="javascript:void(0);"
                            onClick={() => setRatePopup(false)}
                            className="close-modal"
                            data-dismiss="modal"
                          >
                            <i
                              className="las la-times-circle"
                              onClick={() => setRatePopup(false)}
                            />
                          </a>
                          <h3>
                            {getLocaleMessages({ id: "Ratings" })} &amp;{" "}
                            {getLocaleMessages({ id: "Reviews" })}
                          </h3>
                          <Form
                            name="rating_form"
                            className="login-form"
                            onFinish={onFinish}
                            initialValues={{
                              raterName: raterName,
                              raterComments: raterComments,
                              raterMark: raterMark,
                            }}
                          >
                            {/* <Form.Item name="raterName">
                              <Input
                                placeholder={getLocaleMessages({ id: 'Name' })}
                                onChange={(ev) => onChangeText(ev, 'raterName')}
                              />
                            </Form.Item> */}
                            <Form.Item name="raterComments">
                              <TextArea
                                rows={4}
                                placeholder={getLocaleMessages({
                                  id: "Comments",
                                })}
                                onChange={(ev) =>
                                  onChangeText(ev, "raterComments")
                                }
                              />
                            </Form.Item>
                            <Form.Item name="raterMark">
                              <Rate
                                tooltips={desc}
                                onChange={(ev) =>
                                  handleChangeRate(ev, "raterMark")
                                }
                                value={raterMark}
                                // defaultValue={1}
                              />
                            </Form.Item>

                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                              >
                                Save
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </Modal>
                    {bookingTotal && bookingTotal.length ? (
                      <p>{`Total Bookings (${bookingTotal.length})`}</p>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>

                <Tabs defaultActiveKey="3" className="bookings-tab-design">
                  <TabPane tab="Upcoming Bookings" key="3">
                    <Row gutter="30">
                      {userBookingList.length == 0 && initLoader ? (
                        times(6, {}).map((key, index) => (
                          <Col sm={12} md={8} key={`${key}${index}`}>
                            <Card hoverable>
                              <Skeleton loading={true} avatar active />
                            </Card>
                          </Col>
                        ))
                      ) : userBookingList.length > 0 && 1 ? (
                        userBookingList.map((bookingList, index) =>
                          //bookingList.booking_status == 2 ||
                          bookingList.booking_status == 1 &&
                          bookingList.payment_status != 2 ? (
                            <Col md={8} span={15} key={index}>
                              <div className="bookings-boxed">
                                <div className="bb-head">
                                  <div className="img">
                                    <img
                                      // src={
                                      //   bookingList.vendor_details['image_url']
                                      // }
                                      src={
                                        bookingList.vendor_details.image_url
                                          ? bookingList.vendor_details.image_url
                                          : bookingList.vendor_images &&
                                            bookingList.vendor_images.length &&
                                            bookingList.vendor_images[0]
                                              .image_url
                                          ? bookingList.vendor_images[0]
                                              .image_url
                                          : NO_IMAGE
                                      }
                                      alt="Saloon images"
                                    />
                                  </div>
                                  {/* {bookingList.booking_status == 1 ? (
                                    <div className="waiting-for">
                                      {bookingList.booking_status == 1
                                        ? 'Waiting for acceptance'
                                        : ''}
                                    </div>
                                  ) : (
                                    <></>
                                  )} */}
                                  <p className="book">
                                    Booking No:{bookingList.bookingno}
                                  </p>
                                  <h6>
                                    <Link
                                      onClick={() => {
                                        localStorage.setItem(
                                          "saloonId",
                                          parseInt(
                                            bookingList.vendor_details["id"]
                                          )
                                        );
                                      }}
                                      to={{
                                        pathname: `/details/${bookingList.vendor_details["id"]}`,
                                      }}
                                    >
                                      {
                                        bookingList.vendor_details.language[
                                          "vendorname"
                                        ]
                                      }{" "}
                                    </Link>
                                  </h6>
                                  <p className="price">{`${bookingList.totalcost} SAR`}</p>
                                </div>
                                <address>
                                  {
                                    bookingList.vendor_details.language[
                                      "vendoraddress"
                                    ]
                                  }{" "}
                                </address>
                                <div className="bb-timing">
                                  <div>
                                    <ClockCircleOutlined />
                                    <p>
                                      {bookingList &&
                                        bookingList["service_date"]}{" "}
                                      {bookingList &&
                                      bookingList["service_details"] &&
                                      bookingList["service_details"].length > 0
                                        ? moment(
                                            bookingList["service_details"][0][
                                              "service_time"
                                            ]
                                          )
                                            .utc(false)
                                            .format("hh:mm A")
                                        : // ? hoursAmPmData(
                                          //     bookingList["service_details"][0][
                                          //       "service_time"
                                          //     ]
                                          //   )
                                          ""}
                                      {/* {bookingList['service_details'].length > 0
                                        ? bookingList['service_details'][0][
                                            'service_time'
                                          ] + ':00'
                                        : ''}{' '}
                                      {bookingList['service_details'].length > 0 &&
                                      bookingList['service_details'][0]['service_time'] <= 12 ? 'AM' : 'PM'} */}
                                    </p>
                                  </div>
                                  <div></div>
                                </div>

                                <div className="order_btn_flex">
                                  <Button
                                    className="reOrder-btn"
                                    style={{
                                      color: "#9c27b0",
                                      marginLeft: "29%",
                                      marginRight: "2%",
                                      display: "none",
                                    }}
                                    onClick={() =>
                                      reOrder(bookingList.vendor_details["id"])
                                    }
                                  >
                                    Reorder
                                  </Button>

                                  <Button
                                    className="cancel-btn"
                                    onClick={() => cancelOrder(bookingList.id)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => BookingPopUp(bookingList)}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ) : (
                            ""
                          )
                        )
                      ) : (
                        <Col md={12}>
                          <div className="bookings-boxed">
                            <div className="bb-head">
                              <h2 className="lite">No bookings found!</h2>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </TabPane>

                  {/*
                  <TabPane tab="Waiting For Acceptance" key="1">
                    <Row gutter="30">
                      {userBookingList.length == 0 && initLoader ? (
                        times(6, {}).map((key, index) => (
                          <Col sm={12} md={8} key={`${key}${index}`}>
                            <Card hoverable>
                              <Skeleton loading={true} avatar active />
                            </Card>
                          </Col>
                        ))
                      ) : userBookingList.length > 0 && 1 ? (
                        userBookingList.map((bookingList, index) =>
                          bookingList.booking_status == 1 ? (
                            <Col md={8} span={15} key={index}>
                              <div className="bookings-boxed">
                                <div className="bb-head">
                                  <div className="img">
                                    <img
                                      src={
                                        bookingList.vendor_details['image_url']
                                      }
                                      alt="Saloon images"
                                    />
                                  </div>
                                  <p className="book">
                                    Booking No:{bookingList.bookingno}
                                  </p>
                                  <h6>
                                    <Link
                                      onClick={() => {
                                        localStorage.setItem(
                                          'saloonId',
                                          parseInt(
                                            bookingList.vendor_details['id']
                                          )
                                        );
                                      }}
                                      to={{
                                        pathname: `/details/${bookingList.vendor_details['id']}`,
                                      }}
                                    >
                                      {
                                        bookingList.vendor_details.language[
                                        'vendorname'
                                        ]
                                      }{' '}
                                    </Link>
                                  </h6>
                                  <p className="price">{`${bookingList.totalcost} SAR`}</p>
                                </div>
                                <address>
                                  {
                                    bookingList.vendor_details.language[
                                    'vendoraddress'
                                    ]
                                  }{' '}
                                </address>
                                <div className="bb-timing">
                                  <ClockCircleOutlined />
                                  <p>{bookingList['service_date']}</p>
                                </div>
                                <div className="order_btn_flex">
                                  <Button
                                    className="reOrder-btn"
                                    style={{
                                      color: '#9c27b0',
                                      marginLeft: '29%',
                                      marginRight: '2%',
                                      display: 'none',
                                    }}
                                    onClick={() =>
                                      reOrder(bookingList.vendor_details['id'])
                                    }
                                  >
                                    Reorder
                                  </Button>

                                  <Button
                                    className="cancel-btn"
                                    onClick={() => cancelOrder(bookingList.id)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="details-btn"
                                    onClick={() =>
                                      BookingPopUp(bookingList)
                                    }
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ) : (
                            ''
                          )
                        )
                      ) : (
                        <Col md={12}>
                          <div className="bookings-boxed">
                            <div className="bb-head">
                              <h2 className="lite">No bookings found!</h2>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </TabPane>
                  */}

                  <TabPane tab="Cancelled Bookings" key="2">
                    <Row gutter="30">
                      {userBookingList.length == 0 && initLoader ? (
                        times(6, {}).map((key, index) => (
                          <Col sm={12} md={8} key={`${key}${index}`}>
                            <Card hoverable>
                              <Skeleton loading={true} avatar active />
                            </Card>
                          </Col>
                        ))
                      ) : userBookingList.length > 0 && 1 ? (
                        userBookingList.map((bookingList, index) =>
                          bookingList.booking_status == 2 ||
                          bookingList.booking_status == 3 ? (
                            <Col md={8} span={15} key={index}>
                              <div className="bookings-boxed">
                                <div className="bb-head">
                                  <div className="img">
                                    <img
                                      // src={
                                      //   bookingList.vendor_details['image_url']
                                      // }
                                      src={
                                        bookingList.vendor_details.image_url
                                          ? bookingList.vendor_details.image_url
                                          : bookingList.vendor_images &&
                                            bookingList.vendor_images.length &&
                                            bookingList.vendor_images[0]
                                              .image_url
                                          ? bookingList.vendor_images[0]
                                              .image_url
                                          : NO_IMAGE
                                      }
                                      alt="Saloon images"
                                    />
                                  </div>
                                  <p className="book">
                                    Booking No:{bookingList.bookingno}
                                  </p>
                                  <h6>
                                    <Link
                                      onClick={() => {
                                        localStorage.setItem(
                                          "saloonId",
                                          parseInt(
                                            bookingList.vendor_details["id"]
                                          )
                                        );
                                      }}
                                      to={{
                                        pathname: `/details/${bookingList.vendor_details["id"]}`,
                                      }}
                                    >
                                      {
                                        bookingList.vendor_details.language[
                                          "vendorname"
                                        ]
                                      }{" "}
                                    </Link>
                                  </h6>
                                  <p className="price">{`${bookingList.totalcost} SAR`}</p>
                                </div>
                                <address>
                                  {
                                    bookingList.vendor_details.language[
                                      "vendoraddress"
                                    ]
                                  }{" "}
                                </address>
                                <div className="bb-timing">
                                  <ClockCircleOutlined />
                                  <p>
                                    {bookingList["service_date"]}{" "}
                                    {bookingList &&
                                      bookingList["service_details"] &&
                                      bookingList["service_details"].length > 0
                                      ? moment(
                                          bookingList["service_details"][0][
                                            "service_time"
                                          ]
                                        )
                                          .utc(false)
                                          .format("hh:mm A")
                                      : // ? hoursAmPmData(
                                        //     bookingList["service_details"][0][
                                        //       "service_time"
                                        //     ]
                                        //   )
                                        ""}
                                    {/* {bookingList['service_details'].length > 0
                                        ? bookingList['service_details'][0][
                                            'service_time'
                                          ] + ':00'
                                        : ''}{' '}
                                      {bookingList['service_details'].length > 0 &&
                                      bookingList['service_details'][0]['service_time'] <= 12 ? 'AM' : 'PM'} */}
                                  </p>
                                </div>

                                <div className="order_btn_flex">
                                  <Button
                                    className="details-btn"
                                    onClick={() => BookingPopUp(bookingList)}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ) : (
                            ""
                          )
                        )
                      ) : (
                        <Col md={12}>
                          <div className="bookings-boxed">
                            <div className="bb-head">
                              <h2 className="lite">No bookings found!</h2>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </TabPane>

                  <TabPane tab="Completed Bookings" key="4">
                    <Row gutter="30">
                      {userBookingList.length == 0 && initLoader ? (
                        times(6, {}).map((key, index) => (
                          <Col sm={12} md={8} key={`${key}${index}`}>
                            <Card hoverable>
                              <Skeleton loading={true} avatar active />
                            </Card>
                          </Col>
                        ))
                      ) : userBookingList.length > 0 && 1 ? (
                        userBookingList.map((bookingList, index) =>
                          bookingList.booking_status == 4 ? (
                            <Col md={8} span={15} key={index}>
                              <div className="bookings-boxed">
                                <div className="bb-head">
                                  <div className="img">
                                    <img
                                      // src={
                                      //   bookingList.vendor_details['image_url']
                                      // }
                                      src={
                                        bookingList.vendor_details.image_url
                                          ? bookingList.vendor_details.image_url
                                          : bookingList.vendor_images &&
                                            bookingList.vendor_images.length &&
                                            bookingList.vendor_images[0]
                                              .image_url
                                          ? bookingList.vendor_images[0]
                                              .image_url
                                          : NO_IMAGE
                                      }
                                      alt="Saloon images"
                                    />
                                  </div>
                                  <p className="book">
                                    {bookingList.bookingno}
                                  </p>
                                  <h6>
                                    <Link
                                      onClick={() => {
                                        localStorage.setItem(
                                          "saloonId",
                                          parseInt(
                                            bookingList.vendor_details["id"]
                                          )
                                        );
                                      }}
                                      to={{
                                        pathname: `/details/${bookingList.vendor_details["id"]}`,
                                      }}
                                    >
                                      {
                                        bookingList.vendor_details.language[
                                          "vendorname"
                                        ]
                                      }{" "}
                                    </Link>
                                  </h6>
                                  <p className="price">{`${bookingList.totalcost} SAR`}</p>
                                </div>
                                <address>
                                  {
                                    bookingList.vendor_details.language[
                                      "vendoraddress"
                                    ]
                                  }{" "}
                                </address>
                                <div className="bb-timing">
                                  <ClockCircleOutlined />
                                  <p>
                                    {bookingList["service_date"]}{" "}
                                    {bookingList &&
                                    bookingList["service_details"] &&
                                    bookingList["service_details"].length > 0
                                      ? moment(
                                          bookingList["service_details"][0][
                                            "service_time"
                                          ]
                                        )
                                          .utc(false)
                                          .format("hh:mm A")
                                      : // ? hoursAmPmData(
                                        //     bookingList["service_details"][0][
                                        //       "service_time"
                                        //     ]
                                        //   )
                                        ""}
                                    {/* {bookingList['service_details'].length > 0
                                        ? bookingList['service_details'][0][
                                            'service_time'
                                          ] + ':00'
                                        : ''}{' '}
                                      {bookingList['service_details'].length > 0 &&
                                      bookingList['service_details'][0]['service_time'] <= 12 ? 'AM' : 'PM'} */}
                                  </p>
                                </div>

                                <div className="order_btn_flex">
                                  {bookingList.israted === false &&
                                  bookingList.isreviewed !== 1 ? (
                                    <>
                                      <Button
                                        className="btn-add-review"
                                        onClick={() =>
                                          showRatePopup(bookingList)
                                        }
                                      >
                                        Add Ratings
                                      </Button>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  <Button
                                    onClick={() => BookingPopUp(bookingList)}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ) : (
                            ""
                          )
                        )
                      ) : (
                        <Col md={12}>
                          <div className="bookings-boxed">
                            <div className="bb-head">
                              <h2 className="lite">No bookings found!</h2>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
              {/*Bookings*/}
            </div>
          </section>
          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
