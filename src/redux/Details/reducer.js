import actions from "./actions";

const initState = {
  detailPageLoader: false,
  saloonDetail: {},
  detailServices: [],
  detailCategory: [],
  setCategoryAndServices: [],
  servicesLoader: false,
  categoryLoader: false,
  categoryServicesLoader: false,
  staffLoader: false,
  staffDetail: [],
  serviceStaffDetail: [],
  categorysaloonDetail: [],
  showMap: false,
  cmsDetail: "",
  raterMark: 0,
  raterName: "",
  raterComments: "",
  voucherValidationRes: {},
  bookingDetails: {},
  checkoutBookingDetails: {},
  SID: [],
  saloonDatesPageLoader: false,
  saloonDates: [],
  ratingbyvendorData: [],
  salonstaffslotdata: [],
  salonstaffslotloader: false,
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.SHOW_MAP: {
      return {
        ...state,
        showMap: !state.showMap,
      };
    }
    case actions.VALIDATE_VOUCHER_RESPONSE: {
      return {
        ...state,
        voucherValidationRes: action.payload,
      };
    }
    case actions.GET_SALOON_DETAILS: {
      return {
        ...state,
        detailPageLoader: true,
      };
    }
    case actions.GET_SALOON_DETAILS_SUCCESS: {
      return {
        ...state,
        detailPageLoader: false,
        saloonDetail: action.payload,
      };
    }
    case actions.GET_SALOON_DETAILS_FAILURE: {
      return {
        ...state,
        detailPageLoader: false,
      };
    }
    case actions.SET_NEW_CATEGORY_SERVICE_DATA: {
      return {
        ...state,
        setCategoryAndServices: action.payload,
      };
    }
    case actions.GET_SALOON_CATEGORY: {
      return {
        ...state,
        categoryLoader: true,
      };
    }
    case actions.GET_SALOON_CATEGORY_SUCCESS: {
      return {
        ...state,
        detailCategory: action.payload,
        categoryLoader: false,
      };
    }
    case actions.GET_SALOON_CATEGORY_FAILURE: {
      return {
        ...state,
        categoryLoader: false,
      };
    }
    case actions.GET_SALOON_SERVICES: {
      return {
        ...state,
        servicesLoader: true,
      };
    }
    case actions.GET_SALOON_SERVICES_SUCCESS: {
      return {
        ...state,
        detailServices: action.payload,
        servicesLoader: false,
      };
    }
    case actions.GET_SALOON_SERVICES_FAILURE: {
      return {
        ...state,
        servicesLoader: false,
      };
    }
    case actions.SET_NEW_CATEGORY_SERVICE_LOADER: {
      return {
        ...state,
        categoryServicesLoader: action.payload,
      };
    }
    case actions.GET_SALOON_STAFF_DETAILS: {
      return {
        ...state,
        staffLoader: true,
      };
    }
    case actions.GET_SALOON_STAFF_DETAILS_SUCCESS: {
      return {
        ...state,
        staffLoader: false,
        staffDetail: action.payload,
      };
    }
    case actions.GET_SALOON_STAFF_DETAILS_FAILURE: {
      return {
        ...state,
        staffLoader: false,
      };
    }

    case actions.GET_SERVICE_STAFF_DETAILS: {
      return {
        ...state,
        staffLoader: true,
      };
    }
    case actions.SET_SID: {
      return {
        ...state,
        SID: state.SID.concat(action.payload),
      };
    }
    case actions.GET_SERVICE_STAFF_DETAILS_SUCCESS: {
      return {
        ...state,
        staffLoader: false,
        //serviceStaffDetail: state.serviceStaffDetail.concat(action.payload),
        serviceStaffDetail: action.payload,
      };
    }
    case actions.GET_SERVICE_STAFF_DETAILS_FAILURE: {
      return {
        ...state,
        staffLoader: false,
      };
    }

    case actions.GET_CATEGORY_SALOON_DETAILS_SUCCESS: {
      return {
        ...state,
        detailPageLoader: false,
        categorysaloonDetail: action.payload,
        listingSaloonData: [],
      };
    }

    case actions.GET_CMS_DETAILS_RESPONSE: {
      return {
        ...state,
        cmsDetail: action.payload[0].language,
      };
    }

    case actions.GET_FAQ_DETAILS_RES: {
      return {
        ...state,
        faqDetail: action.payload,
      };
    }

    case actions.GET_FAQ_DETAILS_FAILURE: {
      return {
        ...state,
        detailPageLoader: false,
        faqDetail: {},
      };
    }

    case actions.GET_FAQ_DETAILS_COMMON_RES: {
      return {
        ...state,
        faqDetail: action.payload,
      };
    }

    case actions.GET_FAQ_DETAILS_COMMON_FAILURE: {
      return {
        ...state,
        detailPageLoader: false,
        faqDetail: {},
      };
    }

    case actions.RATING_DATA_COMMENT: {
      return {
        ...state,
        raterComments: action.value,
      };
    }

    case actions.RATING_DATA_NAME: {
      return {
        ...state,
        raterName: action.value,
      };
    }

    case actions.RATING_DATA_MARK: {
      return {
        ...state,
        raterMark: action.val,
      };
    }

    case actions.RATING_SUCCESS_RES: {
      return {
        ...state,
        raterMark: 1,
        raterName: "",
        raterComments: "",
        ratePopup: false,
      };
    }

    case actions.RATING_RESET: {
      return {
        ...state,
        raterMark: 1,
        raterName: "",
        raterComments: "",
      };
    }

    case actions.GET_BOOKING_DETAILS_SUCCESS: {
      return {
        ...state,
        detailPageLoader: false,
        bookingDetails: action.payload,
      };
    }

    case actions.SET_SALOON_BOOKING_SUCCESS: {
      return {
        ...state,
        detailPageLoader: false,
        checkoutBookingDetails: action.payload,
      };
    }

    case actions.SET_SALOON_BOOKING_FAILURE: {
      return {
        ...state,
        detailPageLoader: false,
        checkoutBookingDetails: {},
      };
    }

    case actions.GET_BOOKING_DETAILS_FAILURE: {
      return {
        ...state,
        detailPageLoader: false,
        bookingDetails: {},
      };
    }

    case actions.GET_SALOON_DETAILS_DATES: {
      return {
        ...state,
        saloonDatesPageLoader: true,
      };
    }
    case actions.GET_SALOON_DETAILS_DATES_SUCCESS: {
      console.log("saloonDates 22: " + JSON.stringify(action.payload));

      return {
        ...state,
        saloonDatesPageLoader: false,
        saloonDates: action.payload,
      };
    }
    case actions.GET_SALOON_DETAILS_DATES_FAILURE: {
      return {
        ...state,
        saloonDatesPageLoader: false,
      };
    }

    case actions.GET_SALOON_FAVOURITE_DETAILS: {
      let wordsa = state.saloonDates;
      //const favOut = wordsa.filter(word => word.id == action.payload);

      if (wordsa.favourite == 1) {
        wordsa.favourite = 0;
      } else {
        wordsa.favourite = 1;
      }

      return {
        ...state,

        saloonDetail: wordsa,
      };
    }

    case actions.GET_RATING_BY_VENDORID: {
      return {
        ...state,
        detailPageLoader: true,
      };
    }
    case actions.GET_RATING_BY_VENDORID_SUCCESS: {
      return {
        ...state,
        detailPageLoader: false,
        ratingbyvendorData: action.payload,
      };
    }
    case actions.GET_RATING_BY_VENDORID_FAILURE: {
      return {
        ...state,
        detailPageLoader: false,
      };
    }

    case actions.GET_SALON_STAFF_TIME_SLOT: {
      return {
        ...state,
        salonstaffslotloader: true,
      };
    }

    case actions.GET_SALON_STAFF_TIME_SLOT_SUCCESS: {
      return {
        ...state,
        salonstaffslotloader: false,
        salonstaffslotdata: action.payload,
      };
    }
    case actions.GET_SALON_STAFF_TIME_SLOT_FAILURE: {
      return {
        ...state,
        salonstaffslotloader: false,
      };
    }

    default:
      return state;
  }
}
