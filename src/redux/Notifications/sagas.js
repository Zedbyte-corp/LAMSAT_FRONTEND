import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import { putRequest, uploadRequest, getRequest } from "helpers/axiosClient";
import { message } from "antd";

export function* get_notification(params) {
  try {
    const response = yield call(() =>
      getRequest(`common/notifications/get?id=${params.payload.id}`)
    );
    if (response.data) {
      yield put({
        type: actions.GET_NOTIFICATION_SUCCESS,
        payload: response.data.data,
      });
      getRequest(`common/notifications/setview?id=${params.payload.id}`);
    }
  } catch (error) {
    yield put({ type: actions.GET_NOTIFICATION_FAILURE });
  }
}

export function* set_notification(params) {
  try {
    const response = yield call(() =>
      getRequest(`common/notifications/setview?id=${params.payload.id}`)
    );
    if (response.data) {
      yield put({
        type: actions.SET_NOTIFICATION_SUCCESS,
        // payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({ type: actions.SET_NOTIFICATION_FAILURE });
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_NOTIFICATION, get_notification),
    takeEvery(actions.SET_NOTIFICATION, set_notification),
  ]);
}
