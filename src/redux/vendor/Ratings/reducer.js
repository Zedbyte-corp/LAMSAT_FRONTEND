import actions from './actions';

const initState = {
  ratingList: [],
  ratingLoader: false,
  totalRating: 0,
  currentPage: 1,
  pageSize: 10,
  ratingFilter: {},
};

export default function adminRatingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_VENDOR_RATING_LIST: {
      return {
        ...state,
        ratingLoader: true,
      };
    }
    case actions.GET_VENDOR_RATING_LIST_SUCCESS: {
        return {
          ...state,
          ratingLoader: false,
          ratingList: action.payload,
          //totalRating: action.payload.total
        };
    }
    case actions.GET_VENDOR_RATING_LIST_FAILURE: {
        return {
          ...state,
          ratingLoader: false,
        };
    }
    case actions.SET_VENDOR_RATING_CURRENT_PAGE:{
        return{
            ...state,
            currentPage: action.payload,
        }
    }
    case actions.SET_VENDOR_RATING_PAGE_SIZE:{
        return{
            ...state,
            pageSize: action.payload,
        }
    }
    case actions.SET_VENDOR_RATING_FILTERS:{
        return{
            ...state,
            ratingFilter: {...state.ratingFilter , ...action.payload},
        }
    }
    default:
      return state;
  }
}
