import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import { getRequest, postRequest } from "helpers/axiosClient";
import { message } from "antd";
import moment from "moment";
// import { history, store } from 'redux/store';
// import { message } from 'antd';

// export function* listingSaloon(params) {
//   try {
//     const { latitude, longitude } = params.payload;
//     const response = yield call(() =>
//       getRequest(`public/website/instant_sallon?status=1&latitude=${latitude}&longitude=${longitude}`),
//     );
//     yield put({
//       type: actions.GET_LOGIN_LISTING_SALOON_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     // message.error(error.response)
//     yield put({ type: actions.GET_LISTING_SALOON_FAILURE });
//   }
// }

export function* loginListingSaloon(params) {
  try {
    const {
      latitude,
      longitude,
      sortby,
      service_available,
      userid,
      vendoraddress,
      categoryid,
      vendorlocation,
      searchdate,
      searchtime
    } = params.payload;
    console.log("test", vendoraddress, categoryid);
    var url = `public/website/getvendors?status=1&latitude=${
      latitude != 0 ? latitude : 23.8859
    }&longitude=${longitude != 0 ? longitude : 45.0792}`;
    if (userid) {
      url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${longitude != 0 ? longitude : 45.0792}&userid=${userid}`;
    }
    if (userid && sortby) {
      url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&userid=${userid}&sortby=${sortby}`;
    }
    if (sortby) {
      url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${longitude != 0 ? longitude : 45.0792}&sortby=${sortby}`;
    }
    if (service_available) {
      url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&service_available=${service_available}`;
    }
    if (sortby && service_available) {
      url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&sortby=${sortby}&service_available=${service_available}&vendorlocation=${vendorlocation}`;
    }
    if (userid && sortby && service_available) {
      url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&sortby=${sortby}&service_available=${service_available}&userid=${userid}&vendorlocation=${vendorlocation}`;
    }
    if (vendoraddress) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&vendoraddress=${vendoraddress}`;
    }
    if (vendoraddress && userid) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&vendoraddress=${vendoraddress}&userid=${userid}`;
    }
    if (vendoraddress && userid && sortby) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&vendoraddress=${vendoraddress}&userid=${userid}&sortby=${sortby}`;
    }
    if (vendoraddress && sortby && service_available) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&vendoraddress=${vendoraddress}&userid=${userid}&sortby=${sortby}&service_available=${service_available}`;
    }
    if (categoryid) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&categoryid=${categoryid}`;
    }
    if (categoryid && categoryid) {
      // if(categoryid && vendoraddress)
      // {
      //   var url = userid ? `public/website/getvendors?status=1&latitude=${latitude}&longitude=${longitude}&categoryid=${categoryid}&vendoraddress=${vendoraddress}&userid=${userid}`
      //             : `public/website/getvendors?status=1&latitude=${latitude}&longitude=${longitude}&categoryid=${categoryid}&vendoraddress=${vendoraddress}`
      // } else{
      //   var url = `public/website/getvendors?status=1&latitude=${latitude}&longitude=${longitude}&categoryid=${categoryid}&userid=${userid}`;
      // }
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&categoryid=${categoryid}&userid=${userid}`;
    }
    if (categoryid && userid && sortby) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&categoryid=${categoryid}&userid=${userid}&sortby=${sortby}`;
    }
    if (categoryid && sortby && service_available) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&categoryid=${categoryid}&userid=${userid}&sortby=${sortby}&service_available=${service_available}`;
    }
    if (categoryid && sortby && service_available && vendoraddress) {
      var url = `public/website/getvendors?status=1&latitude=${
        latitude != 0 ? latitude : 23.8859
      }&longitude=${
        longitude != 0 ? longitude : 45.0792
      }&categoryid=${categoryid}&userid=${userid}&sortby=${sortby}&service_available=${service_available}&vendoraddress=${vendoraddress}`;
    }
    if(searchdate)
    {
      var url = url+`&fromdate=${searchdate}&todate=${moment(searchdate).add(1, 'd').format('YYYY-MM-DD')} ${searchtime}`
    }
    if(searchdate && searchtime)
    {
      var url = url+`&fromdate=${searchdate} ${searchtime}&todate=${moment(searchdate).add(1, 'd').format('YYYY-MM-DD')} ${searchtime}`
    }
    const response = yield call(() => getRequest(url));

    yield put({
      type: actions.GET_LISTING_SALOON_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_LOGIN_LISTING_SALOON_FAILURE });
  }
}

export function* listingSaloonData(params) {
  try {
    const { latitude, longitude, sortby, service_available } = params.payload;
    var url = `public/website/near_vendor?status=1&latitude=${latitude}&longitude=${longitude}`;
    if (sortby) {
      url = `public/website/near_vendor?status=1&latitude=${latitude}&longitude=${longitude}&sortby=${sortby}`;
    }
    if (service_available) {
      url = `public/website/near_vendor?status=1&latitude=${latitude}&longitude=${longitude}&service_available=${service_available}`;
    }
    if (sortby && service_available) {
      url = `public/website/near_vendor?status=1&latitude=${latitude}&longitude=${longitude}&sortby=${sortby}&service_available=${service_available}`;
    }
    const response = yield call(() => getRequest(url));

    yield put({
      type: actions.GET_NEARBY_SALOON_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_NEARBY_SALOON_FAILURE });
  }
}

export function* saloonFavourite(params) {
  try {
    const response = yield call(() =>
      postRequest("user/user/favvendor", { ...params.payload })
    );
    /* yield put({
      type: actions.GET_LOGIN_LISTING_SALOON,
      payload:{
        latitude: params.latitude,
        longitude: params.longitude,
        userid: params.userid,
      },
    });*/
    console.log("response", response);
    yield put({
      type: actions.SET_SALOON_FAVOURITE_SUCCESS,
      payload: params.payload.vendorid,
    });
    message.success(
      `Your Saloon is ${params.payload.favourite ? "Added" : "Removed"}`
    );
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.SET_SALOON_FAVOURITE_FAILURE });
  }
}

export function* categorysaloonDetail(params) {
  try {
    var URL = "";
    if (params.payload) {
      URL = `public/website/category_saloons?status=1&categoryid=${params.payload}`;
    } else {
      URL = `public/website/category_saloons?status=1`;
    }
    const response = yield call(() => getRequest(URL));
    yield put({
      type: actions.GET_CATEGORY_SALOON_DETAILS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_CATEGORY_SALOON_DETAILS_FAILURE });
  }
}

export function* vendorbyname(params) {
  try {
    var URL = `public/website/getvendorbyname?vendorname=${params.payload}`;
    const response = yield call(() => getRequest(URL));
    yield put({
      type: actions.GET_VENDOR_BY_NAME_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({ type: actions.GET_VENDOR_BY_NAME_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_NEARBY_SALOON, listingSaloonData),
    takeEvery(actions.GET_LOGIN_LISTING_SALOON, loginListingSaloon),
    takeEvery(actions.SET_SALOON_FAVOURITE, saloonFavourite),
    takeEvery(actions.GET_CATEGORY_SALOON_DETAILS, categorysaloonDetail),
    takeEvery(actions.GET_VENDOR_BY_NAME, vendorbyname),
  ]);
}
