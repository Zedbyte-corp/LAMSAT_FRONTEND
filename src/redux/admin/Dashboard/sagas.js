import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import {
  getRequest,
  //patchRequest,
  postRequest,
  putRequest,
  deleteRequest,
  uploadRequest,
} from "helpers/axiosClient";
import swal from "sweetalert";
import { getLocalData, getLocaleMessages } from "redux/helper";

export function* getCounts(params) {
  try {
    var URL
    if(params.payload)
    {
      URL = `common/common/dashboard_count?filterssdate=${params.payload.sdate}&filtersedate=${params.payload.edate}`
    } else {
      URL = `common/common/dashboard_count`;
    }
    const response = yield call(() =>
      getRequest(URL)
    );

    yield put({
      type: actions.GET_DASHBOARD_COUNT_SUCCESS,
      payload: response.data.data,
    });
    params.callBackAction(true);
  } catch (error) {
    params.callBackAction(true);
    yield put({
      type: actions.GET_DASHBOARD_COUNT_FAIL,
    });
    swal({
      title: getLocaleMessages("Dashboard count Error"),
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}

export function* getVendorCounts(params) {
  try {
    var URL
    if(params.sdate && params.edate)
    {
      URL = `common/common/vendordashboard?id=${params.vendorid}&filterssdate=${params.sdate}&filtersedate=${params.edate}`
    } else {
      URL = `common/common/vendordashboard?id=${params.vendorid}`;
    }
    const response = yield call(() =>
      getRequest(URL)
    );

    yield put({
      type: actions.GET_DASHBOARD_COUNT_SUCCESS,
      payload: response.data.data,
    });
    //params.callBackAction(response);
  } catch (error) {
    yield put({
      type: actions.GET_DASHBOARD_COUNT_FAIL,
    });
    swal({
      title: getLocaleMessages("Dashboard count Error"),
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}

export default function* dashboardSaga() {
  yield all([
    takeEvery(actions.GET_DASHBOARD_COUNT, getCounts),
    takeEvery(actions.GET_VENDOR_DASHBOARD_COUNT, getVendorCounts),
  ]);
}
