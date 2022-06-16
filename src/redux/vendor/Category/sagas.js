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
export function* getCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("public/category/getAll?status=1")
    );
    yield put({
      type: actions.CATEGORY_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}
export function* postCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/category/update", params.payload)
      );

      if (response) {
        params.callBackAction(true);
        message.success(response.data.name);
        yield put({
          type: actions.CALL_CATEGORY_UPDATE_SUCESS,
        });
        yield put({
          type: actions.CALL_LOADER,
        });
      }
    } else {
      response = yield call(() =>
        postRequest("admin/category/create", params.payload)
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
          type: actions.GET_CATEGORY_LIST,
        });
        yield put({
          type: actions.CALL_CATEGORY_SUCESS,
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

export function* deleteCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/category/remove?id=${params.id}`));

    yield put({
      type: actions.GET_CATEGORY_LIST,
    });
    message.success("Service category has been deleted successfully");
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

export function* getHotelList(params) {
  try {
    const response = yield call(() =>
      getRequest("public/hotel/getAll?status=1")
    );
    yield put({
      type: actions.GET_ADMIN_SERVICE_VENDOR_LIST_RESPONSE,
      payload: response.data,
    });
  } catch (error) {
    swal({
      title: "Hotel List Error",
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}
export function* getServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("public/service/getall?status=1")
    );
    yield put({
      type: actions.GET_SERVICES_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}
export function* postServicesdata(params) {
  try {
    let response;
    yield put({
      type: actions.CALL_LOADER,
    });
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/service/update", params.payload)
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
          type: actions.GET_SERVICES_LIST,
        });
        yield put({
          type: actions.CALL_SERVICE_SUCESS,
        });
      }
    } else {
      response = yield call(() =>
        postRequest("admin/service/create", params.payload)
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
          type: actions.GET_SERVICES_LIST,
        });
        yield put({
          type: actions.CALL_SERVICE_SUCESS,
        });
      }
    }
    if (response) {
      yield put({
        type: actions.GET_SERVICES_LIST,
      });
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

export function* deleteServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/service/remove?id=${params.id}`));

    yield put({
      type: actions.GET_SERVICES_LIST,
    });
    message.success("Service has been deleted successfully");
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

export function* getVendordata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("common/common/saloon_getall?status=1")
    );
    yield put({
      type: actions.GET_VENDOR_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "vendor.list.error" }));
  }
}

export function* getvendorStaffdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`public/adminstaff/getall?status=1&&vendorid=${params.id}`)
    );
    yield put({
      type: actions.GET_VENDORSTAFF_LIST_RESPONSE,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "staff.list.error" }));
  }
}

export function* getCategory(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield put({
      type: actions.STOP_LOOP,
    });
    yield call(() => getRequest(`public/category/get?id=${params.id}`));

    yield put({
      type: actions.CATEGORY_RESPONSE,
    });
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

//vendor apis
export function* getVendorCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("public/category/getAll?status=1")
    );
    yield put({
      type: actions.VENDOR_CATEGORY_LIST_RESPONSE,
      payload: response.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}
export function* postVendorCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("vendor/category/update", params.payload)
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
        postRequest("vendor/category/create", params.payload)
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
          type: actions.GET_VENDOR_CATEGORY_LIST,
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

export function* deleteVendorCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/category/remove?id=${params.id}`));

    yield put({
      type: actions.GET_CATEGORY_LIST,
    });
    message.success("Service category has been deleted successfully");
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
export function* getVendorCategory(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => getRequest(`public/category/get?id=${params.id}`));

    yield put({
      type: actions.VENDOR_CATEGORY_RESPONSE,
    });
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

export function* getVendorServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/vendorservice/getall?status=1")
    );
    yield put({
      type: actions.GET_VENDOR_SERVICES_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}
export function* postVendorServicesdata(params) {
  try {
    let response;
    yield put({
      type: actions.CALL_LOADER,
    });
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("vendor/service/update", params.payload)
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
          type: actions.GET_VENDOR_SERVICES_LIST,
        });
      }
    } else {
      response = yield call(() =>
        postRequest("vendor/vendorservice/create", params.payload)
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
          type: actions.GET_VENDOR_SERVICES_LIST,
        });
      }
    }
  } catch (error) {
    params.callBackAction(false);
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

export function* deleteVendorServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`vendor/service/delete?id=${params.id}`));

    yield put({
      type: actions.GET_VENDOR_SERVICES_LIST,
    });
    message.success("Service has been deleted successfully");
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

export function* getVendorServiceListData(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/vendorservice/getvendorservice?vendorid=" + params.id)
    );
    yield put({
      type: actions.GET_VENDOR_SERVICE_LISTDATA_RES,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.POST_CATEGORY, postCategorydata),
    takeEvery(actions.POST_SERVICES, postServicesdata),
    takeEvery(actions.GET_SERVICES_LIST, getServicedata),
    takeEvery(actions.GET_VENDOR_LIST, getVendordata),
    takeEvery(actions.DELETE_CATEGORY, deleteCategorydata),
    takeEvery(actions.GET_CATEGORY_LIST, getCategorydata),
    takeEvery(actions.GET_CATEGORY, getCategory),
    takeEvery(actions.GET_VENDORSTAFF_LIST, getvendorStaffdata),
    takeEvery(actions.DELETE_SERVICE, deleteServicedata),

    takeEvery(actions.POST_VENDOR_CATEGORY, postVendorCategorydata),
    takeEvery(actions.GET_VENDOR_CATEGORY_LIST, getVendorCategorydata),
    takeEvery(actions.DELETE_VENDOR_CATEGORY, deleteVendorCategorydata),

    takeEvery(actions.GET_VENDOR_SERVICES_LIST, getVendorServicedata),
    takeEvery(actions.POST_VENDOR_SERVICES, postVendorServicesdata),
    takeEvery(actions.DELETE_VENDOR_SERVICE, deleteVendorServicedata),
    takeEvery(actions.GET_VENDOR_SERVICE_LISTDATA, getVendorServiceListData),
  ]);
}
