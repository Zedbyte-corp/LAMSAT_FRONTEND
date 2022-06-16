import actions from './actions';

const initState = {
    categoryLoader: false,
    categoryData: [],
    saloonLoader: false,
    saloonData: [],
    topRatingLoader: false,
    topRatingData: [],
    social_media:{
        facebook: "",
        twitter: "",
        instagram: "",
        google_plus: ""
    },
    social_status: true,
    cmsList:'',
    appConfig:'',
    isName: false
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_LAYOUT_CATEGORIES: {
      return {
        ...state,
        categoryLoader: true,
      };
    }
    case actions.GET_LAYOUT_CATEGORIES_SUCCESS: {
        return {
          ...state,
          categoryLoader: false,
          categoryData: action.payload,
        };
    }
    case actions.GET_LAYOUT_CATEGORIES_FAILURE: {
        return {
            ...state,
            categoryLoader: false,
        };
    }
    case actions.GET_LAYOUT_SALOON: {
        return {
          ...state,
          saloonLoader: true,
        };
    }
    case actions.GET_LAYOUT_SALOON_SUCCESS: {
        return {
            ...state,
            saloonLoader: false,
            saloonData: action.payload
        };
    }
    case actions.GET_LAYOUT_SALOON_FAILURE: {
        return {
            ...state,
            saloonLoader: false,
        };
    }
    case actions.GET_LAYOUT_TOP_RATING: {
        return {
            ...state,
            topRatingLoader: true,
        };
    }
    case actions.GET_LAYOUT_TOP_RATING_SUCCESS: {
        return {
            ...state,
            topRatingLoader: false,
            topRatingData: action.payload
        };
    }
    case actions.GET_LAYOUT_TOP_RATING_FAILURE: {
        return {
            ...state,
            topRatingLoader: false,
        };
    }
    case actions.GET_SALOON_BY_NAME_SUCCESS: {
        return {
            ...state,
            saloonNameList: action.payload,
            isName: true,
        };
    }

    case actions.GET_SALOON_BY_NAME_FAILURE: {
        return {
          ...state,
          saloonNameList:[],
        }
    }

    case actions.GET_SOCIAL_DETAILS_RES: {

        return {
            ...state,
            appConfig: action.payload.data[0] ? action.payload.data[0]: '',
            social_media: action.payload.data[1] ? action.payload.data[1][0] : state.social_media,
            cmsList: action.payload.data[2] ? action.payload.data[2]: '',
            social_status:false

        };
    }


    case actions.GET_CMS_DETAILS_RES: {

        return {
            ...state,
            cmsList: action.payload.data[0] ? action.payload.data: '',


        };
    }


    default:
      return state;
  }
}
