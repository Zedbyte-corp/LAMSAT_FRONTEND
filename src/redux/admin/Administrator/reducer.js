import actions from './actions';
import ObjectAssign from 'object-assign';


const initialState = {
    data: [],
    searchInput:'',
    fromPageNo: 0,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    selectedRowKeys : [],
    searchedColumn:'',
    loading: false,
    redirect:false,
    hasError: {},
    help: {},
    error: null,
    langLists: {},
    status:'',
    administrator:'',
    singleAdministratorData: [],
    AdministratorassignedData:[],
    checkedItems: new Map(),
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
    mobile:'',
    roletype:'',
    roleList:[],
    rolesData:'',
    adminid:'',
    saloonLanguange:[],
    isAdministratorProfile:true,
    phone:'',
    categoryData: {},
    loading: false,
    activityLogData: [],
    totalPage:1,
    lastPage:1,
    prefix:''
};
export default function AdministratorReducer(state = initialState, action) {

//const reducer = function (state = initialState, action) {

    switch (action.type) {

        case actions.GET_ADMINISTRATOR: {

            return ObjectAssign({}, state, {
                loading: true
            });
        }


        case actions.DELETE_ADMINISTRATOR: {

            return ObjectAssign({}, state, {
                isAdministratorProfile: true
            });
        }


        case actions.GET_ACTIVITY_LOG_RESPONSE: {
            return {
                ...state,
                activityLogData: action.payload.data,
                totalPage: action.payload.metadata.total_count
            }
        }
        case actions.CALL_LOADER: {
            return  {
              ...state,
              loading: !state.loading
            }
        }
        case actions.SET_LAST_PAGE: {
            return {
                ...state,
                lastPage: action.value
            }
        }
      /*  case actions.GET_ONLY_ADMINISTRATOR: {
            return ObjectAssign({}, state, {
                loading: true,
                redirect:false,
                status:'',
                administrator:'',
                singleAdministratorData: [],
            });
        } */

        case  actions.ASSIGN_SERCHED_DATA:{
            return ObjectAssign({}, state, {

                searchText: action.value,
                searchedColumn: action.value1
            });
        }

        case actions.FIND_USER: {
            return {
                ...state,
                modal_show: true,
                form_data: action.payload
            };
        }

        case actions.FIRSTNAME: {
            return ObjectAssign({}, state, {
                loading: false,
                firstname:action.value
            });
        }

        case actions.LASTNAME: {
            return ObjectAssign({}, state, {
                loading: false,
                lastname:action.value
            });
        }
        case actions.EMAIL: {
            return ObjectAssign({}, state, {
                loading: false,
                email:action.value
            });
        }
        case actions.USERNAME: {
            return ObjectAssign({}, state, {
                loading: false,
                username:action.value
            });
        }
        case actions.PASSWORD: {
            return ObjectAssign({}, state, {
                loading: false,
                password:action.value
            });
        }
        case actions.CONFIRM_PASSWORD: {
            return ObjectAssign({}, state, {
                loading: false,
                confirmpassword:action.value
            });
        }
        case actions.MOBILE: {
            return ObjectAssign({}, state, {
                loading: false,
                mobile:action.value
            });
        }

        case actions.ADMINISTRATOR_STATUS: {
            return ObjectAssign({}, state, {
                loading: false,
                status:action.value
            });
        }
        case actions.ROLE_TYPE: {
            return ObjectAssign({}, state, {
                loading: false,
                roletype:action.value
            });
        }


        case actions.UPDATE_ADMINISTRATOR: {
            return ObjectAssign({}, state, {
                loading: true
            });
        }
        case actions.ADMINISTRATOR_REDIRECT: {
            return ObjectAssign({}, state, {
                redirect: true
            });
        }



        case actions.GET_SINGLE_ADMINISTRATOR: {
            return ObjectAssign({}, state, {
                loading: true,
                redirect:false,
                status:'',
                administrator:'',
                administratorData: [],
                singleAdministratorData: [],
            });
        }

        case actions.ASSIGNED_ADMINISTRATOR_RESPONSE: {
            return ObjectAssign({}, state, {
                loading: false,
                redirect:false,
                AdministratorassignedData: action.payload.data,
                isAdministratorProfile:false
            });
        }

        case actions.ACTIVE_ROLES_RESPONSE: {

            return ObjectAssign({}, state, {
                loading: false,
                redirect:false,
                roleList: action.payload,
                isAdministratorProfile: false
            });
        }






        case actions.GET_ONLY_SINGLE_ADMINISTRATOR_RESPONSE: {
            return ObjectAssign({}, state, {
                loading: false,
                redirect:false,
                firstname:action.payload.firstname,
                lastname:action.payload.lastname,
                username:action.payload.username,
                email:action.payload.email,
                status:action.payload.status,
                phone:action.payload.contactnumber,
                roletype:action.payload.roleid,
                adminid:action.payload.id,
                isAdministratorProfile:false,
                prefix:action.payload.prefix,
            });
        }

        case actions.ADMINISTRATOR_REDIRECT: {
            return ObjectAssign({}, state, {
                loading: false,
                redirect: true
            });
        }

        case actions.GET_ONLY_SINGLEADMINISTRATOR_RESPONSE: {
            return ObjectAssign({}, state, {
                loading: false,
                singleAdministratorData: action.payload.data[0],
                rolesData: action.payload.data[0].role_json,
                fruitschild: action.payload.data[0].role_child,
                administrator: action.payload.data[0].administrator,
                status: action.payload.data[0].status
            });
        }

        case  actions.ASSIGN_SELECTED_ROW:{
            return ObjectAssign({}, state, {
            selectedRowKeys:action.payload
            });
        }

        case  actions.ASSIGN_SERCHED_DATA:{
            return ObjectAssign({}, state, {

                searchText: action.value,
                searchedColumn: action.value1
            });
        }
        case  actions.ASSIGN_CATEGORY_DATA:{
            return ObjectAssign({}, state, {
                categoryData: action.value
            });
        }
        case actions.ASSIGN_SALOON_LANGUAGE:{
            return {
              ...state,
              saloonLanguange: action.payload
          }
          }




        default:
            return state;
    }

    return state;
};
/*
function removeA(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);

        arr = arr.filter(function( element ) {
            return element !== undefined;
});
    }
}*/
/*
function removeDuplicates(arr){
    let unique_array = []
    if(arr){
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }

         unique_array = unique_array.filter(function( element ) {
                return element !== undefined;
            });

    }
}
    /* unique_array = unique_array.filter(function( element ) {
            return element !== undefined;*/
 /*   return unique_array
}*/
//export default reducer;