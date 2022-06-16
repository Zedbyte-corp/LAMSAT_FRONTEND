import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Menu,
  Modal,
  Dropdown,
  Avatar,
  Typography,
  Input,
  Drawer,
  Badge,
  message,
  Switch,
  Tooltip,
  Select,
  // AutoComplete,
} from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/auth/actions";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";
// import InjectMessage from "components/utility/intlMessages";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  StarOutlined,
  UserOutlined,
  CloseOutlined,
  CloseCircleTwoTone,
  BellTwoTone,
  BellFilled,
  BellOutlined,
} from "@ant-design/icons";
import SignupModal from "containers/Layouts/SignupModal";
import SigninModal from "containers/Layouts/SigninModal";
import ForgotModal from "containers/Layouts/ForgotModal";
import OTP from "containers/Layouts/OTP";
import "assets/css/header.scss";
import "assets/css/modal.scss";
import "assets/css/responsive.scss";
import { getLocalDataType, getLocalData } from "redux/helper";
import { history, store } from "redux/store";
import layoutActions from "redux/Layout/actions";
import ListingLayoutAction from "redux/ListingLayout/actions";
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import isValidNodeDefinitions from "html-to-react/lib/is-valid-node-definitions";

//  const { Content } = Layout;
const { Option, OptGroup } = Select;
const { Text } = Typography;

const Header = (props) => {
  const [options, setOptions] = useState([]);
  // const { headerChangeLocationn } = props;
  const [getLatitude, setLatitude] = useState(0);
  const [getLongitude, setLongitude] = useState(0);
  const [selectedLocation, setselectedLocation] = useState("");
  const [cityName, setCityName] = useState("");
  const [filtercategoryid, setfiltercategoryid] = useState("");
  const [notificationlist, setnotificationlist] = useState([]);
  const [notificationcount, setnotificationcount] = useState(0);
  const {
    isserviceaccepted,
    isstaffaccepted,
    isprofileaccepted,
    notificationData,
    vendornotificationData,
  } = useSelector((state) => state.AdminVendorProfile);
  console.log("kkkkkk", getLocalDataType);
  useEffect(() => {
    const data = {};
    data["latitude"] = getLatitude;
    data["longitude"] = getLongitude;
    if (cityName) {
      data["vendoraddress"] = cityName;
    }
    let urlParams = new URLSearchParams(history.location.search);
    if (urlParams.get("categoryid")) {
      data["categoryid"] = parseInt(urlParams.get("categoryid"));
    }
    store.dispatch({
      type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
      payload: data,
      initialLoader: true,
    });
  }, [selectedLocation]);

  useEffect(() => {
    if (getLocalDataType() === "vendor") {
      dispatch({
        type: adminvendorprofileAction.GET_SINGLE_VENDOR,
        value: getLocalData("id"),
      });
    }
  }, []);

  useEffect(() => {
    if (getLocalDataType() === "admin") {
      dispatch({
        type: adminvendorprofileAction.GET_ALL_NOTIFICATION,
        payload: {
          userid: 1,
          usertype: "administration",
        },
      });
    }
    if (getLocalDataType() === "vendor") {
      dispatch({
        type: adminvendorprofileAction.GET_ALL_NOTIFICATION,
        payload: {
          userid: getLocalData("id"),
          usertype: "vendor",
        },
      });
    }
    if (getLocalDataType() === "user") {
      dispatch({
        type: adminvendorprofileAction.GET_ALL_NOTIFICATION,
        payload: {
          userid: getLocalData("id"),
          usertype: "user",
        },
      });
    }
  }, []);

  const changeadminnotifiaction = (usertype) => {
    if (usertype == "admin") {
      dispatch({
        type: adminvendorprofileAction.CLEAR_ALL_NOTIFICATION,
        payload: {
          userid: 1,
          usertype: "administration",
        },
        callBackAction: (status) => {
          if (status) {
            setnotificationcount(0);
          }
        }
      });
    }
    if (usertype == "vendor") {
      dispatch({
        type: adminvendorprofileAction.CLEAR_ALL_NOTIFICATION,
        payload: {
          userid: getLocalData("id"),
          usertype: "vendor",
        },
        callBackAction: (status) => {
          if (status) {
            setnotificationcount(0);
          }
        }
      });
    }
  };
  console.log("getLocalDataType", getLocalDataType());

  useEffect(() => {
    if (notificationData.length) {
      setnotificationlist(notificationData[0]);
      let countArr = notificationData[0].filter((item,i) => {return item.isviewed !=1})
      setnotificationcount(countArr.length);
    }
  }, [notificationData]);

  const handleSearch = (value) => {
    setOptions(
      !value
        ? []
        : [
            {
              value,
            },
            {
              value: value + value,
            },
            {
              value: value + value + value,
            },
          ]
    );
  };

  const handleKeyPress = (ev) => {};

  const onSelect = (value) => {};

  const {
    subLang,
    loader,
    isLoggedIn,
    isOtp,
    isemail,
    getAppLanguageList,
    selectedLanguage,
    languageLoader,
  } = useSelector((state) => state.Auth);

  const { editProfileLoader } = useSelector((state) => state.UserProfile);
  const { categoryData, saloonNameList, isName } = useSelector(
    (state) => state.Layouts
  );
  const LayoutListing = useSelector((state) => state.ListingLayout);
  const {
    initialListingLoader,
    listingSaloonLoader,
    listingSaloonData,
    categorysaloonDetail,
    locationName,
    vendorbynameData,
  } = LayoutListing;
  const dispatch = useDispatch();

  console.log("locationName", locationName);
  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLVisible, setIsModalLVisible] = useState(false);
  const [isForgotVisible, setIsForgotVisible] = useState(false);
  const [isOtpVisible, SetIsOtpVisible] = useState(false);
  const [OTPdata, setOTPdata] = useState("");
  const formatted_address = localStorage.getItem("formatted_address");

  useEffect(() => {
    if (isOtpVisible) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = () => undefined;
    }
  }, [isOtpVisible]);
  useEffect(() => {}, [saloonNameList]);

  useEffect(()=>{
    console.log("testtttttttttttttttttttttttt",formatted_address)
  },[formatted_address])

  useEffect(() => {
    store.dispatch({
      type: layoutActions.GET_LAYOUT_CATEGORIES,
    });
    if (isOtp) {
      setIsModalVisible(false);
      SetIsOtpVisible(isOtp);
    } else {
      SetIsOtpVisible(false);
      setOTPdata("");
    }
  }, [isOtp]);

  const showModal = ({ signupModalVisible }) => {
    setIsModalVisible(signupModalVisible);
  };

  const showLModal = ({ loginModalVisible }) => {
    setIsModalLVisible(loginModalVisible);
  };

  const searchLocation = (place) => {
    if (place.name !== undefined) {
      console.log(place);
    } else {
      const placeArr = place.formatted_address.split(",");
      const cityName = place.address_components[0].long_name;
      setCityName(cityName);
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      setLatitude(latitude);
      setLongitude(longitude);
      setselectedLocation(place.formatted_address);
      localStorage.setItem("formatted_address", place.formatted_address);
      localStorage.setItem("cityName", cityName);
      dispatch({
        type: ListingLayoutAction.GET_CURRENT_LATLONG,
        payload: [
          {
            latitude: latitude,
            longitude: longitude,
          },
        ],
      });
    }
  };
  const fOk = () => {
    setIsForgotVisible(false);
  };

  const LoginForgot = ({ login, forgot }) => {
    if (forgot) {
      setIsModalLVisible(login);
      setIsForgotVisible(forgot);
    } else if (login) {
      setIsForgotVisible(forgot);
      setIsModalLVisible(login);
    }
  };

  const LoginSignup = ({ login, signup }) => {
    if (login) {
      setIsModalVisible(signup);
      setIsModalLVisible(login);
    } else if (signup) {
      setIsModalLVisible(login);
      setIsModalVisible(signup);
    }
  };

  const otpOk = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to close this modal and the otp modal never open",
      okText: "ok",
      cancelText: "cancel",
      maskClosable: true,
      mask: true,
      onOk: () => {
        dispatch({
          type: actions.VERIFY_OTP_SUCCESS,
        });
      },
    });
  };

  const onFinish = (values) => {
    values = {
      ...values,
      ...values["mobile_number"],
      confirmpassword: values["password"],
      cityid: 1,
      countryid: 1,
    };
  };

  const onFinishLogin = (values) => {
    dispatch({
      type: actions.AUTHENTICATE_USER,
      payload: values,
      callBackAction: () => {
        showLModal({ loginModalVisible: false });
      },
    });
  };

  const onFinishForgot = (values) => {
    dispatch({
      type: actions.SEND_PASSWORD_RESET_LINK,
      payload: values,
      callBackAction: () => {
        LoginForgot({
          login: true,
          forgot: false,
        });
      },
    });
  };

  const onFinishOTP = () => {
    if (OTPdata.length === 5) {
      dispatch({
        type: actions.VERIFY_OTP,
        payload: {
          otp: OTPdata,
          email: isemail,
        },
        callBackAction: (status) => {
          if (status) {
            SetIsOtpVisible(false);
            setOTPdata("");
          }
        },
      });
    } else {
      message.error("please enter valid OTP");
    }
  };
  function handleChange(value) {
    if (value === "all") {
      store.dispatch({
        type: ListingLayoutAction.GET_CATEGORY_SALOON_DETAILS,
      });
    } else {
      store.dispatch({
        type: ListingLayoutAction.GET_CATEGORY_SALOON_DETAILS,
        payload: value,
        userid: getLocalData("id"),
      });
      setfiltercategoryid(value);
      // aa
    }
  }
  function handleHotelSearch(val) {
    store.dispatch({
      type: ListingLayoutAction.GET_VENDOR_BY_NAME,
      payload: val,
    });
  }
  const onChangeOTP = (value) => {
    setOTPdata(value);
  };

  const handleChangeLanguage = (value) => {
    let newListLanguage = getAppLanguageList.filter(
      (list) => list.id === parseInt(value)
    );

    localStorage.removeItem("site_language");
    localStorage.removeItem("site_language_full");
    //localStorage.setItem("site_language_full", "english");
    //localStorage.setItem('language_id', 1)
    localStorage.setItem(
      "site_language",
      newListLanguage[0]["languageshortname"]
    );
    localStorage.setItem("language_id", newListLanguage[0]["id"]);
    localStorage.setItem(
      "site_language_full",
      newListLanguage[0]["languagename"]
    );
    dispatch({
      type: actions.SET_SELECTED_LANGUAGE,
      payload: newListLanguage[0],
    });
    store.dispatch({
      type: actions.CHANGE_LANGUAGE,
      payload: newListLanguage[0]["languageshortname"],
    });
  };

  // drawer
  const [drawer, setDrawer] = useState(false);

  const handleVisibleDraw = () => {
    setDrawer(!drawer);
  };

  const handleCloseDraw = () => {
    setDrawer(!drawer);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="">
          About us1
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="">
          Customer Support
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="">
          Download our app
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" href="">
          Our Pricing
        </a>
      </Menu.Item>
    </Menu>
  );

  const loginMenu = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => {
          dispatch({
            type: actions.LOGOUT_USER,
          });
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
  const adminnotificationMenu = (
    <Menu style={{ overflow: "auto" }}>
      {notificationlist.length &&
        notificationlist.map((data) => {
          return (
            <Menu.Item
              key={data.id}
              onClick={() => {
                console.log("test");
              }}
            >
              <a href={`/admin/Notificationview/${data.id}`}>
                {data.notification_content.en && data.notification_content.en}
              </a>
            </Menu.Item>
          );
        })}
    </Menu>
  );

  const vendornotificationMenu = (
    <Menu style={{ overflow: "auto" }}>
      {notificationlist.length &&
        notificationlist.map((data) => {
          return (
            <Menu.Item
              key={data.id}
              onClick={() => {
                console.log("test");
              }}
            >
              <a href={`/vendor/ViewNotification/${data.id}`}>
                {data.notification_content.en && data.notification_content.en}
              </a>
            </Menu.Item>
          );
        })}
    </Menu>
  );

  return (
    <>
      <Layout.Header
        className={isLoggedIn ? "site-header site-header-admin" : "site-header"}
      >
        <div className="container">
          <div className="logo">
            {" "}
            <NavLink
              to={{
                pathname: ["admin", "vendor"].includes(getLocalDataType())
                  ? `/${getLocalDataType()}/dashboard`
                  : "/",
              }}
            >
              <img
                src={require("../../assets/img/logo-clolor.png")}
                alt=""
                className="img-fluid"
              />
            </NavLink>
          </div>
          {(history.location.pathname === "/listing" ||
            history.location.pathname === "/detail") && (
            <div className="search-and-location">
              <Select
                className="search-drop"
                // style={{ "caret-color": "transparent" }}
                // onMouseEnter={{ "caret-color": "transparent" }}
                //onMouseLeave={{ "caret-color": "transparent" }}
                //defaultActiveFirstOption={false}
                showSearch
                allowClear
                showAction
                showArrow
                placeholder="Search for a service"
                size="large"
                onChange={handleChange}
                onSearch={handleHotelSearch}
                optionLabelProp="label"
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <OptGroup label={"Category"}>
                  {categoryData && categoryData.length > 0 && (
                    <Option
                      value={"all"}
                      label={"All categories"}
                      key={"all"}
                      className="search-options"
                    >
                      <div className="demo-option-label-item">
                        All categories
                      </div>
                    </Option>
                  )}

                  {categoryData &&
                    categoryData.length > 0 &&
                    categoryData.map((list, id) => {
                      return (
                        <Option
                          value={list.id}
                          label={list.categoryname}
                          key={id}
                          className="search-options"
                        >
                          <div className="demo-option-label-item">
                            {list.categoryname}
                          </div>
                        </Option>
                      );
                    })}
                </OptGroup>
                {/* <OptGroup label="Saloon"> */}
                {vendorbynameData && vendorbynameData.length > 0 && (
                  <OptGroup label="Saloon">
                    {vendorbynameData.map((list, id) => {
                      return (
                        <Option
                          value={list.id}
                          label={list.vendorname}
                          key={id}
                          className="search-options"
                        >
                          <div className="demo-option-label-item">
                            <Link
                              onClick={() =>
                                localStorage.setItem(
                                  "saloonId",
                                  parseInt(list.id)
                                )
                              }
                              to={{
                                pathname: `/details/${list.id}`,
                              }}
                            >
                              <img
                                style={{ float: "left", paddingRight: "10px" }}
                                width="30%"
                                height="30%"
                                alt="saloonimg"
                                src={
                                  list.image_url
                                    ? list.image_url
                                    : list.images.length
                                    ? list.images[0].image_url
                                    : ""
                                }
                              />
                              <p style={{ color: "black", margin: 0 }}>
                                {list.vendorname}
                              </p>
                              <p
                                style={{
                                  color: "black",
                                  fontSize: "14px",
                                  opacity: "0.5",
                                }}
                              >
                                {list.vendoraddress}
                              </p>
                            </Link>
                          </div>
                        </Option>
                      );
                    })}
                  </OptGroup>
                )}
                {/* </OptGroup> */}
                {/* <Option key="00" value="all" label="allcategories">
                  <div className="demo-option-label-item">
                    <StarOutlined />
                    All categories
                  </div>
                </Option> */}
                {/* {isName ?
                  saloonNameList.length > 0 &&
                  saloonNameList.map((list, id) => {
                    return (
                      <Option
                        value={list.id}
                        label={list.vendorname}
                        key={id}
                        className="search-options"
                      >
                        <div className="demo-option-label-item">
                          {list.vendorname}
                        </div>
                      </Option>
                    );
                  })
                  :
                  categoryData &&
                  categoryData.length > 0 &&
                  categoryData.map((list, id) => {
                    return (
                      <Option
                        value={list.id}
                        label={list.categoryname}
                        key={id}
                        className="search-options"
                      >
                        <div className="demo-option-label-item">
                          {list.categoryname}
                        </div>
                      </Option>
                    );
                  })
                } */}
              </Select>

              {drawer ? (
                <Autocomplete
                  className="custom-autocomplete"
                  apiKey={"AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro"}
                  onPlaceSelected={(place) => {
                    console.log('-----places',place);
                    searchLocation(place);
                  }}
                />
              ) : (
                // <AutoComplete
                //   options={options}
                //   onSelect={onSelect}
                //   onSearch={handleSearch}
                // >
                //   <Input
                //     placeholder="Choose your location"
                //     className="custom"
                //     size="large"
                //     prefix={<SearchOutlined />}
                //     onKeyPress={handleKeyPress}
                //     suffix={
                //       <Tooltip title="Close">
                //         <CloseOutlined onClick={handleCloseDraw} />
                //       </Tooltip>
                //     }
                //   />
                // </AutoComplete>
                <>
                  <span className="in">In</span>
                  <span className="location" onClick={handleVisibleDraw}>
                    {formatted_address
                      ? formatted_address
                      : locationName !== ""
                      ? locationName
                      : "القويعية,منطقة الرياض,Saudi Arabia"}
                    {/* {locationName !== "" ? locationName : "Saudi Arabia"} */}
                  </span>
                </>
              )}
            </div>
          )}

          {isLoggedIn && getLocalDataType() === "vendor" && (
            <div>
              {isprofileaccepted == 0 && (
                <p style={{ display: "inline", paddingLeft: "50px" }}>
                  <CloseCircleTwoTone />{" "}
                  <NavLink to={"/vendor/profile"}>
                    1. Please Update Profile{" "}
                  </NavLink>
                </p>
              )}

              {isstaffaccepted == 0 && (
                <p style={{ display: "inline", paddingLeft: "50px" }}>
                  <CloseCircleTwoTone />{" "}
                  <NavLink to={"/vendor/staff"}>
                    {isprofileaccepted == 0 ? "2" : "1"}. Please Create Staff / Staff time
                  </NavLink>
                </p>
              )}

              {isserviceaccepted == 0 && (
                <p style={{ display: "inline", paddingLeft: "50px" }}>
                  <CloseCircleTwoTone />{" "}
                  <NavLink to={"/vendor/services"}>
                    {isprofileaccepted == 0 && isstaffaccepted == 0
                      ? "3"
                      : isprofileaccepted == 1 && isstaffaccepted == 1
                      ? "1"
                      : "2"}
                    . Please Create Menu
                  </NavLink>
                </p>
              )}
            </div>
          )}
          <div className="menu-navigation">
            <ul>
              {/*
              <Select
                className="language-drop"
                value={selectedLanguage["id"]}
                onChange={handleChangeLanguage}
                loading={languageLoader}
                disabled={languageLoader}
              >
                {getAppLanguageList.map((list, index) => (
                  <Option value={list["id"]} key={index}>
                    {list["languagename"]}
                  </Option>
                ))}
              </Select>*/}
              {!isLoggedIn && (
                <>
                  <li>
                    <NavLink to={"/vendor/login"}>For Partners</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/auth?type=signup"}>Sign up</NavLink>
                  </li>
                  <li className="login_a">
                    <NavLink to={"/auth?type=login"}>Log in</NavLink>
                  </li>
                </>
              )}
              {/* <li>
                <Button
                  type="dashed"
                  onClick={
                    selectedLanguage["id"] == 2
                      ? () => handleChangeLanguage(1)
                      : () => handleChangeLanguage(2)
                  }
                >
                  {localStorage.getItem("site_language_full") == "English"
                    ? "Arabic"
                    : "English"}
                </Button>
              </li>*/}

              {isLoggedIn && getLocalDataType() === "vendor" && (
                <li>
                  <Dropdown
                    overlay={vendornotificationMenu}
                    overlayClassName="admin_notifiction"
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow="true"
                    onClick={(e) => {
                      changeadminnotifiaction("vendor");
                    }}
                  >
                    <div className="user-loggin">
                      <Badge
                        count={
                          notificationcount > 10 ? "10+" : notificationcount
                        }
                        showZero
                      >
                        <BellOutlined style={{ fontSize: 25 }} />
                      </Badge>
                    </div>
                  </Dropdown>
                </li>
              )}
              {isLoggedIn && getLocalDataType() === "admin" && (
                <li>
                  <Dropdown
                    overlay={adminnotificationMenu}
                    overlayClassName="admin_notifiction"
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow="true"
                    onClick={(e) => {
                      changeadminnotifiaction("admin");
                    }}
                  >
                    <div className="user-loggin">
                      <Badge
                        count={
                          notificationcount > 10 ? "10+" : notificationcount
                        }
                        showZero
                      >
                        <BellOutlined style={{ fontSize: 25 }} />
                      </Badge>
                    </div>
                  </Dropdown>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Dropdown
                    overlay={loginMenu}
                    overlayClassName="extra-menu"
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow="true"
                  >
                    {getLocalData("image_url") ? (
                      <div className="user-loggin">
                        <Avatar src={getLocalData("image_url")} />
                        <Text>Hi, {getLocalData("firstname")}</Text>
                      </div>
                    ) : (
                      <div className="user-loggin">
                        <Avatar size={40} icon={<UserOutlined />} />
                        <Text>Hi, {getLocalData("firstname")}</Text>
                      </div>
                    )}
                  </Dropdown>
                </li>
              )}

              {/*isLoggedIn ? (
                <li className="hambarger-menu">
                  <Dropdown
                    overlay={loginMenu}
                    overlayClassName="extra-menu"
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow="true"
                  >
                    <a onClick={(e) => e.preventDefault()} />
                  </Dropdown>
                </li>
              ) : (
                ""
              )*/}
            </ul>
          </div>
        </div>
      </Layout.Header>

      {/*Modal*/}
      <SignupModal
        visible={isModalVisible}
        onCancel={() => showModal({ signupModalVisible: false })}
        onFinish={onFinish}
        LoginSignup={LoginSignup}
        loader={loader}
      />

      <SigninModal
        visible={isModalLVisible}
        onCancel={() => showLModal({ loginModalVisible: false })}
        onLoginForgot={LoginForgot}
        onFinish={onFinishLogin}
        LoginSignup={LoginSignup}
        loader={loader}
      />

      <ForgotModal
        visible={isForgotVisible}
        onCancel={fOk}
        onFinish={onFinishForgot}
        onLoginForgot={LoginForgot}
        loader={loader}
      />

      <Modal
        title={false}
        visible={isOtpVisible}
        onCancel={otpOk}
        centered
        footer={false}
        className="modal-ui-1 modal-otp"
        width="100%"
        destroyOnClose
      >
        <div className="modal-body-ui">
          <h2>OTP Verification</h2>
          <p className="sub">
            Enter the OTP you received to <br /> {isemail}{" "}
          </p>
          <div className="ant-form-item-four">
            <OTP OTPdata={OTPdata} onChangeOTP={onChangeOTP} />
          </div>
          <div className="ant-form-item">
            <Button
              type="primary"
              disabled={loader}
              loading={loader}
              onClick={onFinishOTP}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Header;
