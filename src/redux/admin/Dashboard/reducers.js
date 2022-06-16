import actions from "./actions";
import ObjectAssign from "object-assign";

const initialState = {
  initLoader: true,
  countList: [],
  yearcount: [],
  totalCount: [],
  Completed: [],
  Pending: [],
  Rejected: [],
  Success: [],
  Vendors: [],
  Users: [],
  Bookings: [],
  turnover: 0,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_VENDOR_DASHBOARD_COUNT: {
      return {
        ...state,
        initLoader: true,
      };
    }    
    case actions.GET_DASHBOARD_COUNT_SUCCESS: {
      return {
        ...state,
        initLoader: false,
        countList: action.payload[0],
        totalCount: action.payload[1],
        Success: action.payload[2],
        Rejected: action.payload[4],//action.payload[3]
        Pending: action.payload[3],//action.payload[4]
        Completed: action.payload[5],
        turnover: action.payload[6],
        Vendors: action.payload[6],
        Users: action.payload[7],
        Bookings: action.payload[8]
      };
    }

    case actions.GET_DASHBOARD_COUNT_FAIL: {
      return {
        ...state,
        initLoader: false,
      };
    }

    default:
      break;
  }

  return state;
};

export default reducer;
