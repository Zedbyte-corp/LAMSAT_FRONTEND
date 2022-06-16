import React, { useEffect, useState } from 'react';
import {
  Statistic,
  Row,
  Col,
  Card,
  PageHeader,
  Button,
  Table,
  Spin,
  DatePicker,
} from 'antd';
import {
  UsergroupAddOutlined,
  UserOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  ShopOutlined,
  FileSyncOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';
import actions from 'redux/auth/actions';
import dashboardActions from 'redux/admin/Dashboard/actions';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'redux/store';
import 'assets/css/dashboard.scss';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { findAllByPlaceholderText } from '@testing-library/react';
import { getLocalData } from 'redux/helper';
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

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { subLang, loader } = useSelector((state) => state.Auth);
  const {
    countList,
    yearcount,
    totalCount,
    Completed,
    Pending,
    Rejected,
    turnover,
    initLoader,
  } = useSelector((state) => state.Dashboard);
  const [count, setCount] = useState();

  useEffect(() => {
    dispatch({
      type: dashboardActions.GET_VENDOR_DASHBOARD_COUNT,
      vendorid: getLocalData('id'),
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
  var weekCompleteSum = 0;
  var WeekRejectedCount = 0;
  var WeekPendingCount = 0;
  var YearCompletedCount = 0;
  var YearRejectedCount = 0;
  var YearPendingCount = 0;
  var yearCompleteSum = 0;
  var todayCompleteSum = 0;

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
            console.log('y date', `${y.date}`);
            console.log(`date1----${y.date}----date2----${z}`);
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
  console.log('---', generalWeek);
  var k = Completed.map((y) => {
    if (y.booking_date == currentDate) {
      TodayCompletedCount++;
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
  console.log('---generalMonth', generalMonth);
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
  console.log('--genralyear', generalYearDate);

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
  console.log('--final array', finalArray);
  console.log('--final array', generalYear);

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
  const LateCanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Late Canceled Booking Count')
      : [];
  const ConfirmedBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Confirmed Booking Count')
      : [];
  const UserData =
    countList.length > 0 ? getCommonDetails(countList, true, 'User Count') : [];
  const CancelledData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Cancelled Count')
      : [];
  const BookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Booking Count')
      : [];
  const TurnoverData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Turnover Count')
      : [];
  const VendorData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Vendor Count')
      : [];

  const UserCanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'User Canceled Booking Count')
      : [];
  const AdminCanceledBookingData =
    countList.length > 0
      ? getCommonDetails(countList, true, 'Admin Canceled Booking Count')
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
      dispatch({
        type: dashboardActions.GET_VENDOR_DASHBOARD_COUNT,
        vendorid: getLocalData('id'),
        sdate: sdate,
        edate: edate,
      });
    } else {
      dispatch({
        type: dashboardActions.GET_VENDOR_DASHBOARD_COUNT,
        vendorid: getLocalData('id'),
      });
     }
  };

  return (
    <Spin size="large" spinning={initLoader}>
      <div>
        <Row>
          <Col
            offset={0}
            xs={24}
            md={24}
            lg={24}
            className="dashboard-content mg-auto"
          >
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
                <Card className="booking-count">
                  <CalendarOutlined />
                  <p className="title">Total Appointment</p>
                  <Statistic
                    title="Total Appointment"
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
                        ? TurnoverData[0].StatusCount != null
                          ? TurnoverData[0].StatusCount
                          : 0
                        : 0
                    }
                    // value={
                    //   ConfirmData.length
                    //     ? ConfirmData[0].StatusCount +
                    //       PendingData[0].StatusCount +
                    //       RejectData[0].StatusCount +
                    //       ClosedData[0].StatusCount
                    //     : 0
                    // }
                  />
                </Card>
              </Col>
              {/* <Col span={6}>
                <Card className="turnover-count">
                  <CloseSquareOutlined />

                  <p className="title">Cancel Booking</p>
                  <Statistic
                    title="Cancel Booking"
                    value={
                      CancelledData.length > 0 ? CancelledData[0].StatusCount : 0
                    }
                    // value={
                    //   CancelData.length > 0 ? CancelData[0].StatusCount : 0
                    // }
                  />
                </Card>
              </Col> */}
              <Col span={8}>
                <Card className="booking-count">
                  <CalendarOutlined />
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
                <Card className="booking-count">
                  <CalendarOutlined />
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
            </Row>
            <Row className="dashboard-table" gutter={30}>
              <Col span={8}>
                <Card
                  className="year-wise dashboard-table-title"
                  title="Day wise booking count"
                >
                  <Table
                    pagination={false}
                    columns={columns}
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
                    pagination={false}
                    columns={columns}
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
                    pagination={false}
                    columns={columns}
                    dataSource={OverallYearData}
                  />
                </Card>
              </Col>
            </Row>
            <Row className="chart" gutter={30}>
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
                  {Weekdata && Weekdata.length > 0 && (
                    <h3> Week Wise Booking Count</h3>
                  )}
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
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default VendorDashboard;
