import { all, put, call, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import {
  putRequest,
  uploadRequest,
} from 'helpers/axiosClient';
import { message } from 'antd';
// import { history, store } from 'redux/store';

export function* editprofile(params) {
  try {
    const response = yield call(() => putRequest(`user/user/update`,params.payload));
    localStorage.removeItem('user_data');
    localStorage.setItem('user_data', JSON.stringify(response.data[0]));
    yield put({
      type: actions.EDIT_PROFILE_SUCCESS,
    });
    message.success('User Profile updated successfully')
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.EDIT_PROFILE_FAILURE });
  }
}

export function* imageUpload(params){
    try {
        const response = yield call(() => uploadRequest(`public/general/upload`, params.payload))


        if(params.callBackAction){
          params.callBackAction(response.data[0].data.filePath , response.data[0].data.image_url)
        }
        yield put({
          type: actions.UPLOAD_IMAGE_SUCCESS,
        });
      } catch (error) {
        // message.error(error.response)
        yield put({ type: actions.UPLOAD_IMAGE_FAILURE });
      }
}

export function* updatePassword(params) {
	var response = '';
    try {
      response = yield call(() => putRequest('user/user/changepassword',params.payload));
      yield put({
        type: actions.UPDATE_PASSWORD_SUCCESS,
      });
      message.success('User Password updated successfully')
    } catch (error) {
      yield put({ type: actions.UPDATE_PASSWORD_FAILURE });
      message.error(error.response.data.message);
    }
  }

export default function* rootSaga() {
  yield all([
    takeEvery(actions.EDIT_PROFILE, editprofile),
    takeEvery(actions.UPLOAD_IMAGE, imageUpload),
    takeEvery(actions.UPDATE_PASSWORD, updatePassword),
  ]);
}
