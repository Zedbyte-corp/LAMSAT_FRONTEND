import actions from './actions';

const initState = {
  categoryList: [],
  vendorCategoryList: [],
  serviceList:[],
  vendorServiceList:[],
  vendorList: [],
  staffList: [],
  loading: false,
  categoryCreated: false,
  serviceCreated: false,
  category:{},
  vendorCategory:{},
  getCategory: false,
  category_redirect: false,
  stop: false,
  staffVisible: true,
  serviceVisible:true
};

export default function categoryReducer(state = initState, action) {
  switch (action.type) {
    case actions.CATEGORY_LIST_RESPONSE:{
        return {
            ...state,
            categoryList: action.payload && action.payload.length > 0 ? action.payload : [],
        }
    }
    case actions.VENDOR_CATEGORY_LIST_RESPONSE:{
      return {
          ...state,
          vendorCategoryList: action.payload && action.payload.length > 0 ? action.payload : [],
      }
  }
    case actions.UPDATE_CATEGORY_OPEN:{
      return {
          ...state,
          getCategory: true,
      }
    }
    case actions.CATEGORY_RESPONSE:{
      return {
          ...state,
          category: action.payload && action.payload.length > 0 ? action.payload : {},
      }
    }
    case actions.VENDOR_CATEGORY_RESPONSE:{
      return {
          ...state,
          vendorCategory: action.payload && action.payload.length > 0 ? action.payload : {},
      }
    }
    case actions.GET_VENDOR_LIST_RESPONSE: {
      return {
        ...state,
        vendorList: action.payload && action.payload.length > 0 ? action.payload : []
      }
    }
    case actions.GET_VENDORSTAFF_LIST_RESPONSE:{
      return {
        ...state,
        staffList: action.payload && action.payload.length > 0 ? action.payload : [],
        staffVisible:false
      }
    }
    case actions.GET_SERVICES_LIST_RESPONSE:{
      return {
        ...state,
        serviceList: action.payload && action.payload.length > 0 ? action.payload : [],
        serviceVisible:false
      }
    }
    case actions.GET_VENDOR_SERVICES_LIST_RESPONSE:{
      return {
        ...state,
        vendorServiceList: action.payload && action.payload.length > 0 ? action.payload : [],
      }
    }
    case actions.CALL_LOADER: {
      return  {
        ...state,
        loading: !state.loading
      }
    }
    case actions.STOP_LOOP: {
      return  {
        ...state,
        stop: !state.stop
      }
    }
    case actions.CALL_CATEGORY_SUCESS: {
      return  {
        ...state,
        categoryCreated: true
      }
    }
    case actions.CALL_CATEGORY_UPDATE_SUCESS: {
      return  {
        ...state,
        category_redirect: true
      }
    }
    case actions.CALL_SERVICE_SUCESS: {
      return  {
        ...state,
        serviceCreated: true
      }
    }


    case actions.GET_VENDOR_SERVICE_LISTDATA_RES: {
      return  {
        ...state,
        vendorServiceList: action.payload && action.payload.length > 0 ? action.payload : [],
        staffVisible:false
      }
    }


    default:
      return state;
  }
}
