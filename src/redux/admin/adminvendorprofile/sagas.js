import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import {
  getRequest,
  //   patchRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "helpers/axiosClient";
import swal from "sweetalert";
import {
  getLocalDataType,
  getLocalData,
  getLocaleMessages,
} from "redux/helper";
import { message } from "antd";
import { getCountry } from "../address/sagas";

export function* postVedorCreate(params) {
  console.log("this is the value of the params", params);
  try {
    const response = yield call(() =>
      postRequest(`admin/adminvendor/create`, { ...params.payload })
    );

    if (response.data.code === 200) {
      swal({
        title: getLocaleMessages({ id: "Saloon Created" }),
        text: `${response.data.name}`,
        icon: "success",
        button: false,
        timer: 1500,
      });

      yield put({
        type: actions.GET_ALL_VENDOR,
      });

      yield put({
        type: actions.CREATE_VENDOR_PROFILE_SUCCESS,
        //   payload: response.data.data,
      });
    } else {
      swal({
        title: getLocaleMessages({ id: "Saloon Error" }),
        text: `${response.data.name}`,
        icon: "info",
        button: false,
        timer: 1500,
      });
    }
  } catch (error) {
    swal({
      title: getLocaleMessages({ id: "Saloon Error" }),
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
    /* swal({
        title: getLocaleMessages({ id: "Saloon Error" }),
        text: error.response.data.message,
        icon: "error",
        button: false,
        timer: 1500,
    });*/
    // message.error(error.response)
    yield put({ type: actions.CREATE_VENDOR_PROFILE_FAILURE });
  }
}

export function* postVedorUpdate(params) {
  console.log("this is the value of the datain the flow api");
  try {
    const response = yield call(() =>
      putRequest(`admin/adminvendor/update`, { ...params.payload })
    );

    if (response.data.code === 200) {
      swal({
        title: getLocaleMessages({ id: "Saloon Updated" }),
        text: `${response.data.name}`,
        icon: "success",
        button: true,
        //timer: 1500,
      });
      if (getLocalDataType() == "admin") {
        yield put({
          type: actions.UPDATE_VENDOR_PROFILE_SUCCESS,
          //   payload: response.data.data,
        });

        yield put({
          type: actions.GET_ALL_VENDOR,
        });
      } else if (getLocalDataType() == "vendor") {
        params.callBackAction(true);
      }
    }
  } catch (error) {
    // message.error(error.response)

    swal({
      title: getLocaleMessages({ id: "Saloon Error" }),
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });

    // yield put({ type: actions.UPDATE_VENDOR_PROFILE_FAILURE});
  }
}

export function* getSingleVedor(params) {
  try {
    const response = yield call(() =>
      getRequest("admin/adminvendor/get?id=" + params.value)
    );

    yield put({
      type: actions.VENDOR_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.VENDOR_PROFILE_FAILURE });
  }
}

export function* acceptvendorReqeust(params) {
  try {
    const response = yield call(() =>
      postRequest(`admin/partneraccount/updatesalonapproval`, params.payload)
    );
    if (response.data) {
      message.success(response.data.name);
      params.callBackAction(true);
    }
  } catch (error) {
    params.callBackAction(false);
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
  }
}

export function* getCountryList(params) {
  try {
    const response = yield call(() =>
      getRequest("public/country/getall?status=" + params.value)
    );

    yield put({
      type: actions.COUNTRY_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.VENDOR_PROFILE_FAILURE });
  }
}

export function* getCityList(params) {
  try {
    const response = yield call(() =>
      getRequest("public/city/getall?countryid=" + params.value)
    );

    yield put({
      type: actions.CITY_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.VENDOR_PROFILE_FAILURE });
  }
}

export function* getAreaList(params) {
  try {
    const response = yield call(() =>
      getRequest("public/area/getall?cityid=" + params.value)
    );

    yield put({
      type: actions.AREA_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.VENDOR_PROFILE_FAILURE });
  }
}

export function* getDeleteList(params) {}

export function* getCategoryList(params) {
  try {
    const response = yield call(() =>
      getRequest("public/category/getall?status=" + params.value)
    );

    yield put({
      type: actions.CATEGORY_LIST_SUCCESS,
      payload: response.data.data,
    });
    if (params.callBackAction) {
      params.callBackAction(true);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.VENDOR_PROFILE_FAILURE });
  }
}

export function* deleteVenderData(params) {
  try {
    const response = yield call(() =>
      deleteRequest("admin/adminvendor/remove?id=" + params.id)
    );

    swal({
      title: getLocaleMessages({
        id: "Your Saloon details  has been successfully deleted",
      }),
      text: `${response.data.name}`,
      icon: "success",
      button: false,
      timer: 1500,
    });
    yield put({
      type: actions.GET_ALL_VENDOR_NEW,
    });
    // yield put({
    //   type: actions.GET_ALL_VENDOR,
    // });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.VENDOR_DELETE_FAILURE });
  }
}

export function* getAssignedSaloonData(params) {
  try {
    const response = yield call(() => getRequest("admin/adminvendor/getall"));
    yield put({
      type: actions.GET_ALL_VENDOR_RESPONSE,
      payload: response.data,
    });
  } catch (error) {}
}

export function* getAssignedSaloonDatanew(params) {
  try {
    const response = yield call(() =>
      getRequest("admin/adminvendor/getallsalon")
    );
    yield put({
      type: actions.GET_ALL_VENDOR_RESPONSE_NEW,
      payload: response.data,
    });
  } catch (error) {}
}

export function* getEmailVeirification(params) {
  console.log("verifying_email_params", params);
  try {
    const response = yield call(() =>
      getRequest(
        `public/partner/getpartneremail?id=${params.payload.vendorId}&email=${params.payload.email}`
      )
    );

    if (response.data.code === 200) {
      swal({
        title: " Verification Link sent to Email",
        text: `Please click the Link to verify Email `,
        icon: "success",
        // button: false,
        timer: 1500,
      });

      yield put({
        type: actions.EMAIL_VERIFIED_SUCCESS,
        //   payload: response.data.data,
      });
      yield put({
        type: actions.GET_ALL_VENDOR,
      });
    } else {
      swal({
        title: getLocaleMessages({ id: "Saloon Error" }),
        text: `${response.data.name}`,
        icon: "info",
        button: false,
        timer: 1500,
      });
    }
  } catch (error) {
    swal({
      title: getLocaleMessages({ id: "Saloon Error" }),
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
    /* swal({
        title: getLocaleMessages({ id: "Saloon Error" }),
        text: error.response.data.message,
        icon: "error",
        button: false,
        timer: 1500,
    });*/
    // message.error(error.response)
    yield put({ type: actions.EMAIL_VERIFIED_FAILURE });
  }
}

export function* postOTPVerification(params) {
  console.log("this is the value of the params", params);
  try {
    const response = yield call(() =>
      getRequest(
        `public/partner/getpartnerotp?id=${params.payload.vendorId}&contactnumber=${params.payload.contactnumber}&countrycode=${params.payload.countrycode}`
      )
    );

    if (response.data.code === 200) {
      // swal({
      //   title: getLocaleMessages({ id: "Saloon Created" }),
      //   text: `${response.data.name}`,
      //   icon: "success",
      //   button: false,
      //   timer: 1500,
      // });

      // yield put({
      //   type: actions.GET_ALL_VENDOR,
      // });

      yield put({
        type: actions.OTP_VERIFIED_SUCCESS,
        payload: response.data.data,
      });
    } else {
      swal({
        title: "Otp verified success",
        text: `${response.data.name}`,
        icon: "info",
        button: false,
        timer: 1500,
      });
    }
  } catch (error) {
    swal({
      title: "Otp verified failed",
      text: `Invalid otp`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
    /* swal({
        title: getLocaleMessages({ id: "Saloon Error" }),
        text: error.response.data.message,
        icon: "error",
        button: false,
        timer: 1500,
    });*/
    // message.error(error.response)
    yield put({ type: actions.OTP_VERIFIED_FAILURE });
  }
}

export function* putOTPVerification(params) {
  console.log("this is the value of the params", params);
  try {
    const response = yield call(() =>
      putRequest(`public/partner/partnerotp_verify`, params.payload)
    );

    if (response.data.code === 200) {
      swal({
        title: "OTP Verified Successfully",
        text: `${response.data.name}`,
        icon: "success",
        button: false,
        timer: 1500,
      });

      // yield put({
      //   type: actions.GET_ALL_VENDOR,
      // });

      yield put({
        type: actions.PATNER_VERIFY_OTP_SUCCESS,
        payload: response.data.data,
      });
      params.callBackAction(true);
    } else {
      swal({
        title: "OTP veirification failed",
        // text: `${response.data.name}`,
        icon: "info",
        button: false,
        timer: 1500,
      });
    }
  } catch (error) {
    params.callBackAction(false);
    swal({
      title: "OTP verification failed",
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
    /* swal({
        title: getLocaleMessages({ id: "Saloon Error" }),
        text: error.response.data.message,
        icon: "error",
        button: false,
        timer: 1500,
    });*/
    // message.error(error.response)
    yield put({ type: actions.PATNER_VERIFY_OTP_FAILURE });
  }
}

export function* get_notifications(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `common/notifications?userid=${params.payload.userid}&usertype=${params.payload.usertype}`
      )
    );
    if (response.data) {
      yield put({
        type: actions.GET_ALL_NOTIFICATION_SUCCESS,
        payload: response.data,
      });
    }
    params.callBackAction(response.data);
  } catch (error) {
    yield put({ type: actions.GET_ALL_NOTIFICATION_FAILURE });
  }
}

export function* get_clearnotifications(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `common/notifications/setnotificationcount?userid=${params.payload.userid}&usertype=${params.payload.usertype}`
      )
    );
    if (response) {
      yield put({
        type: actions.CLEAR_ALL_NOTIFICATION_SUCCESS,
      });
      params.callBackAction(true);
    }
  } catch (error) {
    yield put({ type: actions.CLEAR_ALL_NOTIFICATION_FAILURE });
  }
}

export function* changeVendorPassword(params) {
  try {
    console.log("11111111111", params);
    const response = yield call(() =>
      putRequest(`vendor/vendor/changepassword`, { ...params.payload })
    );
    if (response.status === 200) {
      yield put({
        type: actions.VENDOR_PASSWORD_CHANGE_SUCCESS,
      });
      message.success("Password Updated successfully");
    }
    if (params.callBackAction) {
      params.callBackAction(true);
    }
  } catch (error) {
    if (params.callBackAction) {
      params.callBackAction(false);
    }
    console.log("11111", error.response?.data?.message);
    message.error(error.response?.data?.message);

    yield put({
      type: actions.VENDOR_PASSWORD_CHANGE_FAILURE,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CREATE_VENDOR_PROFILE, postVedorCreate),
    takeEvery(actions.UPDATE_VENDOR_PROFILE, postVedorUpdate),
    takeEvery(actions.GET_SINGLE_VENDOR, getSingleVedor),
    takeEvery(actions.GET_ALL_VENDOR, getAssignedSaloonData),
    takeEvery(actions.GET_ALL_VENDOR_NEW, getAssignedSaloonDatanew),
    takeEvery(actions.VENDOR_DELETE, deleteVenderData),
    takeEvery(actions.COUNTRY_LIST, getCountryList),
    takeEvery(actions.CITY_LIST, getCityList),
    takeEvery(actions.AREA_LIST, getAreaList),
    takeEvery(actions.CATEGORY_LIST, getCategoryList),
    takeEvery(actions.SALOON_VENDOR_DELETE, getDeleteList),
    takeEvery(actions.ACCEPT_VENDOR_REQUEST, acceptvendorReqeust),
    takeEvery(actions.OTP_VERIFIED, postOTPVerification),
    takeEvery(actions.EMAIL_VERIFIED, getEmailVeirification),
    takeEvery(actions.PATNER_VERIFY_OTP, putOTPVerification),
    takeEvery(actions.GET_ALL_NOTIFICATION, get_notifications),
    takeEvery(actions.CLEAR_ALL_NOTIFICATION, get_clearnotifications),
    takeEvery(actions.VENDOR_PASSWORD_CHANGE, changeVendorPassword),
  ]);
}
