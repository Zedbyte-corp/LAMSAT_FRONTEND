import React, { useState, useEffect } from "react";
import ImageUpload from "components/Shared/ImageUpload";
import {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import {
  Card,
  Tabs,
  Modal,
  Form,
  Input,
  Button,
  message,
  Space,
  Select,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Radio,
  Spin,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getLocalData, getLocaleMessages } from "redux/helper";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { formProps } from "containers/OnBoarding/constant";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/auth/actions";
import userDetailActions from "redux/UserDetail/actions";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";
// ddd
import { store } from "redux/store";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useGoogleMaps } from "react-hook-google-maps";
import queryString from "query-string";
import { first } from "lodash";
import Mymap from "components/Admin/VendorProfile/Mymap";
import ImageUploader from "components/Shared/ImageUpload";
import settingActions from "redux/Settings/actions";
import "assets/css/dashboard.scss";
import StaffTime from "../../../containers/Vendor/Timeslot/Time";
import actionsFileUpload from "redux/PartnerSignup/actions";
import Geocode from "react-geocode";

const { TabPane } = Tabs;

const { TextArea } = Input;

const avaliableFor = [
  { label: "Women", value: "1" },
  { label: "Kids", value: "2" },
];

const Update = (props) => {
  const dispatch = useDispatch();
  const [passloader, setPassLoader] = useState(false);
  const [getLanguageIndex, setLangauageindex] = useState(0);
  const [getMymapLAt, setMymapLat] = useState(0);
  const [getMymapLng, setMymapLng] = useState(0);
  const [tabkey, setTabKey] = useState();
  const [vendorLanguageShortName, setVendorLanguageShortName] = useState(null);
  const [localImageList, LocalImageListFunc] = useState([]);
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  const [showVAT, setShowVAT] = useState(true);
  const [profileLoader, setprofileLoader] = useState(false);
  const [updateButtonLoader, setupdateButtonLoader] = useState(false);
  const [VendorForm] = Form.useForm();
  const { Option } = Select;
  const [localImage, LocalImageFunc] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangeModalVisible, setIsChangeModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [categoryloader, setcategoryloader] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsChangeModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsChangeModalVisible(false);
    form.resetFields();
  };

  const [vatfile, setvatfile] = useState();
  const [vatpath, setvatpath] = useState();
  const [cr, setcr] = useState();
  const [crpath, setcrpath] = useState();
  const [bankcardUrl, setbankcardUrl] = useState("");
  const [deafultteamsize, setdeafultteamsize] = useState(1);

  let params = getLocalData("id");
  const [show, setShow] = useState(false);

  const isfeatured = 1;

  const { getAppLanguageList } = useSelector((state) => state.Auth);
  console.log(getAppLanguageList);
  const {
    firstname,
    lastname,
    username,
    email,
    countryid,
    cityid,
    areaid,
    commissiontype,
    contactnumber,
    sortorder,
    vat,
    isverifiedemail,
    isotpverified,
    image_url,
    status,
    vendorName,
    vendorAddress,
    vendorDescription,
    imageUploadLoader,
    saloonLanguange,
    lat,
    lng,
    categoryid,
    redirect,
    countryList,
    cityList,
    areaList,
    isvendorDetails,
    categoryList,
    photopath,
    isvendorDetailsmap,
    mapCount,
    isvendorLoad,
    prefix,
    paymentoption,
    images,
    service_available,
    gender,
    vatnumber,
    bankaccountnumber,
    bankname,
    bankiban,
    bankidbic,
    partnerDistrict,
    partnerRegion,
    partnerPostcode,
    teamsize,
    hearAboutFresha,
    vatdocument_url,
    crdocument_url,
    bankdocument_url,
    saloonemail,
    saloonphone,
    ISvat,
    isotpsuccess,
  } = useSelector((state) => state.AdminVendorProfile);

  console.log("this is the value of the vendor contact number", categoryid);

  console.log("this is the value of the vendor profile", lat, lng);

  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lng);
  const [varPaymentout, setvarPaymentout] = useState([]);

  if (getAppLanguageList.length > 0 && saloonLanguange.length == 0) {
    dispatch({
      type: adminvendorprofileAction.ASSIGN_SALOON_LANGUAGE,
      payload: getAppLanguageList,
    });
  }

  /*   if(redirect){
      props.history.push('/vendor/profile');
  }*/
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);
  const [form] = Form.useForm();
  useEffect(() => {
    setLatitude(lat);
    setLongitude(lng);
  }, [lat, lng]);

  const updateImage = () => {
    let imgArr = [];
    imgArr.push(image_url);

    //LocalImageFunc(imgArr);
    LocalImageFunc(images);
    if (localImageList.length == 0) {
      const imglst =
        images.length > 0
          ? images.map((lst) => {
              localImageList.push({ path: lst.image_url, id: lst.id });
            })
          : "";
    }
  };

  /*  const updateImage = () => {
    let imgArr = [];
    imgArr.push(image_url);
    LocalImageFunc(imgArr);
  };*/
  useEffect(() => {
    if (1 && params > 0 && params !== null && typeof params !== undefined) {
      setprofileLoader(true);
      dispatch({
        type: adminvendorprofileAction.GET_SINGLE_VENDOR,
        value: parseInt(params),
        callBackAction: (res) => {
          setprofileLoader(false);
        },
      });
      updateImage();
    }
    if (isvendorLoad) {
      setShowVAT(
        (vatnumber !== null && vatnumber !== "") || (vat !== null && vat !== "")
      );

      VendorForm.setFieldsValue({
        vendorname: saloonLanguange.length
          ? saloonLanguange[0]["vendorname"]
          : "",
        vendoraddress: saloonLanguange.length
          ? saloonLanguange[0]["vendoraddress"]
          : "",
        vendordescription: saloonLanguange.length
          ? saloonLanguange[0]["vendordescription"]
          : "",
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        isfeatured: isfeatured,
        lat: latitude,
        lng: longitude,
        country: countryid,
        //category: categoryid,
        city: cityid,
        area: areaid,
        contactnumber: contactnumber,
        sortorder: sortorder,
        vat: vat ? parseFloat(vat) : 0,
        status: status,
        image_url: image_url,
        prefix: prefix ? prefix : "+966",
        vatnumber: vatnumber,
        bankaccountnumber: bankaccountnumber,
        bankname: bankname,
        bankiban: bankiban,
        bankidbic: bankidbic,
        service_available: service_available,
        partnerDistrict: partnerDistrict,
        partnerRegion: partnerRegion,
        partnerPostcode: partnerPostcode,
        teamsize: teamsize,
        hearAboutFresha: hearAboutFresha,
        vatdocument_url: vatdocument_url,
        crdocument_url: crdocument_url,
        bankdocument_url: bankdocument_url,
        salonemail: saloonemail,
        salonphone: saloonphone,
      });
      setvatfile(vatdocument_url);
      setcr(crdocument_url);
      setbankcardUrl(bankdocument_url);
      setdeafultteamsize(teamsize ? teamsize : "0");
      setShowVAT(ISvat == 2 ? false : true);
    }

    if (isvendorDetails) {
      setcategoryloader(true);
      dispatch({
        type: adminvendorprofileAction.COUNTRY_LIST,
        value: 1,
      });
      dispatch({
        type: adminvendorprofileAction.CATEGORY_LIST,
        value: 1,
        callBackAction: (data) => {
          setcategoryloader(false);
        },
      });
    }
    if (countryid) {
      dispatch({
        type: adminvendorprofileAction.CITY_LIST,
        value: countryid,
      });
    }
    if (cityid) {
      dispatch({
        type: adminvendorprofileAction.AREA_LIST,
        value: cityid,
      });
    }
  }, [VendorForm, firstname, countryList, categoryList]);

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
        dispatch({
          type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
          payload: {
            languageid: 1,
            value: address,
            key: "vendoraddress",
          },
        });
        dispatch({
          type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
          payload: {
            languageid: 2,
            value: address,
            key: "vendoraddress",
          },
        });
        VendorForm.setFieldsValue({
          vendoraddress: address,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [latitude, longitude]);

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

  const categoryOtpLst = [];
  var categoryListcont =
    categoryList.length > 0
      ? categoryList.map((categoryLst) => {
          var finalcatlist = categoryLst.language.filter(
            (lan) => lan.languageid == localStorage.getItem("language_id")
          );
          // categoryLst.languageid
          // localStorage.getItem('language_id');

          var langId = localStorage.getItem("language_id")
            ? localStorage.getItem("language_id")
            : 1;
          var finalcatlist = categoryLst.language.filter(
            (lan) => lan.languageid == langId
          );
          if (finalcatlist.length > 0) {
            if (categoryLst.is_admin == 1) {
              let obj = {
                label: finalcatlist[0].categoryname,
                value: categoryLst.id,
              };
              categoryOtpLst.push(obj);
            }
          }
        })
      : "";

  useEffect(() => {
    if (categoryOtpLst.length && categoryid.length) {
      var filteredDatas = [];
      categoryid.map((data) => {
        var filteredcate = categoryOtpLst.filter(
          (catedata) => catedata.value == data
        );
        if (filteredcate.length > 0) {
          filteredDatas.push(filteredcate[0].value);
        }
      });
      VendorForm.setFieldsValue({
        category: filteredDatas,
      });
    }
  }, [categoryOtpLst]);
  const onMarkerClick = (props, marker, e) => {};

  const onMarkerDragEnd = (coord) => {};

  const paymentOptions = [];
  let obj1 = { label: "Online", value: 1 };
  // let obj2 = { label: "COD", value: 2 };
  paymentOptions.push(obj1);
  //paymentOptions.push(obj2);

  const onDeleteImage = (id) => {
    var result = localImageList.filter(function (ele) {
      return ele.id != id;
    });
    LocalImageListFunc(result);

    dispatch({
      type: actions.VENDOR_IMAGE_REMOVED,
      payload: id,
    });
  };

  useEffect(() => {
    if (isotpsuccess !== "") {
      console.log("111111111", isotpsuccess);
      setIsModalVisible(true);
    }
  }, [isotpsuccess]);

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

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
    setImageOnlyFunc(true);
  };

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

  console.log("verify", isverifiedemail, isotpverified);

  const onFinish = (values) => {
    let newArrayLanguage = [...saloonLanguange];

    newArrayLanguage = newArrayLanguage.filter(
      (singleLanguageList) =>
        singleLanguageList["vendorname"] &&
        singleLanguageList["vendorname"].length > 0 &&
        singleLanguageList["vendordescription"] &&
        singleLanguageList["vendordescription"].length &&
        singleLanguageList["vendoraddress"] &&
        singleLanguageList["vendoraddress"].length
    );
    // console.log(
    //   "this is hte value of the update data in the profile",
    //   newArrayLanguage.length + 1,
    //   saloonLanguange.length
    // );
    // return;
    console.log(
      "111111",
      "hello",
      newArrayLanguage,
      saloonLanguange,
      newArrayLanguage.length === saloonLanguange.length,
      imageOnly,
      setLocalImage.length
    );
    // if (newArrayLanguage.length === saloonLanguange.length) {
    setupdateButtonLoader(true);
    if (imageOnly) {
      if (setLocalImage.length) {
        var uploadImage = [];
        for (const localImage of setLocalImage) {
          let siteparam = new FormData();
          siteparam.set("files", localImage, localImage.name);
          var num = getLocalData("id");
          let data = {
            id: num.toString(),
            language: saloonLanguange,
            username: values["username"],
            firstname: values["firstname"],
            lastname: values["lastname"],
            email: values["email"],
            latitude: latitude,
            longitude: longitude,
            servicelocation: values["servicelocation"],
            countryid: parseInt(values["country"]),
            cityid: parseInt(values["city"]),
            areaid: parseInt(1),
            saloonphone: values["salonphone"],
            saloonemail: values["salonemail"],
            partnerDistrict: "partnerDistrict", //values["partnerDistrict"],
            partnerPostcode: values["partnerPostcode"],
            partnerRegion: "partnerRegion", //values["partnerRegion"],
            teamsize: values["teamSize"] ? values["teamSize"] : deafultteamsize,
            hearAboutFresha: values["hearAboutFresha"],
            vatdocument_url: vatfile,
            crdocument_url: cr,
            bankdocument_url: bankcardUrl,
            confirmpassword: values["confirm"],
            password: values["password"],
            paymentoption: [1], //paymentoption,
            contactnumber: values["contactnumber"],
            service_available: service_available
              ? service_available.length == 2
                ? 3
                : parseInt(service_available[0])
              : 1,
            //vat: values["isVAT"] === 1 ? vat : parseFloat("0"),
            vat: parseInt(values["vat"]),
            vatpercent: showVAT ? 1 : 2,
            prefix: values["prefix"] ? values["prefix"] : "+966",
            servicelocation: "test",
            category: values["category"],
            sortorder: sortorder,
            isfeatured: values["isfeatured"] ? 1 : 0,
            gender: gender,
            //vatnumber: values["isVAT"] === 1 ? values["vatnumber"] : "",
            vatnumber: values["vatnumber"],
            bankaccountnumber: values["bankaccountnumber"],
            bankname: values["bankname"],
            bankiban: values["bankiban"],
            bankidbic: values["bankidbic"]
          };
          console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaa", data);
          // setprofileLoader(true);
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
                  type: adminvendorprofileAction.UPDATE_VENDOR_PROFILE,
                  payload: {
                    ...data,
                    photopath: imagePath,
                    //image_url: image_url,
                    image_url: uploadImage[0].image_url,
                    images: uploadImage,
                  },
                  callBackAction: (status) => {
                    setupdateButtonLoader(false);
                    if (status) {
                      //setupdateButtonLoader(false);
                      //setprofileLoader(false);
                      LocalImageFunc([]);
                      backtopage();
                    }
                  },
                });
              }
            },
            /*callBackAction: (imagePath, image_url) => {

                if (imagePath) {
                  store.dispatch({
                    type: adminvendorprofileAction.UPDATE_VENDOR_PROFILE,
                    payload: {
                      ...data,
                      photopath: imagePath,
                      image_url: image_url,
                    },
                    callBackAction: (status) => {
                      if (status) {
                        dispatch({
                          type: adminvendorprofileAction.GET_SINGLE_VENDOR,
                          value: parseInt(getLocalData("id")),
                        });
                        LocalImageFunc([]);
                        //backtopage();
                      }
                    },
                  });
                }
              },*/
          });
        }
      } else {
        let error = getLocaleMessages({ id: "vendor.image.label" });
        message.error(error);
      }
    } else {
      var num = getLocalData("id");

      let data = {
        id: num.toString(),
        language: saloonLanguange,
        username: values["username"],
        firstname: values["firstname"],
        lastname: values["lastname"],
        email: values["email"],
        latitude: latitude,
        longitude: longitude,
        servicelocation: values["servicelocation"],
        countryid: parseInt(values["country"]),
        cityid: parseInt(values["city"]),
        areaid: parseInt(1),
        saloonphone: values["salonphone"],
        saloonemail: values["salonemail"],
        partnerDistrict: "partnerDistrict", //values["partnerDistrict"],
        partnerPostcode: values["partnerPostcode"],
        partnerRegion: "partnerRegion", //values["partnerRegion"],
        teamsize: values["teamSize"] ? values["teamSize"] : deafultteamsize,
        hearAboutFresha: values["hearAboutFresha"],
        vatdocument_url: vatfile,
        crdocument_url: cr,
        bankdocument_url: bankcardUrl,
        confirmpassword: values["confirm"],
        password: values["password"],
        paymentoption: [1], //paymentoption,
        contactnumber: values["contactnumber"],
        service_available: service_available
          ? service_available.length == 2
            ? 3
            : parseInt(service_available[0])
          : 1,
        //vat: showVAT ? vat : parseFloat("0"),
        vat: parseInt(values["vat"]),
        vatpercent: showVAT ? 1 : 2,
        prefix: values["prefix"] ? values["prefix"] : "+966",
        servicelocation: "test",
        category: values["category"],
        sortorder: sortorder,
        isfeatured: values["isfeatured"] ? 1 : 0,
        photopath: photopath,
        image_url: image_url,
        gender: gender,

        //vatnumber: showVAT ? values["vatnumber"] : "",
        vatnumber: values["vatnumber"],
        bankaccountnumber: values["bankaccountnumber"],
        bankname: values["bankname"],
        bankiban: values["bankiban"],
        bankidbic: values["bankidbic"]
      };
      console.log("111111", values);
      //setprofileLoader(true);
      store.dispatch({
        type: adminvendorprofileAction.UPDATE_VENDOR_PROFILE,
        payload: data,
        callBackAction: (status) => {
          if (status) {
            dispatch({
              type: adminvendorprofileAction.GET_SINGLE_VENDOR,
              value: parseInt(getLocalData("id")),
            });
            //backtopage();
            setupdateButtonLoader(false);
            // setprofileLoader(false);
            LocalImageFunc([]);
          }
        },
      });
    }
    // } else {
    //   message.error("Please complete all language");
    // }
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Please fill all feilds");
  };

  const localData = JSON.parse(localStorage.getItem("user_data"));

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

  const verifyMobileNumber = (value) => {
    const countryCode1 = parsePhoneNumber(contactnumber);
    const countryCode = countryCode1.countryCallingCode;
    // aa
    const payloadData = {
      contactnumber: contactnumber.slice(1),
      countrycode: countryCode,
      vendorId: localData.id,
    };
    console.log("verifying_mobilenumber", payloadData);

    store.dispatch({
      type: adminvendorprofileAction.OTP_VERIFIED,
      payload: payloadData,
      callBackAction: (status) => {
        setupdateButtonLoader(false);
        if (status) {
          dispatch({
            type: adminvendorprofileAction.GET_SINGLE_VENDOR,
            value: parseInt(getLocalData("id")),
          });
          //backtopage();
          LocalImageFunc([]);
        }
      },
    });
  };

  const verifyEmail = (value) => {
    const payloadData = {
      email: localData.email,
      vendorId: localData.id,
    };
    console.log("verifying_email", payloadData);

    store.dispatch({
      type: adminvendorprofileAction.EMAIL_VERIFIED,
      payload: payloadData,
      callBackAction: (status) => {
        setupdateButtonLoader(false);
        if (status) {
          dispatch({
            type: adminvendorprofileAction.GET_SINGLE_VENDOR,
            value: parseInt(getLocalData("id")),
          });
          //backtopage();
          LocalImageFunc([]);
        }
      },
    });
  };

  const handleChangePassword = (values) => {
    const passpayload = {
      oldpassword: values?.oldpassword,
      newpassword: values?.newpassword,
      confirmpassword: values?.confirmpassword,
      id: parseInt(getLocalData("id")),
    };
    console.log("fffffffffffffffff", passpayload, values);
    setPassLoader(true);
    store.dispatch({
      type: adminvendorprofileAction.VENDOR_PASSWORD_CHANGE,
      payload: passpayload,
      callBackAction: (status) => {
        setPassLoader(false);
        // setupdateButtonLoader(false);
        if (status === true) {
          handleOk();
          //backtopage();
          //   LocalImageFunc([]);
        }
      },
    });
  };

  const handleOTPVerification = (values) => {
    const payload = {
      email: email,
      contactnumber: contactnumber,
      otp: values.otp,
    };

    // handleOk();

    store.dispatch({
      type: adminvendorprofileAction.PATNER_VERIFY_OTP,
      payload: payload,
      callBackAction: (status) => {
        // setupdateButtonLoader(false);
        if (status === true) {
          dispatch({
            type: adminvendorprofileAction.GET_SINGLE_VENDOR,
            value: parseInt(getLocalData("id")),
          });
          setIsModalVisible(false);
          //backtopage();
          //   LocalImageFunc([]);
        }
      },
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

  const onChangePayment = (checkedValues) => {
    dispatch({
      type: adminvendorprofileAction.PAYMENT_UPDATE,
      val: checkedValues,
    });
  };

  const onChangeGender = (checkedValues) => {
    dispatch({
      type: adminvendorprofileAction.GENDER_UPDATE,
      val: checkedValues,
    });
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
      className="ph-option"
      name="prefix"
      noStyle
      rules={[{ required: true, message: "Select Country code!" }]}
    >
      <Select
        defaultValue="+966"
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );

  /*  const callbackTabKey = (key)=> {
        setLangauageindex(key);
        if (1 && saloonLanguange.length > 0) {
           // setVendorLanguageShortName(saloonLanguange[`${key}`]['languageshortname'])

        setVendorLanguageShortName(saloonLanguange[`${key}`]['languageshortname']);
                  }if(saloonLanguange.length > 0){

        VendorForm.setFieldsValue({
            vendorname: saloonLanguange[`${key}`]['vendorname'],
            vendoraddress: saloonLanguange[`${key}`]['vendoraddress'],
            vendordescription: saloonLanguange[`${key}`]['vendordescription'],
        })
        VendorForm.validateFields()
    }
    }*/

  const callbackTabKey = (key) => {
    if (key === 0 || key === 1) {
      setLangauageindex(key);
    }
    setTabKey(key);

    console.log("key", key);
    if (key === 2) {
      return;
    } else if (
      (key === 0 && saloonLanguange.length > 0) ||
      (key === 1 && saloonLanguange.length > 0)
    ) {
      setVendorLanguageShortName(
        saloonLanguange[`${key}`]["languageshortname"]
      );
      VendorForm.setFieldsValue({
        vendorname: saloonLanguange[`${key}`]["vendorname"],
        vendoraddress: saloonLanguange[`${key}`]["vendoraddress"],
        vendordescription: saloonLanguange[`${key}`]["vendordescription"],
        // firstname: firstname,
        // lastname: lastname,
        // username: email,
        // email: email,
        // isfeatured: isfeatured,
        // lat: latitude,
        // lng: longitude,
        // country: countryid,
        // category: categoryid,
        // city: cityid,
        // area: areaid,
        // contactnumber: contactnumber,
        // sortorder: sortorder,
        // vat: parseFloat(vat),
        // status: status,
        // image_url: image_url,
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

  return (
    <Row>
      <Col
        offset={0}
        xs={22}
        md={22}
        lg={22}
        className="dashboard-content mg-auto"
      >
        <Spin size="large" spinning={profileLoader || updateButtonLoader}>
          <Row>
            <Col
              offset={0}
              xs={22}
              md={22}
              lg={22}
              className="dashboard-content mg-auto vendor-erdit"
            >
              <div className="dashboard-content">
                <div>
                  <h5>Profile</h5>
                </div>
                {isverifiedemail !== 1 || isotpverified !== 1 ? (
                  <Card title="Verify Details">
                    {isverifiedemail !== 1 ? (
                      <div>
                        <span
                          className="header_seprate"
                          style={{ fontSize: "18px" }}
                        >
                          Email - {email}
                        </span>{" "}
                        <Button
                          type="primary"
                          style={{ margin: 2 }}
                          onClick={verifyEmail}
                        >
                          {" "}
                          verify{" "}
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                    <br />
                    <br />
                    {isotpverified !== 1 && (
                      <div>
                        <span
                          className="header_seprate"
                          style={{ fontSize: "18px" }}
                        >
                          ContactNo - {contactnumber}{" "}
                        </span>{" "}
                        <Button type="primary" onClick={verifyMobileNumber}>
                          {" "}
                          verify
                        </Button>
                      </div>
                    )}
                  </Card>
                ) : (
                  ""
                )}
                <Card
                  title="Update Profile"
                  extra={
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#f9a392" }}
                      onClick={() => props.history.push("/vendor/Timeslot")}
                    >
                      Time Slot
                    </Button>
                  }
                >
                  <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{
                      firstname: firstname,
                      lastname: "",
                      gender: gender,
                      username: "",
                      email: "",
                      /*latitude: '',
                            longitude: '',*/
                      payment: "",
                      area: "",
                      country: "",
                      city: "",
                      vat: "",
                      contactnumber: "",
                      //category: categoryid.length > 0 && categoryid,
                      vendorname:
                        saloonLanguange.length > 0
                          ? saloonLanguange[getLanguageIndex]["vendorname"]
                          : "",
                      vendordescription:
                        saloonLanguange.length > 0
                          ? saloonLanguange[getLanguageIndex][
                              "vendordescription"
                            ]
                          : "",
                      vendoraddress:
                        saloonLanguange.length > 0
                          ? saloonLanguange[getLanguageIndex]["vendoraddress"]
                          : "",
                      sortorder: "",
                    }}
                    form={VendorForm}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                  >
                    <Tabs onChange={callbackTabKey}>
                      {getAppLanguageList.length > 0
                        ? getAppLanguageList.map((languageDetail, index) => (
                            <>
                              <TabPane
                                //tab={languageDetail["languagename"]}
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
                                <Row gutter={30}>
                                  <Col span={12}>
                                    <Form.Item
                                      label="Firstname"
                                      name="firstname"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your firstname!",
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
                                          message:
                                            "Please input your lastname!",
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
                                          message:
                                            "Please input your username!",
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
                                            id:
                                              "errorMessage.saloonDescription",
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
                            </>
                          ))
                        : ""}
                      {/* {getAppLanguageList.length > 0 ? (
                        <>
                          <TabPane tab="Time Slot" key="2">
                            <StaffTime />
                          </TabPane>
                        </>
                      ) : (
                        ""
                      )} */}
                    </Tabs>
                    {tabkey != 2 && (
                      <div>
                        <Row gutter={30}></Row>

                        <h3
                          class="header_seprate"
                          style={{ background: "#f9a392" }}
                        >
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

                          {/* <Col span={12}>
                          <Form.Item
                            name="contactnumber"
                            label="Contact Number"
                            rules={[
                              {
                                required: true,
                                message: "Please input contact number!",
                              },
                              {
                                min: 6,
                                message: "Contact number should be minimum 6 digits.",
                              },
                              {
                                max: 15,
                                message: "Contact number should be maximum 15 digits.",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              addonBefore={prefixSelector}
                              style={{
                                width: "100%",
                                height: "20",
                              }}
                            />
                          </Form.Item>
                        </Col> */}
                          <Col>
                            <Form.Item
                              name="contactnumber"
                              label="Contact Number"
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
                                  max: 15,
                                  message:
                                    "Contact number should be maximum 15 digits.",
                                },
                              ]}
                            >
                              <PhoneInput
                                international
                                placeholder="Enter phone number"
                                countryCallingCodeEditable={false}
                                defaultCountry="SA"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col span={12}>
                            <Form.Item
                              name="salonphone"
                              label="Salon Phone (optional)"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: getLocaleMessages({
                              //       id: "staff.contact.error",
                              //     }),
                              //   },
                              // ]}
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
                      </div>
                    )}

                    {/* <h4 className="header_seprate">Salon Address</h4>

                        <Row gutter={30}>
                          <Col span={12}>
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
                          </Col>
                          
                        </Row> */}
                    {tabkey != 2 && (
                      <div>
                        <Row gutter={30}></Row>
                        <h4 className="header_seprate">Salon Address</h4>
                        <Row gutter={30}>
                          <Col span={12}>
                            <Form.Item
                              label={getLocaleMessages({
                                id: "label.saloonAddress",
                                localeLanguage: getLocaleLanguage(),
                              })}
                              name="vendoraddress"
                              rules={[
                                {
                                  required: true,
                                  message: getLocaleMessages({
                                    id: "errorMessage.saloonAddress",
                                    localeLanguage: getLocaleLanguage(),
                                  }),
                                  whitespace: true,
                                },
                              ]}
                            >
                              <Input.TextArea
                                placeholder={"Address"}
                                autoSize={{
                                  minRows: 1.5,
                                  maxRows: 2,
                                }}
                                onChange={(event) =>
                                  onChangeLanguageValue({
                                    event: event,
                                    languageid: getAppLanguageList[0]["id"],
                                    key: "vendoraddress",
                                  })
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="country"
                              label="Country"
                              rules={[
                                {
                                  required: true,
                                  message: "Country Select one!",
                                },
                              ]}
                            >
                              <Select
                                options={country}
                                onChange={handleChange}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="city"
                              label="City"
                              rules={[
                                {
                                  required: true,
                                  message: "City Select one!",
                                },
                              ]}
                            >
                              <Select
                                options={city}
                                onChange={handleCityChange}
                              />
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
                          {/* <Col span={12}>
                            <Form.Item
                              name="area"
                              label="Area"
                              rules={[
                                {
                                  required: true,
                                  message: 'Area Select one!'
                                }
                              ]}
                            >
                              <Select options={area} onChange={handleAreaChange} />
                            </Form.Item>
                          </Col> */}
                        </Row>
                        <h4 className="header_seprate">Salon Map</h4>
                        <Col span={24} className="inner-content editpage-map">
                          {!show ? (
                            <Mymap
                              className="vendor-map"
                              latitude={latitude}
                              longitude={longitude}
                              getLatLng={getLatLng}
                            />
                          ) : (
                            ""
                          )}
                        </Col>
                        <h4 className="header_seprate">Business Type</h4>
                        <Row gutter={30}>
                          <Col span={12} className="inner-content">
                            <Spin size="medium" spinning={categoryloader}>
                              <Form.Item
                                className="pd-15"
                                name="category"
                                label="Category"
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
                                  options={categoryOtpLst}
                                  onChange={handleCategoryChange}
                                />
                              </Form.Item>

                              <Form.Item
                                name="payment"
                                label="Payment Options"
                                valuePropName="checked"
                                {...VendorForm}
                                // style={{ display: "none" }}
                                style={{ display: "none" }}
                              >
                                <Checkbox.Group
                                  options={paymentOptions}
                                  value={paymentoption}
                                  onChange={onChangePayment}
                                />
                              </Form.Item>
                            </Spin>
                          </Col>
                          <Col
                            span={12}
                            className="inner-content right-content"
                          ></Col>
                          <Col span={24} className="inner-content image-upload">
                            <h4 className="header_seprate">Salon Images</h4>

                            <Form.Item>
                              <ImageUploader
                                isSingleImage={false}
                                images={
                                  localImageList.length ? localImageList : []
                                }
                                onDropImage={onDropImage}
                                isRemoved={true}
                                deleteImage={onDeleteImage}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <h4 className="header_seprate">Available For</h4>
                        <Row gutter={30}>
                          <Col span={12}>
                            <Form.Item
                              name="service_available"
                              label="Service For"
                              valuePropName="checked"
                              defaultValue="1"
                              {...VendorForm}
                            >
                              <Checkbox.Group
                                options={avaliableFor}
                                value={service_available}
                                onChange={onChangeGender}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            {teamsize !== undefined && (
                              <Form.Item name="teamSize" label="Team Size">
                                <Select
                                  showSearch
                                  style={{ width: 200 }}
                                  placeholder="Select Team Size"
                                  optionFilterProp="children"
                                  defaultValue={
                                    teamsize ? JSON.stringify(teamsize) : "0"
                                  }
                                >
                                  <Option value="0">It's just me</Option>
                                  <Option value="1">2-5</Option>
                                  <Option value="2">6-10</Option>
                                  <Option value="3">11+</Option>
                                </Select>
                              </Form.Item>
                            )}
                          </Col>
                        </Row>
                        <h4 className="header_seprate">CR Information</h4>
                        <Row gutter={30}>
                          <Col span={12}>
                            <Form.Item name="crdocument" label="Cr Document">
                              <Upload
                                //accept="application/pdf"
                                // accept=".doc,.docx,.xml,application/pdf,
                                //   application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                                onChange={(e) => uploadFileeeeeee(e, "cr")}
                              >
                                <Button icon={<UploadOutlined />}>
                                  Upload CR document
                                </Button>
                              </Upload>
                            </Form.Item>
                            <p>
                              <span className="right">
                                <a
                                  className="login-form-forgot"
                                  href={`${crdocument_url}`}
                                  target="_blank"
                                >
                                  {crdocument_url ? "View" : ""}
                                </a>
                              </span>
                            </p>
                          </Col>
                        </Row>
                        <h4 className="header_seprate">VAT Information</h4>
                        <Form.Item label="Are you authorized for VAT? ">
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
                        {showVAT && (
                          <Row gutter={30}>
                            <Col span={12}>
                              <Form.Item
                                rules={[
                                  {
                                    required: showVAT ? true : false,
                                    message: "Please add vat number",
                                  },
                                ]}
                                label="VAT Number"
                                name="vatnumber"
                              >
                                <Input placeholder="Please enter VAT Number" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                rules={[
                                  {
                                    required: showVAT ? true : false,
                                    message: "Please add vat percentage!",
                                  },
                                ]}
                                label="VAT Percentage"
                                name="vat"
                              >
                                <InputNumber
                                  placeholder="Value"
                                  min={0}
                                  //precision={2}
                                  // step={0.1}
                                  max={100}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                rules={[
                                  {
                                    required: showVAT
                                      ? !vatdocument_url
                                        ? true
                                        : false
                                      : false,
                                    message: "Please add VAT Document",
                                  },
                                ]}
                                label="VAT Document"
                                name="vatdocument"
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
                              <p>
                                <span className="right">
                                  <a
                                    className="login-form-forgot"
                                    href={`${vatdocument_url}`}
                                    target="_blank"
                                  >
                                    {vatdocument_url ? "View" : ""}
                                  </a>
                                </span>
                              </p>
                            </Col>
                          </Row>
                        )}
                        <h4 className="header_seprate">Bank Details</h4>
                        <Row gutter={30}>
                          <Col span={12} >
                            <Form.Item
                              label="Account Number"
                              name="bankaccountnumber"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Account Number!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="IDBIC"
                              name="bankidbic"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Bank Name"
                              name="bankname"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Bank Name!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="IBAN"
                              name="bankiban"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your IBAN!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="Bank Document"
                              label="Bank Document"
                              rules={[
                                {
                                  required: bankdocument_url ? false : true,
                                  message: "Please input your Bank Document!",
                                },
                              ]}
                            >
                              <Upload
                                //accept="application/pdf"
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
                            <p>
                              <span className="right">
                                <a
                                  className="login-form-forgot"
                                  href={`${bankdocument_url}`}
                                  target="_blank"
                                >
                                  {bankdocument_url ? "View" : ""}
                                </a>
                              </span>
                            </p>
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
                        <div className="button-center mt-50">
                          <Button
                            //htmlType="submit"
                            //onClick={backtopage}
                            onClick={() => setIsChangeModalVisible(true)}
                          >
                            Change Password
                          </Button>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={updateButtonLoader}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    )}
                  </Form>
                </Card>
              </div>
            </Col>
          </Row>
        </Spin>

        {/* <TabPane tab="Time Slot" key="2">
            <StaffTime />
          </TabPane> */}

        <Modal
          title={false}
          visible={isModalVisible || isChangeModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          footer={false}
          className="modal-ui-1 modal-otp"
          width="100%"
          destroyOnClose
        >
          {isChangeModalVisible ? (
            <div className="modal-body-ui">
              <h2>Change Password</h2>

              <Form
                form={form}
                name="control-ref"
                onFinish={handleChangePassword}
              >
                <Form.Item
                  style={{ width: "100%" }}
                  name="oldpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input OTP",
                    },
                  ]}
                >
                  <Input.Password placeholder="Old password" />
                </Form.Item>

                <Form.Item
                  style={{ width: "100%" }}
                  name="newpassword"
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
                  hasFeedback
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item
                  style={{ width: "100%" }}
                  name="confirmpassword"
                  dependencies={["newpassword"]}
                  hasFeedback
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
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newpassword") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <br />
                <div className="ant-form-item">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={passloader}
                    loading={passloader}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <div className="modal-body-ui">
              <h2>OTP Verification</h2>
              <p className="sub">
                Enter the OTP you received to <br /> {contactnumber}
              </p>

              <Form
                form={form}
                name="control-ref"
                onFinish={handleOTPVerification}
              >
                <Form.Item
                  style={{ width: "100%" }}
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Please input OTP",
                    },
                  ]}
                >
                  <Input placeholder="please enter valid OTP" />
                </Form.Item>
                <br />

                <div className="ant-form-item">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={profileLoader}
                    loading={profileLoader}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Modal>
      </Col>
    </Row>
  );
};

export default Update;
