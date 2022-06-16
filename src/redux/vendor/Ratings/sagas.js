import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import { patchRequest, getRequest } from "helpers/axiosClient";
// import { history, store } from 'redux/store';

export function* getAdminRating(params) {
  try {
    const response = yield call(() =>
      getRequest("vendor/vendorreview/getall?status=1&vendorid=" + params.id)
    );
    console.log("this is the value of the rating ", response);
    yield put({
      type: actions.GET_VENDOR_RATING_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // handleException(error);
    yield put({ type: actions.GET_VENDOR_RATING_LIST_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_VENDOR_RATING_LIST, getAdminRating)]);
}
