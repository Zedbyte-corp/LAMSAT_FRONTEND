import React, { useEffect, useState } from 'react';
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
} from 'antd';
import {
  UsergroupAddOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckOutlined,
  MoneyCollectOutlined,
  ZoomOutOutlined,
  EyeOutlined
} from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'redux/store';
import actions from 'redux/admin/bookingManagement/actions';
import timeActions from 'redux/admin/Timeslot/actions';
import 'assets/css/dashboard.scss';
import DataTable from 'helpers/datatable';
import Export from '../export/Export';
const { RangePicker } = DatePicker;

const Report = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { bookingList, reportBookingList, alertMake } = useSelector(
    (state) => state.Booking
  );
  const [BookingSallon, setBookingSallon] = useState(0);
  const [Sum, setSum] = useState(0);
  const [SallonId, setSallonId] = useState(0);
  const { Option } = Select;
  const { loading } = useSelector((state) => state.Booking);
  const { vendorDetails } = useSelector((state) => state.AdminTimeslot);
  const [exportBooking, setexportBooking] = useState();
  //var finalBookinglist = '';
  const [finalBookinglist, setfinalBookinglist] = useState([]);

  const [datefilter, setdatefilter] = useState(false);
  const [filterstartdate, setfilterstartdate] = useState("");
  const [filterenddate, setfilterenddate] = useState("");

  var SumTotal = [];
  useEffect(() => {
    // store.dispatch({
    //   type: actions.GET_BOOKING_LIST,
    // });
    store.dispatch({
      type: actions.GET_BOOKING_LIST_REPORT_ADMIN,
    });
    store.dispatch({
      type: timeActions.GET_ADMIN_VENDOR_LIST,
    });
  }, []);

  const coulmns = [
    {
      title: 'Date',
      dataIndex: 'bookingdate',
      key: 'bookingdate',
    },
    {
      title: 'Booking No',
      dataIndex: 'bookingno',
      key: 'bookingno',
    },
    {
      title: 'Salon No',
      dataIndex: 'vendornumber',
      key: 'vendornumber',
    },    
    {
      title: 'Salon Price',
      dataIndex: 'saloonservice_price',
      key: 'saloonservice_price',
    },
    {
      title: 'Salon VAT',
      dataIndex: 'saloonservice_vat',
      key: 'saloonservice_vat',
    },
    {
      title: 'Admin Commission',
      dataIndex: 'admin_commision',
      key: 'admin_commision',
    },
    {
      title: 'Admin VAT',
      dataIndex: 'admin_vat',
      key: 'admin_vat',
    },
    {
      title: 'Service Total Price',
      dataIndex: 'service_total_price',
      key: 'service_total_price',
    },
    {
      title: 'Total VAT',
      dataIndex: 'total_vat',
      key: 'total_vat',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'x',
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

  // reportBookingList &&
  //   reportBookingList.length > 0 &&
  //   reportBookingList.map((list, id) => {
  //     list.booking_process =
  //       list.booking_status == 4
  //         ? "Completed"
  //         : list.booking_status == 3
  //         ? "Pending"
  //         : list.booking_status == 2
  //         ? "Rejected"
  //         : list.booking_status == 1
  //         ? "Accepted"
  //         : "----";

  //     return list;
  //   });

  // if (SallonId == 0 && reportBookingList && reportBookingList.length > 0) {
  //   finalBookinglist =
  //     SallonId == 0 &&
  //     reportBookingList &&
  //     reportBookingList.length > 0 &&
  //     reportBookingList.filter((list1) => list1.booking_status == 4);
  // } else {
  //   finalBookinglist =
  //     SallonId != 0 &&
  //     reportBookingList &&
  //     reportBookingList.length > 0 &&
  //     reportBookingList.filter(
  //       (list1) => list1.booking_status == 4 && list1.vendorid == SallonId
  //     );
  // }

  /*
    finalBookinglist = SallonId != 0 && bookingList && bookingList.length > 0 && bookingList.filter(list1 => list1.booking_status == 4 &&  1 ) */

  // var sum = 0;

  // finalBookinglist &&
  //   finalBookinglist.length > 0 &&
  //   finalBookinglist.map((list, id) => {
  //     list.booking_process =
  //       list.booking_status == 4
  //         ? "Completed"
  //         : list.booking_status == 3
  //         ? "Pending"
  //         : list.booking_status == 2
  //         ? "Rejected"
  //         : list.booking_status == 1
  //         ? "Accepted"
  //         : "----";
  //     SumTotal.push(parseInt(list["totalcost"]));

  //     //  setSum(sum);
  //     return list;
  //   });

  // console.log(
  //   "this is the value of the final booking details",
  //   finalBookinglist
  // );
  // console.log("this is the value of the booking booking details", bookingList);

  const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);

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

  const handleChangeSaloonno = (value) => {
    //setSallonId(value);
    var Salonno = value.target.value;
    if(Salonno)
    {
      var filtersaloonid = reportBookingList.filter(data=> data.vendornumber && (data.vendornumber).includes(Salonno));
      setfinalBookinglist(filtersaloonid);
    } else {
      setfinalBookinglist(reportBookingList);
    }
  };

  const handleChangeBookingno = (value) => {
    //setSallonId(value);
    var bookno = value.target.value;
    if(bookno)
    {
      var filterbookingno = reportBookingList.filter(data=> (data.bookingno).includes(bookno));
      setfinalBookinglist(filterbookingno);
    } else {
      setfinalBookinglist(reportBookingList);
    }
  };

  useEffect(()=>{
    if(reportBookingList)
    {
      setfinalBookinglist(reportBookingList)
    }
    if(datefilter){
      var datefilt = reportBookingList.filter(data => 
      moment(data.bookingdate).format("DD-MM-YYYY") >=  moment(filterstartdate).format("DD-MM-YYYY") &&
      moment(data.bookingdate).format("DD-MM-YYYY") <=  moment(filterenddate).format("DD-MM-YYYY") 
      )
      setfinalBookinglist(datefilt)
     // console.log("dates",datefilt)
    }
  },[reportBookingList])

  const handleChangeService = (value) => {
    setSallonId(value);
  };
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

  // if (SallonId == 0 && reportBookingList && reportBookingList.length > 0) {
  //   finalBookinglist = reportBookingList;
  // } else {
  //   finalBookinglist =
  //     SallonId != 0 &&
  //     reportBookingList &&
  //     reportBookingList.length > 0 &&
  //     reportBookingList.filter(
  //       (list1) => list1.service_details[0].vendorid == SallonId
  //     );
  // }
  // console.log(
  //   "this si the value od the reporttttt finalBookinglist",
  //   finalBookinglist,
  //   reportBookingList.length > 0 &&
  //     reportBookingList[0].service_details[0].vendorid,
  //   SallonId
  // );
  useEffect(() => {
    if (finalBookinglist && finalBookinglist.length > 0) {
      var newData = finalBookinglist.map((list) => {
        return {
          service_date: list.bookingdate,
          bookingno: list.bookingno,
          servicename: list.service_details[0].language[0].servicename,
          name: `${list.customerdetails[0].firstname} ${list.customerdetails[0].lastname}`,
          saloonservice_price: list.saloonservice_price,
          saloonservice_vat: list.saloonservice_vat,
          admin_commision: list.admin_commision,
          admin_vat: list.admin_vat,
          service_total_price: list.service_total_price,
          total_vat: list.total_vat,
          total_amount: list.totalAmount,
        };
      });
      setexportBooking(newData);
    }
  }, [finalBookinglist]);
  // console.log(
  //   "this is the value of the data Listtt",
  //   reportBookingList,
  //   SallonId
  // );

  //const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY/MM/DD';
  // const monthFormat = "YYYY/MM";
  // const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;

  function onChangeDate(value) {
    if(value)
    {
      var sdate=moment(value[0]).format("DD-MM-YYYY")
      var edate=moment(value[1]).format("DD-MM-YYYY")
      //console.log('onOk: ', sdate, edate);
      store.dispatch({
        type: actions.GET_ADMIN_REPORT_FILTER_LIST,
        payload: {
          StartDate: sdate,
          EndDate: edate
        }
      });
      setdatefilter(true);
      setfilterstartdate(sdate);
      setfilterenddate(edate);  
    }
  }

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
          {/* <h2 className="dash_title">Admin Order Report</h2>

          <Row className="dashboard" gutter={30}>
            <Col span={6}>
              <Card className="customer-count">
                <UserOutlined />
                <Statistic
                  title="Total Bookings"
                  value={finalBookinglist.length}
                />
              </Card>
            </Col>
            {/*  <Col span={8}>
              <Card className="vendor-counter">
              <UsergroupAddOutlined />
                <Statistic title="Total Commision" value={25} />

              </Card>
  </Col>*}
            <Col span={6}>
              <Card className="vendor-counter">
                <MoneyCollectOutlined />
                <Statistic title="Saloon Earning" value={arrSum(SumTotal)} />
              </Card>
            </Col>
          </Row> */}
          {/* <Row offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
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
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto report-list"
        >
          <Card
            title="Admin Report List"
            extra={
              <>
                {/* <div className="arl_filter"> */}
                <div className="arl_filter">
                
                {/* <div className="arl_filter">
                <Select
                  className="w_280"
                  placeholder="Select Saloon ID"
                  onChange={handleChangeSaloonno}
                >
                  {vendorDetails &&
                    vendorDetails.length > 0 &&
                    vendorDetails.map((list, id) => {
                      return (
                        list.vendornumber &&
                        <option value={list.vendornumber} key={id}>
                          {list.vendornumber}
                        </option>
                      );
                    })}
                </Select>
                </div>
                <div className="arl_filter">
                <Select
                  className="w_280"
                  placeholder="Select Booking No"
                  onChange={handleChangeBookingno}
                >
                  {reportBookingList &&
                    reportBookingList.length > 0 &&
                    reportBookingList.map((list, id) => {
                      return (
                        <option value={list.bookingno} key={id}>
                          {list.bookingno}
                        </option>
                      );
                    })}
                </Select>
                </div> */}
                <RangePicker onChange={onChangeDate} />
                <Input className="w_280" placeholder="Saloon ID" onChange={handleChangeSaloonno}/>
                <Input className="w_280" placeholder="Booking No" onChange={handleChangeBookingno}/>
                <div className="export_btn_report">
                  <Export
                    exportData={
                      exportBooking && exportBooking.length > 0 && exportBooking
                    }
                  />
                </div>
              </div>

                {/* <Select
                  className="w_280"
                  placeholder="Select Filter"
                  onChange={handleChangeService}
                >
                  <option value={0}>Select All</option>
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
              </div> */}
              </>
            }
          >
            <Row>
              <Modal
                title="Details"
                className="create_category_modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
              >
                <Row>
                  {reportBookingList.length > 0 &&
                    reportBookingList.map((key, index) => {
                      if (key.id == BookingSallon) {
                        return (
                          <Col
                            className="booking_details_content"
                            sm={24}
                            md={24}
                            key={`${key}${index}`}
                          >
                            <p>
                              <span className="leftside">Date :</span>{' '}
                              <span className="right">{`${key.bookingdate}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Salon Name : </span>
                              <span className="right">{`${key.vendorname}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Booking No. : </span>
                              <span className="right">{`${key.bookingno}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Service Name :</span>{' '}
                              <span className="right">{`${key.service_details[0].language[0].servicename}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Customer Name :</span>{' '}
                              <span className="right">{`${key.customerdetails[0].firstname} ${key.customerdetails[0].lastname}`}</span>
                            </p>
                            <p>
                              <span className="leftside">
                                Salon Service Price :
                              </span>{' '}
                              <span className="right">{`${key.saloonservice_price}`}</span>
                            </p>
                            <p>
                              <span className="leftside">
                                Saloon Service VAT :
                              </span>{' '}
                              <span className="right">{`${key.saloonservice_vat}`}</span>
                            </p>
                            <p>
                              <span className="leftside">
                                Admin Commission:{' '}
                              </span>
                              <span className="right">{`${key.admin_commision}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Admin VAT : </span>
                              <span className="right">{`${key.admin_vat}`}</span>
                            </p>
                            <p>
                              <span className="leftside">
                                Service Total Price :
                              </span>{' '}
                              <span className="right">{`${key.service_total_price}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Tatal VAT :</span>{' '}
                              <span className="right">{`${key.total_vat}`}</span>
                            </p>
                            <p>
                              <span className="leftside">Total Amount :</span>{' '}
                              <span className="right">{`${key.totalAmount}`}</span>
                            </p>
                            {/* <label>
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
                            {key.booking_status == 4 ? "Completed" : ""}
                          </label> */}

                            {/* <h5 style={{ marginBottom: "3%" }}>
                            <span>Service Details :</span>
                          </h5>
                          {key.service_details.map(
                            (servic_key, servic_index) => {
                              return (
                                <>
                                  <label>
                                    <span>Date & Time:</span>{" "}
                                    {`${servic_key.service_date}` +
                                      " & " +
                                      `${servic_key.service_time}` +
                                      ":00"}
                                  </label>
                                  <label>
                                    <span>Service Name :</span>{" "}
                                    {`${servic_key.service_details[0].language.servicename}`}
                                  </label>
                                  <label>
                                    <span>Price && Special Price :</span>{" "}
                                    {`SAR ${servic_key.service_details[0].price[0].price} & ${servic_key.service_details[0].price[0].special_price}`}
                                  </label>
                                </>
                              );
                            }
                          )} */}
                          </Col>
                        );
                      }
                    })}
                </Row>
              </Modal>

              <Col span={24} className="inner-content">
                <Spin size="large" spinning={loading}>
                  <DataTable columns={coulmns} dataSource={finalBookinglist} />
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
