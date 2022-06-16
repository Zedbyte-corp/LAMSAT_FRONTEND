import actions from './actions';

const initState = {
    detailPageLoader: false,
    ratingList: [],
    addressList:[],
    countryList : [],
    cityList : [],
    sourceData : {},
    loader:true
};

export default function AddressBookReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_SALOON_RATING_DETAILS_SUCCESS : {
      return {
        ...state,
        loader: false,
        ratingList: action.payload,
      };
    }

    case actions.GET_SALOON_RATING_DETAILS : {
      return {
        ...state,
      };
    }

    case actions.GET_ADD_ADDRESS_SUCCESS : {
      return {
        ...state,
      };
    }


    case actions.GET_DELETE_ADDRESS_SUCCESS : {
      return {
        ...state,
      };
    }

    case actions.GET_ADDRESS_DETAILS_SUCCESS : {
      return {
        ...state,
        addressList: action.payload,
        loader:false
      };
    }

    case actions.GET_COUNTRY_DETAILS_SUCCESS : {
      return {
        ...state,
        countryList: action.payload,
        loader:false
      };
    }


    case actions.GET_CITY_DETAILS_SUCCESS : {
      return {
        ...state,
        cityList: action.payload,
        loader:false
      };
    }


    case actions.EDITADDRESS_DETAILS_SUCCESS : {
      return {
        ...state,
        sourceData: action.payload[0],
        loader:false
      };
    }

    case actions.DELETE_ADDRESS_SUCCESS : {
      return {
        ...state,
        loader:false
      };
    }


    case actions.GET_ALL_CITY_LIST_SUCCESS : {
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
