import { all, put, call, takeEvery } from 'redux-saga/effects';
import actions from './actions';
import { history, store } from 'redux/store';
import swal from 'sweetalert';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from 'helpers/axiosClient';
import { message } from 'antd';
import { getLocalData, getLocaleMessages } from 'redux/helper';
// import { history, store } from 'redux/store';
export function* getAdminPartnersdata(params) {

    try {

        //postRequest('public/partneraccount/create', { ...params.payload }),
        const response = yield call(() => getRequest('public/partneraccount/getall'))
        yield put({
            type: actions.PARTNERS_LIST_RESPONSE,
            payload: response.data.data,
        })
    } catch (error) {
        yield put({
            type: actions.CALL_LOADER,
        })
        message.error(getLocaleMessages({id:"city.list.error"}));
    }
}
export function* postPartnersdata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        let response;
        if (params && params.payload && params.payload.id) {
            response = yield call(() => putRequest('admin/contactus/update', params.payload))

            if (response) {
               params.callBackAction(true);
               message.success(response.data.name);
               yield put({
                type: actions.CALL_LOADER,
                })
            }
        } else {

            response = yield call(() => postRequest('admin/contactus/create', params.payload))
            if (response.data) {
                if(response.data.code === 200) {
                    params.callBackAction(true);
                    message.success(response.data.name);
                } else {
                    params.callBackAction(false);
                }

                yield put({
                    type: actions.CALL_LOADER,
                })
                yield put({
                    type: actions.GET_ADMIN_PARTNERS_LIST
                })
            }
        }
    } catch (error) {

        yield put({
            type: actions.CALL_LOADER,
        })
        let newErrorCustomization = '';
        if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
            error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
                newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
                return errorMessage;
            })
        } else {
            newErrorCustomization = error.response && error.response.data && error.response.data.message;
        }
        message.error(newErrorCustomization);
    }
}

export function* deletePartnersdata(params) {

    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        yield call(() => deleteRequest(`public/partneraccount/remove?id=${params.id}`))

        yield put({
            type: actions.GET_ADMIN_PARTNERS_LIST,
        })
        message.success("Partners data has been deleted successfully");
        yield put({
            type: actions.CALL_LOADER,
        })
    } catch (error) {
        message.error(`${error.response && error.response.data && error.response.data.message}`);
        yield put({
            type: actions.CALL_LOADER,
        })
    }
}


export function* getPartners(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest(`admin/contactus/get?id=${params.id}`));
        if(response.data.code == 200 ) {
            yield put({
                type: actions.PARTNERS_RESPONSE,
                payload: response.data.data[0],
            })
            params.callBackAction(true,response.data.data[0]);
        }
        yield put({
            type: actions.CALL_LOADER,
        })
    } catch (error) {
        message.error(`${error.response && error.response.data && error.response.data.message}`);
        params.callBackAction(false);
        yield put({
            type: actions.CALL_LOADER,
        })
    }
}


export function* getTotalCityDetail(params) {

    try {

      const response = yield call(() => getRequest('public/city/getall?status=1'))
      yield put({
        type: actions.GET_ALL_CITY_LIST_SUCCESS_PARTNERS ,
        payload: response.data.data,
      });
    } catch (error) {
      // message.error(error.response)
      yield put({ type: actions.GET_ALL_CITY_LIST_FAILURE_PARTNERS });
    }
  }

  export function* acceptPartnersReq(params) {

    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => postRequest(`admin/partneraccount/updateapplystatus`,params.payload))
        if (response.data) {
           // params.callBackAction();
            if(response.data.data === 1) {
                message.success("Partner application accepted");
                params.callBackAction(true);
            } else {
                message.success("Partner application rejected");
                params.callBackAction(true);
            }
            yield put({
             type: actions.CALL_LOADER,
            })
        }
    } catch (error) {
        params.callBackAction(false);
        message.error(`${error.response && error.response.data && error.response.data.message}`);
        yield put({
            type: actions.CALL_LOADER,
        })
    }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ADMIN_PARTNERS_LIST, getAdminPartnersdata),
    takeEvery(actions.POST_PARTNERS, postPartnersdata),
    takeEvery(actions.DELETE_PARTNERS, deletePartnersdata),
    takeEvery(actions.GET_PARTNERS, getPartners),
    takeEvery(actions.GET_ALL_CITY_LIST_PARTNERS, getTotalCityDetail),
    takeEvery(actions.ACCEPT_REQ, acceptPartnersReq),


  ]);
}
