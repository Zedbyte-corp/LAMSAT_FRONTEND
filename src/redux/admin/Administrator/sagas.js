import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import {
  getRequest,
//   patchRequest,
   postRequest,
   putRequest,
   deleteRequest,
} from 'helpers/axiosClient';
import swal from 'sweetalert';
import { getLocalData, getLocaleMessages } from 'redux/helper';
import { message } from 'antd';
//import { getLocaleMessages } from 'helpers/axiosClient';
// import { getLocalData } from 'redux/helper';

export function* getAdministratorData(params) {
  try {
   const response = yield call(() =>postRequest('admin/administrator/getall')) 
     yield put({
       type: actions.GET_ONLY_ADMINISTRATOR_RESPONSE,
       payload: response.data.data,
     })
     
  } catch (error) {
    swal({
      title: getLocaleMessages("Administrator Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}


export function* getSingleAdministratorData(params) {
  try {
    var id = parseInt(params.payload);
   const response = yield call(() =>getRequest('admin/administrator/getone?id='+id)) 
     yield put({
       type: actions.GET_ONLY_SINGLE_ADMINISTRATOR_RESPONSE,
       payload: response.data.data.data[0]
     })
     
  } catch (error) {
    swal({
      title: getLocaleMessages("Administrator Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}

export function* getAssignedAdministratorData() {
  try {   
   const response = yield call(() =>postRequest('admin/administrator/getall')) 
     yield put({
       type: actions.ASSIGNED_ADMINISTRATOR_RESPONSE,
       payload: response.data.data,
     })
     
  } catch (error) {
    swal({
      title:  getLocaleMessages({id:"Administration"}),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}



export function* createAdministratorData(params) {
  try {
    if (params) {
      const response = yield call(() =>postRequest('admin/administrator/create' ,  params.payload)) 
      if (response.data) {   
        swal({
            title: getLocaleMessages({id:"Administration Created"}),
            icon: "success",
            button: false,
            timer: 1500,
        }); 
      }

      yield put({
        type: actions.ADMINISTRATOR_REDIRECT
      })
    }
  } catch (error) {
    let newErrorCustomization = '';
    if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
      error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
        newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
        return errorMessage;
      })
    } else {
      newErrorCustomization = error.response && error.response.data && error.response.data.message;
    }
    // swal({
    //   title: getLocaleMessages("Administrator Error"),
    //   text: newErrorCustomization,
    //   icon: "error",
    //   button: false,
    //   //timer: 1500,
    // });
    message.error(newErrorCustomization);
  }

}

export function* updateAdministratorData(params) { 
  
  try {
    if (params) {
      const response = yield call(() =>postRequest('admin/administrator/update' ,  params.payload)) 
      if (response.data) {

        swal({
          title: getLocaleMessages({id:"Administration Updated"}),
          icon: "success",
          button: false,
          timer: 1500,
      }); 
      /*
        params.history.push({
          pathname: '/admin/administrator',
        })*/
        yield put({
          type: actions.ADMINISTRATOR_REDIRECT,
          payload: response.data.data,
        })
        //params.history.push('/admin/administrator');
      
      }
    }
  } catch (error) {
    let newErrorCustomization = '';
   /* if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
      error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
        newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
        return errorMessage;
      })
    } else {
      newErrorCustomization = error.response && error.response.data && error.response.data.message;
    }*/
    swal({
      title: getLocaleMessages("Administrator Error"),
      text: newErrorCustomization,
      icon: "error",
      button: false,
      //timer: 1500,
    });
  }
}


export function* deleteAdministratordata(params) {
  try {
    const response = yield call(() =>deleteRequest(`admin/administrator/remove?id=${params.id}`)) 
    if(response.data.code==200){

      yield put({
        type: actions.GET_ASSIGNED_ADMINISTRATOR,
    })
      
      swal({
          title: getLocaleMessages({id:"Administration Delete"}),
          text: `${response.data.name}`,
          icon: "success",
          button: false,
          timer: 1500,
      });
    } 

  } catch (error) {
    swal({
      title: getLocaleMessages("Administrator Assigned!"),
      text: getLocaleMessages("Administrator is Assigned to Admin User's"),
      type: "warning",
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Okay!",
      button: false,
      timer: 1500,
    });
  }
}


export function* getAssignedRolesData(params) {
  try {    
   const response = yield call(() =>getRequest('admin/role/getactive?status=1' ,params.payload)) 
     yield put({
       type: actions.ACTIVE_ROLES_RESPONSE,
       payload: response.data.data,
     })
  } catch (error) {
    swal({
      title: getLocaleMessages("Roles Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}

export function* getActivityLogData(params) {
  try {   
    yield put({
      type: actions.CALL_LOADER,
    })
    const response = yield call(() =>getRequest(`admin/activitylog/getall?limit=10&page=${params.page}`)) 
    yield put({
       type: actions.GET_ACTIVITY_LOG_RESPONSE,
       payload: response.data.data,
    })
    yield put({
      type: actions.SET_LAST_PAGE,
      value: params.page,
   })
    yield put({
      type: actions.CALL_LOADER,
    })
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    })
    swal({
      title: getLocaleMessages("Logs Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
    });
  }
}

export function* deleteActivityLogData(params) {
  try {   
    yield put({
      type: actions.CALL_LOADER,
    }) 
    const response = yield call(() =>deleteRequest(`admin/activitylog/remove?id=${params.id}`));
    message.success("Log has been deleted successfully");
    var lastpage = localStorage.getItem('lastpage');
    var page = 1;
    if (lastpage) { page = lastpage} else { page = page };
    yield put({
      type: actions.GET_ACTIVITY_LOG,
      page: page
    })
    yield put({
      type: actions.CALL_LOADER,
    })
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    })
    swal({
      title: getLocaleMessages("Logs delete Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
    });
  }
}

export default function* AdministratorSaga() { 
  yield all([
      takeEvery(actions.GET_ONLY_ADMINISTRATOR, getAdministratorData),
      takeEvery(actions.GET_SINGLE_ADMINISTRATOR, getSingleAdministratorData),
      takeEvery(actions.CREATE_ADMINISTRATOR, createAdministratorData),
      takeEvery(actions.UPDATE_ADMINISTRATOR, updateAdministratorData),     
      takeEvery(actions.DELETE_ADMINISTRATOR, deleteAdministratordata), 
      takeEvery(actions.GET_ASSIGNED_ADMINISTRATOR, getAssignedAdministratorData),
      takeEvery(actions.GET_ACTIVE_ROLES, getAssignedRolesData),
      takeEvery(actions.GET_ACTIVITY_LOG, getActivityLogData) ,
      takeEvery(actions.DELETE_LOG, deleteActivityLogData) 
  ]);
}
