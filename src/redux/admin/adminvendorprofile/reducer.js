import actions from "./actions";

const initState = {
  isLoggedIn: false,
  validatingAuthToken: false,
  loader: false,
  lang: "en",
  subLang: "en",
  isAdminForgot: false,
  isurl: "/user",
  profileLoader: false,
  passwordLoader: false,
  isOtp: false,
  isemail: null,
  vendorLanguange: [],
  vendorProfileLoader: false,
  isVendorProfile: false,
  getAppLanguageList: [],
  selectedLanguage: {},
  languageLoader: false,
  vendorName: [],
  vendorAddress: [],
  vendorDescription: [],
  imageUploadLoader: false,
  saloonLanguange: [],
  lat: 0,
  lng: 0,
  selectedPlace: "",
  activeMarker: {},
  showingInfoWindow: false,
  isvendorDetails: true,
  vendorDetails: [],
  SalonvendorDetails: [],
  firstname: "",
  lastname: "",
  username: "",
  isfeatured: "",
  countryid: "",
  cityid: "",
  areaid: "",

  commissiontype: "",
  contactnumber: "",
  sortorder: "",
  vat: "",
  image_url: "",
  status: "",
  categoryid: [],
  redirect: false,
  countryList: [],
  cityList: [],
  areaList: [],
  categoryList: [],
  isvendorDetailsmap: true,
  photopath: "",
  mapCount: 0,
  isvendorLoad: false,
  prefix: "",
  loading: false,
  paymentoption: [],
  images: [],
  vatnumber: "",
  gender: [],
  bankaccountnumber: "",
  bankname: "",
  bankiban: "",
  service_available: "",
  saloonemail: "",
  saloonphone: "",
  ISvat: "",
  isaccepted: "",
  isverifiedemail: "",
  isotpverified: "",
  loadingdeletevendor: false,
  isotpsuccess: "",
  notificationData: [],
  vendornotificationData: [],
  notificationloader: false,
  clearnotificationloader: false,
};

export default function AdminVendorProfileReducer(state = initState, action) {
  switch (action.type) {
    case actions.CREATE_VENDOR_PROFILE_SUCCESS: {
      return {
        ...state,
        loader: true,
        redirect: true,
      };
    }

    case actions.CREATE_VENDOR_PROFILE: {
      return {
        ...state,
        loader: true,
      };
    }

    case actions.UPLOAD_IMAGE: {
      return {
        ...state,
        imageUploadLoader: true,
      };
    }
    case actions.UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        imageUploadLoader: false,
      };
    }
    case actions.UPLOAD_IMAGE_FAILURE: {
      return {
        ...state,
        imageUploadLoader: false,
      };
    }

    case actions.SET_SALOON_LANGUAGE_DETAILS: {
      let newSaloonLanguage = state.saloonLanguange;
      newSaloonLanguage.map((saloonLanguageList) => {
        if (saloonLanguageList["id"] === action.payload["languageid"]) {
          saloonLanguageList[`${action.payload.key}`] = action.payload.value;
          return saloonLanguageList;
        }
        return saloonLanguageList;
      });
      return {
        ...state,
        saloonLanguange: newSaloonLanguage,
      };
    }

    case actions.ASSIGN_SALOON_LANGUAGE: {
      return {
        ...state,
        saloonLanguange: action.payload,
      };
    }
    case actions.VENDOR_PROFILE_SUCCESS: {
      console.log("action.payload: " + JSON.stringify(action.payload));

      let newSaloonLanguage = state.saloonLanguange;
      var i = 0;
      if (action.payload.length > 0) {
        if (action.payload[0].language.length > 0) {
          action.payload[0].language.map((x) => {
            newSaloonLanguage.map((saloonLanguageList) => {
              if (x.languageid == saloonLanguageList.id) {
                saloonLanguageList["vendorname"] = x.vendorname;
                saloonLanguageList["vendoraddress"] = x.vendoraddress;
                saloonLanguageList["vendordescription"] = x.vendordescription;
              } else {
                saloonLanguageList["texts"] = saloonLanguageList.id;
              }
              return saloonLanguageList;
            });
          });
        }
      }
      console.log("action.payload: 1");

      var str = action.payload[0].categoryid;
      var evalData = [];
      console.log("action.payload: 2.1: " + str);
      evalData =
        action.payload.length > 0 && str !== null ? str.split(",") : "";
      console.log("action.payload: 2.2");
      //var cnt =  parent.list.split(",");
      var childData = [];
      var tempCnt = 0;

      console.log("action.payload: 2.3");
      var x =
        evalData.length > 0
          ? evalData.map((c1, i) => {
              var y = childData.push(parseInt(c1)) ? tempCnt++ : "";
            })
          : "";

      console.log("action.payload: 3");

      console.log(
        "action.payload: " + action.payload.length > 0
          ? action.payload[0].firstname
          : "----------"
      );
      return {
        ...state,
        saloonLanguange: newSaloonLanguage,
        firstname: action.payload.length > 0 ? action.payload[0].firstname : "",
        lastname: action.payload.length > 0 ? action.payload[0].lastname : "",
        username: action.payload.length > 0 ? action.payload[0].username : "",
        email: action.payload.length > 0 ? action.payload[0].email : "",
        isfeatured:
          action.payload.length > 0 ? action.payload[0].isfeatured : "",
        lat: action.payload.length > 0 ? action.payload[0].latitude : "",
        lng: action.payload.length > 0 ? action.payload[0].longitude : "",
        countryid: action.payload.length > 0 ? action.payload[0].countryid : "",
        cityid: action.payload.length > 0 ? action.payload[0].cityid : "",
        areaid: action.payload.length > 0 ? action.payload[0].areaid : "",
        commissiontype:
          action.payload.length > 0 ? action.payload[0].commissiontype : "",
        contactnumber:
          action.payload.length > 0 ? action.payload[0].contactnumber : "",
        sortorder: action.payload.length > 0 ? action.payload[0].sortorder : "",
        vat: action.payload.length > 0 ? action.payload[0].vat : "",
        image_url: action.payload.length > 0 ? action.payload[0].image_url : "",
        images: action.payload.length > 0 ? action.payload[0].images : "",
        status: action.payload.length > 0 ? action.payload[0].status : "",
        categoryid: action.payload.length > 0 ? childData : "",
        photopath: action.payload.length > 0 ? action.payload[0].photopath : "",
        prefix: action.payload.length > 0 ? action.payload[0].prefix : "",
        isvendorLoad: true,
        paymentoption:
          action.payload.length > 0 ? action.payload[0].paymentoption : "",
        gender: action.payload.length > 0 ? action.payload[0].gender : "",
        vatnumber: action.payload.length > 0 ? action.payload[0].vatnumber : "",
        bankaccountnumber:
          action.payload.length > 0 ? action.payload[0].bankaccountnumber : "",
        bankname: action.payload.length > 0 ? action.payload[0].bankname : "",
        bankiban: action.payload.length > 0 ? action.payload[0].bankiban : "",
        service_available:
          action.payload.length > 0
            ? action.payload[0].service_available == "3"
              ? ["1", "2"]
              : action.payload[0].service_available
            : "",
        partnerDistrict:
          action.payload.length > 0 ? action.payload[0].partnerDistrict : "",
        partnerRegion:
          action.payload.length > 0 ? action.payload[0].partnerRegion : "",
        partnerPostcode:
          action.payload.length > 0 ? action.payload[0].partnerPostcode : "",
        teamsize: action.payload.length > 0 ? action.payload[0].teamsize : "",
        hearAboutFresha:
          action.payload.length > 0 ? action.payload[0].hearAboutFresha : "",
        vatdocument_url:
          action.payload.length > 0 ? action.payload[0].vatdocument_url : "",
        crdocument_url:
          action.payload.length > 0 ? action.payload[0].crdocument_url : "",
        bankdocument_url:
          action.payload.length > 0 ? action.payload[0].bankdocument_url : "",
        saloonphone:
          action.payload.length > 0 ? action.payload[0].saloonphone : "",
        saloonemail:
          action.payload.length > 0 ? action.payload[0].saloonemail : "",
        ISvat: action.payload.length > 0 ? action.payload[0].vatpercent : "",
        isprofileaccepted:
          action.payload.length > 0 ? action.payload[0].isprofileaccepted : "",
        isstaffaccepted:
          action.payload.length > 0 ? action.payload[0].isstaffaccepted : "",
        isserviceaccepted:
          action.payload.length > 0 ? action.payload[0].isserviceaccepted : "",
        isaccepted:
          action.payload.length > 0 ? action.payload[0].isaccepted : "",

        isverifiedemail:
          action.payload.length > 0 ? action.payload[0].isverifiedemail : "",
        isotpverified:
          action.payload.length > 0 ? action.payload[0].isotpverified : "",
      };
    }

    case actions.GET_ALL_VENDOR_RESPONSE: {
      return {
        ...state,
        vendorDetails: action.payload.data,
        isvendorDetails: false,
        loading: true,
        loadingdeletevendor: false,
      };
    }
    case actions.GET_ALL_VENDOR_RESPONSE_NEW: {
      return {
        ...state,
        SalonvendorDetails: action.payload.data,
        isvendorDetails: false,
        loading: true,
        loadingdeletevendor: false,
      };
    }
    case actions.VENDOR_DELETE: {
      return {
        ...state,
        loadingdeletevendor: true,
      };
    }
    case actions.VENDOR_DELETE_FAILURE: {
      return {
        ...state,
        loadingdeletevendor: false,
      };
    }

    case actions.UPDATE_VENDOR_PROFILE_SUCCESS: {
      return {
        ...state,
        redirect: true,
      };
    }

    case actions.UPDATE_VENDOR_PROFILE_FAILURE: {
      return {
        ...state,
        redirect: true,
      };
    }

    case actions.COUNTRY_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.COUNTRY_LIST_SUCCESS: {
      return {
        ...state,
        countryList: action.payload,
        isvendorDetails: false,
        loading: false,
      };
    }

    case actions.CITY_LIST_SUCCESS: {
      return {
        ...state,
        cityList: action.payload,
      };
    }

    case actions.AREA_LIST_SUCCESS: {
      return {
        ...state,
        areaList: action.payload,
      };
    }

    case actions.CATEGORY_LIST_SUCCESS: {
      return {
        ...state,
        categoryList: action.payload,
      };
    }

    case actions.MAP: {
      return {
        ...state,
        isvendorDetailsmap: true,
        mapCount: action.val,

        lat: action.lat,
        lng: action.lng,
      };
    }

    case actions.MAP_FALSE: {
      return {
        ...state,
        //isvendorDetailsmap:action.value
        lat: action.lat,
        lng: action.lng,
      };
    }

    case actions.MAP_COUNT_UPDATE: {
      return {
        ...state,
        mapCount: 0,
      };
    }

    case actions.SAVE_SALOON: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.PAYMENT_UPDATE: {
      return {
        ...state,
        loading: false,
        paymentoption: action.val,
      };
    }

    case actions.GENDER_UPDATE: {
      return {
        ...state,
        loading: false,
        service_available: action.val,
      };
    }
    case actions.EMAIL_VERIFIED: {
      return {
        ...state,
        loading: false,
        isverifiedemail: action.val,
      };
    }
    case actions.EMAIL_VERIFIED_SUCCESS: {
      return {
        ...state,
        loading: false,
        isverifiedemail: action.val,
      };
    }
    case actions.EMAIL_VERIFIED_FAILURE: {
      return {
        ...state,
        loading: false,
        isverifiedemail: action.val,
      };
    }
    case actions.OTP_VERIFIED: {
      return {
        ...state,
        loading: true,
        isotpverified: action.val,
      };
    }
    case actions.OTP_VERIFIED_SUCCESS: {
      return {
        ...state,
        loading: false,
        isotpsuccess: action.payload,
      };
    }
    case actions.OTP_VERIFIED_FAILURE: {
      return {
        ...state,
        loading: false,

        // isotpsuccess: action.payload,
        // isotpverified: action.val,
      };
    }
    case actions.PATNER_VERIFY_OTP: {
      return {
        ...state,
        loading: false,
        isotpverified: action.val,
        // isotpsuccess: action.payload,
        // isotpverified: action.val,
      };
    }
    case actions.PATNER_VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loading: true,
        isotpverified: action.payload,
        // isotpsuccess: action.payload,
        // isotpverified: action.val,
      };
    }
    case actions.PATNER_VERIFY_OTP_FAILURE: {
      return {
        ...state,
        loading: false,
        //isotpverified: action.val,
        // isotpsuccess: action.payload,
        // isotpverified: action.val,
      };
    }

    case actions.GET_ALL_NOTIFICATION: {
      return {
        ...state,
        notificationloader: true,
      };
    }

    case actions.GET_ALL_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notificationloader: false,
        notificationData: action.payload,
      };
    }

    case actions.GET_ALL_NOTIFICATION_FAILURE: {
      return {
        ...state,
        notificationloader: false,
      };
    }

    case actions.CLEAR_ALL_NOTIFICATION: {
      return {
        ...state,
        clearnotificationloader: true,
      };
    }

    case actions.CLEAR_ALL_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        clearnotificationloader: false,
      };
    }

    case actions.CLEAR_ALL_NOTIFICATION_FAILURE: {
      return {
        ...state,
        clearnotificationloader: false,
      };
    }

    case actions.VENDOR_PASSWORD_CHANGE: {
      return {
        ...state,
        loader: true,
      };
    }

    case actions.VENDOR_PASSWORD_CHANGE_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.VENDOR_PASSWORD_CHANGE_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }

    default:
      return state;
  }
}
