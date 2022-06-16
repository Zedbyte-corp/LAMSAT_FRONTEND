import { lowerCase } from "lodash";
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
  userBookingList: [],
  userRejectedBookingList: [],
  userFavList: [],
  initLoader: true,
  lastPath: "/",
  partnerData: {},
  dashboardCount: [],
  pending: "",
  booked: "",
  cancel: "",
  rejected: "",
  vendorDetails: [],
  partnerLoader: false,
  userSignupData: null,
  emailverified: false,
  emailLoader: false,
  emailVerificationDetail: "",
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_LAST_PATH: {
      return {
        ...state,
        lastPath: action.payload,
      };
    }
    case actions.CREATE_PARTNER_ACCOUNT_RESPONSE: {
      return {
        ...state,
        loader: false,
        partnerData: action.payload,
      };
    }
    case actions.CREATE_PARTNER_ACCOUNT_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.GET_USER_FAV_LIST_SUCCESS: {
      return {
        ...state,
        initLoader: false,
        userFavList: action.payload,
      };
    }
    case actions.GET_USER_FAV_LIST_FAILURE: {
      return {
        ...state,
        initLoader: false,
      };
    }
    case actions.GET_USER_BOOKING_LIST_SUCCESS: {
      return {
        ...state,
        initLoader: false,
        userBookingList: action.payload,
      };
    }

    case actions.GET_USER_BOOKING_LIST_FAILURE: {
      return {
        ...state,
        initLoader: false,
      };
    }
    case actions.AUTHENTICATE_USER: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.AUTHENTICATE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        isLoggedIn: true,
        validatingAuthToken: false,
        isurl: "/",
      };
    }
    case actions.AUTHENTICATE_USER_FAILURE: {
      return {
        ...state,
        loader: false,
        isLoggedIn: false,
        validatingAuthToken: false,
        email: null,
        companyId: null,
        userId: null,
        name: null,
      };
    }
    // case actions.LOGOUT_USER: {
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // }
    // case actions.LOGOUT_USER_FAILURE: {
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // }
    case actions.VALIDATE_AUTH_TOKEN: {
      return {
        ...state,
        validatingAuthToken: true,
      };
    }
    case actions.SEND_PASSWORD_RESET_LINK: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.SEND_PASSWORD_RESET_LINK_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.SEND_PASSWORD_RESET_LINK_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }
    // case actions.RESET_PASSWORD: {
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // }
    // case actions.RESET_PASSWORD_SUCCESS: {
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // }
    // case actions.RESET_PASSWORD_FAILURE: {
    //   return {
    //     ...state,
    //     loader: false,
    //   };
    // }
    // case actions.UPDATE_PROFILE_IMAGE_SUCCESS: {
    //   return {
    //     ...state,
    //     profileImageUrl: action.imageUrl,
    //     profileLoader: false,
    //   };
    // }
    // case actions.UPDATE_PROFILE_IMAGE: {
    //   return {
    //     ...state,
    //     profileLoader: true,
    //   };
    // }
    // case actions.UPDATE_PROFILE_IMAGE_FAILURE:
    //   return {
    //     ...state,
    //     profileLoader: false,
    //   }
    case actions.CHANGE_LANGUAGE: {
      return {
        ...state,
        subLang: action.payload,
      };
    }
    case actions.SET_SHOW_ADMIN_FORGOT: {
      return {
        ...state,
        isAdminForgot: action.payload,
      };
    }
    case actions.ADMIN_AUTHENTICATE_USER: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.ADMIN_AUTHENTICATE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        isLoggedIn: true,
        validatingAuthToken: false,
        isurl: "/admin",
        vendorLanguange: action.getLanguageDetails,
      };
    }
    case actions.VENDOR_AUTHENTICATE_USER: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.ADMIN_AUTHENTICATE_USER_FAILURE: {
      return {
        ...state,
        loader: false,
        isLoggedIn: false,
        validatingAuthToken: false,
        isurl: "/user",
      };
    }
    case actions.VENDOR_AUTHENTICATE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        isLoggedIn: true,
        validatingAuthToken: false,
        isurl: "/vendor",
        vendorLanguange: action.getLanguageDetails,
      };
    }
    case actions.VENDOR_AUTHENTICATE_USER_FAILURE: {
      return {
        ...state,
        loader: false,
        isLoggedIn: false,
        validatingAuthToken: false,
        isurl: "/user",
      };
    }
    case actions.ADMIN_SEND_PASSWORD_RESET_LINK: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.ADMIN_SEND_PASSWORD_RESET_LINK_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.ADMIN_SEND_PASSWORD_RESET_LINK_SUCCESS: {
      return {
        ...state,
        loader: false,
        isAdminForgot: false,
      };
    }
    case actions.VENDOR_SEND_PASSWORD_RESET_LINK: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.VENDOR_SEND_PASSWORD_RESET_LINK_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.VENDOR_SEND_PASSWORD_RESET_LINK_SUCCESS: {
      return {
        ...state,
        loader: false,
        isAdminForgot: false,
      };
    }
    case actions.LOGOUT_USER: {
      return {
        ...state,
        loader: true,
      };
    }

    case actions.LOGOUT_USER_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.ADMIN_EDIT_PROFILE: {
      return {
        ...state,
        profileLoader: true,
      };
    }

    case actions.ADMIN_EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        profileLoader: false,
      };
    }

    case actions.ADMIN_EDIT_PROFILE_FAILURE: {
      return {
        ...state,
        profileLoader: false,
      };
    }
    case actions.ADMIN_CHANGE_PASSWORD: {
      return {
        ...state,
        passwordLoader: true,
      };
    }

    case actions.ADMIN_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordLoader: false,
      };
    }

    case actions.ADMIN_CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        passwordLoader: false,
      };
    }

    case actions.AUTH_SINGUP_SUCCESS: {
      return {
        ...state,
        auth_signup_success: true,
      };
    }

    case actions.AUTH_REMOVE_OTP: {
      return {
        ...state,
        auth_signup_success: false,
      };
    }

    case actions.CREATE_AUTHENTICATE_USER: {
      return {
        ...state,
        loader: true,
        isOtp: false,
      };
    }

    case actions.CREATE_AUTHENTICATE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        isOtp: true,
        userSignupData: action.payload,
      };
    }

    case actions.CREATE_AUTHENTICATE_USER_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }

    case actions.VERIFY_OTP: {
      return {
        ...state,
        loader: true,
      };
    }

    case actions.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loader: false,
        isOtp: false,
        isemail: "",
        userSignupData: null,
      };
    }

    case actions.VERIFY_OTP_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }

    case actions.RESEND_OTP: {
      return {
        ...state,
        loader: true,
        isOtp: true,
      };
    }

    case actions.RESEND_OTP_SUCCESS: {
      console.log("action.payload:: " + JSON.stringify(action));
      return {
        ...state,
        loader: false,
        isOtp: true,
        isemail: "",
        userSignupData: action.payload,
      };
    }

    case actions.RESEND_OTP_FAILURE: {
      return {
        ...state,
        loader: false,
        isOtp: false,
      };
    }

    case actions.SET_VENDOR_LANGUAGE_DETAILS: {
      let newVendorLanguage = state.vendorLanguange;
      newVendorLanguage.map((vendorLanguageList) => {
        if (vendorLanguageList["languageid"] === action.payload["languageid"]) {
          vendorLanguageList[`${action.payload.key}`] = action.payload.value;
          return vendorLanguageList;
        }
        return vendorLanguageList;
      });
      return {
        ...state,
        vendorLanguange: newVendorLanguage,
      };
    }

    case actions.VENDOR_EDIT_PROFILE: {
      return {
        ...state,
        vendorProfileLoader: true,
        isVendorProfile: false,
      };
    }

    case actions.VENDOR_EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        vendorProfileLoader: false,
        isVendorProfile: true,
      };
    }

    case actions.VENDOR_EDIT_PROFILE_FAILURE: {
      return {
        ...state,
        vendorProfileLoader: false,
        isVendorProfile: false,
      };
    }

    case actions.VENDOR_EDIT_PROFILE_STATUS: {
      return {
        ...state,
        isVendorProfile: action.payload,
      };
    }
    case actions.GET_APP_LANGUAGE_LIST: {
      return {
        ...state,
        languageLoader: true,
      };
    }
    case actions.GET_APP_LANGUAGE_LIST_SUCCESS: {
      const selectedLanguageNew = action.payload.filter(
        (list) =>
          list["languagename"].toLowerCase() ===
          localStorage.getItem("site_language_full").toLowerCase()
      );

      return {
        ...state,
        getAppLanguageList: action.payload,
        selectedLanguage: selectedLanguageNew[0],
        languageLoader: false,
      };
    }
    case actions.GET_APP_LANGUAGE_LIST_FAILURE: {
      return {
        ...state,
        languageLoader: false,
      };
    }

    case actions.GET_USER_BOOKING_LISTCOUNT_SUCCESS: {
      return {
        ...state,
        dashboardCount: action.payload,
        pending: action.payload.Pending,
        booked: action.payload.Booked,
        cancel: action.payload.Cancel,
        rejected: action.payload.Rejected,
      };
    }

    case actions.SET_SELECTED_LANGUAGE: {
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    }

    case actions.GET_VENDORDETAIL_SUCCESS: {
      return {
        ...state,
        vendorDetails: action.payload,
      };
    }

    case actions.VALIDATE_PARTNER_EMAIL: {
      return {
        ...state,
        partnerLoader: true,
      };
    }
    case actions.VALIDATE_PARTNER_EMAIL_SUCCESS: {
      return {
        ...state,
        partnerLoader: false,
      };
    }
    case actions.VALIDATE_PARTNER_EMAIL_FAILURE: {
      return {
        ...state,
        partnerLoader: false,
      };
    }

    case actions.CREATE_PARTNER_ACCOUNT: {
      return {
        ...state,
        partnerLoader: true,
      };
    }
    case actions.CREATE_PARTNER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        partnerLoader: false,
      };
    }
    case actions.CREATE_PARTNER_ACCOUNT_FAILURE: {
      return {
        ...state,
        partnerLoader: false,
      };
    }

    case actions.VERIFY_EMAIL: {
      return {
        ...state,
        emailLoader: true,
      };
    }

    case actions.VERIFY_EMAIL_SUCCESS: {
      return {
        ...state,
        emailLoader: false,
        emailverified: true,
        emailVerificationDetail: action.payload,
      };
    }

    case actions.VERIFY_EMAIL_FAILURE: {
      return {
        ...state,
        emailLoader: false,
      };
    }

    case actions.RESET_FORGOT_PASSWORD: {
      return {
        ...state,
        emailLoader: true
      }
    }

    case actions.RESET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        emailLoader: false
      }
    }

    case actions.RESET_FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        emailLoader: false
      }
    }
    default:
      return state;
  }
}
