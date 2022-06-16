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
} from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getLocaleMessages, getLocalData } from 'redux/helper';
import { store } from 'redux/store';
import actions from 'redux/admin/bookingManagement/actions';
import timeActions from 'redux/admin/Timeslot/actions';
import 'assets/css/dashboard.scss';
import DataTable from 'helpers/datatable';
import Export from '../../export/Export';
const { RangePicker } = DatePicker;

const VendorOrderReport = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { bookingList, alertMake, reportBookingListVendor } = useSelector(
    (state) => state.Booking
  );
  const [exportBooking, setexportBooking] = useState();
  const [BookingSallon, setBookingSallon] = useState(0);
  const [SallonId, setSallonId] = useState(0);
  const { Option } = Select;
  const { loading } = useSelector((state) => state.Booking);
  const { vendorDetails } = useSelector((state) => state.AdminTimeslot);
  // console.log(
  //   "this is the value od hte output Vendor",
  //   reportBookingListVendor
  // );
  const [finalBookinglist, setfinalBookinglist] = useState([]);
 // var finalBookinglist = '';
  var SumTotal = [];
  var SumTotalProfit = [];
  useEffect(() => {
    store.dispatch({
      type: actions.GET_BOOKING_LIST_VENDOR_REPORT,
      id: getLocalData('id'),
      callBackAction: (res) => {
        // console.log("this is the value of the call action", res);
      },
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
      title: 'Booking Status',
      dataIndex: 'paymentmethod',
      key: 'paymentmethod',
    },
    {
      title: 'Service Name',
      dataIndex: 'booking_process',
      key: 'booking_process',
      render: (text, record) => {
        var vendor = record.service_details[0].language[0];
        return <Space size="middle">{vendor.servicename}</Space>;
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'booking_process',
      key: 'booking_process',
      render: (text, record) => {
        var vendor = record.customerdetails[0];
        return (
          <Space size="middle">{`${vendor.firstname} ${vendor.lastname}`}</Space>
        );
      },
    },
    {
      title: 'Service Price',
      dataIndex: 'service_price',
      key: 'service_price',
    },
    {
      title: 'VAT',
      dataIndex: 'vat',
      key: 'vat',
    },
    {
      title: ' Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      /** 
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
    */
    },
  ];

  {
    /*
      title: 'Payment Type',
      dataIndex: 'payment_method',
      key: 'payment_method',
      */
  }

  bookingList &&
    bookingList.length > 0 &&
    bookingList.map((list, id) => {
      list.booking_process =
        list.booking_status == 4
          ? 'Completed'
          : list.booking_status == 3
          ? 'Pending'
          : list.booking_status == 2
          ? 'Rejected'
          : list.booking_status == 1
          ? 'Accepted'
          : '----';

      return list;
    });

  // if (
  //   SallonId == 0 &&
  //   reportBookingListVendor &&
  //   reportBookingListVendor.length > 0
  // ) {
  //   finalBookinglist =
  //     SallonId == 0 && reportBookingListVendor && reportBookingListVendor;
  // } else {
  //   finalBookinglist =
  //     SallonId != 0 &&
  //     bookingList &&
  //     bookingList.length > 0 &&
  //     bookingList.filter(
  //       (list1) => list1.service_details[0].vendorid == SallonId
  //     );
  // }

  useEffect(()=>{
    if(reportBookingListVendor)
    {
      setfinalBookinglist(reportBookingListVendor)
    }
  },[reportBookingListVendor]);

  const handleChangeBookingno = (value) => {
    //setSallonId(value);
    var bookno = value.target.value;
    if(bookno)
    {
      //var filterbookingno = reportBookingListVendor.filter(data=> data.bookingno == bookno);
      var filterbookingno = reportBookingListVendor.filter(data=> (data.bookingno).includes(bookno));
      setfinalBookinglist(filterbookingno);
    } else {
      setfinalBookinglist(reportBookingListVendor);
    }
  };

  /*
    finalBookinglist = SallonId != 0 && bookingList && bookingList.length > 0 && bookingList.filter(list1 => list1.booking_status == 4 &&  1 ) */

  // finalBookinglist &&
  //   finalBookinglist.length > 0 &&
  //   finalBookinglist.map((list, id) => {
  //     console.log("list => ", list);
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
  //     SumTotalProfit.push(parseInt(list["vendorproffit"]));
  //     return list;
  //   });

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
    if (finalBookinglist && finalBookinglist.length > 0) {
      var newData = finalBookinglist.map((list) => {
        return {
          service_date: list.bookingdate,
          bookingno: list.bookingno,
          servicename: list.service_details[0].language[0].servicename,
          name: `${list.customerdetails[0].firstname} ${list.customerdetails[0].lastname}`,
          service_price: list.service_price,
          vat: list.vat,
          total_amount: list.total_amount,
        };
      });
      setexportBooking(newData);
    }
  }, [finalBookinglist]);

 // const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY/MM/DD';
  // const monthFormat = "YYYY/MM";
  // const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);

function onChangeDate(value) {
  if(value)
  {
    var sdate=moment(value[0]).format("DD-MM-YYYY")
    var edate=moment(value[1]).format("DD-MM-YYYY")
    store.dispatch({
      type: actions.GET_VENDOR_REPORT_FILTER_LIST,
      payload: {
        id: getLocalData('id'),
        StartDate: sdate,
        EndDate: edate
      }
    });
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
          {/* <Row className="dashboard" gutter={30}>
            <Col span={6}>
              <Card className="customer-count">
                <UsergroupAddOutlined />
                <Statistic
                  title="Total Bookings"
                  value={finalBookinglist.length}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card className="customer-count">
                <UserOutlined />
                <Statistic title="Saloon Earning" value={arrSum(SumTotal)} />
              </Card>
            </Col>

            <Col span={6}>
              <Card className="customer-count">
                <UserOutlined />
                <Statistic
                  title="Total Profit"
                  value={arrSum(SumTotalProfit)}
                />
              </Card>
            </Col>

          </Row> */}
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
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto"
        >
          <Card
            title="Report"
            extra={
              <>
              <div className="arl_filter">
                {/* <div className="arl_filter">
                  <Select
                    className="w_280"
                    placeholder="Select Booking No"
                    onChange={handleChangeBookingno}
                  >
                    {reportBookingListVendor &&
                      reportBookingListVendor.length > 0 &&
                      reportBookingListVendor.map((list, id) => {
                        return (
                          <option value={list.bookingno} key={id}>
                            {list.bookingno}
                          </option>
                        );
                      })}
                  </Select>
                </div> */}
                <RangePicker onChange={onChangeDate} />
                <Input className="w_280" placeholder="Booking No" onChange={handleChangeBookingno}/>
                <div className="export_btn_report">
                  <Export exportData={exportBooking && exportBooking} />
                </div>
              </div>
              </>
            }
          >
            <Modal
              title="Details"
              className="create_category_modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Row>
                {bookingList.map((key, index) => {
                  if (key.id == BookingSallon) {
                    return (
                      <Col
                        className="booking_details_content"
                        sm={24}
                        md={24}
                        key={`${key}${index}`}
                      >
                        <p>
                          <span className="leftside">Saloon :</span>{' '}
                          <span className="right">{`${key.vendor_details.language['vendorname']}${index}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Price : </span>
                          <span className="right">{`${key.actualrate}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Sub Total :</span>{' '}
                          <span className="right">{`${key.subtotal}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Total :</span>{' '}
                          <span className="right">{`${key.totalcost}`}</span>
                        </p>
                        <p>
                          <span className="leftside">VAT % :</span>{' '}
                          <span className="right">{`${key.vat_percent}`}</span>
                        </p>
                        <p>
                          <span className="leftside">VAT Amount :</span>{' '}
                          <span className="right">{`${key.vat_amount}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Staff Name : </span>
                          <span className="right">{`${key.staff_details.firstname}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Booking No : </span>
                          <span className="right">{`${key.bookingno}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Payment Method :</span>{' '}
                          <span className="right">{`${key.payment_method}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Category :</span>{' '}
                          <span className="right">{`${key.category_details[0].language.categoryname}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Service :</span>{' '}
                          <span className="right">{`${key.service_details[0].language.servicename}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Voucher Code :</span>{' '}
                          <span className="right">
                            {`${key.voucher_code}` != null
                              ? `${key.voucher_code}`
                              : 'Nill'}
                          </span>
                        </p>
                        <h5 style={{ marginBottom: '3%' }}>
                          <span>Customer Details :</span>
                        </h5>
                        <p>
                          <span className="leftside">Name :</span>
                          <span className="right">{`${key.customerdetails.firstname}${key.customerdetails.lastname}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Email :</span>
                          <span className="right">{`${key.customerdetails.email}`}</span>
                        </p>
                        <p>
                          <span className="leftside">Contact No :</span>
                          <span className="right">{`${key.customerdetails.contactnumber}`}</span>
                        </p>

                        <p>
                          <span className="leftside">Status :</span>{' '}
                          <span className="right">
                            {key.booking_status == 4 ? 'Completed' : ''}
                          </span>
                        </p>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Modal>

            <Spin size="large" spinning={loading}>
              <DataTable columns={coulmns} dataSource={finalBookinglist} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VendorOrderReport;
