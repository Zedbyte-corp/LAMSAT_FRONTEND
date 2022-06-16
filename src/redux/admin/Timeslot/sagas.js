import { all, put, call, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import { history, store } from 'redux/store';
import swal from 'sweetalert';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from 'helpers/axiosClient';
import { message } from 'antd';
import { getLocalData, getLocaleMessages } from 'redux/helper';
export function* getvendorTimeslot(params) {
    try {
        //?status=1
        const response = yield call(() => getRequest('admin/adminvendor/adminvendortimeGetall?vendorid='+params.vendorid))
        yield put({
            type: actions.GET_ADMIN_TIME_LIST_RES,
            payload: response.data.data,
        }) 
    } catch (error) { 
      yield put({
        type: actions.GET_ADMIN_TIME_LIST_FAILURE,
        })   
        message.error(getLocaleMessages({id:"category.list.error"}));
    }
}

export function* getadminVendorList(params){
  try {
    //?status=1
    const response = yield call(() => getRequest('admin/adminvendor/getall?status=1'))
    yield put({
        type: actions.GET_ADMIN_VENDOR_LIST_RES,
        payload: response.data.data,
    }) 
} catch (error) { 
    message.error(getLocaleMessages({id:"category.list.error"}));
}
}
export function* putvendorTimeslot(params) {
  try {
      //?status=1
      const response = yield call(() => putRequest('admin/adminvendor/timeupdate' , params))
      yield put({
          type: actions.GET_ADMIN_TIME_LIST,
          vendorid: params.vendorid,
      }) 

      /*swal({
        title: getLocaleMessages({ id: 'Timeslot Updated successfully!' }),
        //text: `${error.response && error.response.data && error.response.data.message}`,
        icon: "info",
        button: true,
        //timer: 1500,
    });*/
    
    swal({
      text: getLocaleMessages({ id: 'Timeslot Updated successfully' }),
      title: getLocaleMessages({ id: 'Update' }),
      type: "info",
      button: true,
      timer: 1500,
    });  
  } catch (error) { 
    yield put({
      type: actions.UPDATE_ADMIN_TIME_FAILURE,
    })
      message.error(getLocaleMessages({id:"category.list.error"}));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ADMIN_TIME_LIST, getvendorTimeslot),
    takeEvery(actions.UPDATE_ADMIN_TIME, putvendorTimeslot),
    takeEvery(actions.GET_ADMIN_VENDOR_LIST, getadminVendorList),

    

    


    

    
    

    

    
    
  ]);
}
