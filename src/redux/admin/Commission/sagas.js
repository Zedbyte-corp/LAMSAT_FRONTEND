import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import {
  getRequest,
   putRequest,
} from 'helpers/axiosClient';
import swal from 'sweetalert';

export function* getCommissionList() {
    try {
        const response = yield call(() => getRequest(`admin/vat/get`))
        yield put({
            type: actions.GET_COMMISSION_LIST_SUCCESS,
            payload: response.data.data,
        })
    } catch (error) {
        yield put({
            type: actions.GET_COMMISSION_LIST_FAILURE
        })
 
    }
}

export function* newCommissionCreate(params) {
    try {
        //console.log(params.payload)
        const response = yield call(() => putRequest(`admin/settings/update`,params.payload))
        yield put({
            type: actions.NEW_COMMISSION_SUCCESS,
            payload: response.data.data,
        })
        swal({
            title: "Success",
            text: "Commision Created Successfully",
            icon: "success",
            button: true,
        });        
    } catch (error) {
        yield put({
            type: actions.NEW_COMMISSION_FAILURE
        })
        swal({
            title: "Failed",
            text: "Commision Created Failed",
            icon: "error",
            button: true,
        });
    }
}
export default function* ratingSaga() {
    yield all([
        takeEvery(actions.GET_COMMISSION_LIST, getCommissionList),
        takeEvery(actions.NEW_COMMISSION, newCommissionCreate),
    ]);
}
