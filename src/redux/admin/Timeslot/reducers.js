import actions from './actions';

const initState = {
  vendorTimeslot: [],
  timeVisible:false,
  vendorVisible:true,
  vendorDetails:[],
  timeDetails:[],
  timeLoader: false,
  updateloader: false
};

export default function timeslotReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ADMIN_TIME_LIST_RES:{
        return {
            ...state,
            timeDetails: action.payload && action.payload.length > 0 ? action.payload : [],
            timeVisible : false,
            timeLoader : false,
            updateloader: false
        }
    }
    case actions.GET_ADMIN_TIME_LIST:{
      return {
          ...state,
          timeLoader : true
      }
  }
  case actions.GET_ADMIN_TIME_LIST_FAILURE:{
    return {
        ...state,
        timeLoader : false
    }
}


    case actions.GET_ADMIN_VENDOR_LIST_RES:{
        return {
            ...state,
            vendorDetails: action.payload && action.payload.length > 0 ? action.payload : [],
            timeVisible : true,
            vendorVisible : false
        }
    }
    case actions.UPDATE_ADMIN_TIME:{
      return {
          ...state,
          updateloader: true
      }
    }
    case actions.UPDATE_ADMIN_TIME_FAILURE:{
      return {
          ...state,
          updateloader: false
      }
    }    

    default:
      return state;
  }
}
