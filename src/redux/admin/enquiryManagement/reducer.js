import actions from './actions';

const initState = {
  enquiryList: [],
  loading: false,
  enquiry:{},
};

export default function enquiryReducer(state = initState, action) {
  switch (action.type) {
    case actions.ENQUIRY_LIST_RESPONSE:{
        return {
            ...state,
            enquiryList: action.payload && action.payload.length > 0 ? action.payload : [],
        }
    }
    case actions.ENQUIRY_RESPONSE:{
      return {
          ...state,
          enquiry: action.payload ? action.payload : {},
      }
    }
    case actions.CALL_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      }
    }
    default:
      return state;
  }
}
