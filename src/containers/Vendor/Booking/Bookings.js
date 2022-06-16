import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Spin,
  Modal,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { store } from "redux/store";
import actions from "redux/admin/bookingManagement/actions";
import "assets/css/dashboard.scss";
import DataTable from "helpers/datatable";
import moment from "moment";
import { getLocaleMessages, getLocalData } from "redux/helper";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const BookingManagement = (props) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [BookingSallon, setBookingSallon] = useState(0);
  const { bookingList } = useSelector((state) => state.Booking);
  console.log('bookingList', bookingList)
  const { loading } = useSelector((state) => state.Booking);
  const [bookingStatusLoader, setbookingStatusLoader] = useState(false);
  const [finalBookinglist, setfinalBookinglist] = useState([]);
  useEffect(() => {
    store.dispatch({
      type: actions.GET_VENDOR_BOOKING_LIST,
      id: getLocalData("id"),
    });
  }, ["bookingList"]);

  const { Option } = Select;

  bookingList &&
    bookingList.length > 0 &&
    bookingList.map((list, id) => {
      list.booking_process =
        list.booking_status == 1
          ? "Confirmed"
          : list.booking_status == 2
          ? "Late cancelled "
          : list.booking_status == 3
          ? "Cancelled"
          : list.booking_status == 4
          ? "Completed"
          : "----";
      // ? "Completed"
      // : list.booking_status == 3
      // ? "Pending"
      // : list.booking_status == 4
      // ? "Rejected"
      // : list.booking_status == 2
      // ? "Accepted"
      // : list.booking_status == 5
      // ? "Cancelled"
      // : "----";
      list.payment_process =
        list.payment_status == 0
          ? "Pending"
          : list.payment_status == 1
          ? "Paid"
          : "----";
      return list;
    });
  function handleChange(value, event, key) {
    setbookingStatusLoader(true);
    var dataSave = {
      id: BookingSallon,
      status: value,
      email: key.customerdetails.email,
      name: key.customerdetails.firstname,
    };
    store.dispatch({
      type: actions.UPDATE_VENDOR_BOOKING_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        setbookingStatusLoader(false);
        setIsModalVisible(false);
        store.dispatch({
          type: actions.GET_VENDOR_BOOKING_LIST,
          id: getLocalData("id"),
        });
      },
    });
  }

  function handleServiceStatusChange(value, event, key) {
    var dataSave = {
      id: BookingSallon,
      status: value,
      email: key.customerdetails.email,
      name: key.customerdetails.firstname,
    };
    store.dispatch({
      type: actions.UPDATE_VENDOR_BOOKING_SERVICE_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        store.dispatch({
          type: actions.GET_BOOKING_LIST,
        });
      },
    });
  }

  function handlePaymentStatusChange(value, event, key) {
    setbookingStatusLoader(true);
    var dataSave = {
      id: BookingSallon,
      payment_status: parseInt(value),
    };
    store.dispatch({
      type: actions.UPDATE_VENDOR_PAYMENT_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        setbookingStatusLoader(false);
        setIsModalVisible(false);
        store.dispatch({
          type: actions.GET_VENDOR_BOOKING_LIST,
          id: getLocalData("id"),
        });
      },
    });
  }
  const BookingPopUp = (params) => {
    setBookingSallon(params.id);
    setIsModalVisible(true);
  };

  const coulmns = [
    {
      title: "Booking No",
      dataIndex: "bookingno",
      key: "bookingno",
    },

    {
      title: "Appointment",
      dataIndex: "service_date",
      Key: "service_date",
      render: (value, item, index) => {
        return `${
          item.bookingtime[0].service_date
            ? item.bookingtime[0].service_date
            : item.service_date
        } - 
        ${
          item.bookingtime[0].service_time
            ? moment(item.bookingtime[0].service_time, "h:mm:ss ").format(
                "hh:mm A"
              )
            : item.service_time
        }`;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "vendorname",
      key: "vendorname",
      render: (text, record) => {
        var cname = JSON.parse(record.customerdetails);
        return <Space size="middle">{cname[0].firstname}</Space>;
      },
    },
    {
      title: "Customer Number",
      dataIndex: "contactnumber",
      key: "contactnumber",
      render: (text, record) => {
        var contactnumber = JSON.parse(record.customerdetails);
        return <Space size="middle">{contactnumber[0].contactnumber}</Space>;
      },
    },
    {
      title: "Status",
      dataIndex: "booking_process",
      key: "booking_process",
      render: (text, record) => {
        if (record.booking_process == "Pending")
          return <Space size="middle">{"Confirmed"}</Space>;
        else return <Space size="middle">{record.booking_process}</Space>;
      },
    },

    {
      title: "Action",
      dataIndex: "name",
      key: "x",
      render: (text, record) => {
        var record = record;
        return (
          <Space size="middle">
            {
              <EyeOutlined
                id={record.id}
                onClick={(e) => {
                  let id = parseInt(record.id);
                  Approve(id);
                }}
              />
            }
          </Space>
        );
      },
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const Approve = (id) => {
    setBookingSallon(id);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (bookingList) {
      setfinalBookinglist(bookingList);
    }
  }, [bookingList]);

  const handleChangeBookingno = (value) => {
    var bookno = value.target.value;
    if (bookno) {
      var filterbookingno = bookingList.filter((data) =>
        data.bookingno.includes(bookno)
      );
      setfinalBookinglist(filterbookingno);
    } else {
      setfinalBookinglist(bookingList);
    }
  };

  const handleChangeCustomername = (value) => {
    var bookname = value.target.value;
    if (bookname) {
      var filterbookingno = bookingList.filter((data) =>
        JSON.parse(data.customerdetails)[0]
          .firstname.toLowerCase()
          .includes(bookname.toLowerCase())
      );
      setfinalBookinglist(filterbookingno);
    } else {
      setfinalBookinglist(bookingList);
    }
  };

  const handleChangeMobileno = (value) => {
    var bookmobileno = value.target.value;
    if (bookmobileno) {
      var filterbookingno = bookingList.filter((data) =>
        JSON.parse(data.customerdetails)[0].contactnumber.includes(bookmobileno)
      );
      setfinalBookinglist(filterbookingno);
    } else {
      setfinalBookinglist(bookingList);
    }
  };
  const handleChangestatus = (value) => {
    var bookstatus = value;
    if (bookstatus !== "All") {
      var filterbookingno = bookingList.filter((data) =>
        data.booking_process.includes(bookstatus)
      );
      setfinalBookinglist(filterbookingno);
    } else if (bookstatus == "All") {
      setfinalBookinglist(bookingList);
    } else {
      setfinalBookinglist(bookingList);
    }
  };

  const me = bookingList.map((item) => item);
  console.log("111111", me, bookingList, bookingList, finalBookinglist);

  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={24}
          md={24}
          lg={24}
          className="dashboard-content mg-auto vendor"
        >
          <Card
            title="Bookings"
            extra={
              <>
                <div className="arl_filter">
                  <Input
                    className="w_280"
                    placeholder="Booking No"
                    onChange={handleChangeBookingno}
                  />
                  <Input
                    className="w_280"
                    placeholder="Customer Name"
                    onChange={handleChangeCustomername}
                  />
                  <Input
                    className="w_280"
                    placeholder="Customer Number"
                    onChange={handleChangeMobileno}
                  />
                  <Select
                    className="w_280"
                    placeholder="Status"
                    onChange={(value) => handleChangestatus(value)}
                  >
                    <Option value="All">All</Option>
                    <Option value="Late cancelled">Late Cancelled</Option>
                    <Option value="Confirmed">Confirmed</Option>
                    <Option value="Cancelled">Cancelled</Option>
                    <Option value="Completed">Completed</Option>
                  </Select>
                </div>
              </>
            }
          >
            <Spin size="large" spinning={loading}>
              <DataTable columns={coulmns} dataSource={finalBookinglist} />
            </Spin>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Booking Details"
        centered
        className="create_category_modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={750}
      >
        <div>
          <Spin spinning={bookingStatusLoader} size="large">
            {bookingList.map((key, index) => {
              const things = JSON.parse(key.vendor_details);
              const customerdetailsthings = JSON.parse(key.customerdetails);
              const bookingtime = key.bookingtime[0];
              const service_details =
                bookingtime.service_details && JSON.parse(bookingtime.service_details);
              const staff_details =
                bookingtime.staff_details && JSON.parse(bookingtime.staff_details);
              if (key.id == BookingSallon) {
                return (
                  <div
                    className="booking_details_content"
                    key={`${key}${index}`}
                  >
                    <p className="odd_row">
                      <span className="leftside">Booking No : </span>
                      <span className="right">{`${key.bookingno}`}</span>
                    </p>
                    <p>
                      <span className="leftside">Saloon :</span>
                      <span className="right">
                        {console.log(
                          "1111aaaa",
                          JSON.parse(key.vendor_details),
                          customerdetailsthings,
                          bookingtime,
                          service_details,
                          staff_details
                        )}
                        {things.map((item, index) => (
                          <span key={index}>{item.language[0].vendorname}</span>
                        ))}
                      </span>
                    </p>
                    <p className="odd_row">
                      <span className="leftside">Price : </span>
                      <span className="right">{`${key.actualrate}`} SAR</span>
                    </p>
                    <p>
                      <span className="leftside">Sub Total :</span>{" "}
                      <span className="right">{`${key.subtotal}`} SAR</span>
                    </p>
                    <p className="odd_row">
                      <span className="leftside">VAT % :</span>{" "}
                      <span className="right">{`${key.vat_percent ?key.vat_percent :0}`}</span>
                    </p>
                    <p>
                      <span className="leftside">VAT Amount :</span>{" "}
                      <span className="right">{`${key.vat_amount}`} SAR</span>
                    </p>
                    <p className="odd_row">
                      <span className="leftside">Total :</span>{" "}
                      <span className="right">{`${key.totalcost}`} SAR</span>
                    </p>
                    <p>
                      <span className="leftside">Payment Method :</span>{" "}
                      <span className="right">
                        {/* {`${key.payment_method}`} */}
                        Online
                      </span>
                    </p>

                    <p className="odd_row">
                      <span className="leftside">Voucher Code :</span>{" "}
                      <span className="right">
                        {`${key.voucher_code}` !== null &&
                        `${key.voucher_code}` !== "null" &&
                        `${key.voucher_code}` !== undefined &&
                        `${key.voucher_code}` !== "undefined"
                          ? `${key.voucher_code}`
                          : ""}
                      </span>
                    </p>
                    <h5>Customer Details</h5>
                    <p className="odd_row">
                      <span className="leftside">Name :</span>
                      <span className="right">
                        {customerdetailsthings[0].firstname} {"  "}{" "}
                        {customerdetailsthings[0].lastname}
                      </span>
                    </p>
                    <p>
                      <span className="leftside">Email :</span>
                      <span className="right">
                        {customerdetailsthings[0].email}
                      </span>
                    </p>
                    <p className="odd_row">
                      <span className="leftside">Mobile No :</span>
                      <span className="right">
                        {customerdetailsthings[0].contactnumber}
                      </span>
                    </p>

                    <p>
                      <span className="leftside">Status :</span>{" "}
                      <span className="right">
                        <Select
                          defaultValue={`${key.booking_status}`}
                          style={{ width: 120 }}
                          onChange={(value, event) =>
                            handleChange(value, event, key)
                          }
                        >
                          <Option value="2">Late Cancelled</Option>
                          <Option value="1">Confirmed</Option>
                          <Option value="3">Cancelled</Option>
                          <Option value="4">Completed</Option>
                          {/* <Option value="1">Completed</Option> */}
                        </Select>
                      </span>
                    </p>
                    <p className="odd_row">
                      <span className="leftside">Payment Status :</span>{" "}
                      <span className="right">
                        {" "}
                        {/* Paid */}
                        <Select
                          defaultValue={`${key.payment_status}`}
                          style={{ width: 120 }}
                          onChange={(value, event) =>
                            handlePaymentStatusChange(value, event, key)
                          }
                        >
                          {/* <Option value="0">Pending</Option> */}
                          <Option value="1">Paid</Option>
                          <Option value="0">Refund</Option>
                          {/* <Option value="2">Failed</Option> */}
                        </Select>
                      </span>
                    </p>
                    {service_details && service_details[0] && <h5>Service Details</h5>}

                    {service_details && key.bookingtime && key.bookingtime.length > 0  && key.bookingtime.map((booking, index) => {
                      return (<>
                        <p className="odd_row">
                          <span className="leftside">Appointment:</span>{" "}
                          <span className="right">
                            {`${bookingtime.service_date}` +
                              " & " +
                              `${moment()
                                .utc(false)
                                .format(booking?.service_time, "hh:mm A")}`}
                            {/* `${servic_key.service_time}`} */}
                          </span>
                        </p>
                        <p>
                          <span className="leftside">Service Name :</span>{" "}
                          <span className="right">
                            {" "}
                            {`${booking && booking.service[0] && booking.service[0].servicelang[0].servicename}`}
                          </span>
                        </p>
                        <p className="odd_row">
                          <span className="leftside">Staff Name : </span>
                          <span className="right">
                            {staff_details && staff_details[0].firstname}{" "}
                            {staff_details && staff_details[0].lastname}{" "}
                          </span>
                        </p>
                      </>)
                    } )}
                  </div>
                );
              }
            })}
          </Spin>
        </div>
      </Modal>
    </div>
  );
};

export default BookingManagement;
