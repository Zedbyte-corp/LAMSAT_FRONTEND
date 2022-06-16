import { split } from "lodash";
import actions from "./actions";

const initState = {
  categoryList: [],
  vendorCategoryList: [],
  serviceList: [],
  vendorServiceList: [],
  vendorList: [],
  staffList: [],
  loading: false,
  categoryCreated: false,
  serviceCreated: false,
  category: {},
  vendorCategory: {},
  getCategory: false,
  category_redirect: false,
  stop: false,
  staffVisible: false,
  serviceVisible: true,
  staffTimeList: [],
  categoryUpdateList: [],
  updateInitiate: true,
  categoryLoad: true,
  categoryServiceByVendorList: [],
  categoryServiceByAdmin: [],
  categoryServiceByVendorListwithlanguage: [],
  loadingCategoryServiceByVendorList: false,
  loadingCategoryServiceByAdmin: false,
  categorylistloader: false,
  postloader: false,
  vendorDropdownList: [],
  vendorSericeStaffList: []
};

export default function categoryReducer(state = initState, action) {
  switch (action.type) {
    case actions.CATEGORY_LIST_RESPONSE: {
      /*   if(action.payload){
        if(split(action.payload[0].categoryid,',')){
              var test = split(action.payload[0].categoryid,',');
      let bigCities = cat_list.filter(function (e) {

        // start
        let big = test.filter(function (b) {
          var out = b==e.id ? finalArray.push({id:e.id,categoryname:e.language[0].categoryname}):'-no-' ;
        })
    });
        }else{
          let bigCities = cat_list.filter(function (e) {
           var k = e.id == action.payload[0].categoryid ? finalArray.push({id:e.id,categoryname:e.language[0].categoryname}):'-no-' ;
          })
        }
      }*/
      return {
        ...state,
        categoryList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        categoryUpdateList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        loader: false,
        categorylistloader: false,
        //updateInitiate:true
      };
    }

    case actions.GET_VENDORCATEGORY_LIST_RES: {
      var cat_list = state.categoryList;
      var finalArray = [];
      if (action.payload) {
        if (split(action.payload[0].categoryid, ",")) {
          var test = split(action.payload[0].categoryid, ",");
          let bigCities = cat_list.filter(function (e) {
            // start
            let big = test.filter(function (b) {
              var out =
                b == e.id
                  ? finalArray.push({
                      id: e.id,
                      categoryname: e.language[0].categoryname,
                    })
                  : "-no-";
            });
          });
        } else {
          let bigCities = cat_list.filter(function (e) {
            var k =
              e.id == action.payload[0].categoryid
                ? finalArray.push({
                    id: e.id,
                    categoryname: e.language[0].categoryname,
                  })
                : "-no-";
          });
        }
      }
      return {
        ...state,
        categoryUpdateList: finalArray,
        loader: false,
        updateInitiate: false,
      };
    }

    case actions.GET_VAENDOE_CATEGORY_SERVICES_LIST_RES: {
      return {
        ...state,
        categoryList:
          action.payload.data && action.payload.data.length > 0
            ? action.payload.data
            : [],
        loader: false,
        categoryLoad: false,
      };
    }
    case actions.UPDATE_CATEGORY_OPEN: {
      return {
        ...state,
        getCategory: true,
      };
    }

    case actions.GET_VENDORCATEGORY_LIST_FAILUE: {
      return {
        ...state,
        loader: false,
      };
    }

    case actions.CATEGORY_RESPONSE: {
      return {
        ...state,
        category:
          action.payload && action.payload.length > 0 ? action.payload : {},
        loader: false,
      };
    }
    case actions.VENDOR_CATEGORY_RESPONSE: {
      return {
        ...state,
        vendorCategory:
          action.payload && action.payload.length > 0 ? action.payload : {},
        loader: false,
      };
    }

    case actions.VENDOR_CATEGORY_LIST_RESPONSE: {
      return {
        ...state,
        vendorCategory:
          action.payload && action.payload.length > 0 ? action.payload : {},
        loader: false,
      };
    }
    case actions.GET_VENDOR_LIST_RESPONSE: {
      return {
        ...state,
        vendorList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        loader: false,
      };
    }
    case actions.GET_VENDORSTAFF_LIST_RESPONSE: {
      return {
        ...state,
        staffList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        staffVisible: false,
      };
    }
    case actions.GET_SERVICES_LIST_RESPONSE: {
      return {
        ...state,
        serviceList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        vendorServiceList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        serviceVisible: false,
        loader: false,
      };
    }
    case actions.GET_VENDOR_SERVICES_LIST_RESPONSE: {
      return {
        ...state,
        vendorServiceList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        loader: false,
      };
    }

    case actions.CALL_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case actions.STOP_LOOP: {
      return {
        ...state,
        stop: !state.stop,
      };
    }
    case actions.CALL_CATEGORY_SUCESS: {
      return {
        ...state,
        categoryCreated: true,
        loader: false,
      };
    }
    case actions.CALL_CATEGORY_UPDATE_SUCESS: {
      return {
        ...state,
        category_redirect: true,
      };
    }
    case actions.CALL_SERVICE_SUCESS: {
      return {
        ...state,
        serviceCreated: true,
      };
    }

    case actions.GET_VENDOR_SERVICE_LISTDATA_RES: {
      return {
        ...state,
        vendorServiceList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        staffVisible: false,
        loading: false,
      };
    }

    case actions.GET_VENDOR_DROPDOWN_LISTDATA_RES: {
      return {
        ...state,
        vendorDropdownList:
          action.payload && action.payload.length > 0 ? action.payload : []
       };
    }

    
    case actions.GET_VENDOR_STAFF_SERVICE_RES: {
      return {
        ...state,
        vendorSericeStaffList:
          action.payload && action.payload.length > 0 ? action.payload : []
      };
    }

    case actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_SUCCESS: {
      console.log("action.payload" + action.payload);
      return {
        ...state,
        categoryServiceByVendorList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        loadingCategoryServiceByVendorList: false,
      };
    }

    case actions.GET_CATEGORY_SERVICE_BY_ADMIN_LIST_SUCCESS: {
      console.log("action.payload" + action.payload);
      return {
        ...state,
        categoryServiceByAdmin:
          action.payload && action.payload.length > 0 ? action.payload : [],
        loadingCategoryServiceByAdmin: false,
      };
    }

    case actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_WITH_LANGUAGET_SUCCESS: {
      console.log("action.payload" + action.payload);
      return {
        ...state,
        categoryServiceByVendorListwithlanguage:
          action.payload && action.payload.length > 0 ? action.payload : [],
      };
    }
    case actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_FAILURE: {
      return {
        ...state,
        categoryServiceByVendorList: [],
        loadingCategoryServiceByVendorList: false,
      };
    }

    case actions.GET_CATEGORY_LISTDATA_VENDOR_RESPONSE: {
      return {
        ...state,
        categoryList:
          action.payload && action.payload.length > 0 ? action.payload : [],
        loader: false,
      };
    }

    case actions.GET_CATEGORY_LIST: {
      return {
        ...state,
        categorylistloader: true,
      };
    }
    case actions.POST_VENDOR_SERVICES: {
      return {
        ...state,
        postloader: true,
        categorylistloader: true,
      };
    }

    default:
      return state;
  }
}
