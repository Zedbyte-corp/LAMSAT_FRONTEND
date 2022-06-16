import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Switch,
  Radio,
  Input,
  Form,
  Checkbox,
  Button,
  Card,
  Skeleton,
  message,
  Select,
  Spin,
  AutoComplete,
  TimePicker,
  Tooltip,
  Upload,
  InputNumber,
} from "antd";
import GoogleAutocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  StarOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import "react-phone-number-input/style.css";
import ListingLayoutAction from "redux/ListingLayout/actions";

import PhoneInput from "react-phone-number-input";
import {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "assets/css/style.scss";
import "assets/css/login-signup.scss";
import { getLocaleMessages } from "redux/helper";
import { useSelector, useDispatch } from "react-redux";
import { formProps } from "containers/OnBoarding/constant";
import { NavLink, useLocation } from "react-router-dom";
import addressActions from "redux/admin/address/actions";
import actions from "redux/auth/actions";
import settingActions from "redux/Settings/actions";
import actionsFileUpload from "redux/PartnerSignup/actions";
import layoutActions from "redux/Layout/actions";
import { history, store } from "redux/store";
import { UploadOutlined } from "@ant-design/icons";
import Mymap from "components/Admin/VendorProfile/Mymap";
import moment from "moment";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";
import { joinSpans } from "@fullcalendar/react";
import Geocode from "react-geocode";
import ImageUploader from "components/Shared/ImageUpload";

const { TextArea } = Input;

const { Content } = Layout;

const { Option } = Select;

function onBlur() {}

function onFocus() {}

function onSearch(val) {}

const Becomepartner = (props) => {
  const dispatch = useDispatch();
  const LayoutData = useSelector((state) => state.Layouts);
  const { categoryLoader, categoryData } = LayoutData;
  const [fullAddress, setFullAddress] = useState("");
  const [ploading, setPLoading] = useState(false);
  const [pAddress, setPAddress] = useState("");
  const [pDistrict, setPDistrict] = useState("");
  const [pRegion, setPRegion] = useState("");
  const [pCode, setPCode] = useState("");
  const [Partnerloader, setPartnerloader] = useState(false);
  const { onLoginForgot, LoginSignup, loader } = props;
  const { userCityList, userCountryList, loading, countryList } = useSelector(
    (state) => state.Address
  );
  const mobileValidation = (event) => {};
  const { fileUploadLoader } = useSelector((state) => state.PartnerSignup);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { partnerLoader } = useSelector((state) => state.Auth);
  const [getLatitude, setLatitude] = useState(24.7255541);
  const [getLongitude, setLongitude] = useState(46.5416503);
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [partnerdetails, setPartnerdetails] = useState();
  const [salondetails, setsalondetails] = useState();
  const [staffdetails, setstaffdetails] = useState();
  // console.log("this is the value of the partner login", partnerdetails);
  const [nextpage1, setnextpage1] = useState(true);
  const [nextpage2, setnextpage2] = useState(false);
  const [nextpage3, setnextpage3] = useState(false);
  const [staffCount, setstaffCount] = useState([1]);
  const [options, setOptions] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [serviceSelected, setserviceSelected] = useState([]);
  const [showVAT, setShowVAT] = useState(true);
  const [show, setShow] = useState(true);
  const [showmap, setshowmap] = useState(true);
  const [country, setCountry] = useState(1);
  const [city, setCity] = useState(1);

  const [isCrDocument, setIsCrDocument] = useState();
  const [isVatDocument, setIsVatDocument] = useState();
  const [isLogoDocument, setIsLogoDocument] = useState();
  const [isBankDocument, setIsBankDocument] = useState();
  const [issaloonImage, setIssaloonImage] = useState();

  const [vatUrl, setVatUrl] = useState("");
  const [crUrl, setCRUrl] = useState("");
  const [bankcardUrl, setbankcardUrl] = useState("");
  const [saloonUrl, setsaloonUrl] = useState([]);
  const [logoPath, setLogoPath] = useState("");
  const [logo, setlogo] = useState();
  const [logopath, setlogopath] = useState();
  const [cr, setcr] = useState();
  const [crpath, setcrpath] = useState();
  const [vat, setvat] = useState();
  const [vatpath, setvatpath] = useState();
  const [mobileprefix, setmobileprefix] = useState("+966");
  // console.log("this si the value od the data in the document", logo, cr, vat);

  const [duplicateEmail, setDuplicateEmail] = useState();
  const [CRDocs, setCRDocs] = useState({ name: "" });
  const [LogoDocs, setLogoDocs] = useState({ name: "" });
  const [VATDocs, setVATDocs] = useState({ name: "" });
  const [mondayTime, setmondayTime] = useState();
  const [TuesdayTime, setTuesdayTime] = useState();
  const [WednesdayTime, setWednesdayTime] = useState();
  const [ThursdayTime, setThursdayTime] = useState();
  const [FridayTime, setFridayTime] = useState();
  const [SaturdayTime, setSaturdayTime] = useState();
  const [SundayTime, setSundayTime] = useState();
  // console.log("loading pl: " + partnerLoader);
  // console.log("loading ful: " + fileUploadLoader);
  const [selectedLocation, setselectedLocation] = useState("");
  const [cityName, setCityName] = useState("");
  const [mapAddress, setMapAddress] = useState("");

  const { saloonLanguange } = useSelector((state) => state.AdminVendorProfile);
  const hearAboutFresha = (e) => {};
  const handlepartnerAddress = (e) => {
    e.preventDefault();
    setPAddress(pAddress);
  };
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
  const onSelect = (value) => {};
  const handleCloseDraw = () => {
    setDrawer(!drawer);
  };
  const handleKeyPress = (ev) => {};

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const onChangePartnerService = (e) => {};

  const handleCountryChange = (value) => {
    form.setFieldsValue({ country: parseInt(value) });
    setCountry(value);
    // console.log("setcountry", value);
    // console.log("country =>", { country: parseInt(value) });
    dispatch({
      type: addressActions.GET_USER_CITY_LIST,
      countryid: value,
    });
  };
  const getLatLng = (event) => {
    console.log("event in the map", event, getLatitude, getLongitude);
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  };
  Geocode.setApiKey("AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro");
  Geocode.enableDebug();

  Geocode.fromLatLng(getLatitude, getLongitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      setFullAddress(response.results[0].formatted_address);
      form.setFieldsValue({
        partnerAddress: response.results[0].formatted_address,
      });
      console.log("fulladdress", fullAddress);
      console.log("results", response.results);
      {
        /** 
      if (response) {
        console.log("address", pAddress);
        setPAddress(
          response.results[0].address_components[0].long_name
            ? response.results[0].address_components[0].long_name
            : " " + " " + response.results[0].address_components[1].long_name
            ? response.results[0].address_components[1].long_name
            : " "
        );
        setPDistrict(
          response.results[0].address_components[2].long_name
            ? response.results[0].address_components[2].long_name
            : " "
        );
        setPRegion(
          response.results[0].address_components[3].long_name
            ? response.results[0].address_components[3].long_name
            : ""
        );
        setPCode(
          response.results[0].address_components[5].long_name
            ? response.results[0].address_components[5].long_name
            : " "
        );
      } */
      }
    },
    (error) => {
      console.error(error);
    }
  );

  const settLatLng = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    // console.log("this si the value of the latitude and lnggg", lat, lng);
  };
  const handleCityChange = (value) => {
    setCity(value);
    form.setFieldsValue({ city: parseInt(value) });
    // console.log("city =>", { city: parseInt(value) });
    // console.log("setcity", value);
  };

  const onLogoChange = ({ file }, doctype) => {};
  const onNextPage = (values) => {
    values = {
      ...values,
      username: values.firstname + values.lastname,
      // vatdocument_url: vat && vat,
      // crdocument_url: cr,
      // logodocument: logo,
      contactnumber: values["phonenumber"],
      phonenumber: values["phonenumber"],
      values: null,
      privacy_policy: 1,
    };
    localStorage.setItem("lamsat-patner-details", JSON.stringify(values));

    const emailVarification = {
      email_address: values.email,
      mobile: values.phonenumber,
    };

    store.dispatch({
      type: actions.VALIDATE_PARTNER_EMAIL,
      payload: emailVarification,
      callBackAction: (response) => {
        if (response.status == 200) {
          setPartnerdetails(values);
          //console.log("values",values);
          //  nextPage();
        } else {
          setDuplicateEmail("Email id or contact number is already exist!");
        }
      },
    });
  };
  useEffect(() => {
    store.dispatch({
      type: layoutActions.GET_LAYOUT_CATEGORIES,
    });
    store.dispatch({
      type: addressActions.GET_ADMIN_COUNTRY_LIST,
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const vendor_details = JSON.parse(
    localStorage.getItem("lamsat-patner-details")
  );

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
      setshowmap(false);
      setshowmap(true);
      //localStorage.setItem('formatted_address', place.formatted_address);
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
  const defaultvendorAddress = (saloonLanguangeval, val) => {
    var newsaloondata = saloonLanguangeval.filter(
      (saloonlang) => saloonlang.id == val
    );
    console.log(
      "saloonLanguangeval",
      saloonLanguange,
      saloonLanguangeval[0]?.vendoraddress,
      newsaloondata,
      newsaloondata.length && newsaloondata[0].vendoraddress
    );
    if (saloonLanguangeval[0]?.vendoraddress) {
      return saloonLanguangeval[0]?.vendoraddress;
    } else {
      return;
    }
  };

  const onFinish = (values) => {
    setPartnerloader(true);
    console.log("values", values);
    const countryCode1 = parsePhoneNumber(values.phonenumber);
    const countryCode = countryCode1.countryCallingCode;
    store.dispatch({
      type: settingActions.CREATE_PARTNER_NUMBER,
      callBackAction: (resss, trueFalse) => {
        const payload_data = {
          username: values.firstname + values.lastname,
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          vendornumber: resss.data.data,
          contactnumber: values.phonenumber,
          mobile_number: values.saloonContactNumber,
          saloonphone: values.saloonPhoneNumber,
          saloonemail: values.saloonEmail,
          prefix: countryCode,
          partnerAddress: values.partnerAddress,
          partnerDistrict: "partnerDistrict",
          partnerPostcode: values.partnerPostcode,
          partnerRegion: "partnerRegion",
          latitude: getLatitude,
          longitude: getLongitude,
          cityid: values.cityid,
          countryid: values.countryid,
          confirmpassword: values.confirmpassword,
          password: values.password,
          privacy_policy: values.agree ? 1 : 0,
          language: [
            {
              id: 1,
              languagekey: "de58615b-9cbc-49d5-bd91-b6cb993efba3",
              languagename: "English",
              languageshortname: "en",
              status: 1,
              created_by: 1,
              created_at: "2021-03-01T06:12:30.355Z",
              updated_by: null,
              updated_at: null,
              version: null,
              vendorname: values.saloonname,
              vendordescription: values.description,
              vendoraddress: values.partnerAddress,
            },
            {
              id: 2,
              languagekey: "83c6709e-a00b-4eb1-8937-6776110945f0",
              languagename: "Arabic",
              languageshortname: "ar",
              status: 1,
              created_by: 1,
              created_at: "2021-03-01T06:13:31.629Z",
              updated_by: null,
              updated_at: null,
              version: null,
              vendorname: values.saloonname,
              vendordescription: values.description,
              vendoraddress: values.partnerAddress,
            },
          ],
        };
        store.dispatch({
          type: actions.CREATE_PARTNER_ACCOUNT,
          payload: payload_data,
          callBackActionPartner: (resss) => {
            setPartnerloader(false);
          },
        });
      },
    });
  };
  const onFinishFailed = () => {
    console.log("err");
    message.warning(
      getLocaleMessages({
        id: "vendor.error",
      })
    );
  };
  return (
    <>
      <section className="login-dashboard partner">
        <div className="login-box">
          <NavLink to={"/"} className="back_to_page">
            <CloseOutlined />
          </NavLink>

          <div className="login-headers">
            <div>
              <NavLink to={"/"}>
                <img src={require("../../assets/img/logo-clolor.png")} alt="" />
              </NavLink>
            </div>
            <h2 style={{ color: "#f9a392" }}>Please enter user details</h2>
          </div>
          <>
            {duplicateEmail && (
              <Alert
                message={duplicateEmail}
                type="error"
                showIcon
                closable
                style={{ marginBottom: "3%" }}
              />
            )}
            <Spin size="large" spinning={loading || Partnerloader}>
              <Form
                {...formProps}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  mobile_number: {
                    countrycode: "+966",
                  },
                }}
                className="partners-form"
              >
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: getLocaleMessages({
                            id: "Please enter first name!",
                          }),
                        },
                        {
                          pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                          message: "You can't use number here!",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: getLocaleMessages({
                            id: "Please enter last name!",
                          }),
                        },
                        {
                          pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                          message: "You can't use number here!",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          type: "email",
                          message: getLocaleMessages({
                            id: "Please enter email",
                          }),
                        },
                      ]}
                    >
                      <Input type="email" placeholder="Email address" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="mobile_number">
                      <Input.Group compact>
                        <Form.Item
                          name={"phonenumber"}
                          rules={[
                            {
                              required: true,
                              message: getLocaleMessages({
                                id: "staff.contact.error",
                              }),
                            },
                            {
                              min: 13,
                              message:
                                "Contact number should be minimum 9 digits.",
                            },
                            {
                              max: 16,
                              message:
                                "Contact number should be maximum 16 digits.",
                            },
                          ]}
                        >
                          <PhoneInput
                            onChange={(event) => {
                              mobileValidation(event);
                            }}
                            international
                            defaultCountry="SA"
                            initialValueFormat="national"
                            countryCallingCodeEditable={false}
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input your Password!",
                        },
                        {
                          min: 6,
                          message: "Password must be minimum 6 characters.",
                        },
                        {
                          max: 16,
                          message: "Password can be maximum 16 characters.",
                        },
                      ]}
                    >
                      <Input.Password type="password" placeholder="Password" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="confirmpassword"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please confirm your Password!",
                        },
                        {
                          min: 6,
                          message:
                            "Confirm password must be minimum 6 characters.",
                        },
                        {
                          max: 16,
                          message:
                            "Confirm password can be maximum 16 characters.",
                        },
                      ]}
                    >
                      <Input.Password
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <article>
                  <div className="login-headers">
                    <h2 style={{ color: "#f9a392" }}>
                      Please enter salon details
                    </h2>
                  </div>
                  <h5> Salon Information :</h5>
                  <Form.Item
                    name="saloonname"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: getLocaleMessages({
                          id: "Please enter saloon name!",
                        }),
                      },
                      {
                        pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                        message: "You can't use number here!",
                      },
                    ]}
                  >
                    <Input placeholder="Saloon Name" />
                  </Form.Item>
                  <Form.Item
                    name={"description"}
                    // label={getLocaleMessages({ id: "Address" })}
                    rules={[
                      {
                        required: true,
                        message: "Please input the description!",
                      },
                    ]}
                  >
                    <TextArea placeholder="Description" />
                  </Form.Item>
                  <h5> Salon Contact :</h5>
                  <p style={{ color: "#7a7a73", fontSize: "18px" }}>
                    These contact will be present to customers
                  </p>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item
                        name="saloonContactNumber"
                        rules={[
                          {
                            required: true,
                            message: getLocaleMessages({
                              id: "staff.contact.error",
                            }),
                          },
                          {
                            min: 13,
                            message:
                              "Contact number should be minimum 9 digits.",
                          },
                          {
                            max: 16,
                            message:
                              "Contact number should be maximum 16 digits.",
                          },
                        ]}
                      >
                        <PhoneInput
                          onChange={(event) => {
                            mobileValidation(event);
                          }}
                          international
                          defaultCountry="SA"
                          placeholder="Contact Number"
                          initialValueFormat="national"
                          countryCallingCodeEditable={false}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="saloonEmail"
                        rules={[
                          {
                            type: "email",
                            required: true,
                            message: "Please enter Your Email",
                          },
                        ]}
                      >
                        <Input placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="saloonPhoneNumber"
                        rules={[
                          {
                            required: false,
                            message: "Please enter Your Phone Number",
                          },
                          {
                            pattern: new RegExp(
                              /^[0-9\b]+$/
                            ),
                            message: "You can't use letters here!",
                          },
                          // {
                          //   pattern: new RegExp(
                          //     /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm
                          //   ),
                          //   message: "Invalid Phone Number",
                          // },
                        ]}
                      >
                        <Input placeholder="Phone Number (Optional)" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <h5> Salon Address :</h5>

                  <Row gutter={30}>
                    <Col style={{ display: "none" }} span={12}>
                      <Form.Item
                        name="Address"
                        rules={[
                          {
                            required: false,
                            whitespace: true,
                            message: "",
                          },
                        ]}
                      >
                        <AutoComplete
                          options={options}
                          onSelect={onSelect}
                          onSearch={handleSearch}
                        >
                          <Input
                            placeholder="Choose your location"
                            className="custom"
                            size="large"
                            prefix={<SearchOutlined />}
                            onKeyPress={handleKeyPress}
                            suffix={
                              <Tooltip title="Close">
                                <CloseOutlined onClick={handleCloseDraw} />
                              </Tooltip>
                            }
                          />
                        </AutoComplete>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      {/* <Autocomplete
                        style={{
                          flex: "auto",
                          width: "100%",
                          marginLeft: 0,
                          height: "48px",
                        }}
                        name="partnerAddress"
                        className="custom-autocomplete"
                        apiKey={"AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro"}
                        onPlaceSelected={(place) => {
                          searchLocation(
                            place,
                            getAppLanguageList?.length &&
                              getAppLanguageList[0]["id"]
                          );
                        }}
                      /> */}

                      {/* <Form.Item
                        name="partnerAddress"
                        // onChange={handlepartnerAddress}
                        rules={[
                          {
                            required: true,

                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <div className="ant-row ant-form-item">
                          <Autocomplete
                            style={{
                              flex: "auto",
                              width: "100%",
                              marginLeft: 0,
                              height: "48px",
                            }}
                            name="partnerAddress"
                            className="custom-autocomplete"
                            apiKey={"AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro"}
                            onPlaceSelected={(place) => {
                              searchLocation(
                                place,
                                getAppLanguageList?.length &&
                                  getAppLanguageList[0]["id"]
                              );
                            }}
                            defaultValue={
                              mapAddress &&
                              defaultvendorAddress(
                                //saloonLanguange,
                                getAppLanguageList?.length &&
                                  getAppLanguageList[0]["id"]
                              )
                            }
                          />
                        </div>
                      </Form.Item> */}

                      <Form.Item
                        name="partnerAddress"
                        onChange={handlepartnerAddress}
                        rules={[
                          {
                            required: true,

                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <GoogleAutocomplete
                          className="ant-input"
                          onPlaceSelected={(place) => {
                            searchLocation(place);
                          }}
                        />

                        {/*  <Input placeholder="Address" />*/}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="partnerPostcode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Your Postcode",
                          },
                        ]}
                      >
                        <Input type="number" placeholder="Postcode" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item
                        name="countryid"
                        rules={[
                          {
                            required: true,
                            message: getLocaleMessages({
                              id: "Please select a country!",
                            }),
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          autoComplete={"off"}
                          placeholder={"Please select country"}
                          dropdownStyle={{ minWidth: "200px" }}
                          onChange={handleCountryChange}
                        >
                          {countryList &&
                            countryList.length > 0 &&
                            countryList.map((list, id) => {
                              return (
                                <Select.Option value={list.id} key={id}>
                                  {list.countryname}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="cityid"
                        rules={[
                          {
                            required: true,
                            message: getLocaleMessages({
                              id: "Please select a city!",
                            }),
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          autoComplete={"off"}
                          placeholder={"Please select city"}
                          dropdownStyle={{ minWidth: "200px" }}
                          onChange={handleCityChange}
                        >
                          {userCityList &&
                            userCityList.length > 0 &&
                            userCityList.map((list, id) => {
                              console.log("list =>", list);
                              return (
                                <Select.Option
                                  value={parseInt(list.cityid)}
                                  key={id}
                                >
                                  {list.cityname}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <h5>Salon Map</h5>
                  <Col span={24}>
                    <Form.Item>
                      {showmap ? (
                        <Mymap
                          latitude={getLatitude}
                          longitude={getLongitude}
                          getLatLng={getLatLng}
                          settLatLng={(lat, lng) => {
                            settLatLng(lat, lng);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Form.Item>
                  </Col>
                </article>
                <div className="agree">
                  <Form.Item
                    name="agree"
                    valuePropName="checked"
                    //validateTrigger={['onSubmit']}
                    rules={[
                      {
                        required: true,
                        message: "Please accept the terms & conditions!",
                      },
                    ]}
                  >
                    <Checkbox onChange={onChange}>
                      I agree to the &nbsp;
                      <a
                        className="login-form-forgot"
                        href="/cmspage/28"
                        target="_blank"
                      >
                        Terms &amp; Conditions
                      </a>
                    </Checkbox>
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loader}
                >
                  Submit
                </Button>
              </Form>
            </Spin>
          </>
          <NavLink to={"/vendor/login"} className="new new-10">
            Already have a professional account? <span>Sign in</span>
          </NavLink>

          <div className="become-partner">
            <h2>Booking as a customer?</h2>
            <p>
              <NavLink to={"/auth?type=login"} className="new">
                This is the partner area,
                <br /> please go to <span> booker login instead</span>
              </NavLink>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Becomepartner;
