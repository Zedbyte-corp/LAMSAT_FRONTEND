import React, { useState, useEffect } from "react";
import ImageUpload from "components/Shared/ImageUpload";
import {
  Row,
  Col,
  Card,
  Tabs,
  Form,
  Input,
  Button,
  message,
  Radio,
  Space,
  Select,
  InputNumber,
  Checkbox,
  Spin,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getLocalData, getLocaleMessages } from "redux/helper";
import { formProps } from "containers/OnBoarding/constant";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/auth/actions";
import userDetailActions from "redux/UserDetail/actions";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";
import { store } from "redux/store";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Mymap from "components/Admin/VendorProfile/Mymap";
import "assets/css/dashboard.scss";
//import MapWithMarker from "components/Admin/VendorProfile/MapWithMarker";
import Geocode from "react-geocode";
import ImageUploader from "components/Shared/ImageUpload";
import settingActions from "redux/Settings/actions";
import actionsFileUpload from "redux/PartnerSignup/actions";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";

const { TabPane } = Tabs;
const uluru = { lat: -25.344, lng: 131.036 };
const Create = (props) => {
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState(1);
  const [getLat, setLat] = useState(0);
  const [getLng, setLng] = useState(0);
  const [show, setShow] = useState(true);
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { imageLoader } = useSelector((state) => state.Settings);
  const [vatfile, setvatfile] = useState();
  const [vatpath, setvatpath] = useState();
  const [cr, setcr] = useState();
  const [mapAddress, setMapAddress] = useState("");
  const [crpath, setcrpath] = useState();
  const [bankcardUrl, setbankcardUrl] = useState("");
  const [saloonNumber, setsaloonNumber] = useState();
  const [ShowVAT, setShowVAT] = useState(true);
  const {
    vendorName,
    vendorAddress,
    vendorDescription,
    imageUploadLoader,
    saloonLanguange,
    lat,
    lng,
    countryList,
    cityList,
    areaList,
    isvendorDetails,
    isvendorDetailsmap,
    categoryList,
    mapCount,
    redirect,
    loading,
  } = useSelector((state) => state.AdminVendorProfile);

  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lng);
  const [defaultlat, setdefaultlat] = useState(0);
  const [defaultlong, setdefaultlong] = useState(0);

  useEffect(() => {
    if (lat == 0) setLatitude(24.7255541);
    else setLatitude(lat);
    if (lng == 0) setLongitude(46.5416503);
    else setLongitude(lng);
  }, [lat, lng]);

  function successLocation(pos) {
    var crd = pos.coords;
    setdefaultlat(crd.latitude);
    setdefaultlong(crd.longitude);
    if (lat == 0) setLatitude(24.7255541);
    if (lng == 0) setLongitude(46.5416503);
  }

  function errorLocation() {
    setdefaultlat(0);
    setdefaultlong(0);
  }

  useEffect(() => {
    if (lat == 0 && lng == 0) {
      navigator.geolocation.watchPosition(successLocation, errorLocation, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    }
  }, []);

  useEffect(() => {
    if (getAppLanguageList.length > 0 && saloonLanguange.length == 0) {
      dispatch({
        type: adminvendorprofileAction.ASSIGN_SALOON_LANGUAGE,
        payload: getAppLanguageList,
      });
    }
    if (isvendorDetails) {
      dispatch({
        type: adminvendorprofileAction.COUNTRY_LIST,
        value: 1,
      });
      dispatch({
        type: adminvendorprofileAction.CATEGORY_LIST,
        value: 1,
      });
    }
  }, [countryList, categoryList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (redirect) {
      props.history.push("/admin/vendor");
    }

    const timer = setTimeout(() => {
      setShow(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);
  const location = { lat: lat, lng: lng };

  const country = [];
  var countryListcont =
    countryList.length > 0
      ? countryList.map((countryLst) => {
          let obj = {
            label: countryLst.language[0].countryname,
            value: countryLst.id,
          };
          country.push(obj);
        })
      : "";
  const city = [];
  var cityListcont =
    cityList.length > 0
      ? cityList.map((cityLst) => {
          let obj = { label: cityLst.cityname, value: cityLst.cityid };
          city.push(obj);
        })
      : "";
  const area = [];
  var areaListcont =
    areaList.length > 0
      ? areaList.map((areaLst) => {
          let obj = { label: areaLst.language[0].areaname, value: areaLst.id };
          area.push(obj);
        })
      : "";

  const category = [];
  var categoryListcont =
    categoryList.length > 0
      ? categoryList.map((categoryLst) => {
          if (categoryLst.is_admin == 1) {
            let obj = {
              label: categoryLst.language[0].categoryname,
              value: categoryLst.id,
            };
            category.push(obj);
          }
        })
      : "";

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  // let getLanguageDetails = getLocalData('language');
  const [getLanguageIndex, setLangauageindex] = useState(0);
  const [vendorLanguageShortName, setVendorLanguageShortName] = useState(null);
  const [VendorForm] = Form.useForm();
  const { Option } = Select;
  const paymentOptions = [];
  let obj1 = { label: "Online", value: 1 };
  let obj2 = { label: "COD", value: 2 };
  paymentOptions.push(obj1);
  paymentOptions.push(obj2);

  const avaiableserviceopt = [
    { label: "Women", value: 1 },
    { label: "Kids", value: 2 },
  ];

  const isfeatured = 1;

  useEffect(() => {
    if (vendorLanguageShortName === null && getAppLanguageList.length > 0) {
      setVendorLanguageShortName(
        getAppLanguageList[`${getLanguageIndex}`]["languageshortname"]
      );
    }
  }, [getAppLanguageList]);

  const getLocaleLanguage = () => {
    if (getAppLanguageList.length > 0) {
      return vendorLanguageShortName ? vendorLanguageShortName : "en";
    }
  };

  const onChangeLanguageValue = ({ event, languageid, key }) => {
    event.preventDefault();
    dispatch({
      type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
      payload: {
        languageid: languageid,
        value: event.target.value,
        key: key,
      },
    });
  };

  Geocode.setApiKey("AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro");
  Geocode.enableDebug();
  const handlepartnerAddress = (e) => {
    e.preventDefault();
    //setPAddress(pAddress);
  };
  useEffect(() => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        //console.log('fulladdress', fullAddress);
        console.log("results", address, response.results[0].formatted_address);
        dispatch({
          type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
          payload: {
            languageid: 1,
            value: response.results[0].formatted_address,
            key: "vendoraddress",
          },
        });
        VendorForm.setFieldsValue({
          vendoraddress: response.results[0].formatted_address,
        });
        setMapAddress(response.results[0].formatted_address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [latitude, longitude]);

  const uploadFileeeeeee = (document, from) => {
    if (document.fileList.length > 0) {
      if (from == "cr") {
        if (document) {
          const formData = new FormData();
          formData.append("files", document.file, document.file.name);
          store.dispatch({
            type: actionsFileUpload.UPLOAD_FILE,
            payload: formData,
            callBackAction: (filePath, file_url) => {
              setcr(file_url);
              setcrpath(filePath);
            },
          });
        }
      }
      if (from == "vat") {
        if (document) {
          const formData = new FormData();
          formData.append("files", document.file, document.file.name);
          store.dispatch({
            type: actionsFileUpload.UPLOAD_FILE,
            payload: formData,
            callBackAction: (filePath, file_url) => {
              setvatfile(file_url);
              setvatpath(filePath);
            },
          });
        }
      }
    }
  };

  const uploadBankDocument = (docfile) => {
    if (docfile.fileList.length > 0) {
      if (docfile) {
        const docformData = new FormData();
        docformData.append("files", docfile.file, docfile.file.name);
        store.dispatch({
          type: actionsFileUpload.UPLOAD_FILE,
          payload: docformData,
          callBackAction: (filePath, file_url) => {
            setbankcardUrl(file_url);
          },
        });
      }
    }
  };

  const onFinish = (values) => {
    store.dispatch({
      type: settingActions.CREATE_SALOON_NUMBER,
      callBackAction: (resss, trueFalse) => {
        if (trueFalse) {
          let newArrayLanguage = [...saloonLanguange];

          newArrayLanguage = newArrayLanguage.filter(
            (singleLanguageList) =>
              singleLanguageList["vendorname"] &&
              singleLanguageList["vendorname"].length > 0 &&
              singleLanguageList["vendordescription"] &&
              singleLanguageList["vendordescription"].length
          );

          if (newArrayLanguage.length === saloonLanguange.length) {
            /***start  */
            if (setLocalImage.length) {
              var uploadImage = [];
              for (const localImage of setLocalImage) {
                let siteparam = new FormData();
                siteparam.set("files", localImage, localImage.name);
                let data = {
                  language: saloonLanguange,
                  username: values["username"],
                  firstname: values["firstname"],
                  lastname: values["lastname"],
                  vendornumber: resss.data.data,
                  email: values["email"],
                  servicelocation: values["servicelocation"],
                  countryid: parseInt(values["country"]),
                  cityid: parseInt(values["city"]),
                  areaid: parseInt(1),
                  saloonphone: values["salonphone"],
                  saloonemail: values["salonemail"],
                  partnerDistrict: "partnerDistrict", //values["partnerDistrict"],
                  partnerPostcode: values["partnerPostcode"],
                  partnerRegion: "partnerRegion", //values["partnerRegion"],
                  teamsize: values["teamSize"],
                  hearAboutFresha: "Recommended by a friend",
                  vatdocument_url: vatfile,
                  crdocument_url: cr,
                  bankdocument_url: bankcardUrl,
                  commissiontype: " ",
                  confirmpassword: values["confirm"],
                  password: values["password"],
                  paymentoption: [1], //values['payment'],
                  contactnumber: values["phone"],
                  vat: parseFloat(values["vat"]),
                  vatnumber: values["vatnumber"],
                  vatpercent: ShowVAT ? 1 : 2,
                  prefix: "+966",
                  latitude: latitude == 0 ? defaultlat : latitude,
                  longitude: longitude == 0 ? defaultlong : longitude,
                  servicelocation: "test",
                  category: values["category"],
                  isfeatured: values["isfeatured"] ? 1 : 0,
                  service_available:
                    values["service_available"].length > 1
                      ? 3
                      : values["service_available"][0],
                  photopath: "",
                  status: currentStatus,
                  bankaccountnumber: "123456789", //values["bankaccountnumber"],
                  bankname: values["bankname"],
                  bankiban: values["bankiban"],
                };
                // console.log(
                //   "this is  the value of the updated saloon number",
                //   data
                // );
                // return;
                store.dispatch({
                  type: settingActions.UPLOAD_SITEIMG,
                  payload: siteparam,
                  callBackAction: (imagePath, image_url) => {
                    uploadImage.push({
                      image_url: image_url,
                      imagepath: imagePath,
                    });

                    if (uploadImage.length === setLocalImage.length) {
                      store.dispatch({
                        type: adminvendorprofileAction.CREATE_VENDOR_PROFILE,
                        payload: {
                          ...data,
                          photopath: imagePath,
                          image_url: uploadImage[0].image_url,
                          images: uploadImage,
                        },
                        // payload: {...data, photopath: imagePath},
                        callBackAction: (status) => {
                          if (status) {
                            VendorForm.resetFields();
                            setLocalImageFunc([]);
                          }
                        },
                      });
                    }
                  },
                });
              }
            } else {
              message.error("Please select minimum one image.");
            }
            /*** End */
            /*dispatch({
        type: adminvendorprofileAction.CREATE_VENDOR_PROFILE,
        payload: vendorProfileCreateData,
         callBackAction: (signedId)=>{
             uploadImage.push(signedId);
             if(uploadImage.length === values['images'].length){
                 dispatch({
                     type: actions.VENDOR_EDIT_PROFILE,
                     payload: {
                         ...vendorProfileData,
                         images: [...vendorProfileData['images'],...uploadImage],
                     }
                 })
             }
         }
      });*/
          } else {
            message.error("Please complete all language");
          }
        }
      },
    });
    return;
  };

  const handleCategoryChange = (value) => {
    VendorForm.setFieldsValue({ category: value });
  };

  const handleChange = (value) => {
    VendorForm.setFieldsValue({ country: value });
    dispatch({
      type: adminvendorprofileAction.CITY_LIST,
      value: value,
    });
  };

  const handleCityChange = (value) => {
    VendorForm.setFieldsValue({ city: value });
    dispatch({
      type: adminvendorprofileAction.AREA_LIST,
      value: value,
    });
  };

  const handleAreaChange = (value) => {
    VendorForm.setFieldsValue({ area: value });
  };

  const onChange = (checkedValues) => {
    let chk =
      checkedValues.length == 0
        ? VendorForm.setFieldsValue({ payment: "" })
        : "";
    if (chk == undefined) {
      VendorForm.setFieldsValue({ payment: "" });
    }
  };
  const onChangeisService = (serviceVal) => {
    var servicechk =
      serviceVal.length == 0
        ? VendorForm.setFieldsValue({ service_available: "" })
        : "";
    if (servicechk == undefined) {
      VendorForm.setFieldsValue({ service_available: "" });
    }
  };

  const onChangeisfeatured = (checkedValues) => {
    let chk =
      checkedValues.length == 0
        ? VendorForm.setFieldsValue({ isfeatured: "" })
        : "";
    if (chk == undefined) {
      VendorForm.setFieldsValue({ payment: "" });
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: false, message: "Select Country code!" }]}
    >
      <Select
        defaultValue="966"
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );

  if (redirect) {
    props.history.push("/admin/vendor");
  }

  const onFinishFailed = (error) => {};
  const callbackTabKey = (key) => {
    setLangauageindex(key);
    if (saloonLanguange.length > 0) {
      setVendorLanguageShortName(
        saloonLanguange[`${key}`]["languageshortname"]
      );
      VendorForm.setFieldsValue({
        vendorname: saloonLanguange[`${key}`]["vendorname"],
        vendordescription: saloonLanguange[`${key}`]["vendordescription"],
      });

      VendorForm.validateFields();
    }
  };
  const backtopage = () => {
    props.history.push("/admin/vendor");
  };

  const getLatLng = (event) => {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  };

  var index = "0";
  var step = "steeep";

  const searchLocation = (place, val) => {
    if (place.name !== undefined) {
      console.log(place);
    } else {
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      setLatitude(latitude);
      setLongitude(longitude);
      setShow(true);
      setShow(false);
      dispatch({
        type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
        payload: {
          languageid: val,
          value: place.formatted_address,
          key: "vendoraddress",
        },
      });
      //  setMapAddress(place.formatted_address);
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
          <Card title={getLocaleMessages({ id: "title.saloon Create" })}>
            <Spin size="large" spinning={loading || imageLoader}>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{
                  firstname: "",
                  lastname: "",
                  username: "",
                  email: "",
                  latitude: "",
                  longitude: "",
                  payment: "",
                  area: "",
                  country: "",
                  city: "",
                  //commissiontype: '',
                  vat: "",
                  vatnumber: "",
                  phone: "",
                  password: "",
                  confirm: "",

                  vendorname:
                    saloonLanguange.length > 0
                      ? saloonLanguange[getLanguageIndex]["vendorname"]
                      : "",
                  vendordescription:
                    saloonLanguange.length > 0
                      ? saloonLanguange[getLanguageIndex]["vendordescription"]
                      : "",
                  vendoraddress:
                    saloonLanguange.length > 0
                      ? saloonLanguange[getLanguageIndex]["vendoraddress"]
                      : "",

                  bankaccountnumber: "",
                  bankname: "",
                  bankiban: "",
                }}
                form={VendorForm}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
                layout="vertical"
              >
                {console.log("getAppLanguageList", getAppLanguageList)}
                <Tabs onChange={callbackTabKey}>
                  {getAppLanguageList.length > 0
                    ? getAppLanguageList.map((languageDetail, index) => {
                        return (
                          <TabPane
                            tab={languageDetail["languagename"]}
                            key={index}
                          >
                            <h3
                              class="header_seprate"
                              style={{ background: "#f9a392" }}
                            >
                              <p style={{ color: "#fff", padding: "10px" }}>
                                User Information
                              </p>
                            </h3>
                            {/* <h4 class="header_seprate">User Detail</h4> */}
                            <Row gutter={30}>
                              <Col span={12}>
                                <Form.Item
                                  label="Firstname"
                                  name="firstname"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your firstname!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  label="Lastname"
                                  name="lastname"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your lastname!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  label="Username"
                                  name="username"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your username!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  label={getLocaleMessages({
                                    id: "label.saloonName",
                                    localeLanguage: getLocaleLanguage(),
                                  })}
                                  name="vendorname"
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message: getLocaleMessages({
                                        id: "errorMessage.saloonName",
                                        localeLanguage: getLocaleLanguage(),
                                      }),
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder={getLocaleMessages({
                                      id: "placeholder.saloonName",
                                      localeLanguage: getLocaleLanguage(),
                                    })}
                                    onChange={(event) =>
                                      onChangeLanguageValue({
                                        event: event,
                                        languageid: languageDetail["id"],
                                        key: "vendorname",
                                      })
                                    }
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  label={getLocaleMessages({
                                    id: "label.saloonDescription",
                                    localeLanguage: getLocaleLanguage(),
                                  })}
                                  name="vendordescription"
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message: getLocaleMessages({
                                        id: "errorMessage.saloonDescription",
                                        localeLanguage: getLocaleLanguage(),
                                      }),
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    placeholder={getLocaleMessages({
                                      id: "placeholder.saloonDescription",
                                      localeLanguage: getLocaleLanguage(),
                                    })}
                                    autoSize={{
                                      minRows: 2,
                                      maxRows: 6,
                                    }}
                                    onChange={(event) =>
                                      onChangeLanguageValue({
                                        event: event,
                                        languageid: languageDetail["id"],
                                        key: "vendordescription",
                                      })
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </TabPane>
                        );
                      })
                    : ""}
                </Tabs>

                <Row gutter={30}>
                  {/* <Col span={12}>
                    <Form.Item
                      label="District"
                      name="partnerDistrict"
                      rules={[
                        {
                          required: true,
                          message: "Please input your district!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Region"
                      name="partnerRegion"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Region!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col> */}
                </Row>
                <h3 class="header_seprate" style={{ background: "#f9a392" }}>
                  <p style={{ color: "#fff", padding: "10px" }}>
                    Salon Information
                  </p>
                </h3>
                <h4 class="header_seprate">General Information</h4>

                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label={getLocaleMessages({
                        id: "staff.contact.label",
                      })}
                      rules={[
                        {
                          required: true,
                          message: getLocaleMessages({
                            id: "staff.contact.error",
                          }),
                        },
                        {
                          min: 13,
                          message: "Contact number should be minimum 9 digits.",
                        },
                        {
                          max: 16,
                          message:
                            "Contact number should be maximum 16 digits.",
                        },
                      ]}
                    >
                      <PhoneInput
                        international
                        placeholder="Enter phone number"
                        defaultCountry="SA"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="salonphone"
                      label="Salon Phone (optional) "
                      rules={[
                        {
                          required: false,
                          message: getLocaleMessages({
                            id: "staff.contact.error",
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Salon Email"
                      name="salonemail"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Email is not a valid email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <h4 class="header_seprate">Password</h4>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
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
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Confirm Password"
                      name="confirm"
                      className="confirm-pwd "
                      rules={[
                        {
                          required: true,
                          message: "Please input your Confirm Password!",
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
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <h4 class="header_seprate">Saloon Address</h4>

                <Row gutter={30}>
                  <Col span={12}>
                    <div className="ant-row ant-form-item">
                      <p>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#ff4d4f",
                            marginRight: "4px",
                            fontFamily: "SimSun, sans-serif",
                            lineHeight: 1,
                          }}
                        >
                          *
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            color: "#a1a1a1",
                          }}
                        >
                          Saloon Address
                        </span>
                      </p>
                      <Autocomplete
                        style={{
                          flex: "auto",
                          width: "100%",
                          marginLeft: 0,
                          height: "48px",
                        }}
                        name="vendorAddress"
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
                            saloonLanguange,
                            getAppLanguageList?.length &&
                              getAppLanguageList[0]["id"]
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="country"
                      className="pd-50"
                      label="Country"
                      rules={[
                        {
                          required: true,
                          message: "Country Select one!",
                        },
                      ]}
                    >
                      <Select options={country} onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="city"
                      label="City"
                      className="pd-50"
                      rules={[
                        {
                          required: true,
                          message: "City Select one!",
                        },
                      ]}
                    >
                      <Select options={city} onChange={handleCityChange} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Postal Code"
                      name="partnerPostcode"
                      rules={[
                        {
                          required: true,
                          message: "Please input your postalcode!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="area"
                      label="Area"
                      className="pd-50"
                      rules={[
                        {
                          required: true,
                          message: 'Area Select one!',
                        },
                      ]}
                    >
                      <Select options={area} onChange={handleAreaChange} />
                    </Form.Item>
                  </Col>
                </Row> */}

                <h4 class="header_seprate">Saloon Map</h4>
                {/**sssss */}
                <Form.Item>
                  <div className="map">
                    {!show ? (
                      <Mymap
                        latitude={latitude}
                        longitude={longitude}
                        getLatLng={getLatLng}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Form.Item>

                <h4 class="header_seprate">Business Type</h4>

                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="category"
                      label="Category"
                      className="pd-50"
                      rules={[
                        {
                          required: true,
                          message: "Category is required!",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        options={category}
                        onChange={handleCategoryChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="isfeatured"
                      label="isfeatured"
                      valuePropName="checked"
                      {...VendorForm}
                    >
                      <Checkbox value="1" onChange={onChangeisfeatured}>
                        isFeatured
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={30}>
                  {/* <Col span={12}>
                    <Form.Item
                      name="payment"
                      label="Payment Options"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error('Should select Payment choice!')
                                ),
                        },
                      ]}
                    >
                      <Checkbox.Group
                        options={paymentOptions}
                        onChange={onChange}
                      />
                    </Form.Item>
                  </Col> */}
                </Row>

                <h4 class="header_seprate">Saloon Images</h4>

                <Form.Item
                  label={getLocaleMessages({
                    id: "vendor.image.label",
                  })}
                >
                  <ImageUploader
                    isSingleImage={false}
                    images={[]}
                    onDropImage={onDropImage}
                  />
                </Form.Item>

                <h4 className="header_seprate">Available For</h4>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="service_available"
                      label="Service Available"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Should select Available for!")
                                ),
                        },
                      ]}
                    >
                      <Checkbox.Group
                        options={avaiableserviceopt}
                        onChange={onChangeisService}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="teamSize"
                      label="Team Size"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Your Team Size",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select Team Size"
                        optionFilterProp="children"
                      >
                        <Option value="0">It's just me</Option>
                        <Option value="1">2-5</Option>
                        <Option value="2">6-10</Option>
                        <Option value="3">11+</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <h4 class="header_seprate">CR Information</h4>

                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item
                      name="crdocument"
                      label="Cr Document"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Your Cr Document!",
                        },
                      ]}
                    >
                      <Upload
                        accept="application/pdf"
                        // accept=".doc,.docx,.xml,application/pdf,
                        // application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        multiple={false}
                        showUploadList={{
                          showRemoveIcon: true,
                        }}
                        maxCount={1}
                        onRemove={(file) => {
                          // Prevent upload
                          return new Promise((resolve, reject) => {
                            resolve(true);
                          });
                          // console.log(
                          //   "this is the value of the data in the remove",
                          //   file
                          // );
                          // return false;
                        }}
                        beforeUpload={(file) => {
                          // Prevent upload
                          return false;
                        }}
                        onChange={(e) => uploadFileeeeeee(e, "cr")}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          // loading={fileLoading}
                        >
                          Upload CR document
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <h4 class="header_seprate">VAT Information</h4>

                <Form.Item label="Are you authorized for VAT? ">
                  <Radio.Group value={ShowVAT ? 1 : 2}>
                    <Radio value={1} onChange={() => setShowVAT(true)}>
                      Yes
                    </Radio>
                    <Radio value={2} onChange={() => setShowVAT(false)}>
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                {ShowVAT && (
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item
                        label="VAT Number"
                        name="vatnumber"
                        rules={[
                          {
                            message: "Please input VAT number!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="vat" label="VAT Percentage">
                        <Input
                          placeholder="VAT Percent Value"
                          // min={0}
                          // precision={2}
                          // step={0.1}
                          // max={100}
                        />
                      </Form.Item>
                    </Col>
                    {/* <Col span={12}>
                    <Form.Item
                      name="commissiontype"
                      label="Commission"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Commission value!',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Value"
                        min={0}
                        precision={2}
                        step={0.1}
                        max={100}
                      />
                    </Form.Item>
                  </Col> */}
                    <Col span={12}>
                      <Form.Item
                        label="VAT Document"
                        name="vatdocument"
                        rules={[
                          {
                            required: true,
                            message: "Please upload your VAT document",
                          },
                        ]}
                      >
                        <Upload
                          accept="application/pdf"
                          // accept=".doc,.docx,.xml,application/pdf,
                          // application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          multiple={false}
                          showUploadList={{
                            showRemoveIcon: true,
                          }}
                          maxCount={1}
                          onRemove={(file) => {
                            return new Promise((resolve, reject) => {
                              resolve(true);
                            });
                          }}
                          beforeUpload={(file) => {
                            return false;
                          }}
                          onChange={(e) => uploadFileeeeeee(e, "vat")}
                        >
                          <Button icon={<UploadOutlined />}>
                            Upload Vat document
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <h4 className="header_seprate">Bank Details</h4>

                <Row gutter={30}>
                  <Col span={12} style={{ display: "none" }}>
                    <Form.Item label="Account Number" name="bankaccountnumber">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Bank Name" name="bankname">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="IBAN" name="bankiban">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Bank Document" label="Bank Document">
                      <Upload
                        accept="application/pdf"
                        // accept=".doc,.docx,.xml,application/pdf,
                        // application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        multiple={false}
                        showUploadList={{
                          showRemoveIcon: true,
                        }}
                        maxCount={1}
                        onRemove={(file) => {
                          return new Promise((resolve, reject) => {
                            resolve(true);
                          });
                        }}
                        beforeUpload={(file) => {
                          return false;
                        }}
                        onChange={(e) => uploadBankDocument(e, "bank")}
                      >
                        <Button icon={<UploadOutlined />}>
                          Upload Bank document
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={30} style={{ display: "none" }}>
                  <Col span={6}>
                    <h5> How did you hear about Lamsat ? </h5>
                    <Form.Item
                      name="hearAboutFresha"
                      rules={[
                        {
                          required: false,
                          whitespace: true,
                          message: "",
                        },
                      ]}
                    >
                      <Radio.Group
                      //onChange={hearAboutFresha}
                      >
                        <Radio value="Recommended by a friend">
                          Recommended by a friend
                        </Radio>

                        <Radio value="Search engine(e.g. Goodle, Yahoo)">
                          Search engine(e.g. Goodle, Yahoo)
                        </Radio>

                        <Radio value="Social Media">Social Media</Radio>

                        <Radio value="Magzine ad">Magzine ad</Radio>

                        <Radio value="Ratings Website(e.g. Capterra, Trustpilot)">
                          Ratings Website(e.g. Capterra, Trustpilot)
                        </Radio>

                        <Radio value="Other">Other</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Saloon Status">
                  <Radio.Group value={currentStatus}>
                    <Radio
                      name="status"
                      value={1}
                      onChange={() => setCurrentStatus(1)}
                    >
                      Active
                    </Radio>
                    <Radio
                      name="status"
                      value={0}
                      onChange={() => setCurrentStatus(0)}
                    >
                      Inactive
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <div className="button-center">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="button-s"
                    >
                      Save
                    </Button>

                    <Button
                      htmlType="submit"
                      className="button-s"
                      onClick={backtopage}
                    >
                      Back
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Create;
