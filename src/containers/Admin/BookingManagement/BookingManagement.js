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
  Drawer,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { store } from "redux/store";
import actions from "redux/admin/bookingManagement/actions";
import "assets/css/dashboard.scss";
import moment from "moment";
import DataTable from "helpers/datatable";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";

const BookingManagement = (props) => {
  const { Option } = Select;
  useEffect(() => {
    store.dispatch({
      type: actions.GET_BOOKING_LIST,
    });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [BookingSallon, setBookingSallon] = useState(0);
  const { bookingList, alertMake } = useSelector((state) => state.Booking);
  console.log("this is the value of the data", bookingList);
  const [paymentMethods] = useState(["", "COD", "Payment Gateway"]);
  const [Bookingstatusloader, setBookingstatusloader] = useState(false);
  const { loading } = useSelector((state) => state.Booking);
  const [finalBookinglist, setfinalBookinglist] = useState([]);

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
      return list;
    });

  function handleChange(value, event, key) {
    var dataSave = {
      id: BookingSallon,
      status: value,
      email: key.customerdetails.email,
      name: key.customerdetails.firstname,
    };
    setBookingstatusloader(true);
    store.dispatch({
      type: actions.UPDATE_VENDOR_BOOKING_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        setIsModalVisible(!isModalVisible);
        store.dispatch({
          type: actions.GET_BOOKING_LIST,
        });
        setBookingstatusloader(false);
      },
    });
  }

  function handlePaymentStatusChange(value, event, key) {
    var dataSave = {
      id: BookingSallon,
      payment_status: parseInt(value),
    };
    setBookingstatusloader(true);
    store.dispatch({
      type: actions.UPDATE_VENDOR_PAYMENT_STATUS,
      payload: dataSave,
      callBackAction: (status) => {
        store.dispatch({
          type: actions.GET_BOOKING_LIST,
        });
        setBookingstatusloader(false);
      },
    });
  }

  const coulmns = [
    {
      title: "Booking No",
      dataIndex: "bookingno",
      key: "bookingno",
    },
    // {
    //   title: 'Payment Type',
    //   dataIndex: 'payment_method',
    //   key: 'payment_method',
    // },
    {
      title: "Appointment",
      dataIndex: "service_date",
      key: "service_date",
      render: (value, item, index) => {
         //console.log("this is the value of dateTime", item);
       // var dateTime = item.created_at.split("T");
        // var date = dateTime[0];
        // var Time = dateTime[1].split(".");
        // return `${date} -- ${Time[0]}`;
        //return `${item.service_details[0].service_date} - ${item.service_details[0].service_time}`;
        return `${item.bookingtime[0].service_date ? item.bookingtime[0].service_date : item.service_date} - 
        ${
          item.bookingtime[0].service_time ? moment(item.bookingtime[0].service_time,'h:mm:ss ').format("hh:mm A") :item.service_time
        }`;
      },
    },
    // {
    //   title: 'Payment Status',
    //   dataIndex: 'payment_status',
    //   key: 'payment_status',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {text.payment_status ? <a>Completed</a> : <a>Pending</a>}
    //     </Space>
    //   ),
    // },
    {
      title: "Customer Name",
      dataIndex: "vendorname",
      key: "vendorname",
      render: (text, record) => {
        //console.log("record.customerdetails",record)
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
      title: "Salon Name",
      dataIndex: "vendorname",
      key: "vendorname",
      render: (text, record) => {
        var vendorname =
          record.bookingtime[0].service[0].servicelang[0].vendorlang[0].vendorname
        return <Space size="middle">{vendorname}</Space>;
      },
    },
    {
      title: "Status",
      dataIndex: "booking_process",
      key: "booking_process",
    },
    // {
    //   title: 'Saloon Name',
    //   dataIndex: 'vendorname',
    //   key: 'vendorname',
    //   render: (text, record) => {
    //     var vendor = record.vendor_details.language;
    //     return <Space size="middle">{vendor.vendorname}</Space>;
    //   },
    // },
    // {
    //   title: 'Staff Name',
    //   dataIndex: 'staff_details',
    //   key: 'staff_details',
    //   render: (text, record) => {
    //     var staff = 'Unavailable';
    //     if (record.staff_details) {
    //       staff = record.staff_details.firstname;
    //     }
    //     return <Space size="middle">{staff}</Space>;
    //   },
    // },

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
        JSON.parse(data.customerdetails)[0].firstname
          .toLowerCase()
          .includes(bookname.toLowerCase())
      );
      setfinalBookinglist(filterbookingno);
    } else {
      setfinalBookinglist(bookingList);
    }
  };

  const handleChangeSalonname = (value) => {
    var salonname = value.target.value;
    if (salonname) {
      var filterbookingno = bookingList.filter((data) =>
      (data.bookingtime.length &&
      data.bookingtime[0].service.length &&
      data.bookingtime[0].service[0].servicelang.length &&
      data.bookingtime[0].service[0].servicelang[0].vendorlang.length &&
      data.bookingtime[0].service[0].servicelang[0].vendorlang[0].vendorname ?
      data.bookingtime[0].service[0].servicelang[0].vendorlang[0].vendorname : "")
          .toLowerCase()
          .includes(salonname.toLowerCase())
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

  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto"
        >
          <Card
            title="Booking"
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
                    placeholder="Salon Name"
                    onChange={handleChangeSalonname}
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
            <Row>
              <Drawer
                title="Booking Details"
                className="create_category_modal"
                visible={isModalVisible}
                onOk={handleOk}
                onClose={handleCancel}
                width={700}
              >
                {console.log("aaaaa", bookingList)}
                {bookingList.map((key, index) => {
                  if (key.id == BookingSallon) {
                    return (
                      <Spin size="large" spinning={Bookingstatusloader}>
                        <div
                          className="booking_details_content"
                          key={`${key}${index}`}
                        >
                          <p>
                            <span className="leftside">Booking No : </span>
                            <span className="right">{`${key.bookingno}`}</span>
                          </p>
                          <p>
                            <span className="leftside">Saloon :</span>
                            <span className="right">
                              {`${key.bookingtime[0].service[0].servicelang[0].vendorlang[0].vendorname ? 
                              key.bookingtime[0].service[0].servicelang[0].vendorlang[0].vendorname : ""}`}
                            </span>
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
                              {" "}
                              {`${key.subtotal}`} SAR
                            </span>
                          </p>
                          <p>
                            <span className="leftside">VAT % :</span>{" "}
                            <span className="right">
                              {`${key.vat_percent}` > 0
                                ? `${key.vat_percent}`
                                : "0"}{" "}
                            </span>
                          </p>
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
                            <span className="leftside">Payment Method :</span>{" "}
                            <span className="right">
                              Online
                              {/*`${paymentMethods[key.payment_method]}`*/}
                            </span>
                          </p>

                          <p>
                            <span className="leftside">Voucher Code :</span>{" "}
                            <span className="right">
                              { `${key.voucher_code ? key.voucher_code
                                : '-'}`}
                            </span>
                          </p>
                          <h5>Customer Details</h5>
                          <p>
                            <span className="leftside">Name :</span>
                            <span className="right">
                              {`${ key.customerdetails && JSON.parse(key.customerdetails)[0].firstname}${JSON.parse(key.customerdetails)[0].lastname}`}
                            </span>
                          </p>
                          <p>
                            <span className="leftside">Email :</span>
                            <span className="right">
                              {`${key.customerdetails && JSON.parse(key.customerdetails)[0].email}`}
                            </span>
                          </p>
                          <p>
                            <span className="leftside">Contact No :</span>
                            <span className="right">
                              {`${key.customerdetails && JSON.parse(key.customerdetails)[0].contactnumber}`}
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
                                <Option value="2">Late cancelled</Option>
                                <Option value="1">Confirmed</Option>
                                <Option value="3">Cancelled</Option>
                                <Option value="4">Completed</Option>
                                {/* <Option value="1">Confirmed</Option> */}
                              </Select>
                            </span>
                          </p>
                          <p>
                            <span className="leftside">Payment Status :</span>
                            <span className="right">
                              <Select
                                // defaultValue={`${key.payment_status}`}
                                defaultValue="1"
                                style={{ width: 120 }}
                                onChange={(value, event) =>
                                  handlePaymentStatusChange(value, event, key)
                                }
                              >
                                <Option value="0">Refund</Option>
                                <Option value="1">Paid</Option>
                              </Select>
                            </span>
                          </p>

                          <h5>Service Details</h5>

                          {key.bookingtime.map(
                            (servic_key, servic_index) => {
                              /* return ('Date :'+`${servic_key.service_date}`+'{<br/>}***Service Name : '+`${servic_key.service_details[0].language.servicename}` )*/
                              return (
                                <>
                                  <p>
                                    <span className="leftside">
                                      Appointment:
                                    </span>{" "}
                                    <span className="right">
                                      {" "}
                                      {`${servic_key.service_date}` +
                                        " & " +
                                        // `${servic_key.service_time}` +
                                        // ":00"
                                        `${moment(servic_key.service_time,'h:mm:ss ').format("hh:mm A")}`}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="leftside">
                                      Service Name :
                                    </span>{" "}
                                    <span className="right">
                                      {" "}
                                      {`${servic_key.service[0].servicelang[0].servicename}`}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="leftside">
                                      Staff Name :{" "}
                                    </span>
                                    <span className="right">{`${
                                      servic_key.staff_details &&
                                      JSON.parse(servic_key.staff_details)[0].firstname+" "+
                                      JSON.parse(servic_key.staff_details)[0].lastname
                                    }`}</span>
                                  </p>
                                  {/* <p>
                                    <span className="leftside">
                                      Price 
                                    </span>{" "}
                                    <span className="right">{`SAR ${servic_key.service_details[0].price[0].price}`}</span>
                                  </p> */}
                                </>
                              );
                            }
                          )}
                        </div>
                      </Spin>
                    );
                  }
                })}
              </Drawer>
              <Col span={24} className="inner-content">
                <Spin size="large" spinning={loading}>
                  <DataTable columns={coulmns} dataSource={finalBookinglist} rowModify={true} field={"BOOKING_STATUS"}/>
                </Spin>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookingManagement;
