import { all, put, call, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import {
  putRequest,
  uploadRequest,
} from 'helpers/axiosClient';
import { message } from 'antd';
// import { history, store } from 'redux/store';

export function* fileUpload(params){
    try {
        const response = yield call(() => uploadRequest(`public/general/upload_pdf`, params.payload))


        if(params.callBackAction){
          params.callBackAction(response.data[0].data.filePath , response.data[0].data.file_url)
        }
        yield put({
          type: actions.UPLOAD_FILE_SUCCESS,
        });
      } catch (error) {
        // message.error(error.response)
        yield put({ type: actions.UPLOAD_FILE_FAILURE });
      }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.UPLOAD_FILE, fileUpload),
  ]);
}
