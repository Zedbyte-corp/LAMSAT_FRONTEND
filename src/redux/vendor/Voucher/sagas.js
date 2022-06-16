import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
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

export function* getAdminVoucherdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/voucher/getall?status=1")
    );
    yield put({
      type: actions.VOUCHER_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "voucher.list.error" }));
  }
}
export function* getAdminUserdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/adminuser/getall?status=1")
    );
    yield put({
      type: actions.GET_ALL_USER_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "voucher.list.error" }));
  }
}
export function* postVoucherdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/voucher/update", params.payload)
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
        postRequest("admin/voucher/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success("Voucher Successfully Created.");
        } else {
          params.callBackAction(false);
        }

        yield put({
          type: actions.CALL_LOADER,
        });
        yield put({
          type: actions.GET_ADMIN_VOUCHER_LIST,
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

export function* deleteVoucherdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/voucher/remove?id=${params.id}`));

    yield put({
      type: actions.GET_ADMIN_VOUCHER_LIST,
    });
    message.success("Voucher has been deleted successfully");
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

export function* getVoucherCode(params) {
  try {
    const response = yield call(() =>
      getRequest(`admin/voucher/voucher_code?status=1`)
    );
    yield put({
      type: actions.GET_VENDOR_VOUCHER_CODE_SUCCESS,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(error.response);
    yield put({ type: actions.GET_VENDOR_VOUCHER_CODE_FAILURE });
  }
}

export function* getVoucherAppType(params) {
  try {
    const response = yield call(() =>
      getRequest(`public/common/getall_apptype?status=1`)
    );
    yield put({
      type: actions.GET_VENDOR_VOUCHER_APP_TYPE_SUCCESS,
      //payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_VENDOR_VOUCHER_APP_TYPE_FAILURE });
  }
}

export function* getVoucherType(params) {
  try {
    const response = yield call(() =>
      getRequest(`public/common/getall_vouchertype?status=1`)
    );
    yield put({
      type: actions.GET_VENDOR_VOUCHER_TYPE_SUCCESS,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_VENDOR_VOUCHER_APP_TYPE_FAILURE });
  }
}

export function* getLanguageList(params) {
  try {
    const response = yield call(() =>
      getRequest(`public/language/getall?status=1`)
    );
    yield put({
      type: actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST_SUCCESS,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST_FAILURE });
  }
}

//vendor APIs
export function* getVendorVoucherdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/vendorvoucher/getall?status=1")
    );
    yield put({
      type: actions.GET_VENDOR_VOUCHER_LIST_RESPONSE,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "voucher.list.error" }));
  }
}

export function* postVendorVoucherdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("vendor/vendorvoucher/update", params.payload)
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
        postRequest("vendor/vendorvoucher/create", params.payload)
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
          type: actions.GET_VENDOR_VOUCHER_LIST,
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

export function* deleteVendorVoucherdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() =>
      deleteRequest(`vendor/vendorvoucher/remove?id=${params.id}`)
    );

    yield put({
      type: actions.GET_VENDOR_VOUCHER_LIST,
    });
    yield put({
      type: actions.GET_VENDOR_VOUCHER_CODE,
    });

    message.success("Voucher has been deleted successfully");
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

export default function* rootSaga() {
  yield all([
    takeEvery(actions.POST_VOUCHER, postVoucherdata),
    takeEvery(actions.GET_ADMIN_VOUCHER_LIST, getAdminVoucherdata),
    takeEvery(actions.DELETE_VOUCHER, deleteVoucherdata),
    takeEvery(actions.GET_ALL_USER, getAdminUserdata),
    takeEvery(actions.GET_VENDOR_VOUCHER_CODE, getVoucherCode),
    takeEvery(actions.GET_VENDOR_VOUCHER_APP_TYPE, getVoucherAppType),
    takeEvery(actions.GET_VENDOR_VOUCHER_TYPE, getVoucherType),
    takeEvery(actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST, getLanguageList),

    takeEvery(actions.GET_VENDOR_VOUCHER_LIST, getVendorVoucherdata),
    takeEvery(actions.POST_VENDOR_VOUCHER, postVendorVoucherdata),
    takeEvery(actions.DELETE_VENDOR_VOUCHER, deleteVendorVoucherdata),
  ]);
}
