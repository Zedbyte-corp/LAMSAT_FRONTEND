import actions from './actions';

const initState = {
  vendorTimeslot: [],
  timeVisible:true,
  timeDetails:[]
};

export default function timeslotReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_VENDOR_TIME_LIST_RES:{
        return {
            ...state,
            timeDetails: action.payload && action.payload.length > 0 ? action.payload : [],
            timeVisible : false
        }
    }


    case actions.UPDATE_VENDOR_TIME_RES:{
        /*return {
            ...state,
            timeDetails: action.payload && action.payload.length > 0 ? action.payload : [],
            timeVisible : false
        }*/
    }


    default:
      return state;
  }
}
