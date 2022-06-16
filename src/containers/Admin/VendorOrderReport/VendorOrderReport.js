import React, { useEffect, useState } from "react";
import {
  Statistic,
  Row,
  Col,
  Card,
  PageHeader,
  Button,
  Table,
  DatePicker,
  Space,
  Spin,
  Modal,
  Select,
  Input,
} from "antd";
import {
  UsergroupAddOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckOutlined,
  MoneyCollectOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import actions from "redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { store } from "redux/store";
import "assets/css/dashboard.scss";
import DataTable from "helpers/datatable";
import timeActions from "redux/admin/Timeslot/actions";
import { getLocaleMessages, getLocalData } from "redux/helper";

const Report = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { bookingList, alertMake } = useSelector((state) => state.Booking);
  const [BookingSallon, setBookingSallon] = useState(0);
  const { Option } = Select;
  const { loading } = useSelector((state) => state.Booking);
  const [isSelect, setSelect] = useState();
  const coulmns = [
    {
      title: "Booking No",
      dataIndex: "bookingno",
      key: "bookingno",
    },
    {
      title: "Payment Type",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (text, record) => (
        <Space size="middle">
          {text.payment_status ? <a>Completed</a> : <a>Pending</a>}
        </Space>
      ),
    },
    {
      title: "Booking Status",
      dataIndex: "booking_process",
      key: "booking_process",
    },
    {
      title: "Saloon Name",
      dataIndex: "vendorname",
      key: "vendorname",
      render: (text, record) => {
        var vendor = record.vendor_details.language;
        return <Space size="middle">{vendor.vendorname}</Space>;
      },
    },
    {
      title: "Booking Date",
      dataIndex: "service_date",
      key: "service_date",
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
              <CheckOutlined
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

  bookingList &&
    bookingList.length > 0 &&
    bookingList.map((list, id) => {
      list.booking_process =
        list.booking_status == 3
          ? "Pending"
          : list.booking_status == 2
          ? "Rejected"
          : list.booking_status == 1
          ? "Accepted"
          : "----";
      return list;
    });

  function handleChange(value, event, key) {
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
        store.dispatch({
          type: actions.GET_BOOKING_LIST,
        });
      },
    });
  }
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

  // const columns = [
  //   {
  //     title: "Orders",
  //     dataIndex: "orders",
  //     key: "orders",
  //   },
  //   {
  //     title: "count",
  //     dataIndex: "number",
  //     key: "number",
  //   },
  // ];
  // const data = [
  //   {
  //     key: "10",
  //     orders: "Today Orders",
  //     number: 20,
  //   },
  //   {
  //     key: "1",
  //     orders: "Today Orders",
  //     number: 20,
  //   },
  // ];

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  // const monthFormat = "YYYY/MM";
  // const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const [Availability, setAvailability] = useState(0);
  const {
    timeVisible,
    VendorTimeslot,
    timeDetails,
    vendorVisible,
    vendorDetails,
  } = useSelector((state) => state.AdminTimeslot);

  useEffect(() => {
    if (timeVisible) {
      setAvailability(vendorDetails[0].id);
      setSelect(vendorDetails[0].vendorname);
      store.dispatch({
        type: timeActions.GET_ADMIN_TIME_LIST,
        vendorid: vendorDetails[0].id,
      });
    }

    if (vendorVisible) {
      store.dispatch({
        type: timeActions.GET_ADMIN_VENDOR_LIST,
        vendorid: getLocalData("id"),
      });
    }
  }, [VendorTimeslot, vendorDetails]);
  const handleChangeService = (value) => {
    setAvailability(value);
    store.dispatch({
      type: timeActions.GET_ADMIN_TIME_LIST,
      vendorid: value,
    });
  };

  return (
    <div>
      <Row>
      <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
          <div className="site-page-header-ghost-wrapper">
            <PageHeader title="Saloon Order Report" />
          </div>
          <Row className="dashboard">
            <Col span={8}>
              <Card className="customer-count">

              <UserOutlined />
                <Statistic title="Total Bookings" value={35} />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="vendor-counter">
              <UsergroupAddOutlined />
                <Statistic title="Total Commision" value={25} />

              </Card>
            </Col>
            <Col span={8}>
              <Card className="vendor-counter">
              <MoneyCollectOutlined style={{ background: "blueviolet" }} />
                <Statistic title="Hotel Earning" value={10000000} />

              </Card>
            </Col>
          </Row>
          {/* <Row className="dashboard mg-20 export-lg">
            <Col span={24}></Col>

            <Button
              type="primary"
              htmlType="create"
              className="save-btn export-btn"
            >
              Export
            </Button>
          </Row> */}
        </Col>
        <Col span={24} className="dashboard-content">
          <Card title="Saloon Report List">
            <Row style={{ marginBottom: "2%" }}>
              <Col span={6}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Filter"
                  onChange={handleChangeService}
                >
                  {vendorDetails &&
                    vendorDetails.length > 0 &&
                    vendorDetails.map((list, id) => {
                      return (
                        <option value={list.id} key={id}>
                          {list.vendorname}
                        </option>
                      );
                    })}
                </Select>
              </Col>
              <Col span={2} offset={1}>
                {/* <Button type="primary" htmlType="create" className="save-btn">
                  Filter
                </Button> */}
              </Col>
            </Row>
            <Row>
              <Modal
                title="Details"
                className="details-modal BookingManagementAdmin"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Row>
                  {bookingList.map((key, index) => {
                    if (key.id == BookingSallon) {
                      return (
                        <Col
                          className="details-content"
                          sm={24}
                          md={24}
                          key={`${key}${index}`}
                        >
                          <label>
                            <span>Saloon :</span>{" "}
                            {`${key.vendor_details.language["vendorname"]}${index}`}
                          </label>
                          <label>
                            <span>Price : </span>
                            {`${key.actualrate}`}
                          </label>
                          <label>
                            <span>Sub Total :</span> {`${key.subtotal}`}
                          </label>
                          <label>
                            <span>Total :</span> {`${key.totalcost}`}
                          </label>
                          <label>
                            <span>VAT % :</span> {`${key.vat_percent}`}
                          </label>
                          <label>
                            <span>VAT Amount :</span> {`${key.vat_amount}`}
                          </label>
                          <label>
                            <span>Staff Name : </span>
                            {`${key.staff_details.firstname}`}
                          </label>
                          <label>
                            <span>Booking No : </span>
                            {`${key.bookingno}`}
                          </label>
                          <label>
                            <span>Payment Method :</span>{" "}
                            {`${key.payment_method}`}
                          </label>
                          <label>
                            <span>Category :</span>{" "}
                            {`${key.category_details[0].language.categoryname}`}
                          </label>
                          <label>
                            <span>Service :</span>{" "}
                            {`${key.service_details[0].language.servicename}`}
                          </label>
                          <label>
                            <span>Vouchec Code :</span>{" "}
                            {`${key.voucher_code}` != null
                              ? `${key.voucher_code}`
                              : "Nill"}
                          </label>
                          <h5 style={{ marginBottom: "3%" }}>
                            <span>Customer Details :</span>
                          </h5>
                          <label>
                            <span>Name :</span>
                            {`${key.customerdetails.firstname}${key.customerdetails.lastname}`}
                          </label>
                          <label>
                            <span>Email :</span>
                            {`${key.customerdetails.email}`}
                          </label>
                          <label>
                            <span>Contact No :</span>
                            {`${key.customerdetails.contactnumber}`}
                          </label>

                          <label>
                            <span>Status :</span>{" "}
                            <Select
                              defaultValue={`${key.booking_status}`}
                              style={{ width: 120 }}
                              onChange={(value, event) =>
                                handleChange(value, event, key)
                              }
                            >
                              <Option value="3">Pending</Option>
                              <Option value="1">Accept</Option>
                              <Option value="2">Reject</Option>
                            </Select>
                          </label>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </Modal>
              <Col span={24} className="inner-content">
                <Spin size="large" spinning={loading}>
                  <DataTable columns={coulmns} dataSource={bookingList} />
                </Spin>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Report;

// import React from 'react';
// import { Statistic, Row, Col, Card,  Input, PageHeader, Button, Table, DatePicker, Space } from 'antd';
// import { UsergroupAddOutlined, UserOutlined  } from '@ant-design/icons';
// import actions from 'redux/auth/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// import 'assets/css/dashboard.scss';
// const VendorOrderReport = () =>{
//     const dispatch = useDispatch();
//     const { subLang, loader } = useSelector(state=>state.Auth);
//     const columns = [
//       {
//         title: "Orders",
//         dataIndex: "orders",
//         key: "orders",
//       },
//       {
//         title: "count",
//         dataIndex: "number",
//         key: "number",
//       },
//     ];
//     const data = [
//       {
//         key: "10",
//         orders: "Today Orders",
//         number: 20,
//       },
//       {
//         key: "1",
//         orders: "Today Orders",
//         number: 20,
//       },
//     ];

//     const { RangePicker } = DatePicker;

//     const dateFormat = 'YYYY/MM/DD';
//     const monthFormat = 'YYYY/MM';

//     const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

//     const customFormat = value => `custom format: ${value.format(dateFormat)}`;

//     return <div>
//         <Row>
//         <Col offset={3} xs={24} md={24} lg={24} className="dashboard-content mg-auto export-lg" >
//             <div className="site-page-header-ghost-wrapper">
//               <PageHeader title="Admin Order Report" />
//             </div>
//             <Row className="dashboard">
//               <Col span={6}>
//                 <Card className="customer-count">
//                   <Statistic title="Total Bookings" value={35} />
//                   <UserOutlined />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card className="vendor-counter">
//                   <Statistic title="Total Commision" value={25} />
//                   <UsergroupAddOutlined />
//                 </Card>
//               </Col>

//             </Row>
//             <Row className="dashboard pd-l-20">
//               <Col span={6} className="mg-20">
//                   <h3>Vendor</h3>
//                   <Input placeholder=""   />
//               </Col>
//               <Col span={6} className="mg-20">
//                   <h3>Date and Time</h3>
//               <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
//               </Col>
//             </Row>
//             <Row className="dashboard pd-l-20">
//             <Col span={6}>
//             <Button type="primary" htmlType="create" className="save-btn">
//             Export
//             </Button>
//             </Col>
//             </Row>
//           </Col>
//           </Row>
//     </div>
// }

// export default VendorOrderReport;
