import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Checkbox,
  Button,
  Anchor,
  Skeleton,
  Collapse,
  message,
  Radio,
  Carousel,
  Avatar,
  Affix,
} from "antd";
import {
  getLocalData,
  getLocaleMessages,
  getLocalDataType,
  checkValid,
} from "redux/helper";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "rc-tabs/assets/index.css";
import "assets/css/style.scss";
import "assets/css/detail.scss";
import "assets/css/services.scss";
import StickyBox from "react-sticky-box";
import { useSelector } from "react-redux";
import DetailPageAction from "redux/Details/actions";
import { store, history } from "redux/store";
import moment from "moment";
import { isUndefined, times } from "lodash";
import { Spin, Space } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  RightOutlined,
  LeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import { select } from "redux-saga/effects";

const LinkScroll = Anchor.Link;
const { Content } = Layout;

var serArrObj = {};
var outputarr = [];

const settings = {
  infinite: false,
  speed: 600,
  dots: false,
  arrows: false,
  autoplay: false,
  slidesToShow: 6,
  slidesToScroll: 6,
};

const SaloonServicesPage = () => {
  const { saloonid } = useParams();
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const [dateValue, setDateValue] = useState(null);
  localStorage.removeItem("formatted_address");
  const {
    saloonDetail,
    setCategoryAndServices,
    servicesLoader,
    categoryLoader,
    categoryServicesLoader,
    detailServices,
    serviceStaffDetail,
    SID,
    staffDetail,
    staffLoader,
    detailPageLoader,
    saloonDatesPageLoader,
    saloonDates,
    salonstaffslotdata,
    salonstaffslotloader,
  } = useSelector((state) => state.DetailPage);
  const location = useLocation();
  var [serviceDeatilArr, setServiceDeatilArr] = useState([]);
  var [serviceStaffDetailArr, setServiceStaffDetailArr] = useState([]);

  var [serviceSelect, setService] = useState(false);
  const [dateValueHour, setDateValueHour] = useState("");
  const [dateValueMonth, setDateValuemonth] = useState(moment().format("MMMM"));
  const [arrowCount, setArrowCount] = useState(0);

  const [showDate, setShowDate] = useState(moment());
  const [dateValueString, setDateValueString] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  var [isCheckboxChecked, setChecked] = useState([]);
  var [locSaloonId, setLocSaloonId] = useState(0);
  const [staffServiceID, setstaffServiceID] = useState();
  const [staffDatas, setstaffDatas] = useState([]);

  const [serviceStartTime, setServiceStartTime] = useState(0);
  const [serviceEndTime, setServiceEndTime] = useState(23);
  const slider = React.useRef(null);

  var [staffListNoPref] = useState({
    id: 1,
    firstname: "No Preference",
    lastname: "",
  });

  const addSubtract = ({ sign }) => {
    if (sign === "minus") {
      if (arrowCount > 0) {
        setArrowCount(arrowCount - 1);
        let newDates = showDate.subtract(14, "days");
        setShowDate(newDates);
        setDateValuemonth(newDates.format("MMMM"));
      }
    } else if (sign === "add") {
      setArrowCount(arrowCount + 1);
      setShowDate(showDate.add(7, "days"));
      setDateValuemonth(showDate.add(7, "days").format("MMMM"));
    }
  };
  const onChange = (event, dateDetails) => {
    event.preventDefault();

    console.log("dateDetails: ",dateDetails)
    var Datedata = serviceDeatilArr.length && 
                        serviceDeatilArr.filter((testdatas) => testdatas.serviceid && 
                        testdatas.service_time && 
                        testdatas.service_date && testdatas.staffId != 0)
    if(Datedata.length == 0 || Datedata.length>0){
      setServiceDeatilArr(Datedata)  
    }             
    store.dispatch({
      type: DetailPageAction.GET_SALOON_SERVICES,
      payload: saloonid,
    });  
    setstaffDatas([]); 
    
    var date = event.target.value;
    var datearray = date.split("/");
    var newdate = datearray[2] + "-" + datearray[1] + "-" + datearray[0];

    setServiceStartTime(
      dateDetails.starttime.split(":").length > 0
        ? dateDetails.starttime.split(":")[0]
        : "8"
    );
    setServiceEndTime(
      dateDetails.endtime.split(":").length > 0
        ? dateDetails.endtime.split(":")[0]
        : "23"
    );

    setServiceDate(newdate);
    setDateValue(event.target.dataSet);
    setDateValueString(event.target.value);
    setDateValuemonth(event.target.dataSet.format("MMMM"));
    setDateValueHour(parseInt(event.target.dataSet.endOf("hour").format("HH")));
  };

  const minutesToHours = (totalMinutes) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return hours + " hours " + minutes + " min.";
  };

  const timeOnChange = (event, serviceId) => {
    // console.log("this is the value of time change event", event, serviceId);
    // return;
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (serviceDate !== "") {
      var time = event.target.value;
      const slotIndex = serviceDeatilArr.findIndex(
        (obj) => obj.serviceid == serviceId
      );

      // console.log("slotIndex 1: " + slotIndex);
      // console.log("slotIndex 2: " + JSON.stringify(serviceDeatilArr));
      // console.log("slotIndex 3: " + serviceId);

      const slots = [
        ...serviceDeatilArr.slice(0, slotIndex),
        {
          saloonId: locSaloonId,
          serviceid: serviceDeatilArr[slotIndex].serviceid,
          servicename: serviceDeatilArr[slotIndex].servicename,
          duration: serviceDeatilArr[slotIndex].duration,
          price: serviceDeatilArr[slotIndex].price,
          servicerate: serviceDeatilArr[slotIndex].servicerate,
          tax: serviceDeatilArr[slotIndex].tax,
          staffId: serviceDeatilArr[slotIndex].staffId,
          staffName: serviceDeatilArr[slotIndex].staffName,
          service_date: dateValueString,
          service_time: time,
        },
        ...serviceDeatilArr.slice(slotIndex + 1),
      ];

      setServiceDeatilArr(slots);
      serviceCallback(serviceId, dateValueString, time);
      setstaffServiceID(serviceId);
    } else {
      message.info("Please select Date !");
    }
  };

  useEffect(() => {
    // console.log("slotIndex  4: " + JSON.stringify(serviceStaffDetail));
    // console.log("staff details", isCheckboxChecked);
    //serviceStaffDetailArr[39] = serviceStaffDetailArr;
    //setServiceStaffDetailArr(serviceStaffDetailArr);
    if (serviceStaffDetail.length) {
      var datasss = serviceStaffDetail.map((ddd) => {
        ddd.staffServiceID = staffServiceID;
        return ddd;
      });
      if (datasss.length > 0) {
        if (staffDatas.length > 0) {
          var repeatData = staffDatas.filter(
            (data) => data.staffServiceID != staffServiceID
          );
          setstaffDatas(repeatData.concat(datasss));
        } else {
          setstaffDatas(staffDatas.concat(datasss));
        }
      }
    } else {
      var datasss = serviceStaffDetail.map((ddd) => {
        ddd.staffServiceID = staffServiceID;
        return ddd;
      });
      if (staffDatas.length > 0) {
        var repeatData = staffDatas.filter(
          (data) => data.staffServiceID != staffServiceID
        );
        setstaffDatas(repeatData.concat(datasss));
      } else {
        setstaffDatas(staffDatas.concat(datasss));
      }
    }
  }, [serviceStaffDetail]);

  useEffect(() => {
    let urlParams = new URLSearchParams(history.location.search);
    if (parseInt(saloonid) > 0) {
      setLocSaloonId(saloonid);

      store.dispatch({
        type: DetailPageAction.GET_SALOON_DETAILS,
        payload: saloonid,
        userid:
          isLoggedIn && getLocalDataType() === "user"
            ? parseInt(getLocalData("id"))
            : "",
      });

      store.dispatch({
        type: DetailPageAction.GET_SALOON_SERVICES,
        payload: saloonid,
      });
      store.dispatch({
        type: DetailPageAction.GET_SALOON_CATEGORY,
        payload: saloonid,
      });
      store.dispatch({
        type: DetailPageAction.GET_SALOON_STAFF_DETAILS,
        payload: saloonid,
      });
    } else {
      history.push({
        pathname: "/listing",
      });
    }
    localStorage.setItem("lastpath", location.pathname);
  }, []);

  useEffect(() => {
    store.dispatch({
      type: DetailPageAction.GET_SALOON_DETAILS_DATES,
      payload: saloonid,
      userid:
        isLoggedIn && getLocalDataType() === "user"
          ? parseInt(getLocalData("id"))
          : "",
    });
  }, []);

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele.serviceid != value;
    });
  }

  const setServieArr = (e, arr, servicessname) => {
    if(!serviceDate)
    {
      message.info("Please select Date !");
    } else {
     store.dispatch({
      type: DetailPageAction.GET_SALON_STAFF_TIME_SLOT,
      payload: {
        vendorid: locSaloonId,
        date: moment(serviceDate, "YYYY-MM-DD").format("DD-MM-YYYY"),
        serviceid: arr.serviceid
      },
    });
    //console.log("this is the value of hte servicessss", arr);
    const found = serviceDeatilArr.some((ch) => ch.serviceid === arr.serviceid);
    if (!found) {
      let serObj = {
        saloonId: locSaloonId,
        serviceid: arr.serviceid,
        servicename: arr.servicename,
        duration: arr.service[0].serviceprice[0].duration
          ? arr.service[0].serviceprice[0].duration
          : 0,
        price: arr.service[0].serviceprice[0].price
          ? arr.service[0].serviceprice[0].price
          : 0,
        servicerate: arr.service[0].serviceprice[0].price_without_comission
          ? arr.service[0].serviceprice[0].price_without_comission
          : 0,
        tax: 0,
        staffId: 0,
        staffName: "",
        service_date: dateValueString,
        service_time: "",
      };
      var filtered = serviceDeatilArr.filter(function (el) {
        return el.serviceid != arr.serviceid;
      });
      filtered.push(serObj);
      setServiceDeatilArr(filtered);
    } else {
      if (e.length == 0) {
        var filtered = serviceDeatilArr.filter(function (el) {
          return el.serviceid != arr.serviceid;
        });
        setServiceDeatilArr(filtered);
      }
    }    
  }
  };

  const getSloonName = () => {
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0
    ) {
      var selectLang = localStorage.getItem("site_language");
      var arr = saloonDetail.language;
      var langArr = arr.filter(function (el) {
        return el.languageshortname == selectLang;
      });
      return langArr[0].vendorname;
    }

    return "";
  };
  const getSloonAddress = () => {
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0
    ) {
      var selectLang = localStorage.getItem("site_language");
      var arr = saloonDetail.language;
      var langArr = arr.filter(function (el) {
        return el.languageshortname == selectLang;
      });
      return langArr[0].vendoraddress;
    }

    return "";
  };
  const getImagePath = () => {
    if (saloonDetail !== undefined) {
      return `${
        saloonDetail.image_url !== ""
          ? saloonDetail.image_url
          : saloonDetail.images
          ? saloonDetail.images[0].image_url
          : ""
      }`;
      //return `${saloonDetail['image_url']}`;
    }
  };

  const getSubTotal = () => {
    var total = 0;
    serviceDeatilArr.map((service, index) => {
      total += parseFloat(service.price);
    });
    return total;
  };
  const getSubTax = () => {
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0 &&
      saloonDetail.vat !== null &&
      parseInt(saloonDetail.vat) > 0
    ) {
      var serviceArr = getSubTotal();
      var vatPersentage = saloonDetail.vat / 100;
      return vatPersentage * serviceArr;
    }
    return 0;
  };
  const getTotal = () => {
    var price = getSubTotal();
    var tax = getSubTax();
    return price + tax;
  };
  const checkServiceSelect = () => {
    return { pointerEvents: serviceDeatilArr.length > 0 ? "auto" : "none" };
  };
  const { Panel } = Collapse;
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(0);
  
  const callback = (key) => {}
  const serviceCallback = (serviceId, datestring, timestring) => {
    // console.log(`SID - ${SID} serviceId- ${serviceId}`);
    var date = moment(datestring, "DD-MM-YYYY").format("DD-MM-YYYY");
    if (SID.includes(serviceId)) {
      console.log("called");
      const payload = {
        vendorid: locSaloonId,
        serviceid: serviceId,
        date: date,
        time: timestring.replace(".", ":"),
      };
      store.dispatch({
        type: DetailPageAction.GET_SERVICE_STAFF_DETAILS,
        payload: payload,
      });
    } else {
      const payload = {
        vendorid: locSaloonId,
        serviceid: serviceId,
        date: date,
        time: timestring.replace(".", ":"),
      };
      store.dispatch({
        type: DetailPageAction.GET_SERVICE_STAFF_DETAILS,
        payload: payload,
      });
    }
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

  const onBooking = (e) => {
    let isVerified = parseInt(getLocalData("isverifiedemail")) && parseInt(getLocalData("isverified")) ? true : false;
    if(isLoggedIn) {
      if(isVerified) {
        if (serviceDate === "") {
          message.info("Please select date!");
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          return false;
        } else if (serviceDeatilArr.length === 0) {
          message.info("Please select atleast one service!");
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          return false;
        }
        let isValid = true;
        isValid = serviceDeatilArr.length > 0 ? true : false;
        serviceDeatilArr.map((service, index) => {
          if (
            service.staffId === 0 ||
            service.staffName === "" ||
            service.service_date === "" ||
            service.service_time === ""
          ) {
            isValid = false;
          }
        });

        if (!isValid) {
          message.info(
            "Please select date, time and staff for all selected services!"
          );
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        } else {
          var serviceDeatilArrData = serviceDeatilArr.map((data) => {
            data.service_date = moment(data.service_date, "DD-MM-YYYY").format(
              "DD-MM-YYYY"
            );
            data.service_time = data.service_time.replace(".", ":");
            return data;
          });
          //localStorage.setItem("serviceList", JSON.stringify(serviceDeatilArr));
          localStorage.setItem("serviceList", JSON.stringify(serviceDeatilArrData));
          localStorage.setItem("serviceDate", JSON.stringify(serviceDate));
          history.push(`/checkout/${locSaloonId}`);
        }
      } else {
        message.info("Please verify email and mobile number to checkout!");
      }
    } else {
      message.info("Please login to continue checkout!");
    }
  };

  const isStaffChecked = (serviceid, staffid) => {
    let exist = false;
    let ssarr = isCheckboxChecked.filter(
      (itm) => itm.serviceid === serviceid && itm.staffid === staffid
    );
    // if(isCheckboxChecked.includes(id)) {
    //   exist = true;
    // }
    if (ssarr.length) {
      exist = true;
    }
    return exist;
  };

  const checkboxChange = (eVal, id, staffNameObj) => {
    //eVal.target.checked = !eVal.target.checked;
    const slotIndex = serviceDeatilArr.findIndex((obj) => obj.serviceid == id);
    if (slotIndex >= 0) {
      //setChecked(staffNameObj['id']);
      if (!isCheckboxChecked.includes(staffNameObj["id"])) {
        let SSObj = {
          serviceid: id,
          staffid: staffNameObj["id"],
        };

        setChecked([...isCheckboxChecked, SSObj]);
      }

      const slots = [
        ...serviceDeatilArr.slice(0, slotIndex),
        {
          saloonId: locSaloonId,
          serviceid: serviceDeatilArr[slotIndex].serviceid,
          servicename: serviceDeatilArr[slotIndex].servicename,
          duration: serviceDeatilArr[slotIndex].duration,
          price: serviceDeatilArr[slotIndex].price,
          servicerate: serviceDeatilArr[slotIndex].servicerate,
          tax: serviceDeatilArr[slotIndex].tax,
          staffId: staffNameObj["id"],
          staffName: staffNameObj["firstname"] + staffNameObj["lastname"],
          service_date: serviceDeatilArr[slotIndex].service_date,
          service_time: serviceDeatilArr[slotIndex].service_time,
        },
        ...serviceDeatilArr.slice(slotIndex + 1),
      ];

      setServiceDeatilArr(slots);
    } else {
    }
  };

  const _renderStaff = (serviceStaffDetail, serviceListDetail, valchecked) => {
    // console.log('***************************',serviceStaffDetail)
    return (
      <div className="staf-checkbox">
        <Radio.Group
          buttonStyle="solid"
          // value={isCheckboxChecked}
          defaultValue={
            valchecked != "" && valchecked != undefined && valchecked
          }
        >
          {serviceStaffDetail.length ? (
            <>
              {serviceStaffDetail.map(
                (staffList) =>
                  staffList["service"].some(
                    (ch) => ch.serviceid === serviceListDetail["serviceid"]
                  ) && (
                    // ? (
                    <div>
                      <Radio.Button
                        onChange={(e) =>
                          checkboxChange(
                            e,
                            serviceListDetail["serviceid"],
                            staffList
                          )
                        }
                        defaultChecked={isStaffChecked(
                          serviceListDetail["serviceid"],
                          staffList["id"]
                        )}
                        checked={isStaffChecked(
                          serviceListDetail["serviceid"],
                          staffList["id"]
                        )}
                        name={`check-${staffList["id"]}-${serviceListDetail["serviceid"]}`}
                        id={`${staffList["id"]}-${serviceListDetail["serviceid"]}`}
                        value={staffList["id"]}
                      >
                        <span
                          className="img"
                          style={{
                            display: "block",
                          }}
                        >
                          <Avatar size={100}>
                            <span className="initials">
                              {getInitials(
                                `${staffList["firstname"]} ${staffList["lastname"]}`
                              )}
                            </span>
                          </Avatar>
                        </span>
                        <span className="title">
                          {staffList["firstname"]} {staffList["lastname"]}
                        </span>
                        <span className="special">
                          {staffList["staff_title"]}
                        </span>
                      </Radio.Button>
                    </div>
                  )
                // ) : (
                //   <div></div>
                // )
              )}
            </>
          ) : (
            // <p>please select the staff.</p>
            <p></p>
          )}
        </Radio.Group>
      </div>
    );
  };

  const testfunction = (val1, val2) => {
    var chechedData = "";
    var testtt = val1.filter(
      (test) => test.serviceid == val2 && test.staffId > 0
    );
    if (testtt.length > 0) {
      chechedData = testtt[0].staffId;
    }
    return chechedData;
  };

  const hoursAmPmData = (timeval) => {
    if (timeval) {
      var hourdata = parseInt(timeval.split(".")[0]);
      var ampm = timeval.split(" ")[1];
      var hoursdata =
        (hourdata > 12 ? hourdata - 12 : hourdata) + ".00 " + ampm;
      // var hoursdata =
      //   (parseInt(timeval.slice(0, 2)) > 12
      //     ? parseInt(timeval.slice(0, 2)) - 12
      //     : timeval.slice(0, 2)) +
      //   '.00 ' +
      //   (parseInt(timeval.slice(0, 2)) > 12 ? 'PM' : 'AM');
      return hoursdata;
    }
  };

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="detail-information select-services services-detailed-page">
            <div className="container">
              <Row gutter={30}>
                <Col md={16} span={15}>
                  <div className="select-service">
                    <h3>PICK A SERVICE DATE</h3>
                    <div className="main-box">
                      <div className="box br-bottom">
                        <div className="slideing">
                          {/*
                          {arrowCount > 0 && (
                            <LeftOutlined
                              onClick={() => addSubtract({ sign: 'minus' })}
                            />
                          )}
                        */}

                          <Button
                            className="ant-arrow-icons"
                            onClick={() => slider.current.prev()}
                          >
                            <LeftOutlined />
                          </Button>

                          <Radio.Group
                            buttonStyle="solid"
                            value={dateValueString}
                          >
                            <Carousel {...settings} ref={slider}>
                              {/* {console.log(
                                "saloonDates: " + JSON.stringify(saloonDates)
                              )} */}
                              {saloonDates &&
                                saloonDates.length > 0 &&
                                saloonDates.map((key, index) => {
                                  // console.log(
                                  //   "saloonDates 3: " + JSON.stringify(key)
                                  // );
                                  let newDates = moment(showDate).add({
                                    day: index,
                                  });
                                  return (
                                    <Radio.Button
                                      onChange={(event) => onChange(event, key)}
                                      key={`${key}${index}`}
                                      dataSet={newDates}
                                      disabled={!(key.status === 1)}
                                      value={newDates.format("DD/MM/YYYY")}
                                    >
                                      {newDates.format("ddd")}{" "}
                                      <span className="block">
                                        {newDates.format("DD")}
                                        <span>{newDates.format("MMMM")}</span>
                                      </span>
                                    </Radio.Button>
                                  );
                                })}
                            </Carousel>
                          </Radio.Group>

                          <Button
                            className="ant-arrow-icons prev"
                            onClick={() => slider.current.next()}
                          >
                            <RightOutlined />
                          </Button>

                          {/*
                          <RightOutlined
                            onClick={() => addSubtract({ sign: 'add' })}
                          />
                          */}
                        </div>
                      </div>
                    </div>
                    {dateValue && <h3>SELECT A CATEGORY</h3>}
                    {dateValue ? <div className="main-box">
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginInline : 'auto'}}>
                        {(saloonDetail.id && detailServices.length &&                        
                        detailServices.map(
                          (categoryAndServicesList, index) =>
                            <div style={categoryAndServicesList.categoryid == selectedCategoryTab ? {
                              display: 'grid',cursor: 'pointer',
                              background: '#f9a392',
                              padding: '10px', color: 'white',
                              margin: '5px', justifyContent: 'center'
                          } : {
                            display: 'grid',cursor: 'pointer',
                            background: 'white',
                            padding: '10px', color: 'black',
                            margin: '5px', justifyContent: 'center'
                        }} onClick={() => setSelectedCategoryTab(categoryAndServicesList.categoryid)}>
                              <span>{categoryAndServicesList.categoryname}</span>
                            </div>)
                        )}
                      </div>
                    </div> : <div></div> }
                    {selectedCategoryTab > 0 && <h3>CHOOSE A SERVICE YOU LIKE</h3>}
                    {detailServices && detailServices.map(
                      (categoryAndServicesList, idx) =>
                        categoryAndServicesList["servicelang"].length && categoryAndServicesList.categoryid == selectedCategoryTab && (                          
                        <ul key={idx} className="service_loop">
                          {categoryAndServicesList["servicelang"]
                            .length ? (
                              categoryAndServicesList[
                              "servicelang"
                            ].map((serviceListDetail, index) => (
                              <li className="list" key={index}>
                                <Collapse
                                  onChange={(e) => {
                                    console.log("collapse clicked: ", e)
                                    setServieArr(
                                      e,
                                      serviceListDetail,
                                      serviceListDetail["servicename"]
                                    );
                                  }}
                                >
                                  <Panel
                                    header=""
                                    key={serviceListDetail["id"]}
                                    showArrow={false}
                                    collapsible
                                    extra={
                                      <p className="rate">
                                        <span className="title">
                                          <CheckCircleFilled />
                                          {
                                            serviceListDetail[
                                              "servicename"
                                            ]
                                          }
                                        </span>
                                        <span className="price">
                                          {serviceListDetail[
                                            "service"
                                          ] &&
                                            serviceListDetail[
                                              "service"
                                            ].length > 0 &&
                                            serviceListDetail[
                                              "service"
                                            ][0]["serviceprice"] &&
                                            serviceListDetail[
                                              "service"
                                            ][0]["serviceprice"]
                                              .length > 0 &&
                                            parseFloat(
                                              serviceListDetail[
                                                "service"
                                              ][0]["serviceprice"][0]
                                                .price
                                            ).toFixed(2)}{" "}
                                          SAR
                                        </span>
                                      </p>
                                    }
                                  >
                                    <span className="hour">
                                      <div className="box">
                                        <h3>Available Slot</h3>
                                       
                                        {/* {console.log("salonstaffslotdata: ",salonstaffslotdata)}
                                        {console.log("dateValue: ",dateValue)}
                                        {console.log(moment()
                                            .startOf("day")
                                            .diff(
                                              moment(
                                                dateValue
                                              ).startOf("day"),
                                              "days"
                                        ))}
                                        {console.log("times:",times(48, {}))}
                                        {console.log("serviceStartTime:",serviceStartTime)}
                                        {console.log("serviceEndTime:",serviceEndTime)}
                                        {console.log("dateValueHour:",dateValueHour)} */}

                                        {salonstaffslotdata.length ? 
                                        <Radio.Group
                                          defaultValue=""
                                          buttonStyle="solid"
                                        >
                                          {moment()
                                            .startOf("day")
                                            .diff(
                                              moment(
                                                dateValue
                                              ).startOf("day"),
                                              "days"
                                            ) === 0 ? (
                                            <>
                                            {/* {times(48, {}).map( 
                                                (key, index) => {
                                                  return index >=
                                                    parseInt(
                                                      serviceStartTime
                                                    ) &&
                                                    index <=
                                                      parseInt(
                                                        serviceEndTime
                                                      ) &&
                                                    dateValueHour <
                                                      index + 1 ? (
                                                    salonstaffslotdata.includes(`${index + 1}:00`) &&
                                                    <Radio.Button
                                                      onChange={(
                                                        event
                                                      ) =>
                                                        timeOnChange(
                                                          event,
                                                          serviceListDetail[
                                                            "serviceid"
                                                          ]
                                                        )
                                                      }
                                                      key={`${key}${index}`}
                                                      value={`${
                                                        index + 1 > 12
                                                          ? index - 11
                                                          : index + 1
                                                      }.00 ${
                                                        index + 1 > 11
                                                          ? "PM"
                                                          : "AM"
                                                      }`}
                                                    >
                                                      {index + 1 > 12
                                                        ? index - 11
                                                        : index + 1}
                                                      .00{" "}
                                                      <span className="block">
                                                        {index + 1 >
                                                        11
                                                          ? "PM"
                                                          : "AM"}
                                                      </span>
                                                    </Radio.Button>
                                                  ) : (
                                                    ""
                                                  );
                                                }
                                              )}*/}
                                            </>
                                          ) : (
                                            <>
                                              {times(24, {}).map(
                                                (key, index) => {
                                                  return index >=
                                                    parseInt(
                                                      serviceStartTime
                                                    ) &&
                                                    index <=
                                                      parseInt(
                                                        serviceEndTime
                                                      ) ? (
                                                  salonstaffslotdata.includes(`${index + 1}:00`) &&
                                                    <Radio.Button
                                                      onChange={(
                                                        event
                                                      ) =>
                                                        timeOnChange(
                                                          event,
                                                          serviceListDetail[
                                                            "serviceid"
                                                          ]
                                                        )
                                                      }
                                                      key={`${key}${index}`}
                                                      value={`${
                                                        index + 1
                                                      }.00 ${
                                                        index + 1 > 11
                                                          ? "PM"
                                                          : "AM"
                                                      } `}
                                                    >
                                                      {index + 1 > 12
                                                        ? index - 11
                                                        : index + 1}
                                                      .00{" "}
                                                      <span className="block">
                                                        {index + 1 >
                                                        11
                                                          ? "PM"
                                                          : "AM"}
                                                      </span>
                                                    </Radio.Button>
                                                  ) : (
                                                    ""
                                                  );
                                                }
                                              )}
                                            </>
                                          )}
                                        </Radio.Group>
                                        :
                                        <p> There is no time slot available</p>
                                      }
                                      </div>
                                     
                                    </span>
                                    <div className="single_staffs">
                                    {staffDatas.length ? <h3>Select Staff</h3> : ""}
                                      {staffLoader ? (
                                        <div
                                          className="staf-checkbox"
                                          style={{
                                            display: "flex",
                                            textAlign: "center",
                                            marginRight: "5px",
                                          }}
                                        >
                                          {times(4, {}).map(() => (
                                            <div
                                              style={{
                                                marginRight: "5px",
                                              }}
                                            >
                                              <Skeleton.Avatar
                                                active
                                                loading={true}
                                                size={"large"}
                                                shape={"circle"}
                                                style={{
                                                  marginBottom:
                                                    "10px",
                                                }}
                                              />
                                              <Skeleton.Input
                                                style={{
                                                  width: 200,
                                                }}
                                                active
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        _renderStaff(
                                          staffDatas,
                                          serviceListDetail,
                                          serviceDeatilArr.length > 0
                                            ? testfunction(
                                                serviceDeatilArr,
                                                serviceListDetail[
                                                  "serviceid"
                                                ]
                                              )
                                            : ""
                                        )
                                      )}
                                    </div>
                                  </Panel>
                                </Collapse>
                              </li>
                            ))
                          ) : (
                            <>
                              <p>No service is available</p>
                            </>
                          )}
                        </ul>
                      )
                    )} 
                 
                  </div>
                </Col>
                <Col md={8} span={15}>
                  <StickyBox offsetTop={90} offsetBottom={20}>
                    <div className="side-carts">
                      {detailPageLoader ? (
                        <>
                          <Skeleton
                            loading={true}
                            active
                            avatar
                            paragraph={{ rows: 1, width: "100%" }}
                          />
                        </>
                      ) : (
                        <div className="heads">
                          <div className="img">
                            <Link
                              to={{
                                pathname: `/detail/${locSaloonId}`,
                              }}
                            >
                              <img src={getImagePath()} alt="" />
                            </Link>
                          </div>
                          <div>
                            <p className="title">
                              <Link
                                to={{
                                  pathname: `/detail/${locSaloonId}`,
                                }}
                              >
                                {saloonDetail && getSloonName()}
                              </Link>
                            </p>
                            <address>{getSloonAddress()}</address>
                          </div>
                        </div>
                      )}
                      {dateValue && <div className="orders" style={{padding: '5px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>{moment(serviceDate).format("DD/MM/YYYY")}</div>}
                      {serviceDeatilArr.map((service, index) => {
                        let serviceObjVal = service;
                        return (
                          <>
                            <div className="orders">
                              <ul>
                                <li>
                                  <div>
                                    <h4>{serviceObjVal.servicename}</h4>
                                    <p>
                                      Duration:{" "}
                                      {minutesToHours(serviceObjVal.duration)}
                                    </p>
                                    <p>
                                      At{" "}
                                      {serviceObjVal.service_time
                                        ? hoursAmPmData(
                                            serviceObjVal.service_time
                                          )
                                        : serviceObjVal.service_time}{" "}
                                    </p>
                                    <p>By {serviceObjVal.staffName}</p>
                                  </div>
                                  <div className="price">
                                    {parseFloat(serviceObjVal.price).toFixed(2)}{" "}
                                    SAR
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </>
                        );
                      })}
                      <div className="cart-bill">
                        <p className="sub">
                          <span>Sub Total</span>{" "}
                          <span className="price bolds">
                            {parseFloat(getSubTotal()).toFixed(2)} SAR
                          </span>
                        </p>
                        {saloonDetail.vat !== null &&
                          parseInt(saloonDetail.vat) >= 0 && (
                            <p>
                              <span>Vat({`${saloonDetail.vat}%`})</span>{" "}
                              <span className="price">
                                {parseFloat(getSubTax()).toFixed(2)} SAR
                              </span>
                            </p>
                          )}
                        <p className="total bolds">
                          <span>Total Amount</span>{" "}
                          <span className="price">
                            {parseFloat(getTotal()).toFixed(2)} SAR
                          </span>
                        </p>
                      </div>

                      <div className="booknow">
                        <Button 
                          onClick={onBooking} 
                          type="primary">
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </StickyBox>
                </Col>
              </Row>
            </div>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default SaloonServicesPage;
