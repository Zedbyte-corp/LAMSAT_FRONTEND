import React, { useState, useEffect } from "react";
import ImageUpload from "components/Shared/ImageUpload";
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  message,
  Space,
  Select,
  InputNumber,
  Checkbox,
  Row,
  Radio,
  Col,
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
import { useGoogleMaps } from "react-hook-google-maps";
import queryString from "query-string";
import { first } from "lodash";
import Mymap from "components/Admin/VendorProfile/Mymap";
import ImageUploader from "components/Shared/ImageUpload";
import settingActions from "redux/Settings/actions";
import actionsFileUpload from "redux/PartnerSignup/actions";
import Geocode from "react-geocode";

import "assets/css/dashboard.scss";

import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";

const { TabPane } = Tabs;

const Update = (props) => {
  const dispatch = useDispatch();
  const [getLanguageIndex, setLangauageindex] = useState(0);
  const [getMymapLAt, setMymapLat] = useState(0);
  const [getMymapLng, setMymapLng] = useState(0);
  const [vendorLanguageShortName, setVendorLanguageShortName] = useState(null);
  const [form] = Form.useForm();
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  const { imageLoader } = useSelector((state) => state.Settings);
  const [showVAT, setShowVAT] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [fullAddress, setFullAddress] = useState("");
  const [pAddress, setPAddress] = useState("");
  const [vatfile, setvatfile] = useState();
  const [vatpath, setvatpath] = useState();
  const [cr, setcr] = useState();
  const [crpath, setcrpath] = useState();
  const [bankcardUrl, setbankcardUrl] = useState("");
  //const [sendRequest, setSendRequest] = useState(false);

  const [VendorForm] = Form.useForm();
  const { Option } = Select;
  const [localImage, LocalImageFunc] = useState([]);
  const [localImageList, LocalImageListFunc] = useState([]);
  let params = queryString.parse(props.location.search);
  const [getLat, setLat] = useState(0);
  const [getLng, setLng] = useState(0);
  const [show, setShow] = useState(false);

  const avaliableFor = [
    { label: "Women", value: "1" },
    { label: "Kids", value: "2" },
  ];

  const { getAppLanguageList } = useSelector((state) => state.Auth);
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
    vat,
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
    loading,
    images,
    gender,
    vatnumber,
    bankaccountnumber,
    bankname,
    bankiban,
    isfeatured,
    service_available,
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
    isaccepted,
    isprofileaccepted,
    isstaffaccepted,
    isserviceaccepted,
  } = useSelector((state) => state.AdminVendorProfile);

  const aaaa = useSelector((state) => state.AdminVendorProfile);
  console.log("aaaa", aaaa);
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lng);
  const [deafultteamsize, setdeafultteamsize] = useState(1);
  const [postLoader, setPostLoader] = useState(false);
  const [categoryLoader, setcategoryLoader] = useState(false);
  const [categoiesID,setcategoiesID] = useState(false);
  // const [AAAddres, setAAAddres] = useState("");
  useEffect(() => {
    setLatitude(lat);
    setLongitude(lng);
  }, [lat, lng]);

  console.log("prefix", prefix, contactnumber);

  useEffect(() => {
    setShowVAT(vat !== "" && vatnumber !== "");
  }, [vat, vatnumber]);

  const getLatLng = (event) => {
    console.log(
      "this is teh vlaue do teh event in the map",
      event,
      event.latLng.lat(),
      event.latLng.lng()
    );
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  };

  Geocode.setApiKey("AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro");
  Geocode.enableDebug();
  const handlepartnerAddress = (e) => {
    e.preventDefault();
    setPAddress(pAddress);
  };

  // Geocode.fromLatLng(latitude, longitude).then(
  //   (response) => {
  //     const address = response.results[0].formatted_address;
  //     setFullAddress(response.results[0].formatted_address);
  //     form.setFieldsValue({
  //       partnerAddress: response.results[0].formatted_address,
  //     });
  //     console.log("fulladdress", address, fullAddress);
  //     console.log("results", response.results);
  //     {
  //       /**
  //     if (response) {
  //       console.log("address", pAddress);
  //       setPAddress(
  //         response.results[0].address_components[0].long_name
  //           ? response.results[0].address_components[0].long_name
  //           : " " + " " + response.results[0].address_components[1].long_name
  //           ? response.results[0].address_components[1].long_name
  //           : " "
  //       );
  //       setPDistrict(
  //         response.results[0].address_components[2].long_name
  //           ? response.results[0].address_components[2].long_name
  //           : " "
  //       );
  //       setPRegion(
  //         response.results[0].address_components[3].long_name
  //           ? response.results[0].address_components[3].long_name
  //           : ""
  //       );
  //       setPCode(
  //         response.results[0].address_components[5].long_name
  //           ? response.results[0].address_components[5].long_name
  //           : " "
  //       );
  //     } */
  //     }
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  // Get formatted address, city, state, country from latitude & longitude when
  // Geocode.setLocationType("ROOFTOP") enabled
  // the below parser will work for most of the countries
  useEffect(() => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        //console.log("main_thing", city, state, country);
        // console.log("main_hting2@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", address);

        dispatch({
          type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
          payload: {
            languageid: 1,
            value: address,
            key: "vendoraddress",
          },
        });
        // form.setFieldsValue({
        //   partnerAddress: address,
        // });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [latitude, longitude]);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const [defaultImage, setDefaultImage] = useState(image_url);

  if (getAppLanguageList.length > 0 && saloonLanguange.length == 0) {
    dispatch({
      type: adminvendorprofileAction.ASSIGN_SALOON_LANGUAGE,
      payload: getAppLanguageList,
    });
  }

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
  if (redirect) {
    props.history.push("/admin/vendor");
  }
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

  const updateImage = () => {
    let imgArr = [];
    imgArr.push(defaultImage);

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

  const onDefaultImageChange = (e) => {
    console.log(`default image path: ${e.target.value}`);
    setDefaultImage(e.target.value);
  };

  useEffect(() => {
    if (
      1 &&
      params.id > 0 &&
      params.id !== null &&
      typeof params.id !== undefined
    ) {
      dispatch({
        type: adminvendorprofileAction.GET_SINGLE_VENDOR,
        value: parseInt(params.id),
      });
      updateImage();
      setcategoryLoader(true);
    }
    if (isvendorLoad) {
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
        partnerDistrict: partnerDistrict,
        partnerRegion: partnerRegion,
        partnerPostcode: partnerPostcode,
        teamsize: teamsize,
        hearAboutFresha: hearAboutFresha,
        vatdocument_url: vatdocument_url,
        crdocument_url: crdocument_url,
        bankdocument_url: bankdocument_url,
        commissiontype: commissiontype,
        contactnumber: contactnumber,
          // contactnumber && contactnumber.length > 0
          //   ? contactnumber.substring(prefix ? prefix.length : 4)
          //   : "",
        vat: vat,
        status: currentStatus,
        image_url: defaultImage,
        prefix: prefix,
        paymentoption: paymentoption,
        service_available: service_available,

        gender: "1",
        vatnumber: vatnumber,
        bankaccountnumber: bankaccountnumber,
        bankname: bankname,
        bankiban: bankiban,
        salonemail: saloonemail,
        salonphone: saloonphone,
      });
      setvatfile(vatdocument_url);
      setcr(crdocument_url);
      setbankcardUrl(bankdocument_url);
      setdeafultteamsize(teamsize);
      setShowVAT(ISvat == 2 ? false : true);
    }

    if (isvendorDetails) {
      dispatch({
        type: adminvendorprofileAction.COUNTRY_LIST,
        value: 1,
      });
      dispatch({
        type: adminvendorprofileAction.CATEGORY_LIST,
        value: 1,
        callBackAction: (data) => {
          setcategoryLoader(false);
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
  /*const categoryOtpLst = [];
    var categoryListcont = categoryList.length>0?categoryList.map((categoryLst) => {
        let obj = { label: categoryLst.language[0].categoryname, value: categoryLst.id };
        category.push(obj);
    }):''*/

  useEffect(() => {
    if (categoryOtpLst.length) {
      if(!categoiesID){
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
    }
  }, [categoryOtpLst]);
  const onMarkerClick = (props, marker, e) => {};

  const onMarkerDragEnd = (coord) => {};

  const paymentOptions = [];
  let obj1 = { label: "Online", value: 1 };
  let obj2 = { label: "COD", value: 2 };
  paymentOptions.push(obj1);
  paymentOptions.push(obj2);
  //const isfeatured = 1;

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

  const onFinish = (values) => {
    /*dispatch({
        type: adminvendorprofileAction.SAVE_SALOON,
    })*/
    let newArrayLanguage = [...saloonLanguange];

    newArrayLanguage = newArrayLanguage.filter(
      (singleLanguageList) =>
        singleLanguageList["vendorname"] &&
        singleLanguageList["vendorname"].length > 0 &&
        singleLanguageList["vendordescription"] &&
        singleLanguageList["vendordescription"].length
      // &&
      // singleLanguageList["vendoraddress"] &&
      // singleLanguageList["vendoraddress"].length
    );

    if (showVAT) {
    }

    if (newArrayLanguage.length === saloonLanguange.length) {
      if (imageOnly) {
        var uploadImage = [];

        if (setLocalImage.length) {
          for (const localImage of setLocalImage) {
            let siteparam = new FormData();
            siteparam.set("files", localImage, localImage.name);

            var countryCode = "";
            if (
              values.contactnumber !== undefined &&
              typeof values.contactnumber !== undefined &&
              parsePhoneNumber(values.contactnumber) !== undefined &&
              typeof parsePhoneNumber(values.contactnumber) !== undefined
            ) {
              const countryCode1 = parsePhoneNumber(values.contactnumber);
              countryCode = countryCode1.countryCallingCode;
            }

            let data = {
              id: params.id,
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
              teamsize: values["teamSize"]
                ? values["teamSize"]
                : deafultteamsize,
              hearAboutFresha: values["hearAboutFresha"],
              vatdocument_url: vatfile,
              crdocument_url: cr,
              bankdocument_url: bankcardUrl,
              commissiontype: " ",
              confirmpassword: values["confirm"],
              password: values["password"],
              paymentoption: [1], //values["paymentoption"],
              contactnumber: values["contactnumber"],
              // contactnumber:
              //   (values["prefix"] ? values["prefix"] : "+966") +
              //   values["contactnumber"],
              //vat: showVAT ? values["vat"] : 0,
              vat: values["vat"],
              vatpercent: showVAT ? 1 : 2,
              prefix: countryCode ? "+"+countryCode : "+966",
              //prefix: values["prefix"] ? values["prefix"] : "+966",
              servicelocation: "test",
              category: values["category"],
              isfeatured: values["isfeatured"] ? 1 : 0,
              status: currentStatus,
              gender: "1",
              service_available:
                service_available.length == 2
                  ? 3
                  : parseInt(service_available[0]),
              vatnumber: values["vatnumber"],
              //vatnumber: showVAT ? values["vatnumber"] : 0,
              bankaccountnumber: "12345678", //values["bankaccountnumber"],
              bankname: values["bankname"],
              bankiban: values["bankiban"],
            };
            console.log("data", data);
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
                      if (status) {
                        LocalImageFunc([]);
                        backtopage();
                      }
                    },
                  });
                }
              },
            });
          }
        } else {
          let error = getLocaleMessages({ id: "vendor.image.label" });
          message.error(error);
        }
      } else {
        var countryCode = "";
        if (
          values.contactnumber !== undefined &&
          typeof values.contactnumber !== undefined &&
          parsePhoneNumber(values.contactnumber) !== undefined &&
          typeof parsePhoneNumber(values.contactnumber) !== undefined
        ) {
          const countryCode1 = parsePhoneNumber(values.contactnumber);
          countryCode = countryCode1.countryCallingCode;
        }
        let data = {
          id: params.id,
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
          commissiontype: " ",
          confirmpassword: values["confirm"],
          password: values["password"],
          paymentoption: [1, 2], //values["paymentoption"],
          contactnumber: values["contactnumber"],
          // contactnumber:
          //   (values["prefix"] ? values["prefix"] : "+966") +
          //   values["contactnumber"],
          //vat: showVAT ? values["vat"] : 0,
          vat: parseFloat(values["vat"]),
          vatpercent: showVAT ? 1 : 2,
          prefix: countryCode ? "+"+countryCode : "+966",
          // prefix: values["prefix"] ? values["prefix"] : "+966",
          servicelocation: "test",
          category: values["category"],
          isfeatured: values["isfeatured"] ? 1 : 0,
          photopath: photopath,
          image_url: defaultImage,
          status: currentStatus,
          gender: "1",
          service_available:
            service_available.length == 2 ? 3 : parseInt(service_available[0]),
          //vatnumber: showVAT ? values["vatnumber"] : 0,
          vatnumber: values["vatnumber"],
          bankaccountnumber: "12345678", //values["bankaccountnumber"],
          bankname: values["bankname"],
          bankiban: values["bankiban"],
        };
        console.log("data", data);
        setPostLoader(true);
        store.dispatch({
          type: adminvendorprofileAction.UPDATE_VENDOR_PROFILE,
          payload: data,
          callBackAction: (status) => {
            if (status) {
              backtopage();
              LocalImageFunc([]);
            }
          },
        });
      }
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const handleCategoryChange = (value) => {
    VendorForm.setFieldsValue({ category: value });
    setcategoiesID(true);
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
  };

  const handleAreaChange = (value) => {
    VendorForm.setFieldsValue({ area: value });
  };

  const onChangePayment = (checkedValues) => {
    //       let chk =  checkedValues.length == 0 ? VendorForm.setFieldsValue({ payment: '' }):'';

    let chkres = checkedValues.length == 0 ? "1111" : "0000";

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
      VendorForm.setFieldsValue({ isfeatured: "" });
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
      rules={[{ required: true, message: "Select Country code!" }]}
    >
      <Select
        style={{
          width: 90,
        }}
      >
        <Option value="+966">+966</Option>
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
    setLangauageindex(key);
    if (saloonLanguange.length > 0) {
      setVendorLanguageShortName(
        saloonLanguange[`${key}`]["languageshortname"]
      );
      VendorForm.setFieldsValue({
        vendorname: saloonLanguange[`${key}`]["vendorname"],
        //vendoraddress: saloonLanguange[`${key}`]["vendoraddress"],
        vendordescription: saloonLanguange[`${key}`]["vendordescription"],
        // firstname: firstname,
        // lastname: lastname,
        // username: username,
        // email: email,
        // isfeatured: isfeatured,
        // lat: latitude,
        // lng: longitude,
        // country: countryid,
        // category: categoryid,
        // city: cityid,
        // area: areaid,
        // //commissiontype: commissiontype,
        // contactnumber: contactnumber && contactnumber.length > 0
        // ? contactnumber.substring(prefix && prefix.length + 1)
        // : "",
        // vat: vat,
        // vatnumber: vatnumber,
        // status: currentStatus,
        // image_url: defaultImage,
      });
      VendorForm.validateFields();
    }
  };

  const backtopage = () => {
    setPostLoader(false);
    props.history.push("/admin/vendor");
  };

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
    }
  };

  const defaultvendorAddress = (saloonLanguangeval, val) => {
    var newsaloondata = saloonLanguangeval.filter(
      (saloonlang) => saloonlang.id == val
    );
    if (newsaloondata.length) return newsaloondata[0].vendoraddress;
    // console.log("checkk", newsaloondata[0].vendoraddress);
  };

  const handleChangeApprovalvendor = (value) => {
    if (value) {
      let data = {
        id: parseInt(params.id),
        isaccepted: parseInt(value),
      };
      dispatch({
        type: adminvendorprofileAction.ACCEPT_VENDOR_REQUEST,
        payload: data,
        callBackAction: (status) => {
          dispatch({
            type: adminvendorprofileAction.GET_SINGLE_VENDOR,
            value: parseInt(params.id),
          });
        },
      });
    }
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
        <Card title={getLocaleMessages({ id: "title.saloon Update" })}>
          <Spin size="large" spinning={loading || imageLoader || postLoader}>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                firstname: firstname,
                lastname: "",
                username: "",
                email: "",
                /*latitude: '',
                    longitude: '',*/
                paymentoption: "",
                area: "",
                country: "",
                city: "",
                //commissiontype: "",
                vat: "",
                vatnumber: "",
                contactnumber: "",
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
              }}
              form={VendorForm}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
            >
              <Tabs onChange={callbackTabKey}>
                {console.log("check", getAppLanguageList)}

                {getAppLanguageList.length > 0
                  ? getAppLanguageList.map((languageDetail, index) => (
                      <TabPane tab={languageDetail["languagename"]} key={index}>
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
                          {/* <Col span={12}>
                            
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
                                  style={{ fontSize: "16px", color: "#a1a1a1" }}
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
                                className="custom-autocomplete"
                                apiKey={
                                  "AIzaSyADWxNxOiNs0LRXkgRb2qlmz2BPGycoOJ4"
                                }
                                onPlaceSelected={(place) => {
                                  searchLocation(place, languageDetail["id"]);
                                }}
                                defaultValue={
                                  saloonLanguange.length &&
                                  defaultvendorAddress(
                                    saloonLanguange,
                                    languageDetail["id"]
                                  )
                                }
                              />
                            </div>
                          </Col> */}
                        </Row>
                      </TabPane>
                    ))
                  : ""}
              </Tabs>

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
                        max: 16,
                        message: "Contact number should be maximum 16 digits.",
                      },
                    ]}
                  >
                    <PhoneInput
                      international
                      placeholder="Enter phone number"
                      countryCallingCodeEditable={true}
                      defaultCountry="SA"
                    />
                     <Input
                      type="number"
                      addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                      }}
                    /> 
                  </Form.Item>
                </Col> */}
                <Col span={12}>
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
                        min: 6,
                        message: "Contact number should be minimum 6 digits.",
                      },
                      {
                        max: 16,
                        message: "Contact number should be maximum 16 digits.",
                      },
                    ]}
                  >
                    <PhoneInput
                      international
                      placeholder="Enter phone number"
                      countryCallingCodeEditable={true}
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
              <Row gutter={30}></Row>

              {/* <h4 className="header_seprate">Salon Address</h4>
              <Row gutter={30}>
                <Col span={12}>
                    <Form.Item
                      label="District"
                      name="partnerDistrict"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your district!',
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
                          message: 'Please input your Region!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>   */}
              {/* </Row> */}
              <h4 className="header_seprate">Salon Address</h4>

              <Row gutter={30}>
                {getAppLanguageList.length > 0 ? (
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
                        <span style={{ fontSize: "16px", color: "#a1a1a1" }}>
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
                        className="custom-autocomplete"
                        apiKey={"AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro"}
                        onPlaceSelected={(place) => {
                          searchLocation(place, getAppLanguageList[0]["id"]);
                        }}
                        defaultValue={
                          saloonLanguange.length &&
                          defaultvendorAddress(
                            saloonLanguange,
                            getAppLanguageList[0]["id"]
                          )
                        }
                      />
                    </div>
                  </Col>
                ) : (
                  " "
                )}
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
                    <Select options={country} onChange={handleChange} />
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
                {/* <Col span={12}>
                  <Form.Item
                    name="area"
                    label="Area"
                    rules={[
                      {
                        required: true,
                        message: 'Area Select one!',
                      },
                    ]}
                  >
                    <Select options={area} onChange={handleAreaChange} />
                  </Form.Item>
                </Col> */}
              </Row>
              <h4 class="header_seprate">Saloon Map</h4>

              <Form.Item>
                {!show
                  ? lat &&
                    lng && (
                      <Mymap
                        latitude={latitude}
                        longitude={longitude}
                        getLatLng={getLatLng}
                      />
                    )
                  : ""}
              </Form.Item>

              <h4 class="header_seprate">Business Type</h4>

              <Row gutter={30}>
                <Col span={12}>
                  <Spin size="medium" spinning={categoryLoader}>
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[
                        { required: true, message: "Category is required!" },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        options={categoryOtpLst}
                        onChange={handleCategoryChange}
                      />
                    </Form.Item>
                  </Spin>
                </Col>
                {/* <Col span={12}>
                  <Form.Item
                    name="paymentoption"
                    label="Payment Options"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Should select Payment choice!")
                              ),
                      },
                    ]}
                    {...VendorForm}
                  >
                    <Checkbox.Group
                      options={paymentOptions}
                      value={paymentoption}
                      onChange={onChangePayment}
                    />
                  </Form.Item>
                </Col> */}
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

              <h4 class="header_seprate">Salon Images</h4>
              <Form.Item
                label={`${getLocaleMessages({
                  id: "vendor.image.label",
                })} `}
              >
                <ImageUploader
                  isSingleImage={false}
                  images={localImageList.length ? localImageList : []}
                  onDropImage={onDropImage}
                  isRemoved={true}
                  deleteImage={onDeleteImage}
                  image_url={defaultImage}
                  onDefaultImageChange={onDefaultImageChange}
                  imagesize={{ width: 100, height: 100 }}
                />
              </Form.Item>

              <h4 className="header_seprate">Available For</h4>
              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item
                    name="service_available"
                    label="Service For"
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
                    <Form.Item
                      name="teamSize"
                      label="Team Size"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please Select Your Team Size",
                      //   },
                      // ]}
                    >
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select Team Size"
                        optionFilterProp="children"
                        defaultValue={JSON.stringify(
                          teamsize === null ||
                            teamsize === undefined ||
                            teamsize === ""
                            ? 0
                            : teamsize
                        )}
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
              <h4 class="header_seprate">CR Information</h4>
              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item
                    name="crdocument"
                    label="Cr Document"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please Select Your Cr Document!",
                    //   },
                    // ]}
                  >
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
              <h4 class="header_seprate">VAT Information</h4>

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
                    <Form.Item label="VAT Number" name="vatnumber">
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
                    {
                      <Form.Item
                        name="commissiontype"
                        label="Commission"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Commission value!",
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
                    }
                  </Col> */}
                  <Col span={12}>
                    <Form.Item
                      label="VAT Document"
                      name="vatdocument"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please upload your VAT document",
                      //   },
                      // ]}
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
              {isaccepted == 0 && (
                <>
                  <h4 className="header_seprate">Approval Status</h4>
                  <Row gutter={30}>
                    <Col span={12}>
                      {/*  */}
                      {isstaffaccepted == 1 &&
                      isprofileaccepted == 1 &&
                      isserviceaccepted == 1 ? (
                        isaccepted == 0 ? (
                          <Select
                            defaultValue={`Pending`}
                            style={{ width: 120 }}
                            onChange={(value, event) =>
                              handleChangeApprovalvendor(value)
                            }
                          >
                            <Option value="1">Accept</Option>
                            <Option value="2">Reject</Option>
                          </Select>
                        ) : isaccepted == 1 ? (
                          <h6 className="right" style={{ fontSize: 18 }}>
                            Accepted
                          </h6>
                        ) : (
                          <h6 className="right" style={{ fontSize: 18 }}>
                            Rejected
                          </h6>
                        )
                      ) : (
                        <h6 className="right" style={{ fontSize: 18 }}>
                          Pending
                        </h6>
                      )}
                    </Col>
                  </Row>
                </>
              )}
              <h4 className="header_seprate">Saloon Status</h4>
              <Form.Item label="Saloon Status? ">
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
                  <Radio
                    name="status"
                    value={2}
                    onChange={() => setCurrentStatus(2)}
                  >
                    Deleted
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <div className="button-center">
                <Button type="primary" htmlType="submit" loading={postLoader}>
                  Save
                </Button>
                <Button htmlType="submit" onClick={backtopage}>
                  Back
                </Button>
              </div>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default Update;
