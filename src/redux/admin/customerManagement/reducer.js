import actions from './actions';

const initState = {
  customerList: [],
  loading: false,
  customer:{},
};

export default function customerReducer(state = initState, action) {
  switch (action.type) {
    case actions.CUSTOMER_LIST_RESPONSE:{
        return {
            ...state,
            customerList: action.payload && action.payload.length > 0 ? action.payload : [],
        }
    }
    case actions.CUSTOMER_RESPONSE:{
      return {
          ...state,
          customer: action.payload ? action.payload : {},
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
