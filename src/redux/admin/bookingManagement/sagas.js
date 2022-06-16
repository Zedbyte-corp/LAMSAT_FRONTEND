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
// import { history, store } from 'redux/store';
const userData = JSON.parse(localStorage.getItem("user_data"));
const userId = userData && parseInt(userData.id);
// console.log("user id =>", userId);

export function* getBookingdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/adminbooking/getall?status=1")
    );
    // if (response) {
    //   params.callBackAction(response);
    // }
    yield put({
      type: actions.BOOKING_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getAdminReport(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/report/getall?status=1")
    );
    yield put({
      type: actions.GET_BOOKING_LIST_REPORT_ADMIN_OUTPUT,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getAdminBookingReportFilter(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`admin/report/getFilterDate?fromdate=${params.payload.StartDate}&todate=${params.payload.EndDate}`)
    );
    yield put({
      type: actions.GET_BOOKING_LIST_REPORT_ADMIN_OUTPUT,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getBookingdata_vendor(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`vendor/vendorbooking/getall?vendorid=${params.id}`)
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.BOOKING_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getVendorBookingData(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`vendor/vendorreport/getall?id=${params.id}`)
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.GET_BOOKING_LIST_VENDOR_REPORT_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getVendorBookingReportFilter(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`vendor/vendorreport/getFilterDate?id=${params.payload.id}&fromdate=${params.payload.StartDate}&todate=${params.payload.EndDate}`)
    );
    yield put({
      type: actions.GET_BOOKING_LIST_VENDOR_REPORT_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}
///

export function* getAdminVendorBookingdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`vendor/vendorbooking/getall?vendorid=${params.id}`)
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.BOOKING_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}
// /

export function* getVendorList(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/adminvendor/getall?status=1")
    );
    yield put({
      type: actions.VENDOR_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getStaffList(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("public/adminstaff/getall?status=1")
    );
    yield put({
      type: actions.GET_STAFF_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* getVendorBookingdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/vendorbooking/getall?vendorid=" + params.id)
    );
    yield put({
      type: actions.GET_VENDOR_BOOKING_LIST_RES,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}

export function* postBookingdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/adminbooking/update", params.payload)
      );

      if (response) {
        params.callBackAction(true);
        message.success(response.data.name);
        yield put({
          type: actions.CALL_LOADER,
        });
      }
    } else {
      response = yield call(() =>
        postRequest("admin/adminbooking/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success(response.data.name);
        } else {
          params.callBackAction(false);
        }

        yield put({
          type: actions.CALL_LOADER,
        });
        yield put({
          type: actions.GET_BOOKING_LIST,
        });
      }
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    let newErrorCustomization = "";
    if (
      error.response &&
      error.response.data &&
      error.response.data.name === "ValidationError"
    ) {
      error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.map((errorMessage) => {
          newErrorCustomization = `${newErrorCustomization}${errorMessage["message"]}`;
          return errorMessage;
        });
    } else {
      newErrorCustomization =
        error.response && error.response.data && error.response.data.message;
    }
    message.error(newErrorCustomization);
  }
}

export function* deleteBookingdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() =>
      deleteRequest(`admin/adminbooking/remove?id=${params.id}`)
    );

    yield put({
      type: actions.GET_BOOKING_LIST,
    });
    message.success("Booking data has been deleted successfully");
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* updateVendorBookingStatus(params) {
  try {
    let response;
    if (params) {
      response = yield call(() =>
        putRequest("vendor/vendorbooking/updateBookingStatus", params.payload)
      );

      if (response) {
        message.success(
          getLocaleMessages({ id: "Booking status updated successfully!" })
        );
        params.callBackAction(true);
      }
    }
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* updateVendorPaymentStatus(params) {
  try {
    let response;
    if (params) {
      response = yield call(() =>
        putRequest("vendor/vendorbooking/updatePaymentStatus", params.payload)
      );

      // console.log("eeee 2: " + JSON.stringify(response));
      if (response) {
        message.success(getLocaleMessages({ id: response.data.data.message }));
        params.callBackAction(response.status);
      }
    }
  } catch (error) {
    // console.log("eeeee: " + JSON.stringify(error));
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* getBooking(params) {
  try {
    // console.log("bookingId 501", params);
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`admin/adminbooking/get?id=${params.id}`)
    );
    if (response.data.code == 200) {
      yield put({
        type: actions.BOOKING_RESPONSE,
        payload: response.data.data[0],
      });
      params.callBackAction(true, response.data.data[0]);
    }
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    // message.error(
    //   `${error.response && error.response.data && error.response.data.message}`
    // );
    params.callBackAction(false);
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_BOOKING_LIST, getBookingdata),
    takeEvery(actions.GET_BOOKING_LIST_VENDOR, getBookingdata_vendor),
    takeEvery(actions.GET_BOOKING_LIST_VENDOR, getAdminVendorBookingdata),
    takeEvery(actions.GET_BOOKING_LIST_VENDOR_REPORT, getVendorBookingData),
    takeEvery(actions.GET_VENDOR_REPORT_FILTER_LIST, getVendorBookingReportFilter),
    takeEvery(actions.GET_ADMIN_REPORT_FILTER_LIST, getAdminBookingReportFilter),
    takeEvery(actions.GET_BOOKING_LIST_REPORT_ADMIN, getAdminReport),
    takeEvery(actions.CREATE_BOOKING, postBookingdata),
    takeEvery(actions.DELETE_BOOKING, deleteBookingdata),
    takeEvery(actions.GET_BOOKING, getBooking),
    takeEvery(actions.GET_VENDOR_BOOKING_LIST, getVendorBookingdata),
    takeEvery(actions.UPDATE_VENDOR_BOOKING_STATUS, updateVendorBookingStatus),
    takeEvery(actions.UPDATE_VENDOR_PAYMENT_STATUS, updateVendorPaymentStatus),
    takeEvery(actions.GET_VENDOR_LIST, getVendorList),
    takeEvery(actions.GET_STAFF_LIST, getStaffList),
  ]);
}
