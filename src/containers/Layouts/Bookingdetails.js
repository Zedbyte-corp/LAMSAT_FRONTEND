import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Layout,
  Input,
  Form,
  Switch,
  Radio,
  Checkbox,
  Button,
  Typography,
  Card,
  Carousel,
  Row,
  Col,
  Tabs,
  Anchor,
  Affix,
  Skeleton,
} from 'antd';
import QRCode from 'react-qr-code';
import Header from 'containers/Layouts/Header';
import Footer from 'containers/Layouts/Footer';
import Mymap from '../../components/Admin/VendorProfile/Mymap';
import 'assets/css/style.scss';
import 'assets/css/confirmation.scss';
import { store, history } from 'redux/store';
import { checkValid, getLocalData, getLocalDataType } from 'redux/helper';
import DetailPageAction from 'redux/Details/actions';

import {
  UserOutlined,
  WalletOutlined,
  CalendarOutlined,
  LeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ForgotPasswordConfirmed from './ForgotPasswordConfirmed';
import moment from 'moment';

const LinkScroll = Anchor.Link;
const { Content } = Layout;

const { Search, TextArea } = Input;

// const BOOKING_STATUS = {
//   1: "Completed",
//   2: "Confirmed",
//   3: "Confirmed",
//   4: "Rejected",
//   5: "Cancelled"
// };

const BOOKING_STATUS = {
  1: 'Confirmed',
  2: 'Late Cancelled',
  3: 'Cancelled',
  4: 'Completed',
};

// const PAYMENT_STATUS = {
//   1: "Confirmed",
//   2: "Cancelled",
//   3: "Confirmed",
//   0: "Confirmed",
// };

const PAYMENT_STATUS = {
  1: 'Paid',
  0: 'Refund',
};
const PAYMENT_METHOD = {
  1: 'ONLINE',
  2: 'COD',
  3: 'CARD',
};
function callback(key) {}

const BookingDetailsPage = (props) => {
  const { bookingid } = useParams();
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const { bookingDetails, voucherValidationRes } = useSelector(
    (state) => state.DetailPage
  );

  var [locBookingId, setLocBookingId] = useState(0);
  var [bookingNo, setBookingNo] = useState('');
  var [saloonName, setSaloonName] = useState('');
  var [serviceTime, setServiceTime] = useState('');
  var [serviceDate, setServiceDate] = useState('');
  var [totalcost, setTotalcost] = useState(0);

  useEffect(() => {
    let urlParams = new URLSearchParams(history.location.search);
    if (parseInt(bookingid) > 0) {
      setLocBookingId(bookingid);

      store.dispatch({
        type: DetailPageAction.GET_BOOKING_DETAILS,
        id: parseInt(bookingid),
      });
    } else {
      history.push({
        pathname: '/',
      });
    }
  }, []);

  useEffect(() => {
    if (bookingDetails) setBookingNo(bookingDetails.bookingno);
    setSaloonName(getSloonName());
    setServiceTime(
      bookingDetails.service_time !== undefined
        ? bookingDetails.service_time
        : ''
    );
    setServiceDate(
      bookingDetails.service_date !== undefined
        ? bookingDetails.service_date
        : ''
    );
    setTotalcost(
      voucherValidationRes.finalamount !== undefined
        ? voucherValidationRes.finalamount
        : bookingDetails.totalcost !== undefined
        ? bookingDetails.totalcost
        : 0
    );
    console.log('booking details', bookingDetails);
  }, [bookingDetails]);

  const getSloonName = () => {
    if (
      typeof bookingDetails !== undefined &&
      bookingDetails.vendor_details !== undefined &&
      bookingDetails.vendor_details.language !== undefined
    ) {
      return bookingDetails.vendor_details.language.vendorname;
    }

    return '';
  };

  var priceArr = JSON.parse(localStorage.getItem('priceList'));
  var price = 0;

  if (priceArr && priceArr.length > 0) {
    price = priceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }

  var tax = 0;
  if (taxArr && taxArr.length > 0) {
    var taxArr = JSON.parse(localStorage.getItem('taxList'));
    tax = taxArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }

  const getImagePath = () => {
    const saloon = JSON.parse(localStorage.getItem('saloonDetails'));
    return `${saloon['image_url']}`;
  };
  var total = price + tax;

  const hoursAmPmData = (timeval) => {
    if (timeval) {
      var hoursdata =
        (parseInt(timeval.slice(0, 2)) > 12
          ? parseInt(timeval.slice(0, 2)) - 12
          : timeval.slice(0, 2)) +
        '.00 ' +
        (parseInt(timeval.slice(0, 2)) > 12 ? 'PM' : 'AM');
      return hoursdata;
    }
  };

  return (
    <>
      <Layout className={'on-boarding'}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="confirmation_booking_section">
            <div className="container">
              <a className="bc-to-home" onClick={() => props.history.goBack()}>
                <LeftOutlined /> Back to Booking
              </a>

              <div className="box">
                <div className="box_header">
                  <div>
                    <p>
                      <span> Booking No: </span>
                      <span>
                        {' '}
                        {bookingDetails.id != undefined ? (
                          bookingNo
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}
                      </span>
                    </p>
                    <h2>
                      {' '}
                      {bookingDetails.id != undefined ? (
                        saloonName
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}
                    </h2>
                    <address>
                      {bookingDetails.id != undefined &&
                      bookingDetails.cityname &&
                      bookingDetails.countryname ? (
                        `${bookingDetails.cityname} ${bookingDetails.countryname}`
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}{' '}
                    </address>
                  </div>

                  <div className="dh_right_bx">
                    <p>
                      <span>Booking Date: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          `${
                            serviceDate &&
                            moment(serviceDate, 'DD-MM-YYYY').format(
                              'DD-MM-YYYY'
                            )
                          }`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{' '}
                      </span>
                    </p>

                    <p>
                      <span>Booking status: </span>
                      <span className="status">
                        {bookingDetails.id != undefined ? (
                          `${BOOKING_STATUS[bookingDetails.booking_status]}`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{' '}
                      </span>
                    </p>

                    {/* <p>
                      <span>Amount: </span>
                      <span>
                        {bookingDetails.id != undefined ? (
                          `${totalcost} SAR`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{" "}
                      </span>
                    </p> */}
                    <p>
                      <span>Saloon Mobile: </span>
                      <span>
                        {bookingDetails.id != undefined &&
                        bookingDetails.vendor_details ? (
                          `${bookingDetails.vendor_details.contactnumber}`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{' '}
                      </span>
                    </p>
                    <p>
                      <span>Saloon Phone: </span>
                      <span>
                        {bookingDetails.id != undefined &&
                        bookingDetails.vendor_details ? (
                          `${
                            bookingDetails.vendor_details.phonenumber
                              ? bookingDetails.vendor_details.phonenumber
                              : bookingDetails.vendor_details.contactnumber
                          }`
                        ) : (
                          <Skeleton.Input style={{ width: 100 }} />
                        )}{' '}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bhx_body">
                  <Row gutter={30}>
                    <Col span={16}>
                      {/* <h4>Customer Details</h4>
                      <p className="t_primary">
                        <span>Customer Name: </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${bookingDetails.customerdetails.firstname} ${bookingDetails.customerdetails.lastname}`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}{" "}
                        </span>
                      </p>
                      <p className="t_primary">
                        <span>Customer Mobile: </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${bookingDetails.customerdetails.contactnumber}`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}{" "}
                        </span>
                      </p>
                      <p className="t_primary">
                        <span>Appointment Date & Time: </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${bookingDetails.service_date} & ${bookingDetails.service_time}`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}{" "}
                        </span>
                      </p> */}
                      {/* Service item list*/}
                      <h4>Service Details </h4>

                      <table>
                        <tbody>
                          <tr className="head">
                            <td>Service Name</td>
                            <td>Duration</td>
                            <td>Appointment</td>
                            <td>Staff Name </td>
                          </tr>

                          <>
                            {bookingDetails && bookingDetails.service_details &&
                            bookingDetails.service_details.length > 0 ? (
                              bookingDetails.service_details.map((service) => (
                                <>
                                  <tr>
                                    <td>
                                      {
                                        service.services[0].language[0]
                                          .servicename
                                      }
                                    </td>
                                    <td>
                                      {service.services[0].price[0].duration}{' '}
                                      MIN
                                    </td>
                                    <td>
                                      {service.service_date &&
                                        moment(
                                          service.service_date,
                                          'DD-MM-YYYY'
                                        ).format('DD-MM-YYYY')}{' '}
                                      &{' '}
                                      {service.service_time
                                        ? moment(service.service_time)
                                            .utc(false)
                                            .format('hh:mm A')
                                        : //? hoursAmPmData(service.service_time)
                                          ''}
                                    </td>
                                    <td>
                                      {service.staffname
                                        ? service.staffname
                                        : ' '}
                                    </td>
                                  </tr>
                                </>
                              ))
                            ) : (
                              <tr>
                                <td colspan="4">
                                  <Skeleton.Input style={{ width: 100 }} />
                                </td>
                              </tr>
                            )}{' '}
                          </>
                        </tbody>
                      </table>
                      {/** 
                      <p className="t_primary">
                        <span>Staff Name: </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${
                              bookingDetails.service_details[0].staffname
                                ? bookingDetails.service_details[0].staffname
                                : "No preference"
                            }`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}{" "}
                        </span>
                      </p>
*/}
                      {/** 
                      {bookingDetails.service_details &&
                      bookingDetails.service_details.length > 0 ? (
                        <>
                          <p className="t_primary">
                            <span>Service Name: </span>
                            <span>
                              {bookingDetails.service_details[0].services.map(
                                (service) => (
                                  <span>{service.language[0].servicename}</span>
                                )
                              )}
                            </span>
                          </p>
                          <p className="t_primary">
                            <span>Duration: </span>
                            <span>
                              {
                                bookingDetails.service_details[0].services[0]
                                  .price[0].duration
                              }{' '}
                              MIN
                            </span>
                          </p>

                          <p className="t_primary">
                            <span>Appointment </span>
                            <span>
                              {bookingDetails.service_details[0].service_date &&
                                moment(
                                  bookingDetails.service_details[0].service_date
                                ).format('YYYY-MM-DD')}{' '}
                              &{' '}
                              {bookingDetails.service_details[0].service_time
                                ? hoursAmPmData(
                                    bookingDetails.service_details[0]
                                      .service_time
                                  )
                                : ''}
                            </span>
                          </p>
                        </>
                      ) : (
                        ''
                      )}
                      */}
                    </Col>

                    <Col span={8}>
                      {/*Payment details */}
                      <h4>Payment Details</h4>
                      {bookingDetails && bookingDetails.discountvalue ? (
                        <p className="t_primary">
                          <span>Saloon Phone: </span>
                          <span>
                            {bookingDetails.id != undefined ? (
                              `${bookingDetails.discountvalue}`
                            ) : (
                              <Skeleton.Input style={{ width: 100 }} />
                            )}{' '}
                          </span>
                        </p>
                      ) : null}

                      <p className="t_primary">
                        <span>Price : </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${bookingDetails.subtotal} SAR`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}
                        </span>
                      </p>

                      <p className="t_primary">
                        <span>VAT Amount : </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${bookingDetails.vat_amount} SAR`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}
                        </span>
                      </p>
                      <p className="t_primary">
                        <span>Total Amount : </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${bookingDetails.totalcost} SAR`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}
                        </span>
                      </p>

                      {/* <p className="t_primary">
                        <span>Payment Type : </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${
                              PAYMENT_METHOD[
                                `${parseInt(bookingDetails.payment_method)}`
                              ]
                            }`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}{" "}
                        </span>
                      </p> */}
                      <p className="t_primary">
                        <span>Payment Status : </span>
                        <span>
                          {bookingDetails.id != undefined ? (
                            `${
                              bookingDetails.booking_status == 3 ||
                              bookingDetails.booking_status == 2
                                ? 'Refund'
                                : PAYMENT_STATUS[
                                    `${parseInt(bookingDetails.payment_status)}`
                                  ]
                            }`
                          ) : (
                            <Skeleton.Input style={{ width: 100 }} />
                          )}{' '}
                        </span>
                      </p>
                    </Col>
                  </Row>

                  {bookingDetails.id != undefined &&
                  bookingDetails.vendor_details ? (
                    <div className="map">
                      <Mymap
                        latitude={bookingDetails.vendor_details.latitude}
                        longitude={bookingDetails.vendor_details.longitude}
                      />{' '}
                    </div>
                  ) : (
                    <Skeleton.Input style={{ width: 100 }} />
                  )}

                  {/* 
                  
                  <p className="t_primary">
                    <span>Saloon Name: </span>
                    <span>
                      {bookingDetails.id != undefined &&
                      bookingDetails.vendor_details.language ? (
                        `${bookingDetails.vendor_details.language.vendorname}`
                      ) : (
                        <Skeleton.Input style={{ width: 100 }} />
                      )}{' '}
                    </span>
                  </p>
                   */}
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default BookingDetailsPage;
