import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './customActions';
import LayoutActions from 'store/Layouts/customActions';
import {
  postRequest,
  putRequest,
  deleteRequest,
  getRequest,
} from 'helpers/axiosClient';
import swal from 'sweetalert';
import { getLocalData, getLocaleMessages } from 'redux/helper';

export function* getLogin(params) {
  try {
   const response = yield call(() =>postRequest('public/login/user',params.payload
   ))
   localStorage.setItem('jwtToken', response.data.data);
   localStorage.setItem('user_data', JSON.stringify(response.data.user_data[0]));
   /*if( !params.history.location.pathname.startsWith('/listing') && !params.history.location.pathname.startsWith('/detail')){
      window.location.href='/listing';
   } else {*/
     window.location.reload();
   //}
    swal({
      title: getLocaleMessages("Login"),
      text: getLocaleMessages("Login Successfully"),
      icon: "success",
      button: false,
      timer: 1500,
    });
    yield put({
      type: actions.GET_LOGIN_DATA_RESPONSE,
      payload: response.data.user_data[0],
    })
    yield put({
      type: LayoutActions.SHOW_LOGIN_MODAL,
    })
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
      title: getLocaleMessages("Login Error"),
      text: newErrorCustomization,
      icon: "error",
      button: false,
      // timer: 1500,
    });
  }
}

export function* getForgot(params) {
  try {
    yield call(() =>putRequest('public/auth/reset/user_reset',params.payload))
    // yield put({
    //   type: actions.GET_SAGA_SUCCESS,
    //   payload: true,
    // });
    swal({
      title: getLocaleMessages("Success"),
      text: getLocaleMessages("Your Password will send to your Email"),
      icon: "success",
      button: false,
      timer: 1500,
    });
    yield put({
      type: actions.SHOW_FORGOT_PASSWORD,
    })
    yield put({
      type: LayoutActions.SHOW_LOGIN_MODAL,
    })
  } catch (error) {
    swal({
      title: getLocaleMessages("Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: false,
      timer: 1500,
    });
  }
}

export function* userLogout() {
  try{
      yield call(()=>deleteRequest(`public/auth/logout?id=${getLocalData('id')}&&authtoken=${getLocalData('jwtToken')}`));
      swal({
        title: getLocaleMessages("Success"),
        text: getLocaleMessages(`${getLocalData('usertypeid') === 1 ? 'Admin' : getLocalData('usertypeid') === 2 ? 'User' : 'Hotel' } Successfully logout`),
        icon: "success",
        button: false,
        timer: 1500,
      })
      let url ='/'
      if(getLocalData('usertypeid') === 3){
        url = '/hotels/login'
      } else if(getLocalData('usertypeid') === 1){
        url = '/admin/login'
      }
      localStorage.clear();
      window.location.href=url;
  }
  catch(error) {
    swal({
      title: getLocaleMessages("Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: false,
      timer: 1500,
    });
  }
}

export function* getLanguages(params) {
  try {
    const response = yield call(() =>getRequest('public/language/getall'))
    if(response) {
      yield put({
        type: actions.GET_LANGUAGE_RESPONSE,
        payload: response.data.data
      })
    }

  } catch (error) {
    swal({
      title: getLocaleMessages("Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: false,
      timer: 1500,
    });
  }
}

export function* getNotifications(params) {
  try {
    const response = yield call(() =>getRequest('admin/booking/notification_admin_list'))
    if(response) {
      yield put({
        type: actions.GET_ADMIN_NOTIFICATIONS_RESPONSE,
        payload: response.data
      })
    }

  } catch (error) {
    swal({
      title: getLocaleMessages("Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: false,
      timer: 1500,
    });
  }
}

export function* getNotificationsCount(params) {
  try {
    const response = yield call(() =>getRequest('admin/booking/notification_count'))
    if(response) {
      yield put({
        type: actions.GET_ADMIN_NOTIFY_COUNT_RESPONSE,
        payload: response.data
      })
    }

  } catch (error) {
    swal({
      title: getLocaleMessages("Error"),
      text: `${error.response && error.response.data && error.response.data.message}`,
      icon: "error",
      button: false,
      timer: 1500,
    });
  }
}

export function* resetNotificationsCount(params) {
  try {
    const response = yield call(() =>putRequest('admin/booking/reset_notification'))
    if(response) {
      yield put({
        type: actions.REST_ADMIN_NOTIFICATION_RESPONSE,
        payload: response.data
      })
    }

  } catch (error) {

  }
}

export default function* showPassword() {
  yield all([
    takeEvery(actions.GET_LOGIN_DATA,getLogin),
    takeEvery(actions.FORGOT_PASSWORD,getForgot),
    takeEvery(actions.USER_LOGOUT,userLogout),
    takeEvery(actions.GET_LANGUAGES, getLanguages),
    takeEvery(actions.GET_ADMIN_NOTIFICATIONS, getNotifications),
    takeEvery(actions.GET_ADMIN_NOTIFY_COUNT, getNotificationsCount),
    takeEvery(actions.REST_ADMIN_NOTIFICATION, resetNotificationsCount)
  ]);
}
