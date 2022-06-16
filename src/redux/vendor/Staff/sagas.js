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
export function* getAdminStaffdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() => getRequest("public/adminstaff/getall"));
    yield put({
      type: actions.STAFF_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
    if (params.callBackAction) {
      params.callBackAction(true);
    }
  } catch (error) {
    if (params.callBackAction) {
      params.callBackAction(false);
    }
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({id:"staff.list.error"}));
  }
}

export function* getAdminStaffTimedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("admin/adminstaff/getalltime?status=1")
    );
    yield put({
      type: actions.STAFFTIME_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    // message.error(getLocaleMessages({id:"staff.list.error"}));
  }
}

export function* putStaffTime(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params && params.id) {
      response = yield call(() =>
        putRequest("admin/adminstaff/updateTime", params)
      );

      if (response) {
        //params.callBackAction(true);
        message.success(response.data.name);
        yield put({
          type: actions.CALL_STAFF_UPDATE_SUCESS,
        });
        yield put({
          type: actions.CALL_LOADER,
        });
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

export function* putStaffStatus(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params && params.staffid) {
      response = yield call(() =>
        putRequest("admin/adminstaff/updateTimeStatus", params)
      );

      if (response) {
        //params.callBackAction(true);
        message.success(response.data.name);
        yield put({
          type: actions.CALL_STAFF_UPDATE_SUCESS,
        });
        yield put({
          type: actions.CALL_LOADER,
        });
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
export function* postStaffdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/adminstaff/update", params.payload)
      );

      if (response) {
        params.callBackAction(true);
        yield put({
          type: actions.CALL_STAFF_UPDATE_SUCESS,
        });
        yield put({
          type: actions.CALL_LOADER,
        });
        message.success("Staff Details updated successfully", 10);
      }
    } else {
      response = yield call(() =>
        postRequest("admin/adminstaff/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success("Staff Details Created successfully");
        } else {
          params.callBackAction(false);
        }

        yield put({
          type: actions.CALL_LOADER,
        });
        yield put({
          type: actions.GET_ADMIN_STAFF_LIST,
        });
        yield put({
          type: actions.CALL_STAFF_SUCESS,
        });
      }
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    if(params.callBackAction) {
      params.callBackAction(false);
    }
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
    console.log("error", error);
    message.error(newErrorCustomization);
  }
}

export function* deleteStaffdata(params) {
  try {
    // yield put({
    //   type: actions.CALL_LOADER,
    // });
    const response = yield call(() =>
      deleteRequest(`admin/adminstaff/remove?id=${params.id}`)
    );
    if (response.data.data) {
      console.log("the value are getting deleted successfully");
      yield put({
        type: actions.CALL_LOADER,
      });
    }
    yield put({
      type: actions.GET_ADMIN_STAFF_LIST,
    });
    yield put({
      type: actions.GET_DELETE_STAFF_LIST_RESPONSE,
    });

    /*
        yield put({
            type: actions.GET_STAFF,
        })
*/
    message.success("Staff has been deleted successfully");
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

export function* getStaff(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => getRequest(`public/adminstaff/get?id=${params.id}`));

    yield put({
      type: actions.STAFF_RESPONSE,
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

export function* getAdminStaffShiftFullTime(params) {
  try {
    const response = yield call(() =>
      //getRequest(`admin/adminshift/getall`)
      getRequest(
        `admin/adminshift/getall?startdate=${params.payload.startdate}&enddate=${params.payload.enddate}`
      )
    );
    console.log("response.data.data", response.data.data);
    if (response.data.data) {
      yield put({
        type: actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST_SUCCESS,
        payload: [],
      });
    }
  } catch (error) {
    yield put({
      type: actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST_FAILURE,
    });
  }
}

export function* getAdminStaffShiftTime(params) {
  try {
    const response = yield call(() =>
      //getRequest(`admin/adminshift/getall?vendorid=${params.payload.vendorid}&status=${params.payload.status}`)
      getRequest(
        `admin/adminshift/getall?vendorid=${params.payload.vendorid}&startdate=${params.payload.startdate}&enddate=${params.payload.enddate}&status=${params.payload.status}`
      )
    );
    console.log("response.data.data", response.data.data);
    if (response.data.data) {
      yield put({
        type: actions.GET_ADMIN_STAFF_SHIFT_LIST_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: actions.GET_ADMIN_STAFF_SHIFT_LIST_SUCCESS,
        payload: [],
      });
    }
  } catch (error) {
    yield put({
      type: actions.GET_ADMIN_STAFF_SHIFT_LIST_FAILURE,
      payload: [],
    });
  }
}

export function* updateAdminStaffShiftTime(params) {
  try {
    const response = yield call(() =>
      putRequest(`admin/adminshift/update`, params.payload)
    );
    console.log("response.data.data", response.data.data);
    if (response) {
      yield put({
        type: actions.UPDATE_ADMIN_STAFF_SHIFT_SUCCESS,
      });
      message.success(`${response.data.name}`);
      // yield put({
      //   type: actions.GET_ADMIN_STAFF_LIST,
      // });
    }
  } catch (error) {
    yield put({
      type: actions.UPDATE_ADMIN_STAFF_SHIFT_FAILURE,
    });
    message.success(`${error}`);
  }
}

export function* deleteAdminStaffShiftTime(params) {
  try {
    const response = yield call(() =>
      deleteRequest(`admin/adminshift/remove?id=${params.payload.id}`)
    );
    console.log("response.data.data", response.data);
    if (response) {
      yield put({
        type: actions.DELETE_ADMIN_STAFF_SHIFT_SUCCESS,
      });
      message.success(`${response.data.name}`);
    }
  } catch (error) {
    yield put({
      type: actions.DELETE_ADMIN_STAFF_SHIFT_FAILURE,
    });
    message.success(`${error}`);
  }
}

export function* createAdminStaffShiftTime(params) {
  try {
    const response = yield call(() =>
      postRequest(`admin/adminshift/create`, params.payload)
    );
    console.log("response.data.data", response.data.data);
    if (response) {
      yield put({
        type: actions.CREATE_ADMIN_STAFF_SHIFT_SUCCESS,
      });
      message.success(`${response.data.name}`);
      // if(params.Isvendor == "admin"){
      //   history.push("/admin/StafManagement");
      // }
      if (params.callBackAction) {
        params.callBackAction(true);
      }
    }
  } catch (error) {
    yield put({
      type: actions.CREATE_ADMIN_STAFF_SHIFT_FAILURE,
    });
    message.success(`${error}`);
    if (params.callBackAction) {
      params.callBackAction(false);
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ADMIN_STAFF_LIST, getAdminStaffdata),
    takeEvery(actions.GET_ADMIN_STAFF_TIMELIST, getAdminStaffTimedata),
    takeEvery(actions.POST_STAFF, postStaffdata),
    takeEvery(actions.DELETE_STAFF, deleteStaffdata),
    takeEvery(actions.GET_STAFF, getStaff),
    takeEvery(actions.PUT_STAFF_TIME, putStaffTime),
    takeEvery(actions.PUT_STAFF_STATUS, putStaffStatus),
    takeEvery(actions.GET_ADMIN_STAFF_SHIFT_LIST, getAdminStaffShiftTime),
    takeEvery(actions.UPDATE_ADMIN_STAFF_SHIFT, updateAdminStaffShiftTime),
    takeEvery(actions.DELETE_ADMIN_STAFF_SHIFT, deleteAdminStaffShiftTime),
    takeEvery(actions.CREATE_ADMIN_STAFF_SHIFT, createAdminStaffShiftTime),
    takeEvery(
      actions.GET_ADMIN_STAFF_SHIFT_FULL_LIST,
      getAdminStaffShiftFullTime
    ),
  ]);
}
