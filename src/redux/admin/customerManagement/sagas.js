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
export function* getCustomerdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/adminuser/getall?status=1")
    );
    yield put({
      type: actions.CUSTOMER_LIST_RESPONSE,
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
export function* postChangePwdCustomer(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      putRequest("user/user/adminchangepassword", params.payload)
    );
    params.callBackAction(true);
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    params.callBackAction(false);

    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({ id: "city.list.error" }));
  }
}
export function* postCustomerdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/adminuser/update", params.payload)
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
        postRequest("admin/adminuser/create", params.payload)
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
          type: actions.GET_CUSTOMER_LIST,
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

export function* deleteCustomerdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/adminuser/remove?id=${params.id}`));

    yield put({
      type: actions.GET_CUSTOMER_LIST,
    });
    message.success("Customer data has been deleted successfully");
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

export function* getCustomer(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`admin/adminuser/get?id=${params.id}`)
    );
    if (response.data.code == 200) {
      yield put({
        type: actions.GET_CUSTOMER,
        payload: response.data.data[0],
      });
      params.callBackAction(true, response.data.data[0]);
    }
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    params.callBackAction(false);
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_CUSTOMER_LIST, getCustomerdata),
    takeEvery(actions.CHANGE_CUSTOMER_PASSWORD, postChangePwdCustomer),
    takeEvery(actions.CREATE_CUSTOMER, postCustomerdata),
    takeEvery(actions.DELETE_CUSTOMER, deleteCustomerdata),
    takeEvery(actions.GET_CUSTOMER, getCustomer),
  ]);
}
