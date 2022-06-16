import actions from './actions';

const initState = {
  partnersList: [],
  loading: false,
  cityList : [],
  partners:{},
};

export default function partnersReducer(state = initState, action) {
  switch (action.type) {
    case actions.PARTNERS_LIST_RESPONSE:{
        return {
            ...state,
            partnersList: action.payload && action.payload.length > 0 ? action.payload : [],
        }
    }
    case actions.PARTNERS_RESPONSE:{
      return {
          ...state,
          partners: action.payload ? action.payload : {},
      }
    }
    case actions.CALL_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      }
    }


    case actions.GET_ALL_CITY_LIST_SUCCESS_PARTNERS : {
      return {
        ...state,
        loader:false,
        cityList: action.payload,
      };
    }
    default:
      return state;
  }
}
