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
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  StarOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
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
  const { onLoginForgot, LoginSignup, loader } = props;
  const { userCityList, userCountryList, loading, countryList } = useSelector(
    (state) => state.Address
  );
  const { fileUploadLoader } = useSelector((state) => state.PartnerSignup);

  const { partnerLoader } = useSelector((state) => state.Auth);
  const [getLatitude, setLatitude] = useState(23.880877208);
  const [getLongitude, setLongitude] = useState(45.375830859);
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
  const [country, setCountry] = useState(1);
  const [city, setCity] = useState(1);

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
  const getLatLng = (event) => {
    console.log("event in the map", event, getLatitude, getLongitude);
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  };
  Geocode.setApiKey("AIzaSyADWxNxOiNs0LRXkgRb2qlmz2BPGycoOJ4");
  Geocode.enableDebug();
  const handlepartnerAddress = (e) => {
    e.preventDefault();
    setPAddress(pAddress);
  };
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
  const handleCityChange = (value) => {
    setCity(value);
    form.setFieldsValue({ city: parseInt(value) });
    // console.log("city =>", { city: parseInt(value) });
    // console.log("setcity", value);
  };

  const serviceChecked = (event) => {
    setserviceSelected([...serviceSelected, event.target.value]);
  };
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

  const onLogoChange = ({ file }, doctype) => {};

  const uploadFile = (document) => {
    return new Promise((resolve, reject) => {
      if (document) {
        const formData = new FormData();
        formData.append("files", document, document.name);
        store.dispatch({
          type: actionsFileUpload.UPLOAD_FILE,
          payload: formData,
          callBackAction: (filePath, file_url) => {
            resolve(file_url);
          },
        });
      } else {
        resolve("");
      }
    });
  };

  const uploadFileeeeeee = (document, from) => {
    if (document.fileList.length > 0) {
      if (from == "logo") {
        if (document) {
          const formData = new FormData();
          formData.append("files", document.file, document.file.name);
          store.dispatch({
            type: settingActions.UPLOAD_COMMONIMG,
            payload: formData,
            callBackAction: (imagePath, image_url) => {
              setlogo(image_url);
              setlogopath(imagePath);
            },
          });
        }
      }
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
              setvat(file_url);
              setvatpath(filePath);
            },
          });
        }
      }
    }
  };

  // const uploadImage = (imgfile) => {
  //   if (imgfile.fileList.length > 0) {
  //     if (imgfile) {
  //       var enevtname = imgfile;
  //       const ImageformData = new FormData();
  //       //ImageformData.append("files", enevtname, enevtname.name);
  //       ImageformData.append("files", enevtname.file, enevtname.file.name);
  //       store.dispatch({
  //         type: settingActions.UPLOAD_COMMONIMG,
  //         payload: ImageformData,
  //         callBackAction: (imagePath, image_url) => {
  //           setsaloonUrl([{ image_url: image_url, imagepath: imagePath }]);
  //         },
  //       });
  //     }
  //   }
  // };

  const uploadImage = (imgfile) => {
    if (imgfile.length > 0) {
      if (imgfile) {
        var enevtname = imgfile[0];
        const ImageformData = new FormData();
        ImageformData.append("files", enevtname, enevtname.name);
        store.dispatch({
          type: settingActions.UPLOAD_COMMONIMG,
          payload: ImageformData,
          callBackAction: (imagePath, image_url) => {
            setsaloonUrl([{ image_url: image_url, imagepath: imagePath }]);
          },
        });
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
          nextPage();
        } else {
          setDuplicateEmail("Email id or contact number is already exist!");
        }
      },
    });
  };

  const onNextPageSalon = (values) => {
    values = {
      ...values,
      Address: values.partnerAddress,
      partnerDistrict: "partnerDistrict",
      partnerRegion: "partnerRegion",
      countryid: parseInt(country),
      cityid: parseInt(city),
    };
    localStorage.setItem("lamsat-salon-details", JSON.stringify(values));
    if (values) {
      setsalondetails(values);
      //console.log("values",values);
      nextPage2();
    }
  };

  const onNextPageStaff = (values) => {
    var staffValuarr = staffCount.map((stafval, index) => {
      return {
        firstname: values["staffirstname" + (index + 1)],
        lastname: values["staflastname" + (index + 1)],
        email: values["stafemail" + (index + 1)],
        contactnumber: values["phonenumber" + (index + 1)],
        employee_startdate: "22-02-2021",
        staff_title: "Title",
        notes: "perfect style",
        photopath:
          "/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
        status: 1,
      };
    });
    values = {
      staff: staffValuarr,
    };
    localStorage.setItem("lamsat-staff-details", JSON.stringify(values));
    if (values) {
      setstaffdetails(values);
      //console.log("values",values);
      nextPage3();
    }
  };

  const vendor_details = JSON.parse(
    localStorage.getItem("lamsat-patner-details")
  );
  // console.log("lamsat-patner-details", vendor_details);
  const onFinish = (values) => {
    let me = {
      services: serviceSelected,
      category: serviceSelected,
      prefix: mobileprefix,
      Address: salondetails.partnerAddress,
      hearAboutFresha: values.hearAboutFresha,
      partnerAddress: salondetails.partnerAddress,
      partnerDistrict: salondetails.partnerDistrict,
      partnerPostcode: salondetails.partnerPostcode,
      partnerRegion: salondetails.partnerRegion,
      vatdocument_url: vat,
      crdocument_url: cr,
      logo_path: logo,
      logodocument: logo,
      vatnumber: values.vatnumber,
      vatpercent: parseInt(values.vatpercent),
      isVAT: showVAT ? 1 : 2,
      bankaccountnumber: values.accountName,
      bankaccountname: values.accountName,
      bankdocument_url: bankcardUrl,
      bankname: values.bankName,
      latitude: getLatitude,
      longitude: getLongitude,
      bankiban: values.IBAN,
      serviceavilable:
        values.availableFor.length > 1 ? 3 : values.availableFor[0],
      saloonphone: salondetails.saloonPhoneNumber,
      mobile_number: salondetails.saloonContactNumber,
      saloonemail: salondetails.saloonEmail,
      images: saloonUrl,
      teamsize: parseInt(values.teamSize),
      email_address: vendor_details.email,
      cityid: salondetails.cityid,
      countryid: salondetails.countryid,
      mobile: salondetails.saloonContactNumber,
      partnerconfirmpassword: vendor_details.confirmpassword,
      partnerpassword: vendor_details.password,
      salonphonenumber: vendor_details.phonenumber,
      staffs: staffdetails.staff,
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
          vendorname: salondetails.saloonname,
          vendordescription: salondetails.description,
          vendoraddress: salondetails.partnerAddress,
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
          vendorname: salondetails.saloonname,
          vendordescription: salondetails.description,
          vendoraddress: salondetails.partnerAddress,
        },
      ],
      partnertime: [
        {
          days: "Sunday",
          starttime:
            SundayTime && SundayTime.startTime
              ? SundayTime.startTime
              : "10:00:00",
          endtime:
            SundayTime && SundayTime.endTime ? SundayTime.endTime : "18:00:00",
          partnerstatus: "0",
        },
        {
          days: "Monday",
          starttime:
            mondayTime && mondayTime.startTime
              ? mondayTime.startTime
              : "10:00:00",
          endtime:
            mondayTime && mondayTime.endTime ? mondayTime.endTime : "18:00:00",
          partnerstatus: "0",
        },
        {
          days: "Tuesday",
          starttime:
            TuesdayTime && TuesdayTime.startTime
              ? TuesdayTime.startTime
              : "10:00:00",
          endtime:
            TuesdayTime && TuesdayTime.endTime
              ? TuesdayTime.endTime
              : "18:00:00",
          partnerstatus: "0",
        },
        {
          days: "Wednesday",
          starttime:
            WednesdayTime && WednesdayTime.startTime
              ? WednesdayTime.startTime
              : "10:00:00",
          endtime:
            WednesdayTime && WednesdayTime.endTime
              ? WednesdayTime.endTime
              : "18:00:00",
          partnerstatus: "0",
        },
        {
          days: "Thursday",
          starttime:
            ThursdayTime && ThursdayTime.startTime
              ? ThursdayTime.startTime
              : "10:00:00",
          endtime:
            ThursdayTime && ThursdayTime.endTime
              ? ThursdayTime.endTime
              : "18:00:00",
          partnerstatus: "0",
        },
        {
          days: "Friday",
          starttime:
            FridayTime && FridayTime.startTime
              ? FridayTime.startTime
              : "10:00:00",
          endtime:
            FridayTime && FridayTime.endTime ? FridayTime.endTime : "18:00:00",
          partnerstatus: "0",
        },
        {
          days: "Saturday",
          starttime:
            SaturdayTime && SaturdayTime.startTime
              ? SaturdayTime.startTime
              : "10:00:00",
          endtime:
            SaturdayTime && SaturdayTime.endTime
              ? SaturdayTime.endTime
              : "18:00:00",
          partnerstatus: "0",
        },
      ],
    };
    setPartnerdetails({ ...partnerdetails, ...me, ...salondetails });
    // console.log("this is the value of the data int eh ddd", partnerdetails);
    // console.log(
    //   "this is the value of the data int eh ddd***************************************"
    // );
    // console.log(
    //   "this is the value of the data int eh dddmeeeeeeeeeeeeeeeeeeee",
    //   me
    // );
    if (partnerdetails && salondetails) {
      setTimeout(() => {
        store.dispatch({
          type: actions.CREATE_PARTNER_ACCOUNT,
          payload: { ...partnerdetails, ...me, ...salondetails },
        });
      }, 2000);
    }
  };
  const mobileValidation = (event) => {};
  const vatDocument = (event) => {
    // console.log("This is the value of the vat document", event.target.files[0]);
    setIsVatDocument(event.target.files[0]);
  };
  const [monday, setmonday] = useState(false);
  const [tuesday, settuesday] = useState(false);
  const [wednesday, setwednesday] = useState(false);
  const [thursday, setthursday] = useState(false);
  const [friday, setfriday] = useState(false);
  const [saturday, setsaturday] = useState(false);
  const [sunday, setsunday] = useState(false);
  const isMonday = (event) => {
    if (event.target.checked) {
      setmonday(true);
    } else {
      setmonday(false);
    }
  };
  const isTuesday = (event) => {
    if (event.target.checked) {
      settuesday(true);
    } else {
      settuesday(false);
    }
  };
  const isWednesday = (event) => {
    if (event.target.checked) {
      setwednesday(true);
    } else {
      setwednesday(false);
    }
  };
  const isThursday = (event) => {
    if (event.target.checked) {
      setthursday(true);
    } else {
      setthursday(false);
    }
  };
  const isFriday = (event) => {
    if (event.target.checked) {
      setfriday(true);
    } else {
      setfriday(false);
    }
  };
  const isSaturday = (event) => {
    if (event.target.checked) {
      setsaturday(true);
    } else {
      setsaturday(false);
    }
  };
  const isSunday = (event) => {
    if (event.target.checked) {
      setsunday(true);
    } else {
      setsunday(false);
    }
  };

  const settLatLng = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    // console.log("this si the value of the latitude and lnggg", lat, lng);
  };

  const logoDocument = (event) => {
    setIsLogoDocument(event.target.files[0]);
  };

  const bankDocument = (event) => {
    setIsBankDocument(event.target.files[0]);
  };

  const saloonImage = (event) => {
    setIssaloonImage([event.target.files]);
  };

  const [mobileNumberV, setMobileNumberV] = useState("");

  const onlyNumberFunc = (value) => {
    setMobileNumberV(value);
  };

  const crDocument = (event) => {
    // console.log(event.target.files[0]);
    setIsCrDocument(event.target.files[0]);
  };

  const updatePartnerDetails = () => {};
  const mobilePhoneValidation = (event) => {};
  const onFinishFailed = (errorInfo) => {};

  const nextPage = () => {
    setnextpage1(false);
    setnextpage2(true);
  };
  const nextPage2 = () => {
    setnextpage1(false);
    setnextpage2(false);
    setnextpage3(true);
  };
  const nextPage3 = () => {
    setnextpage1(false);
    setnextpage2(false);
    setnextpage3(false);
  };
  const hearAboutFresha = (e) => {};
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

  const onCRChange = (info) => {
    const nextState = {};
    switch (info.file.status) {
      case "uploading":
        nextState.selectedFileList = [info.file];
        break;
      case "done":
        setIsVatDocument(info.file);
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        break;

      default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    // console.log("ssss: " + JSON.stringify(nextState));
  };

  const Pageradio = (val) => {
    return (
      <div className="page_radios">
        <span className={val == "1" && "active"}>1</span>
        <span className={val == "2" && "active"}>2</span>
        <span className={val == "3" && "active"}>3</span>
        <span className={val == "4" && "active"}>4</span>
      </div>
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
            {nextpage1
              ? Pageradio("1")
              : nextpage2
              ? Pageradio("2")
              : nextpage3
              ? Pageradio("3")
              : Pageradio("4")}
            {nextpage1 ? (
              <h2 style={{ color: "#f9a392" }}>Please enter user details</h2>
            ) : nextpage2 ? (
              <h2 style={{ color: "#f9a392" }}>Please enter salon details</h2>
            ) : nextpage3 ? (
              <h2 style={{ color: "#f9a392" }}></h2>
            ) : (
              <h2 style={{ color: "#f9a392" }}>
                Create your free partner account
              </h2>
            )}
          </div>

          {nextpage1 ? (
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
              <Spin size="large" spinning={loading}>
                <Form
                  {...formProps}
                  form={form}
                  onFinish={onNextPage}
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
                        ]}
                      >
                        <Input placeholder="First Name" />
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
                        ]}
                      >
                        <Input placeholder="Last Name" />
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
                        <Input placeholder="Email address" />
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
                                min: 6,
                                message:
                                  "Contact number should be minimum 6 digits.",
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
                        <Input.Password
                          type="password"
                          placeholder="Password"
                        />
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

                  <div className="center-btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={partnerLoader || fileUploadLoader}
                    >
                      {/* {getLocaleMessages({ id: "Submit" })} */}
                      {partnerLoader
                        ? "Please wait..."
                        : fileUploadLoader
                        ? "Uploading file(s)..."
                        : "Next"}
                    </Button>
                  </div>
                </Form>
              </Spin>
            </>
          ) : nextpage2 ? (
            <>
              <Spin size="large" spinning={loading}>
                <Form
                  {...formProps}
                  form={form}
                  onFinish={onNextPageSalon}
                  onFinishFailed={onFinishFailed}
                  initialValues={{
                    Address: fullAddress,
                    partnerDistrict: "my district",
                    partnerRegion: "my region",
                  }}
                  className="partners-form"
                >
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
                            required: false,
                            message: getLocaleMessages({
                              id: "staff.contact.error",
                            }),
                          },
                          {
                            min: 12,
                            message:
                              "Contact number should be minimum 12 digits.",
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
                        ]}
                      >
                        <Input placeholder="Phone Number (Optional)" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <h5> Salon Address :</h5>
                  <Form.Item
                    name="Address"
                    style={{ display: "none" }}
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

                  <Row gutter={30}>
                    <Col span={12}>
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
                        <Input placeholder="Address" />
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
                        <Input placeholder="Postcode" />
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
                      <Mymap
                        latitude={getLatitude}
                        longitude={getLongitude}
                        getLatLng={getLatLng}
                        settLatLng={(lat, lng) => {
                          settLatLng(lat, lng);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <div className="center-btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      // loading={partnerLoader || fileUploadLoader}
                    >
                      {"Next"}
                    </Button>
                  </div>
                </Form>
              </Spin>
            </>
          ) : nextpage3 ? (
            <>
              <Spin size="large" spinning={loading}>
                <Form
                  {...formProps}
                  form={form}
                  onFinish={onNextPageStaff}
                  onFinishFailed={onFinishFailed}
                  className="partners-form"
                >
                  <h5>Select Services :</h5>
                  <ul className="select-service">
                    {categoryData.map((categoryList, index) => {
                      return (
                        <li>
                          <input
                            onChange={(event) => serviceChecked(event)}
                            type="checkbox"
                            id={categoryList["id"]}
                            value={categoryList["id"]}
                            name={categoryList["id"]}
                          />
                          <label htmlFor={categoryList["id"]}>
                            <div className="imgBox">
                              <img src={categoryList.image_url} alt="" />
                            </div>
                            <div className="service-title">
                              {categoryList.categoryname}
                            </div>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <Row gutter={30}>
                    <Col span={12}>
                      <h5> Add Staff :</h5>
                    </Col>
                    <Col span={12}>
                      <Button
                        style={{ float: "right", borderRadius: "25px" }}
                        onClick={(e) => {
                          setstaffCount([...staffCount, staffCount[0] + 1]);
                        }}
                      >
                        +
                      </Button>
                    </Col>
                    {staffCount &&
                      staffCount.map((data, index) => {
                        return (
                          <>
                            <Col span={24}>
                              <h5>{"Staff" + (index + 1)}</h5>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name={"staffirstname" + (index + 1)}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: "Please enter staff Name ",
                                  },
                                ]}
                              >
                                <Input placeholder="First Name" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name={"staflastname" + (index + 1)}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter staff Last Name",
                                  },
                                ]}
                              >
                                <Input placeholder="Last Name" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name={"stafemail" + (index + 1)}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Staff Email",
                                    type: "email",
                                  },
                                ]}
                              >
                                <Input placeholder="Email Address" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name={"staf_mobile_number" + (index + 1)}
                              >
                                <Input.Group compact>
                                  <Form.Item
                                    name={"phonenumber" + (index + 1)}
                                    rules={[
                                      {
                                        required: true,
                                        message: getLocaleMessages({
                                          id: "staff.contact.error",
                                        }),
                                      },
                                      {
                                        min: 12,
                                        message:
                                          "Contact number should be minimum 12 digits.",
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
                          </>
                        );
                      })}
                  </Row>
                  <div className="center-btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      // loading={partnerLoader || fileUploadLoader}
                    >
                      {"Next"}
                    </Button>
                  </div>
                </Form>
              </Spin>
            </>
          ) : (
            <Spin size="large" spinning={loading}>
              <Form
                {...formProps}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                // initialValues={{
                //   Address: fullAddress,
                //   partnerDistrict: "my district",
                //   partnerRegion: "my region",
                // }}
              >
                <h5> Saloon Image :</h5>
                <Row gutter={30}>
                  <Col span={24}>
                    <Form.Item>
                      <ImageUploader
                        isSingleImage={true}
                        images={[]}
                        onDropImage={uploadImage}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <h5>VAT :</h5>
                <Form.Item
                  label="Are you authorized for VAT?"
                  className="oneline_form"
                >
                  <Radio.Group value={showVAT ? 1 : 2}>
                    <Radio
                      name="isVAT"
                      value={1}
                      onChange={() => setShowVAT(true)}
                    >
                      Yes
                    </Radio>
                    <Radio
                      name="isVAT"
                      value={2}
                      onChange={() => setShowVAT(false)}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item name="vatnumber">
                      <Input placeholder="VAT Number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="vatpercent">
                      <Input placeholder="VAT Percentage" />
                    </Form.Item>
                  </Col>
                </Row>
                <h5>Documents :</h5>
                <Row gutter={30}>
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
                        //   application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        multiple={false}
                        showUploadList={{
                          showRemoveIcon: true,
                        }}
                        maxCount={1}
                        //
                        onRemove={(file) => {
                          // Prevent upload
                          return new Promise((resolve, reject) => {
                            resolve(true);
                          });
                        }}
                        beforeUpload={(file) => {
                          // Prevent upload
                          return false;
                        }}
                        onChange={(e) => uploadFileeeeeee(e, "vat")}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          // loading={fileLoading}
                        >
                          Upload Vat document
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Cr Document"
                      name="crdocument"
                      rules={[
                        {
                          required: true,
                          message: "Please upload your cr document",
                        },
                      ]}
                    >
                      <Upload
                        accept="application/pdf"
                        // accept=".doc,.docx,.xml,application/pdf,
                        //   application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                  <Col span={12}>
                    <Form.Item
                      label="Logo"
                      name="logodocument"
                      rules={[
                        {
                          required: true,
                          message: "Please upload the logo document",
                        },
                      ]}
                    >
                      <Upload
                        accept=".png,.jpeg,.jpg"
                        multiple={false}
                        showUploadList={{
                          showRemoveIcon: true,
                        }}
                        maxCount={1}
                        // onRemove={(file) => {
                        //   // Prevent upload
                        //   return false;
                        // }}
                        onRemove={(file) => {
                          // Prevent upload
                          return new Promise((resolve, reject) => {
                            resolve(true);
                          });
                        }}
                        beforeUpload={(file) => {
                          // Prevent upload
                          return false;
                        }}
                        onChange={(e) => uploadFileeeeeee(e, "logo")}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          // loading={fileLoading}
                        >
                          Upload Logo
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <h5> Available for :</h5>
                <Form.Item
                  name="availableFor"
                  rules={[
                    {
                      required: true,
                      message: "Please select the availability",
                    },
                  ]}
                >
                  <Checkbox.Group>
                    <Row>
                      <Col span={15}>
                        <Checkbox value={1}>Women</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value={2}>Kids</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <h5> Team Size : </h5>
                <Form.Item
                  name="teamSize"
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
                <Row gutter={30}>
                  <Col span={24}>
                    <h5> Bank Details :</h5>
                  </Col>
                  {/* <Row gutter={30}> */}
                  <Col span={12}>
                    <Form.Item
                      name="accountName"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please enter your Account Name ",
                        },
                      ]}
                    >
                      <Input placeholder="Account Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="bankName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Your Bank Name",
                        },
                      ]}
                    >
                      <Input placeholder="Bank Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="IBAN"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Your IBAN",
                        },
                      ]}
                    >
                      <Input placeholder="IBAN" />
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

                <h5>Add your working hours</h5>

                <div className="working_hours">
                  <Checkbox onChange={isMonday}>Monday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {monday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              placeholder="Start Time"
                              minuteStep={15}
                              onSelect={(value) => {
                                setmondayTime({
                                  ...mondayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              placeholder="End Time"
                              minuteStep={15}
                              onSelect={(value) => {
                                setmondayTime({
                                  ...mondayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

                <div className="working_hours">
                  <Checkbox onChange={isTuesday}>Tuesday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {tuesday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setTuesdayTime({
                                  ...TuesdayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setTuesdayTime({
                                  ...TuesdayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

                <div className="working_hours">
                  <Checkbox onChange={isWednesday}>Wednesday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {wednesday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setWednesdayTime({
                                  ...WednesdayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setWednesdayTime({
                                  ...WednesdayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

                <div className="working_hours">
                  <Checkbox onChange={isThursday}>Thursday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {thursday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setThursdayTime({
                                  ...ThursdayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setThursdayTime({
                                  ...ThursdayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

                <div className="working_hours">
                  <Checkbox onChange={isFriday}>Friday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {friday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setFridayTime({
                                  ...FridayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setFridayTime({
                                  ...FridayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

                <div className="working_hours">
                  <Checkbox onChange={isSaturday}>Saturday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {saturday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setSaturdayTime({
                                  ...SaturdayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setSaturdayTime({
                                  ...SaturdayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

                <div className="working_hours">
                  <Checkbox onChange={isSunday}>Sunday</Checkbox>
                  <div className="wh_time">
                    <Row gutter={30}>
                      {sunday ? (
                        <>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setSundayTime({
                                  ...SundayTime,
                                  startTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <TimePicker
                              format="HH:mm"
                              showNow={false}
                              minuteStep={15}
                              onSelect={(value) => {
                                setSundayTime({
                                  ...SundayTime,
                                  endTime: String(value._d).split(" ")[4],
                                });
                              }}
                            />
                          </Col>
                        </>
                      ) : (
                        <Col>Closed</Col>
                      )}
                    </Row>
                  </div>
                </div>

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
                  <Radio.Group onChange={hearAboutFresha}>
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
          )}

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
