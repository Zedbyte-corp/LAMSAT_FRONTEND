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
export function* getAdminEnquirydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest('admin/contactus/getall?status=1'))
        yield put({
            type: actions.ENQUIRY_LIST_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.CALL_LOADER,
        })
    } catch (error) {
        yield put({
            type: actions.CALL_LOADER,
        })
        message.error(getLocaleMessages({id:"city.list.error"}));
    }
}
export function* postEnquirydata(params) {
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
                    type: actions.GET_ADMIN_ENQUIRY_LIST
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

export function* deleteEnquirydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        yield call(() => deleteRequest(`admin/contactus/delete?id=${params.id}`))

        yield put({
            type: actions.GET_ADMIN_ENQUIRY_LIST,
        })
        message.success("Enquiry data has been deleted successfully");
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


export function* getEnquiry(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest(`admin/contactus/get?id=${params.id}`));
        if(response.data.code == 200 ) {
            yield put({
                type: actions.ENQUIRY_RESPONSE,
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



export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ADMIN_ENQUIRY_LIST, getAdminEnquirydata),
    takeEvery(actions.POST_ENQUIRY, postEnquirydata),
    takeEvery(actions.DELETE_ENQUIRY, deleteEnquirydata),
    takeEvery(actions.GET_ENQUIRY, getEnquiry),

  ]);
}
