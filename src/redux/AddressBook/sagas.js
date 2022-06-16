import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";

import {
  getRequest,
  //   patchRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "helpers/axiosClient";

import { setCategoryAndServices } from "redux/helper";
import { getLocaleMessages } from "redux/helper";
import { message } from "antd";
import { store } from "redux/store";

export function* ratingDetail(params) {
  try {
    const response = yield call(() =>
      getRequest("user/userreview/getall?status=1")
    );
    yield put({
      type: actions.GET_SALOON_RATING_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_DETAILS_FAILURE });
  }
}

export function* addAddressDetail(params) {
  try {
    const response = yield call(() =>
      postRequest("user/bookingaddress/create", params.payload)
    );
    message.success(getLocaleMessages({ id: "Address Created Successfully!" }));

    yield put({
      type: actions.GET_ADD_ADDRESS_SUCCESS,
      payload: response.data.data,
    });
    params.callBackAction(response.status);

    let obje = {};
    obje["customerid"] = params.payload.userid;
    yield put({
      type: actions.GETALL_ADDRESS,
      payload: obje,
    });
  } catch (error) {
    message.error("This is a error message");

    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_DETAILS_FAILURE });
  }
}

export function* editAddressDetail(params) {
  try {
    const response = yield call(() =>
      putRequest("user/bookingaddress/update", params.payload)
    );

    yield put({
      type: actions.GET_UPDATE_ADDRESS_SUCCESS,
      payload: response.data.data,
    });

    params.callBackAction(response.status);

    let obje = {};
    obje["customerid"] = params.payload.userid;
    yield put({
      type: actions.GETALL_ADDRESS,
      payload: obje,
    });
  } catch (error) {
    yield put({ type: actions.GET_SALOON_DETAILS_FAILURE });
  }
}

export function* ratingDetailUpdate(params) {
  try {
    const response = yield call(() =>
      putRequest("user/userreview/update", params.payload)
    );
    params.callBackAction(response);
    // if (response) {
    //   const response = yield call(() =>
    //     getRequest("user/userreview/getall?status=1")
    //   );
    //   yield put({
    //     type: actions.GET_SALOON_RATING_DETAILS_SUCCESS,
    //     payload: response.data.data,
    //   });
    // }
  } catch (error) {}
}

export function* deleteAddressDetail(params) {
  try {
    const response = yield call(() =>
      deleteRequest(`user/bookingaddress/remove?id=${params.id}`)
    );
    yield put({
      type: actions.DELETE_ADDRESS_SUCCESS,
      payload: response.data.data,
    });

    params.callBackAction(response.status);

    let obje = {};
    obje["customerid"] = params.userid;
    yield put({
      type: actions.GETALL_ADDRESS,
      payload: obje,
    });
  } catch (error) {
    //yield put({ type: actions.GET_SALOON_DETAILS_FAILURE });
  }
}

export function* getallAddressDetail(params) {
  try {
    const response = yield call(() =>
      getRequest("user/bookingaddress/getall?customerid=" + params.customerid)
    );
    yield put({
      type: actions.GET_ADDRESS_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_ADDRESS_FAILURE });
  }
}

export function* getallCountryDetail(params) {
  try {
    const response = yield call(() =>
      getRequest("public/country/getall?status=1")
    );
    yield put({
      type: actions.GET_COUNTRY_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_ADDRESS_FAILURE });
  }
}

export function* getallCityDetail(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/usercity/getall?status=1&&countryid=${params.countryid}`
      )
    );
    yield put({
      type: actions.GET_CITY_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_ADDRESS_FAILURE });
  }
}

export function* getTotalCityDetail(params) {
  try {
    const response = yield call(() =>
      getRequest("public/city/getall?status=1")
    );
    yield put({
      type: actions.GET_ALL_CITY_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_ALL_CITY_LIST_FAILURE });
  }
}

export function* getEditDetail(params) {
  try {
    const response = yield call(() =>
      getRequest("user/bookingaddress/get?id=" + params.id.id)
    );
    //const response = yield call(() => getRequest(`public/usercity/getall?status=1&&countryid=${params.countryid}`))
    yield put({
      type: actions.EDITADDRESS_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_ADDRESS_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SALOON_RATING_DETAILS, ratingDetail),
    takeEvery(actions.SALOON_RATING_REVIEW_UPDATE, ratingDetailUpdate),
    takeEvery(actions.ADD_ADDRESS, addAddressDetail),
    takeEvery(actions.UPDATE_ADDRESS, editAddressDetail),
    takeEvery(actions.DELETE_ADDRESS, deleteAddressDetail),
    takeEvery(actions.GETALL_ADDRESS, getallAddressDetail),
    takeEvery(actions.GETALL_COUNTRY, getallCountryDetail),
    //takeEvery(actions.GETALL_CITY, getallCityDetail),
    takeEvery(actions.EDIT_ADDRESS, getEditDetail),
    takeEvery(actions.GET_ALL_CITY_LIST, getTotalCityDetail),
  ]);
}
