import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import Tooltip from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import {
  SearchOutlined,
  RightOutlined,
  LeftOutlined,
  UserOutlined,
  StarFilled,
} from "@ant-design/icons";
import { render } from "react-dom";
import actionsDetail from "redux/Details/actions";
import actionsService from "redux/vendor/Services/actions";
import actionsCustomer from "redux/admin/customerManagement/actions";
//import moment from './moment-range';
import moment from "moment";
import actionsstaff from "redux/vendor/Staff/actions";
import ActionsVendor from "redux/admin/adminvendorprofile/actions";

import {
  Select,
  Form,
  Drawer,
  Button,
  Spin,
  Space,
  DatePicker,
  TimePicker,
  Input,
  Carousel,
  Card,
  Avatar,
  Typography,
  Radio,
} from "antd";
import { useSelector, useDispatch } from "react-redux";

import { store } from "redux/store";
import actions from "redux/admin/bookingManagement/actions";
import admintimeslotaction from "redux/admin/Timeslot/actions";
import { Row, Col, Modal } from "antd";
import BookingDetails from "./BookingDetails";
import { getLocalData } from "redux/helper";

const { Option } = Select;

function handleChange(value) {}

let COUNT = 1;

export default function Calendar() {
  const [count, setcount] = useState(0);
  const [calloader, setcalloader] = useState(false);
  const reload = () => {
    setcount(count + 1);
  };

  useEffect(() => {
    store.dispatch({
      type: actions.GET_BOOKING_LIST,
    });

    store.dispatch({
      type: actions.GET_VENDOR_LIST,
    });

    store.dispatch({
      type: actions.GET_STAFF_LIST,
    });
  }, [count]);
  const { bookingList, alertMake, vendorList, staffList, loading } =
    useSelector((state) => state.Booking);

  return (
    <div>
      {bookingList.length > 0 ? (
        <Spin size="large" spinning={loading}>
          <Homeday
            bookinglist={bookingList}
            vendorlist={vendorList}
            stafflist={staffList}
            reload={reload}
          />
        </Spin>
      ) : (
        <Spin size="large">
          <Homeday
            bookinglist={bookingList}
            vendorlist={vendorList}
            stafflist={staffList}
            reload={reload}
          />
        </Spin>
      )}
    </div>
  );
}

const Homeday = (props) => {
  const slider = React.useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const format = "HH:mm";
  const [initialAllEvents, setInitialAllEvents] = useState([]);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  let [isAwaiting, setIsAwaiting] = React.useState(false);
  const [Availability, setAvailability] = useState(0);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apploading, setapploading] = useState(false);
  const [serviceDetail, setserviceDetail] = useState();
  const [apppdate, setapppdate] = useState();
  const [appptime, setappptime] = useState();
  const [apppduration, setapppduration] = useState();
  const [selectvendor, setselectvendor] = useState(false);
  const [vendorloading, setvendorloading] = useState(false);
  const [currentVendor, setcurrentVendor] = useState();
  const [Selectedstaff, setSelectedstaff] = useState("");
  const [StaffData, setStaffData] = useState([]);
  const { TextArea } = Input;
  useEffect(async () => {
    var allBookingEvents = [];

    await setIsAwaiting(true);
    props.bookinglist.map((bookings) => {
      if (bookings.bookingtime) {
        bookings.bookingtime.map((service) => {
          const dateIs = service.service_date
          // const dateIs = service.service_date.replace(
          //   /(\d\d)\/(\d\d)\/(\d{4})/,
          //   "$3/$2/$1"
          // );
          var dateformt = moment(dateIs, "DD-MM-YYYY").format("YYYY-MM-DD");
          var timeformt =  moment(service.service_time,'h:mm:ss').format("hh:mm:ss");

          const serviceName =
            service.service[0] && service.service[0].servicelang[0]
              ? service.service[0].servicelang[0].servicename
              : "ERROR";

          allBookingEvents.push({
            id: bookings.bookingno + " " + service.service_id,
            title:
              JSON.parse(bookings.customerdetails)[0].firstname +
              " " +
              JSON.parse(bookings.customerdetails)[0].lastname,

              start: dateformt +"T"+ timeformt,
            
              end: dateformt +"T"+ timeformt,    
            allDay: false,
            extendedProps: {
              description: serviceName,
              details: bookings,
            },
            color: getRandomColor(),
          });
        });
      }
    });

    setInitialAllEvents(allBookingEvents);
    setIsAwaiting(false);
  }, [props.bookinglist]);


  const Allvendors = async() =>{
    var allBookingEvents = [];
    await setIsAwaiting(true);
    props.bookinglist.map((bookings) => {
      if (bookings.bookingtime) {
        bookings.bookingtime.map((service) => {
          const dateIs = service.service_date
          // const dateIs = service.service_date.replace(
          //   /(\d\d)\/(\d\d)\/(\d{4})/,
          //   "$3/$2/$1"
          // );
          var dateformt = moment(dateIs, "DD-MM-YYYY").format("YYYY-MM-DD");
          var timeformt = moment(service.service_time,'h:mm:ss').format("hh:mm:ss");
          // const endTime = parseInt(
          //   service.service_details[0] && service.service_details[0].price[0]
          //     ? service.service_details[0].price[0].duration
          //     : 0
          // );

          const serviceName =
            service.service[0] && service.service[0].servicelang[0]
              ? service.service[0].servicelang[0].servicename
              : "ERROR";

          allBookingEvents.push({
            id: bookings.bookingno + " " + service.service_id,
            title:
              JSON.parse(bookings.customerdetails)[0].firstname +
              " " +
              JSON.parse(bookings.customerdetails)[0].lastname,
              start: dateformt +"T"+ timeformt,
              end: dateformt +"T"+ timeformt,    
            allDay: false,
            extendedProps: {
              description: serviceName,
              details: bookings,
            },
            color: getRandomColor(),
          });
        });
      }
    });
    setInitialAllEvents(allBookingEvents);
    setIsAwaiting(false);    
  }

  const selectService = (value) => {
    let ser = vendorServiceList.filter(
      (service) => service.servicelang[0].serviceid == value
    );
    setserviceDetail(ser);
  };

  const {
    categoryServiceByVendorList,
    loadingCategoryServiceByVendorList,
    loading,
    vendorServiceList,
    staffList,
  } = useSelector((state) => state.Services);

  const { customerList } = useSelector((state) => state.Customer);

  const { timeVisible, VendorTimeslot, timeDetails, vendorVisible } =
    useSelector((state) => state.AdminTimeslot);

  const { vendorDetails } = useSelector((state) => state.AdminVendorProfile);
  // console.log("this si the valeu od the vendordetails", vendorDetails);
  // useEffect(()=>{
  //   if(props.stafflist.length)
  //   {
  //     setStaffData(props.stafflist);
  //   }
  // },[props.stafflist]);

  const handleChangeService = async (value) => {
    if(value == 'all')
    {
      Allvendors();
      setStaffData([]);
    } else {
        var satfarr = props.stafflist.filter((data) => data.vendorid == value);
        if (satfarr.length) {
          setStaffData(satfarr);
        } else {
          setStaffData([]);
        }
        var allBookingEvents = [];
        await setIsAwaiting(true);
        props.bookinglist.map((bookings) => {
          if (bookings.vendorid == value) {
            if (bookings.bookingtime) {
              bookings.bookingtime.map((service) => {
                  const dateIs = service.service_date
                  // const dateIs = service.service_date.replace(
                  //   /(\d\d)\/(\d\d)\/(\d{4})/,
                  //   "$3/$2/$1"
                  // );
                  var dateformt = moment(dateIs, "DD-MM-YYYY").format("YYYY-MM-DD");
                  var timeformt = moment(service.service_time,'h:mm:ss').format("hh:mm:ss");
                  const serviceName =
                      service.service[0] && service.service[0].servicelang[0]
                      ? service.service[0].servicelang[0].servicename
                      : "ERROR";
                  allBookingEvents.push({
                    id: bookings.bookingno + " " + service.service_id,
                    title:
                      JSON.parse(bookings.customerdetails)[0].firstname +
                      " " +
                      JSON.parse(bookings.customerdetails)[0].lastname,
                    start: dateformt +"T"+ timeformt,
                    end: dateformt +"T"+ timeformt,   
                    allDay: false,
                    extendedProps: {
                      description: serviceName,
                      details: bookings,
                    },
                    color: getRandomColor(),
                  });
              });
            }
          }
        });
        setInitialAllEvents(allBookingEvents);
        setIsAwaiting(false);
    }
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <p>
          {eventInfo.timeText}
          <br />
          <b>{eventInfo.event.title}</b>
          <br />
          {eventInfo.event.extendedProps.description}
        </p>
      </>
    );
  }

  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }

  const handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: 1,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (info) => {
    setBookingDetails(info.event.extendedProps.details);
    setShowBookingDetails(true);
    // change the border color just for fun
    info.el.style.borderColor = "red";
  };

  const handleEvents = (events) => {
    //setCurrentEvents(events);
  };

  const eventRender = (info, el) => {
    var tooltip = new Tooltip(info.el, {
      title: info.event.extendedProps.description,
      placement: "top",
      trigger: "hover",
      container: "body",
    });
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    store.dispatch({
      type: admintimeslotaction.GET_ADMIN_VENDOR_LIST,
    });
  }, []);

  useEffect(() => {
    // setcreateCategoryLoader(true);
    // store.dispatch({
    //   type: actionsService.GET_SERVICES_LIST,
    //   vendorid: getLocalData("id"),
    //   languageid: 1,
    //   callBackAction: (response) => {},
    // });
  }, []);
  useEffect(() => {
    // setcreateCategoryLoader(true);
    store.dispatch({
      type: actionsstaff.GET_ADMIN_STAFF_LIST,
    });
  }, []);

  useEffect(() => {
    // setcreateCategoryLoader(true);
    store.dispatch({
      type: actionsCustomer.GET_CUSTOMER_LIST,
      id: getLocalData("id"),
      languageid: 1,
      callBackAction: (response) => {},
    });
  }, []);

  useEffect(() => {
    store.dispatch({
      type: ActionsVendor.GET_ALL_VENDOR,
    });
  }, []);

  const getSubTotal = () => {
    var total = 0;
    if (serviceDetail) {
      total += parseFloat(
        serviceDetail[0].servicelang[0].service[0].serviceprice[0].price
      );
    }
    return total;
  };

  const getTaxPercent = () => {
    let vendor_data = currentVendor && currentVendor;
    if (vendor_data) {
      return vendor_data[0].vat;
    }

    return 0;
  };

  const getSubTax = () => {
    let vendor_data = currentVendor && currentVendor;
    if (vendor_data) {
      var serviceArr = getSubTotal();
      var vatPersentage = vendor_data[0].vat / 100;
      return vatPersentage * serviceArr;
    }
    return 0;
  };

  const getTotal = () => {
    var price = getSubTotal();
    var tax = getSubTax();
    return price + tax;
  };

  const onFinish = (values) => {
    setapploading(true);
    // console.log("this si the value od the data in the payload", values);
    const payLoadData = {
      vendorid: values.appVendor,
      customerid: 0,
      email: values.customeremail,
      contactnumber: values.customercontactno,
      customername: values.customername,
      service_date: apppdate && moment(apppdate).format("DD-MM-YYYY"),
      service_time: appptime && appptime,
      subtotal: parseFloat(getSubTotal()),
      discountvalue: 0,
      actualrate: parseFloat(getSubTotal()),
      vat_percent: parseFloat(getTaxPercent()),
      vat_amount: parseFloat(getSubTax()),
      totalcost: parseFloat(getTotal()),
      payment_method: "1",
      devicetype: "WEB",
      devicetoken: "IMEI0015794545",
      guest: 1,
      categoryid: [],
      staffid: 0,
      serviceid: [
        {
          saloonId: 6,
          serviceid: serviceDetail && serviceDetail[0].servicelang[0].serviceid,
          servicename:
            serviceDetail && serviceDetail[0].servicelang[0].servicename,
          duration: apppduration && apppduration,
          price:
            serviceDetail &&
            serviceDetail[0].servicelang[0].service[0].serviceprice[0].price,
          tax: serviceDetail && serviceDetail[0].servicelang[0].service[0].tax,
          staffId: values.staffid,
          staffName: "R",
          service_date: apppdate && moment(apppdate).format("DD-MM-YYYY"),
          service_time: appptime && appptime,
        },
      ],
      packageid: [],
    };
    dispatch({
      type: actionsDetail.SET_BOOKING,
      payload: payLoadData,
      callBackAction: (status) => {
        if (status) {
          setIsModalVisible(false);
          setapploading(false);
          form.resetFields();
          props.reload();
          setselectvendor(false);
          setvendorloading(true);
        }
      },
    });
  };

  const appDate = (date, dateString) => {
    setapppdate(dateString);
  };

  const appstarttime = (time, timestring) => {
    setappptime(timestring);
  };

  const appduration = (time, timestring) => {
    setapppduration(timestring);
  };

  const selectVendorList = (value) => {
    setselectvendor(true);
    setvendorloading(true);
    const vendor = vendorDetails.filter((vendor) => vendor.id == value);
    setcurrentVendor(vendor);
    store.dispatch({
      type: actionsService.GET_SERVICES_LIST,
      vendorid: value,
      languageid: 1,
      callBackAction: (response) => {
        if (response.data.code === 200) {
          setvendorloading(false);
        }
      },
    });
    store.dispatch({
      type: actionsService.GET_VENDORSTAFF_LIST,
      id: value,
      languageid: 1,
      callBackAction: (response) => {
        if (response.data.code) {
          setvendorloading(false);
        }
      },
    });
  };

  const onChangeStaff = async (event, details) => {
    var setStaffID = event.target.value;
    setSelectedstaff(setStaffID);
    console.log(setStaffID);
    if (setStaffID) {
      var allBookingEvents = [];
      await setIsAwaiting(true);
      props.bookinglist.map((bookings) => {
        if (bookings.bookingtime) {
          bookings.bookingtime.map((service) => {
            if (service.staffid == setStaffID) {
              const dateIs = service.service_date
              // const dateIs = service.service_date.replace(
              //   /(\d\d)\/(\d\d)\/(\d{4})/,
              //   "$3/$2/$1"
              // );
              var dateformt = moment(dateIs, "DD-MM-YYYY").format("YYYY-MM-DD");
              var timeformt = moment(service.service_time,'h:mm:ss').format("hh:mm:ss");
              // const endTime = parseInt(
              //   service.service_details[0] &&
              //     service.service_details[0].price[0]
              //     ? service.service_details[0].price[0].duration
              //     : 0
              // );

              const serviceName =
                  service.service[0] && service.service[0].servicelang[0]
                  ? service.service[0].servicelang[0].servicename
                  : "ERROR";

              allBookingEvents.push({
                id: bookings.bookingno + " " + service.service_id,
                title:
                  JSON.parse(bookings.customerdetails)[0].firstname +
                  " " +
                  JSON.parse(bookings.customerdetails)[0].lastname,
                  
                start: dateformt +"T"+ timeformt,
          
                end: dateformt +"T"+ timeformt,   

                // start: moment(dateformt)
                //   .minute(
                //     moment(service.service_time).utc(false).format("hh:mm") * 60
                //   )
                //   .format(),
                // end: moment(dateformt)
                //   .minute(
                //     moment(service.service_time).utc(false).format("hh:mm") *
                //       60 +
                //       endTime
                //   )
                //   .format(),
                // start: moment(dateIs)
                //   .minute(service.service_time * 60)
                //   .format(),
                // end: moment(dateIs)
                //   .minute(service.service_time * 60 + endTime)
                //   .format(),
                allDay: false,
                extendedProps: {
                  description: serviceName,
                  details: bookings,
                },
                color: getRandomColor(),
              });
            }
          });
        }
      });
      setInitialAllEvents(allBookingEvents);
      setIsAwaiting(false);
    }
  };

  const settings = {
    infinite: false,
    speed: 600,
    dots: false,
    arrows: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const getInitials = (name) => {
    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    return initials.toUpperCase();
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Form className="vendor_horizantal">
            <Form.Item label="Select Vendor">
              <Select
                mode="single"
                name="serviceid"
                defaultValue={
                  vendorDetails && vendorDetails.length > 0 ? vendorDetails[0].vendorname : ""
                }
                placeholder={"Select Vendor"}
                onChange={handleChangeService}
              >
                 <option value={'all'} key={'all'}>
                    {"All vendors"}
                </option>
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
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}></Col>
        {/* <Col span={6} style={{ marginBottom: "10px" }}>
          <Button type="primary" className="new-btn" onClick={showModal}>
            New Appointement
          </Button>
        </Col> */}
      </Row>
      <Modal
        title="Add New Appointment"
        visible={isModalVisible}
        onOk={handleOk}
        className="create_category_modal"
        onCancel={handleCancel}
        footer={[]}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col span={12}>
              <Form.Item
                label="Select Date"
                name="appDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the appointment date",
                  },
                ]}
              >
                <DatePicker onChange={appDate} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Customer Name"
                name="customername"
                rules={[
                  {
                    required: true,
                    message: "Please input the Customer",
                  },
                ]}
              >
                <Input placeholder="Customer Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Customer Email"
                name="customeremail"
                rules={[
                  {
                    required: true,
                    message: "Please input the Email",
                  },
                ]}
              >
                <Input placeholder="Customer Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Customer ContactNo"
                name="customercontactno"
                rules={[
                  {
                    required: true,
                    message: "Please input the ContactNo",
                  },
                ]}
              >
                <Input placeholder="Customer ContactNo" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                label="Select Customer"
                name="customerId"
                rules={[
                  {
                    required: true,
                    message: "Please select the Customer",
                  },
                ]}
              >
                <Select mode="single" placeholder={"Select Customer"}>
                  {customerList &&
                    customerList.length > 0 &&
                    customerList.map((list, id) => {
                      return (
                        <option value={list.id} key={id}>
                          {`${list.firstname} ${list.lastname}`}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={30}>
            <Col span={24}>
              <Form.Item
                label="Select Vendor"
                name="appVendor"
                rules={[
                  {
                    required: true,
                    message: "Please select the Vendor",
                  },
                ]}
              >
                <Select
                  mode="single"
                  placeholder={"Select Vendor"}
                  onChange={selectVendorList}
                >
                  {vendorDetails &&
                    vendorDetails.length > 0 &&
                    vendorDetails.map((list, id) => {
                      return (
                        <option value={list.id} key={id}>
                          {`${list.vendorname}`}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {selectvendor && (
            <>
              <Spin size="large" spinning={vendorloading}>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      label="Start Time"
                      name="appstartTime"
                      rules={[
                        {
                          required: true,
                          message: "Please select the start time",
                        },
                      ]}
                    >
                      <TimePicker format={format} onChange={appstarttime} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Service"
                      name="appservice"
                      rules={[
                        {
                          required: true,
                          message: "Please select the service",
                        },
                      ]}
                    >
                      <Select
                        mode="single"
                        placeholder={"Select Service"}
                        onChange={selectService}
                      >
                        {vendorServiceList &&
                          vendorServiceList.length > 0 &&
                          vendorServiceList.map((list, id) =>
                            // return (
                            //   <option
                            //     value={list.servicelang[0].serviceid}
                            //     key={id}
                            //   >
                            //     {list.servicelang[0].servicename}
                            //   </option>
                            // );
                            list.servicelang.map((service, index) => {
                              {
                                console.log("************", list);
                              }
                              return (
                                <option
                                  value={service.serviceid}
                                  key={service.serviceid}
                                >
                                  {service.servicename}
                                </option>
                              );
                            })
                          )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      label="Duration"
                      name="appduration"
                      rules={[
                        {
                          required: true,
                          message: "Please select the Duration",
                        },
                      ]}
                    >
                      <TimePicker format={format} onChange={appduration} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Select staff"
                      name="staffid"
                      rules={[
                        {
                          required: true,
                          message: "Please select the staff",
                        },
                      ]}
                    >
                      <Select
                        mode="single"
                        placeholder={"Select staff"}
                        // onChange={handleChangeService}
                      >
                        {staffList &&
                          staffList.length > 0 &&
                          staffList.map((list, id) => {
                            return (
                              <option value={list.id} key={id}>
                                {`${list.firstname} ${list.lastname}`}
                              </option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Spin>
            </>
          )}

          <Row gutter={30}>
            <Col span={24}>
              <Form.Item
                label="Appointment Notes"
                name="appTime"
                rules={[
                  {
                    required: true,
                    message: "Please select the Appointment Notes",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" loading={apploading}>
            Submit
          </Button>
        </Form>
      </Modal>
      {StaffData.length > 0 && (
        <div className="calender_slider">
          <Radio.Group buttonStyle="solid" value={Selectedstaff}>
            <Carousel {...settings}>
              {StaffData &&
                StaffData.length > 0 &&
                StaffData.map((key, index) => {
                  return (
                    <Radio.Button
                      onChange={(event) => onChangeStaff(event, key)}
                      key={`${key}${index}`}
                      value={key.id}
                    >
                      <div className="block_user_box">
                        {/* <Avatar size={80} icon={<UserOutlined />}> */}
                        <Avatar size={80}>
                          <span>
                            {getInitials(`${key.firstname} ${key.lastname}`)}
                          </span>
                        </Avatar>
                        <div>
                          {key.firstname} {key.lastname}
                        </div>
                      </div>
                    </Radio.Button>
                  );
                })}
            </Carousel>
          </Radio.Group>
        </div>
      )}

      <FullCalendar
        schedulerLicenseKey="0371624306-fcs-1633265348"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,resourceTimeline",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          resourceTimeline: "Time line",
        }}
        initialView="timeGridWeek"
        slotDuration={"00:15"}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        displayEventTime={true}
        nowIndicator={true}
        initialEvent={initialAllEvents}
        events={initialAllEvents}
        weekends={weekendsVisible}
        eventDidMount={eventRender}
        //select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      />

      <Drawer
        destroyOnClose={true}
        title="Booking Details"
        placement="right"
        className="create_category_modal"
        onClose={(e) => {
          setBookingDetails(null);
          setShowBookingDetails(false);
        }}
        visible={showBookingDetails}
        width={700}
      >
        <BookingDetails bookingId={bookingDetails ? bookingDetails.id : 0} />
        {/**jgjsg */}
      </Drawer>
    </>
  );
};
