import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import { getRequest, postRequest } from "helpers/axiosClient";
import { setCategoryAndServices } from "redux/helper";
import { message } from "antd";
import { store } from "redux/store";

export function* saloonDetail(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/website/vendor_get?status=1&id=${params.payload}&userid=${params.userid}`
      )
    );
    yield put({
      type: actions.GET_SALOON_DETAILS_SUCCESS,
      payload: response.data.data.length > 0 ? response.data.data[0] : [],
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_DETAILS_FAILURE });
  }
}

export function* saloonDates(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/website/vendor_dates?status=1&id=${params.payload}&userid=${params.userid}`
      )
    );
    yield put({
      type: actions.GET_SALOON_DETAILS_DATES_SUCCESS,
      payload: response.data.data.length > 0 ? response.data.data : [],
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_DETAILS_DATES_FAILURE });
  }
}

export function* saloonServices(params) {
  try {
    let emptyArr = [];
    yield put({
      type: actions.GET_SALOON_CATEGORY_SUCCESS,
      payload: emptyArr,
    });
    yield put({
      type: actions.GET_SALOON_SERVICES_SUCCESS,
      payload: emptyArr,
    });
    const { detailCategory } = store.getState().DetailPage;
    const response = yield call(() =>
      getRequest(
        `public/service/getall_web?status=1&vendorid=${params.payload}`
      )
    );
    yield put({
      type: actions.SET_NEW_CATEGORY_SERVICE_LOADER,
      payload: true,
    });
    setCategoryAndServices(response.data.data, detailCategory);
    yield put({
      type: actions.GET_SALOON_SERVICES_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_SERVICES_FAILURE });
  }
}

export function* saloonCategory(params) {
  try {
    let emptyArr = [];
    yield put({
      type: actions.GET_SALOON_CATEGORY_SUCCESS,
      payload: emptyArr,
    });
    yield put({
      type: actions.GET_SALOON_SERVICES_SUCCESS,
      payload: emptyArr,
    });
    const { detailServices } = store.getState().DetailPage;
    const response = yield call(() =>
      getRequest(`public/category/getall?status=1&vendorid=${params.payload}`)
    );
    yield put({
      type: actions.SET_NEW_CATEGORY_SERVICE_LOADER,
      payload: true,
    });
    setCategoryAndServices(detailServices, response.data);
    yield put({
      type: actions.GET_SALOON_CATEGORY_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_CATEGORY_FAILURE });
  }
}

export function* saloontaff(params) {
  try {
    const response = yield call(() =>
      getRequest(`public/adminstaff/getall?status=1&vendorid=${params.payload}`)
    );
    yield put({
      type: actions.GET_SALOON_STAFF_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SALOON_STAFF_DETAILS_FAILURE });
  }
}

export function* serviceStaff(params) {
  try {
    yield put({
      type: actions.SET_SID,
      payload: params.payload.serviceid,
      //payload:response.data.data
    });
    const response = yield call(
      () =>
        getRequest(
          `public/adminstaff/getall_service?vendorid=${params.payload.vendorid}&serviceid=${params.payload.serviceid}&date=${params.payload.date}&time=${params.payload.time}&status=1`
        )
      // getRequest(
      //   `public/adminstaff/getall_service?status=1&vendorid=${params.payload.vendorid}&serviceid=${params.payload.serviceid}`
      // )
    );
    if (response.data.data) {
      yield put({
        type: actions.GET_SERVICE_STAFF_DETAILS_SUCCESS,
        payload: response.data.data,
      });
      yield put({
        type: actions.SET_SID,
        payload: params.payload.serviceid,
      });
    } else {
      yield put({
        type: actions.GET_SERVICE_STAFF_DETAILS_SUCCESS,
        payload: [],
      });
      yield put({
        type: actions.SET_SID,
        payload: params.payload.serviceid,
      });
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_SERVICE_STAFF_DETAILS_FAILURE });
  }
}

export function* saloonBooking(params) {
  try {
    const response = yield call(() =>
      postRequest("user/userbooking/create", params.payload)
    );
    if (response.data.code === 200) {
      yield put({
        type: actions.SET_SALOON_BOOKING_SUCCESS,
        payload: response.data,
      });
      /*
	  if (params.callBackAction) {
		  params.callBackAction(
			true,
			response.data.data.bookingid,
			response.data.data.vendor_name,
			response.data,
			response.data.data.service_details[0].service_time,
			response.data.data.service_details[0].service_date,
			response.data.data.bookingDetails.id

		  );
  	  }
  	  */
      // message.success(response.data.name);
    } else {
    }
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    //message.error(error)
    yield put({ type: actions.SET_SALOON_BOOKING_FAILURE });
  }
}

export function* cmsDetails(params) {
  try {
    const response = yield call(() =>
      getRequest("public/appconfig/getCMS?id=" + params.payload)
    );
    if (response.data.code === 200) {
      yield put({
        type: actions.GET_CMS_DETAILS_RESPONSE,
        payload: response.data.data,
      });
    } else {
      params.callBackAction(false);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.SET_SALOON_BOOKING_FAILURE });
  }
}

export function* faqDetails(params) {
  try {
    const response = yield call(() => getRequest("admin/faqmanage/getall"));
    if (response.data.code === 200) {
      yield put({
        type: actions.GET_FAQ_DETAILS_RES,
        payload: response.data.data,
      });
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_FAQ_DETAILS_FAILURE });
  }
}

export function* faqDetailsCommon(params) {
  try {
    const response = yield call(() => getRequest("public/common/faq_getall"));
    if (response.data.code === 200) {
      yield put({
        type: actions.GET_FAQ_DETAILS_COMMON_RES,
        payload: response.data.data,
      });
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_FAQ_DETAILS_COMMON_FAILURE });
  }
}

export function* saveRating(params) {
  try {
    const response = yield call(() =>
      postRequest("user/userreview/create", params.value)
    );
    if (response.data.code === 200) {
      message.success("Rating and Reviews submitted successfully!");
      if (params.callBackAction) {
        params.callBackAction(1);
        yield put({
          type: actions.RATING_SUCCESS_RES,
          payload: response.data.data,
        });

        yield put({
          type: actions.GET_SALOON_DETAILS,
          payload: parseInt(params.value.vendorid),
          userid: parseInt(params.value.userid),
        });
        window.location.reload();
      }
      /*
            yield put({
        type: actions.GET_SALOON_DETAILS,
        payload: parseInt(params.value.vendorid),
      });*/
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.RATING_FAILURE_RES });
  }
}

export function* saloonFavourite(params) {
  try {
    const response = yield call(() =>
      postRequest("user/user/favvendor", { ...params.payload })
    );

    if (response.status == 200) {
      window.location.reload();
      //console.log("restrue", response);
      // && actions.GET_SALOON_DETAILS
      yield put({
        type: actions.GET_SALOON_FAVOURITE_DETAILS,
        payload: parseInt(params.payload.vendorid),
      });
    }
    //  yield put({ type: actions.SET_SALOON_FAVOURITE_SUCCESS });
    //message.success(`Your Saloon is ${params.payload.favourite ? 'Added' : 'Removed'}`)
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.SET_SALOON_FAVOURITE_FAILURE });
  }
}

export function* validateVoucher(params) {
  try {
    const data = params.payload;
    const response = yield call(() =>
      getRequest(
        `user/user/validate_voucher?vouchercode=${data.vouchercode}&totalamount=${data.totalamount}&userid=${data.userid}&bookingdate=${data.Bookingdate}`
      )
    );
    if (response.data.data) {
      message.success("Voucher applied successfully!");
      yield put({
        type: actions.VALIDATE_VOUCHER_RESPONSE,
        payload: response.data.data,
      });
    } else {
      message.error(response.data.name);
    }
  } catch (error) {
    message.error(error.response);
  }
}

export function* bookingDetail(params) {
  try {
    const response = yield call(() =>
      getRequest(`user/userbooking/get?id=${params.id}`)
    );
    yield put({
      type: actions.GET_BOOKING_DETAILS_SUCCESS,
      payload: response.data.data.length > 0 ? response.data.data[0] : [],
    });
  } catch (error) {
    yield put({ type: actions.GET_BOOKING_DETAILS_FAILURE });
  }
}

export function* getratingvendorbyid(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/review/getbyrating?vendorid=${params.payload.vendorid}&rating=${params.payload.rating}`
      )
    );
    yield put({
      type: actions.GET_RATING_BY_VENDORID_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({ type: actions.GET_RATING_BY_VENDORID_FAILURE });
  }
}

export function* getsalonstaffslot(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/slot/getavailable?vendorid=${params.payload.vendorid}&service_id=${params.payload.serviceid}&service_date=${params.payload.date}`
      )
    );
    console.log("params.paylad", response.data.data);
    yield put({
      type: actions.GET_SALON_STAFF_TIME_SLOT_SUCCESS,
       payload: response.data.data,
    });
  } catch (error) {
    yield put({ type: actions.GET_SALON_STAFF_TIME_SLOT_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SALOON_DETAILS, saloonDetail),
    takeEvery(actions.GET_SALOON_SERVICES, saloonServices),
    takeEvery(actions.GET_SALOON_CATEGORY, saloonCategory),
    takeEvery(actions.GET_SALOON_STAFF_DETAILS, saloontaff),
    takeEvery(actions.GET_SERVICE_STAFF_DETAILS, serviceStaff),
    takeEvery(actions.SET_BOOKING, saloonBooking),
    takeEvery(actions.GET_CMS_VIEWDETAILS, cmsDetails),
    takeEvery(actions.GET_FAQ_DETAILS, faqDetails),
    takeEvery(actions.GET_FAQ_DETAILS_COMMON, faqDetailsCommon),
    takeEvery(actions.SAVE_RATING, saveRating),
    takeEvery(actions.SET_DETAILSALOON_FAVOURITE, saloonFavourite),
    takeEvery(actions.VALIDATE_VOUCHER, validateVoucher),
    takeEvery(actions.GET_BOOKING_DETAILS, bookingDetail),

    takeEvery(actions.GET_SALOON_DETAILS_DATES, saloonDates),
    takeEvery(actions.GET_RATING_BY_VENDORID, getratingvendorbyid),
    takeEvery(actions.GET_SALON_STAFF_TIME_SLOT, getsalonstaffslot),
  ]);
}
