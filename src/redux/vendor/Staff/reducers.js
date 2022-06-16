import actions from "./actions";

const initState = {
  staffList: [],
  loading: false,
  staff: {},
  getStaff: false,
  staff_redirect: false,
  staffCreated: false,
  staffTimeList: [],
  staffPopup: {},
  Staffshiftlist: [],
  Staffshiftfulllist: [],
  shiftloading: false,
  isupdatestaffSuccess:[],
  isdeletestaffSuccess:[]
  // reloadOption: 0,
};

export default function staffReducer(state = initState, action) {
  switch (action.type) {
    case actions.STAFF_LIST_RESPONSE: {
      return {
        ...state,
        staffList:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }

    case actions.STAFFTIME_LIST_RESPONSE: {
      return {
        ...state,
        staffTimeList:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }

    case actions.STAFF_RESPONSE: {
      return {
        ...state,
        staff:
          action.payload && action.payload.length > 0 ? action.payload : {},
      };
    }

    case actions.CALL_LOADER: {
      return {
        ...state,
        loading: !state.loading,
        // reloadOption: state.reloadOption + 1,
      };
    }

    case actions.CALL_STAFF_SUCESS: {
      return {
        ...state,
        staffCreated: true,
      };
    }
    case actions.CALL_STAFF_UPDATE_SUCESS: {
      return {
        ...state,
        staff_redirect: true,
        loading: false,
      };
    }

    case actions.LOAD_POPUP_SLOT: {
      return {
        ...state,
        staffPopup: action.payload,
        loading: false,
      };
    }
    case actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST: {
      return {
        ...state,
        shiftloading: true,
      };
    }   
    case actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST_SUCCESS: {
      return {
        ...state,
        Staffshiftfulllist: action.payload,
        Staffshiftlist: [],
        shiftloading: false,
      };
    }  
    case actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST_FAILURE: {
      return {
        ...state,
        shiftloading: false,
      };
    } 
    case actions.GET_ADMIN_STAFF_SHIFT_LIST: {
      return {
        ...state,
        shiftloading: true,
      };
    }   
    case actions.GET_ADMIN_STAFF_SHIFT_LIST_SUCCESS: {
      return {
        ...state,
        Staffshiftlist: action.payload,
        shiftloading: false,
      };
    }  
    case actions.GET_ADMIN_STAFF_SHIFT_LIST_FAILURE: {
      return {
        ...state,
        shiftloading: false,
        Staffshiftlist: [],
      };
    }   
    case actions.UPDATE_ADMIN_STAFF_SHIFT: {
      return {
        ...state,
        shiftloading: true,
      };
    }   
    case actions.UPDATE_ADMIN_STAFF_SHIFT_SUCCESS: {
      return {
        ...state,
        shiftloading: false,
        isupdatestaffSuccess: [{"update": "success","id":1}]
      };
    }  
    case actions.UPDATE_ADMIN_STAFF_SHIFT_FAILURE: {
      return {
        ...state,
        shiftloading: false,
        isupdatestaffSuccess: [{"update": "failure","id":1}]
      };
    }             
    case actions.DELETE_ADMIN_STAFF_SHIFT: {
      return {
        ...state,
        shiftloading: true,
      };
    }   
    case actions.DELETE_ADMIN_STAFF_SHIFT_SUCCESS: {
      return {
        ...state,
        shiftloading: false,
        isdeletestaffSuccess: [{"delete": "success","id":1}]
      };
    }  
    case actions.DELETE_ADMIN_STAFF_SHIFT_FAILURE: {
      return {
        ...state,
        shiftloading: false,
        isdeletestaffSuccess: [{"delete": "success","id":1}]
      };
    }  
    case actions.CREATE_ADMIN_STAFF_SHIFT: {
      return {
        ...state,
        shiftloading: true,
      };
    }   
    case actions.CREATE_ADMIN_STAFF_SHIFT_SUCCESS: {
      return {
        ...state,
        shiftloading: false,
      };
    }  
    case actions.CREATE_ADMIN_STAFF_SHIFT_FAILURE: {
      return {
        ...state,
        shiftloading: false,
      };
    }  

    default:
      return state;
  }
}
