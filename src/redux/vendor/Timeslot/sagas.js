import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import { history, store } from "redux/store";
import swal from "sweetalert";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "helpers/axiosClient";
import { message } from "antd";
import { getLocalData, getLocaleMessages } from "redux/helper";
import { deleteVendorVoucherdata } from "../Voucher/sagas";
// import { history, store } from 'redux/store';

export function* getvendorTimeslot(params) {
  try {
    //?status=1
    const response = yield call(() =>
      getRequest("vendor/vendor/vendortimeGetall?vendorid=" + params.vendorid)
    );
    yield put({
      type: actions.GET_VENDOR_TIME_LIST_RES,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export function* putvendorTimeslot(params) {
  try {
    //?status=1
    const response = yield call(() =>
      putRequest("vendor/vendor/timeupdates", params)
    );
    if (response.data) {
      // console.log("thsi is the vlaue id passing in hte time lap");
      params.callBackAction(true);
    }
    yield put({
      type: actions.GET_VENDOR_TIME_LIST,
      vendorid: params.vendorid,
      callBackAction: () => {},
    });
    /*swal({
        title: getLocaleMessages({ id: 'Timeslot Updated successfully!' }),
        //text: `${error.response && error.response.data && error.response.data.message}`,
        icon: "info",
        button: true,
        //timer: 1500,
    });*/
    swal({
      text: "Timeslot Updated successfully",//getLocaleMessages({ id: "Timeslot Updated successfully" }),
      title: "Update",//getLocaleMessages({ id: "Update" }),
      type: "info",
      button: true,
      timer: 1500,
    });
  } catch (error) {
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_VENDOR_TIME_LIST, getvendorTimeslot),
    takeEvery(actions.UPDATE_VENDOR_TIME, putvendorTimeslot),
  ]);
}
