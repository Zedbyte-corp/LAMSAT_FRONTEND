import actions from "./actions";

const initState = {
  bookingList: [],
  loading: false,
  booking: {},
  alertMake: false,
  vendorList: [],
  staffList: [],
  reportBookingList: [],
  reportBookingListVendor: [],
};

export default function bookingReducer(state = initState, action) {
  switch (action.type) {
    case actions.BOOKING_LIST_RESPONSE: {
      return {
        ...state,
        bookingList:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }
    case actions.GET_VENDOR_BOOKING_LIST_RES: {
      return {
        ...state,
        bookingList:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }

    case actions.BOOKING_RESPONSE: {
      return {
        ...state,
        booking: action.payload ? action.payload : {},
      };
    }
    case actions.CALL_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case actions.GET_BOOKING_LIST_REPORT_ADMIN_OUTPUT: {
      return {
        ...state,
        reportBookingList:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }
    case actions.GET_BOOKING_LIST_VENDOR_REPORT_RESPONSE: {
      return {
        ...state,
        reportBookingListVendor:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }

    case actions.UPDATE_VENDOR_BOOKING_STATUS_RES: {
      return {
        ...state,
        alertMake: true,
      };
    }

    case actions.UPDATE_VENDOR_PAYMENT_STATUS_RES: {
      return {
        ...state,
        alertMake: true,
      };
    }

    case actions.VENDOR_LIST_RESPONSE: {
      return {
        ...state,
        vendorList: action.payload,
      };
    }

    case actions.GET_STAFF_LIST_RESPONSE: {
      return {
        ...state,
        staffList: action.payload,
      };
    }

    default:
      return state;
  }
}
