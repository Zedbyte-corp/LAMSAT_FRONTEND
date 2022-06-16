import actions from './actions';

const initState = {
  cityList: [],
  loading: false,
  city:{},
  getCity: false,
  city_redirect: false,
  countryCreated: false,
  countryList: [],
  country:{},
  getCounrty: false,
  country_redirect: false,
  countryCreated: false,
  areaList: [],
  area:{},
  getArea: false,
  area_redirect: false,
  areaCreated: false,
  userCityList: [],
  userCountryList: []
};

export default function cityReducer(state = initState, action) {
  switch (action.type) {
    case actions.CITY_LIST_RESPONSE:{
        return {
            ...state,
            cityList: action.payload && action.payload.length > 0 ? action.payload : [],
        }
    }
    case actions.USER_CITY_LIST_RESPONSE:{
      return {
          ...state,
          userCityList: action.payload && action.payload.length > 0 ? action.payload : [],
      }
  }
    case actions.CITY_RESPONSE:{
      return {
          ...state,
          city: action.payload ? action.payload : {},
      }
    }
   
    case actions.CALL_LOADER: {
      return  {
        ...state,
        loading: !state.loading
      }
    }
    
    case actions.CALL_CITY_SUCESS: {
      return  {
        ...state,
        cityCreated: true
      }
    }
    case actions.CALL_CITY_UPDATE_SUCESS: {
      return  {
        ...state,
        city_redirect: true
      }
    }


    case actions.COUNTRY_LIST_RESPONSE:{
      return {
          ...state,
          countryList: action.payload && action.payload.length > 0 ? action.payload : [],
      }
    }
    case actions.USER_COUNTRY_LIST_RESPONSE:{
      return {
          ...state,
          userCountryList: action.payload && action.payload.length > 0 ? action.payload : [],
      }
    }
    case actions.COUNTRY_RESPONSE:{
      return {
          ...state,
          country: action.payload && action.payload.length > 0 ? action.payload : {},
      }
    }  
    case actions.CALL_COUNTRY_SUCESS: {
      return  {
        ...state,
        countryCreated: true
      }
    }
    case actions.CALL_COUNTRY_UPDATE_SUCESS: {
      return  {
        ...state,
        country_redirect: true
      }
    }


    case actions.AREA_LIST_RESPONSE:{
      return {
          ...state,
          areaList: action.payload && action.payload.length > 0 ? action.payload : [],
      }
    }
    case actions.AREA_RESPONSE:{
      return {
          ...state,
          area: action.payload && action.payload.length > 0 ? action.payload : {},
      }
    }  
    case actions.CALL_AREA_SUCESS: {
      return  {
        ...state,
        areaCreated: true
      }
    }
    case actions.CALL_AREA_UPDATE_SUCESS: {
      return  {
        ...state,
        area_redirect: true
      }
    }

    default:
      return state;
  }
}
