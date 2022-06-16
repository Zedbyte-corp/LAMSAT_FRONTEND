import { all, put, call, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import {
  getRequest,postRequest
} from 'helpers/axiosClient';
// import { history, store } from 'redux/store';
// import { message } from 'antd';

export function* layoutCategory() {
  try {
    const response = yield call(() =>
      getRequest('public/website/category_getall?status=1&is_admin=1'),
    );
    yield put({
      type: actions.GET_LAYOUT_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_LAYOUT_CATEGORIES_FAILURE });
  }
}

export function* layoutSocialinfo() {
  try {
    const response = yield call(() => getRequest('public/appconfig/getactive?status=1'));
    //const response = yield call(() => getRequest('public/website/category_getall?status=1'),

    yield put({
      type: actions.GET_SOCIAL_DETAILS_RES,
      payload: response.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_LAYOUT_CATEGORIES_FAILURE });
  }
}



export function* layoutSaloon() {
  try {
    const response = yield call(() =>
      getRequest('public/website/saloon_getall?status=1&isfeatured=1'),
    );
    yield put({
      type: actions.GET_LAYOUT_SALOON_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    // message.error(error.response && error.response.data && error.response.data.message)
    yield put({ type: actions.GET_LAYOUT_SALOON_FAILURE });
  }
}

export function* layoutTopRating() {
  try {
    const response = yield call(() =>
      getRequest('public/website/toprating_getall?status=1&isfeatured=1'),
    );
    yield put({
      type: actions.GET_LAYOUT_TOP_RATING_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    // message.error(error.response && error.response.data && error.response.data.message)
    yield put({ type: actions.GET_LAYOUT_SALOON_FAILURE });
  }
}



export function* layoutCMSlist() {
  try {

    const response = yield call(() => getRequest('admin/pagemanage/getall'));
    //const response = yield call(() => getRequest('public/website/category_getall?status=1'),

    yield put({
      type: actions.GET_CMS_DETAILS_RES,
      payload: response.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_LAYOUT_CATEGORIES_FAILURE });
  }
}


export function* saveEnquiry(params) {
  try {

    const response = yield call(() => postRequest('public/contactus/user_create' , params.payload));
    //const response = yield call(() => getRequest('public/website/category_getall?status=1'),

    params.callBackAction1(response.status)

    /*yield put({
      type: actions.GET_CMS_DETAILS_RES,
      payload: response.data,
    });*/
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_LAYOUT_CATEGORIES_FAILURE });
  }
}

export function* getSaloonByName(params) {
  try {
  
    const response = yield call(() => getRequest(`public/website/getvendorbyname?vendorname=${params.name}`));
    yield put({
      type: actions.GET_SALOON_BY_NAME_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_BY_NAME_FAILURE });
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_LAYOUT_TOP_RATING, layoutTopRating),
    takeEvery(actions.GET_LAYOUT_SALOON, layoutSaloon ),
    takeEvery(actions.GET_LAYOUT_CATEGORIES, layoutCategory),
    takeEvery(actions.GET_FOOTER_DETAILS, layoutSocialinfo),
    takeEvery(actions.GET_CMS_DETAILS, layoutCMSlist),
    takeEvery(actions.SAVE_ENQUIRY, saveEnquiry),
    takeEvery(actions.GET_SALOON_BY_NAME, getSaloonByName)

  ]);
}
