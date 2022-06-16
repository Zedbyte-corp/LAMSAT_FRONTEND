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
// import { getLocalData } from 'redux/helper';

export function* getRolesData(params) {
  try {
   const response = yield call(() =>getRequest('admin/role/get?status=1'))

   yield put({
       type: actions.GET_ONLY_ROLES_RESPONSE,
       payload: response.data.data,
     })

  } catch (error) {
    swal({
      title: getLocaleMessages({ id: "Roles Error" }),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}


export function* getSingleRoleData(params) {
  try {
   const response = yield call(() =>getRequest('admin/role/getone?id='+params.value))
     yield put({
       type: actions.GET_ONLY_SINGLEROLE_RESPONSE,
       payload: response.data.data
     })

  } catch (error) {
    swal({
      title: getLocaleMessages({ id: "Roles Error" }),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}

export function* getAssignedRolesData(params) {
  try {
   const response = yield call(() =>getRequest('admin/role/getall?status=1' ,params.payload))
     yield put({
       type: actions.ASSIGNED_ROLES_RESPONSE,
       payload: response.data.data,
     })

  } catch (error) {
    swal({
      title: getLocaleMessages({ id: "Roles Error" }),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}

export function* createRolesData(params) {
  try {
    if (params) {
      const response = yield call(() =>postRequest('admin/role/create' ,  params.payload))
      if (response.data) {
        swal({
            title: getLocaleMessages({ id: "Role Created" }),
            text: `${response.data.name}`,
            icon: "success",
            button: false,
            timer: 1500,
        });
        yield put({
          type: actions.ROLES_REDIRECT
        })
      }
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
    swal({
      title: getLocaleMessages({ id: "Role Error" }),
      text: newErrorCustomization,
      icon: "error",
      button: false,
      //timer: 1500,
    });
  }

}

export function* updateRolesData(params) {
  try {
    if (params) {
      const response = yield call(() =>putRequest('admin/role/update' ,  params.payload))
      if (response.data) {
        swal({
            title: getLocaleMessages({ id: "Role Updated" }),
            text: `${response.data.name}`,
            icon: "success",
            button: false,
            timer: 1500,
        });
    /*
        params.history.push({
          pathname: '/admin/roles',
        })*/
        yield put({
          type: actions.ROLES_REDIRECT,
          payload: response.data.data,
        })
        //params.history.push('/admin/roles');
      }
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
    swal({
      title: getLocaleMessages({ id: "Role Error" }),
      text:  newErrorCustomization,
      icon: "error",
      button: false,
      //timer: 1500,
    });
  }
}


export function* deleteRolesdata(params) {
  try {
    const response = yield call(() =>deleteRequest(`admin/role/remove?id=${params.payload.id}`))
      if(response.data.code==200){
        swal({
          title: "Roles Delete",//getLocaleMessages({ id: "Roles Delete" }),
          text: "Roles Delete",//`${response.data.name}`,
          icon: "success",
          button: false,
          timer: 1500,
      });
      yield put({
          type: actions.GET_ASSIGNED_ROLES,
      })
    }
  } catch (error) {
    yield put({
      type: actions.DELETE_ROLE_FAILURE,
  })
    swal({
      title: "Role Assigned",//getLocaleMessages({ id: "Role Assigned" }),
      text: "Role is Assigned to Admin User's",//getLocaleMessages({id:"Role is Assigned to Admin User's"}),
      type: "warning",
      icon: "warning",
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Okay!",
      button: false,
      timer: 1500,
    });
  }
}


export function* statusRolesdata(params) {
  try {
    //const response = yield call(() =>getRequest(`admin/role/status?id=${params.payload.id}&status=${params.payload.status}}`)
    const response = yield call(() =>getRequest(`admin/role/status?id=${params.payload.id}&status=${params.payload.status}`))
      if(response.data.code==200){

        swal({
          title: getLocaleMessages({ id: "Role Status Update" }),
          text: `${response.data.name}`,
          icon: "success",
          button: false,
          timer: 1500,
      });
      yield put({
          type: actions.GET_ASSIGNED_ROLES,
      })
    }
  } catch (error) {
    swal({
      title: getLocaleMessages({ id: "Role Assigned!" }),
      title: getLocaleMessages({ id: "Role is Assigned to Admin User's" }),
      type: "warning",
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Okay!",
      button: false,
      timer: 1500,
    });
  }
}

export default function* rolesSaga() {
  yield all([
      takeEvery(actions.GET_ONLY_ROLES, getRolesData),
      takeEvery(actions.GET_SINGLE_ROLES, getSingleRoleData),
      takeEvery(actions.CREATE_ROLE_JS, createRolesData),
      takeEvery(actions.UPDATE_ROLE, updateRolesData),
      takeEvery(actions.DELETE_ROLE, deleteRolesdata),
      takeEvery(actions.STATUS_ROLE, statusRolesdata),
      takeEvery(actions.GET_ASSIGNED_ROLES, getAssignedRolesData)
  ]);
}
