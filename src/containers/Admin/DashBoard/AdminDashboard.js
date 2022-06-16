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
  Spin,
} from 'antd';
import {
  UsergroupAddOutlined,
  UserOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  ShopOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import actions from 'redux/auth/actions';
import dashboardActions from 'redux/admin/Dashboard/actions';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'redux/store';
import 'assets/css/dashboard.scss';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { findAllByPlaceholderText } from '@testing-library/react';
const moment = require('moment');
const { RangePicker } = DatePicker;

const YearData = {
  labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  datasets: [
    {
      label: '',
      legend: 'fales',
      backgroundColor: 'rgb(82 145 244 / 61%)',
      borderColor: 'rgb(82 145 244 / 91%)',
      borderWidth: 2,
      data: [1, 59, 80, 81, 56, 50, 46, 55, 76, 20, 22, 76],
    },
  ],
};

var endOfMonthValue = moment().clone().endOf('month').format('DD');
var endOfMonth = Array.from({ length: endOfMonthValue }, (_, i) => i + 1);
var endOfYear = Array.from({ length: 12 }, (_, i) => i + 1);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { subLang, loader } = useSelector((state) => state.Auth);
  const {
    countList,
    totalCount,
    Completed,
    Pending,
    Rejected,
    Success,
    Vendors,
    turnover,
    Users,
    Bookings
  } = useSelector((state) => state.Dashboard);
  const [count, setCount] = useState();
  const [adminloader, setadminloader] = useState(false);
  useEffect(() => {
    setadminloader(true);
    dispatch({
      type: dashboardActions.GET_DASHBOARD_COUNT,
      callBackAction: (data) => {
        setadminloader(false);
      },
    });
  }, []);
  const onLogout = () => {
    dispatch({
      type: actions.LOGOUT_USER,
    });
  };
  let currentDate = moment();
  var getDaysBetweenDates = function (startDate, endDate) {
    var now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  };
  let weekStart = currentDate.clone().startOf('week');
  let weekEnd = currentDate.clone().endOf('week');
  const startOfMonth = moment().clone().startOf('month');
  let monthEnd = currentDate.clone().endOf('month');
  const startOfYear = moment().clone().startOf('year');
  let yearEnd = currentDate.clone().endOf('year');
  const today = moment();
  currentDate = today.format('YYYY-MM-DD');

  var dateFrom = weekStart.format('YYYY-MM-DD');
  var dateTo = weekEnd.format('YYYY-MM-DD');
  var weekdateList = getDaysBetweenDates(weekStart, weekEnd);
  var monthdateList = getDaysBetweenDates(startOfMonth, monthEnd);
  var yeardateList = getDaysBetweenDates(startOfYear, yearEnd);
  var TodayCompletedCount = 0;
  var TodayPendingCount = 0;
  var TodayRejectedCount = 0;
  var WeekCompletedCount = 0;
  var WeekRejectedCount = 0;
  var WeekPendingCount = 0;
  var YearCompletedCount = 0;
  var YearRejectedCount = 0;
  var YearPendingCount = 0;
  var weekCompleteSum = 0;
  var todayCompleteSum = 0;
  var yearCompleteSum = 0;
  var dateCheck = '02/07/2013';
  //const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
  // const startOfYear = moment().startOf('year').format('YYYY/MM/DD');
  var d1 = dateFrom.split('-');
  var d2 = dateTo.split('-');

  const getMonths = (start, end) =>
    Array.from({ length: end.diff(start, 'month') + 1 }).map((_, index) =>
      moment(start).add(index, 'month').format('MM.YYYY')
    );

  const months = getMonths(
    moment('01.2021', 'MM.YYYY'),
    moment('12.2021', 'MM.YYYY')
  );

  const number = 1; // 0 = Jan & 11 = Dec
  moment().month(number).format('MMM'); // Feb

  var generalWeek = [];
  var generalMonth = [];
  var generalYear = [];
  var generalWeekDate = [];
  var generalMonthDate = [];
  var generalYearDate = [];
  var k =
    totalCount.length > 0
      ? weekdateList.map((z) => {
          var excp = '';
          totalCount.map((y) => {
            if (y.date == z) {
              excp = y.count;
            } else {
              excp = 0;
            }
          });
          generalWeekDate.push(z);
          generalWeek.push(excp);

          var k =
            Completed.length > 0
              ? Completed.map((comp) => {
                  if (comp.booking_date == z) {
                    WeekCompletedCount++;
                    weekCompleteSum = weekCompleteSum; //+ comp.totalcost;
                  }
                })
              : '';

          var k = Pending.map((pend) => {
            if (pend.booking_date == z) {
              WeekPendingCount++;
            }
          });

          var k = Rejected.map((reject) => {
            if (reject.booking_date == z) {
              WeekRejectedCount++;
            }
          });
        })
      : '';

  var k = Completed.map((comp) => {
    if (comp.booking_date == currentDate) {
      TodayCompletedCount++;
      todayCompleteSum = todayCompleteSum + comp.totalcost;
    }
  });

  var k = Pending.map((y) => {
    if (y.booking_date == currentDate) {
      TodayPendingCount++;
    }
  });

  var k = Rejected.map((y) => {
    if (y.booking_date == currentDate) {
      TodayRejectedCount++;
    }
  });
  var mnt =
    totalCount.length > 0
      ? monthdateList.map((z) => {
          var excp = '';
          totalCount.map((y) => {
            if (y.date == z) {
              excp = y.count;
            } else {
              excp = 0;
            }
          });
          generalMonthDate.push(z);
          generalMonth.push(excp);
        })
      : '';

  var yrs =
    totalCount.length > 0
      ? yeardateList.map((z) => {
          var excp = '';
          totalCount.map((y) => {
            if (y.date == z) {
              var month = moment(z, 'YYYY/MM/DD');
              var month1 = moment(y.date, 'YYYY/MM/DD');
              if (1) {
                excp = month.format('M') + '-' + y.count;
              }
              //generalYear.push(excp);
            } else {
              // excp = 0;
            }
          });

          var k = Completed.map((comp) => {
            if (comp.booking_date == z) {
              YearCompletedCount++;
              yearCompleteSum = yearCompleteSum; // + comp.totalcost;
            }
          });

          var k = Pending.map((pend) => {
            if (pend.booking_date == z) {
              YearPendingCount++;
            }
          });

          var k = Rejected.map((reject) => {
            if (reject.booking_date == z) {
              YearRejectedCount++;
            }
          });
          generalYearDate.push(z);
          var l = excp != '' ? generalYear.push(excp) : '';
        })
      : '';

  let obj = {};
  var onOut = [];
  var lo =
    generalYear.length > 0
      ? generalYear.map((z) => {
          var out = z.split('-');
          endOfYear.map((e) => {
            if (e == parseInt(out[0])) {
              if (obj.hasOwnProperty(out[0])) {
                //if(obj[out[0]]){
                obj[out[0]] = parseInt(obj[out[0]]) + parseInt(out[1]);
                // }
              } else {
                obj[out[0]] = out[1];
                //obj = out[1];
              }

              var sum = out[1];
              //obj = obj.hasOwnProperty(out[1]) ? '' : out[1];
              //  onOut.push(obj);
            } else {
              if (!obj.hasOwnProperty(e)) {
                obj[e] = 0;
              }
            }
          });
        })
      : '';
  var finalArray = [];
  Object.entries(obj).map((item) => {
    finalArray.push(item[1]);
  });

  const Weekdata = {
    labels: generalWeekDate,
    datasets: [
      {
        label: 'Weekly count',
        legend: 'fales',
        backgroundColor: 'rgb(82 145 244 / 61%)',
        borderColor: 'rgb(82 145 244 / 91%)',
        borderWidth: 1,
        data: generalWeek,
      },
    ],
  };

  const YearData = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], //generalYearDate,
    datasets: [
      {
        label: 'Yearly count',
        legend: 'fales',
        backgroundColor: 'rgb(82 145 244 / 61%)',
        borderColor: 'rgb(82 145 244 / 91%)',
        borderWidth: 2,
        data: finalArray,
      },
    ],
  };
  let targetDataSetsCompleted  = [];
  let targetDataSetsRejected  = [];
  
  let targetLabels  = [];
  Success.reduce( (p, c) => {
    let cnt = 0;
    if(p.hasOwnProperty('date')) {
      let dateObj = new Date(c.date);
      let monthyear = dateObj.toLocaleString("en-us", { month: "long", year: 'numeric' });
      if(p.date === c.date) {
        cnt = p.count + c.count;
        targetLabels.push(c.date); 
        c.booking_status === 3 ? targetDataSetsRejected.push(cnt) : targetDataSetsCompleted.push(cnt);
      } else {
        cnt = p.count;
        targetLabels.push(c.date);
        c.booking_status === 3 ? targetDataSetsRejected.push(cnt) : targetDataSetsCompleted.push(cnt);
      }
    }
    return c;
  },{})
  let targetedVendorDataset=[]; let targetedVendorLabels=[];
  let vd = Vendors.map((vendor,index) => {
    let dateObj = new Date(vendor.date);
    let monthyear = dateObj.toLocaleString("en-us", { month: "long", year: 'numeric' });
    targetedVendorLabels.push(vendor.date);
    targetedVendorDataset.push(vendor.count);
  })
  let targetedUserDataset=[]; let targetedUserLabels=[];
  let us = Users.map((user,index) => {
    let dateObj = new Date(user.date);
    let monthyear = dateObj.toLocaleString("en-us", { month: "long", year: 'numeric' });
    targetedUserLabels.push(user.date);
    targetedUserDataset.push(user.count);
  })
  let targetedBookingDataset=[]; let targetedBookingLabels=[];
  let bk = Bookings.map((booking,index) => {
    let dateObj = new Date(booking.date);
    let monthyear = dateObj.toLocaleString("en-us", { month: "long", year: 'numeric' });
    targetedBookingLabels.push(booking.date);
    targetedBookingDataset.push(booking.count);
  })
  const data = {
    labels:  targetLabels,
    datasets: [
      {
        label: "Last Leads",
        data: targetDataSetsRejected,
        fill: true,
        backgroundColor: "rgba(255,50,50,0.2)",
        borderColor: "rgba(255,50,50,1)"
      },
      {
        label: "Won Leads",
        data: targetDataSetsCompleted,
        fill: true,
        backgroundColor: "rgba(0,128,0,0.2)",
        borderColor: "rgba0,128,0,1)"
      }
    ]
  };

  const vendordata = {
    labels:  targetedVendorLabels,
    datasets: [
      {
        label: "New vendors",
        data: targetedVendorDataset,
        fill: true,
        backgroundColor: "rgba(0,128,0,0.2)",
        borderColor: "rgba0,128,0,1)"
      }
    ]
  };
  const userdata = {
    labels:  targetedUserLabels,
    datasets: [
      {
        label: "New Users",
        data: targetedUserDataset,
        fill: true,
        backgroundColor: "rgba(0,128,0,0.2)",
        borderColor: "rgba0,128,0,1)"
      }
    ]
  };
  const bookingdata = {
    labels:  targetedBookingLabels,
    datasets: [
      {
        label: "New bookings",
        data: targetedBookingDataset,
        fill: true,
        backgroundColor: "rgba(0,128,0,0.2)",
        borderColor: "rgba0,128,0,1)"
      }
    ]
  };

  const MonthData = {
    labels: endOfMonth,
    datasets: [
      {
        label: 'Monthly count',
        legend: 'fales',
        backgroundColor: 'rgb(82 145 244 / 61%)',
        borderColor: 'rgb(82 145 244 / 91%)',
        borderWidth: 2,
        data: generalMonth,
      },
    ],
  };

  const onlanguagechange = () => {
    dispatch({
      type: actions.CHANGE_LANGUAGE,
      payload: subLang === 'en' ? 'ar' : 'en',
    });
  };
  const columns = [
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Count',
      dataIndex: 'number',
      key: 'number',
    },
  ];

  const OverallTodayData = [
    {
      key: '10',
      orders: 'Today Orders',
      number: TodayPendingCount + TodayCompletedCount + TodayRejectedCount,
    },
    {
      key: '1',
      orders: 'Today Sales',
      //number: isNaN(todayCompleteSum) ? 0 : todayCompleteSum,
      number: TodayCompletedCount,
    },
    {
      key: '2',
      orders: 'Pending Bookings',
      number: TodayPendingCount,
    },
    {
      key: '3',
      orders: 'Completed Bookings',
      number: TodayCompletedCount,
    },
    {
      key: '4',
      orders: 'Rejected Bookings',
      number: TodayRejectedCount,
    },
  ];
  const OverallWeekData = [
    {
      key: '10',
      orders: 'Week Orders',
      number: WeekCompletedCount + WeekPendingCount + WeekRejectedCount,
    },
    {
      key: '1',
      orders: 'Week Sales',
      //number: weekCompleteSum,
      number: WeekCompletedCount,
    },
    {
      key: '2',
      orders: 'Pending Bookings',
      number: WeekPendingCount,
    },
    {
      key: '3',
      orders: 'Completed Bookings',
      number: WeekCompletedCount,
    },
    {
      key: '4',
      orders: 'Rejected Bookings',
      number: WeekRejectedCount,
    },
  ];

  const OverallYearData = [
    {
      key: '10',
      orders: 'Year Orders',
      number: YearPendingCount + YearCompletedCount + YearRejectedCount,
    },
    {
      key: '1',
      orders: 'Year Sales',
      //number: yearCompleteSum,
      number: YearCompletedCount,
    },
    {
      key: '2',
      orders: 'Pending Bookings',
      number: YearPendingCount,
    },
    {
      key: '3',
      orders: 'Completed Bookings',
      number: YearCompletedCount,
    },
    {
      key: '4',
      orders: 'Rejected Bookings',
      number: YearRejectedCount,
    },
  ];
  const getCommonDetails = (arrayData, isBooking, key) => {
    return arrayData.filter(
      (values) => values[`${isBooking ? 'bookingstatus' : 'Period'}`] === key
    );
  };
  const UserData =
    countList.length > 0 ? getCommonDetails(countList, true, 'User Count') : [];
  const VendorData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Vendor Count')
      : [];
    const NewVendorData =
      countList.length > 0
        ? getCommonDetails(countList, true, 'New Vendor Count')
        : [];
  const TotalBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Total Booking Count')
      : [];
  const CompletedBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Completed Booking Count')
      : [];
  const CanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Canceled Booking Count')
      : [];
  const UserCanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'User Canceled Booking Count')
      : [];
  const AdminCanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Admin Canceled Booking Count')
      : [];
  const LateCanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Late Canceled Booking Count')
      : [];
  const ConfirmedBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Confirmed Booking Count')
      : [];
  const TurnoverData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Turnover Count')
      : [];
  const CancelData =
    countList.length > 0 ? getCommonDetails(countList, true, 'Cancelled') : [];
  const RejectData =
    countList.length > 0 ? getCommonDetails(countList, true, 'Rejected') : [];
  const PendingData =
    countList.length > 0 ? getCommonDetails(countList, true, 'Pending') : [];
  const ConfirmData =
    countList.length > 0 ? getCommonDetails(countList, true, 'Confirmed') : [];
  const ClosedData =
    countList.length > 0 ? getCommonDetails(countList, true, 'Closed') : [];

  const onChangeDate = (value) => {
    if (value) {
      var sdate = moment(value[0]).format('YYYY-MM-DD');
      var edate = moment(value[1]).format('YYYY-MM-DD');
      setadminloader(true);
      dispatch({
        type: dashboardActions.GET_DASHBOARD_COUNT,
        payload: {
          sdate: sdate,
          edate: edate,
        },
        callBackAction: (data) => {
          setadminloader(false);
        },
      });
    } else {
      setadminloader(true);
      dispatch({
        type: dashboardActions.GET_DASHBOARD_COUNT,
        callBackAction: (data) => {
          setadminloader(false);
        },
      });
    }
  };

  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={24}
          md={24}
          lg={24}
          className="dashboard-content mg-auto"
        >
          <Spin spinning={adminloader} size={'large'}>
            <Row>
              <Col md={12}>
                <h2 className="dash_title">Dashboard</h2>
              </Col>
              <Col md={12}>
                <RangePicker onChange={onChangeDate} className="dash_title" />
              </Col>
            </Row>
            <Row className="dashboard" gutter={30}>
              <Col span={8}>
                <Card className="customer-count">
                  <UserOutlined />
                  <p className="title">Total Customer</p>
                  <Statistic
                    title="Total Customer"
                    value={UserData.length ? UserData[0].StatusCount : 0}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">Total Salons</p>
                  <Statistic
                    title="Total Salons"
                    value={VendorData.length ? VendorData[0].StatusCount : 0}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="booking-count">
                  <CalendarOutlined />
                  <p className="title">Total Appointments</p>
                  <Statistic
                    title="Total Appointments"
                    value={
                      TotalBookingData.length
                        ? TotalBookingData[0].StatusCount
                        : 0
                    }
                    //value={ConfirmData.length ? ConfirmData[0].StatusCount : 0}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="turnover-count">
                  <FileSyncOutlined />
                  <p className="title">Total Earnings</p>
                  <Statistic
                    title="Total Earnings"
                    value={
                      TurnoverData.length
                        ? Math.floor(TurnoverData[0].StatusCount)
                        : 0
                    }
                    //value={turnover}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">Completed Appointments</p>
                  <Statistic
                    title="Completed Appointments"
                    value={
                      CompletedBookingData.length
                        ? CompletedBookingData[0].StatusCount
                        : 0
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">Confirmed Appointments</p>
                  <Statistic
                    title="Confirmed Appointments"
                    value={
                      ConfirmedBookingData.length
                        ? ConfirmedBookingData[0].StatusCount
                        : 0
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">Canceled Appointments</p>
                  <Statistic
                    title="Canceled Appointments"
                    value={
                      CanceledBookingData.length
                        ? CanceledBookingData[0].StatusCount
                        : 0
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">Late Canceled Appointments</p>
                  <Statistic
                    title="Late Canceled Appointments"
                    value={
                      LateCanceledBookingData.length
                        ? LateCanceledBookingData[0].StatusCount
                        : 0
                    }
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">User Canceled Appointments</p>
                  <Statistic
                    title="User Canceled Appointments"
                    value={
                      UserCanceledBookingData.length
                        ? UserCanceledBookingData[0].StatusCount
                        : 0
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <ShopOutlined />
                  <p className="title">Salon Canceled Appointments</p>
                  <Statistic
                    title="Salon Canceled Appointments"
                    value={
                      AdminCanceledBookingData.length
                        ? AdminCanceledBookingData[0].StatusCount
                        : 0
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="vendor-counter">
                  <UserOutlined />
                  <p className="title">New Vendors</p>
                  <Statistic
                    title="New Vendors"
                    value={NewVendorData.length ? NewVendorData[0].StatusCount : 0}
                  />
                </Card>
              </Col>
            </Row>
            <Row className="dashboard-table" gutter={30}>
              <Col span={8}>
                <Card
                  className="year-wise dashboard-table-title"
                  title="Day wise booking count"
                >
                  <Table
                    columns={columns}
                    pagination={false}
                    dataSource={OverallTodayData}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="week-wise dashboard-table-title"
                  title="Week wise booking count "
                >
                  <Table
                    columns={columns}
                    pagination={false}
                    dataSource={OverallWeekData}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="third dashboard-table-title"
                  title="Year wise booking count "
                >
                  <Table
                    columns={columns}
                    pagination={false}
                    dataSource={OverallYearData}
                  />
                </Card>
              </Col>
            </Row>
            <Row className="chart" gutter={30}>
            <Col span={12}>
                <Card className="customer-count">
                  <div className="overlap-chart day">
                    <Line
                      data={data}
                      options={{
                        title: {
                          display: false,
                          text: 'Average Rainfall per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>Completed vs Cancelled Bookings</h3>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="user-count">
                  <div className="overlap-chart day">
                    <Line
                      data={userdata}
                      options={{
                        title: {
                          display: false,
                          text: 'New users per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>New Users Registered</h3>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="booking-count">
                  <div className="overlap-chart day">
                    <Line
                      data={bookingdata}
                      options={{
                        title: {
                          display: false,
                          text: 'New bookings per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>New Bookings</h3>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="vendor-count">
                  <div className="overlap-chart day">
                    <Line
                      data={vendordata}
                      options={{
                        title: {
                          display: false,
                          text: 'New vendors per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>New Vendor Registered</h3>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="customer-count">
                  <div className="overlap-chart day">
                    <Bar
                      data={Weekdata}
                      options={{
                        title: {
                          display: false,
                          text: 'Average Rainfall per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>Week Wise Booking Count</h3>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="vendor-counter">
                  <div className="overlap-chart week">
                    <Bar
                      data={MonthData}
                      options={{
                        title: {
                          display: true,
                          text: 'Average Rainfall per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>Month Wise Booking </h3>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  className="booking-count"
                  style={{ minHeight: `calc(100% - 30px)` }}
                >
                  <div className="overlap-chart year">
                    <Bar
                      data={YearData}
                      options={{
                        title: {
                          display: true,
                          text: 'Average Rainfall per month',
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: 'right',
                        },
                      }}
                    />
                  </div>
                  <h3>Year Wise Booking Count</h3>
                </Card>
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
