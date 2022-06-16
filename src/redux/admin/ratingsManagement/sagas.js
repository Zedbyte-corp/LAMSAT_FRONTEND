import { all, put, call, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import {
  patchRequest,
  getRequest,
} from 'helpers/axiosClient';
// import { history, store } from 'redux/store';


export function* getAdminRating(params) {
  try {
        const response = yield call(() => getRequest('public/review/getall?status=1&vendorid=1'));

        yield put({
        type: actions.GET_ADMIN_RATING_LIST_SUCCESS,
        payload: response.data.data,
        });
  } catch (error) {
    // handleException(error);
    yield put({ type: actions.GET_ADMIN_RATING_LIST_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ADMIN_RATING_LIST, getAdminRating)
  ]);
}
