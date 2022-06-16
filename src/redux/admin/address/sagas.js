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
export function* getAdminCitydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest('public/city/getall'))
        yield put({
            type: actions.CITY_LIST_RESPONSE,
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
export function* getUserCitydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest(`public/usercity/getall?status=1&&countryid=${params.countryid}`))
        yield put({
            type: actions.USER_CITY_LIST_RESPONSE,
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
export function* postCitydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        let response;
        if (params && params.payload && params.payload.id) {
            response = yield call(() => putRequest('admin/city/update', params.payload))

            if (response) {
               params.callBackAction(true);
               message.success(response.data.name);
               yield put({
                   type: actions.CALL_CITY_UPDATE_SUCESS
               })
               yield put({
                type: actions.CALL_LOADER,
                })
            }
        } else {

            response = yield call(() => postRequest('admin/city/create', params.payload))
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
                    type: actions.GET_ADMIN_CITY_LIST
                })
                yield put({
                    type: actions.CALL_CITY_SUCESS,
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

export function* deleteCitydata(params) {
    try {

        yield put({
            type: actions.CALL_LOADER,
        })
        yield call(() => deleteRequest(`admin/city/delete?id=${params.id}`))

        yield put({
            type: actions.GET_ADMIN_CITY_LIST,
        })
        message.success("City has been deleted successfully");
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


export function* getCity(params) {
    try {

        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest(`admin/city/get?id=${params.id}`));
        if(response.data.code == 200 ) {
            yield put({
                type: actions.CITY_RESPONSE,
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

//country api list
export function* getAdminCountrydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest('public/country/getall'))
        yield put({
            type: actions.COUNTRY_LIST_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.CALL_LOADER,
        })
    } catch (error) {
        yield put({
            type: actions.CALL_LOADER,
        })
        message.error(getLocaleMessages({id:"country.list.error"}));
    }
}
export function* getUserCountrydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest('public/usercountry/getall?status=1'))
        yield put({
            type: actions.USER_COUNTRY_LIST_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.CALL_LOADER,
        })
    } catch (error) {
        yield put({
            type: actions.CALL_LOADER,
        })
        message.error(getLocaleMessages({id:"country.list.error"}));
    }
}
export function* postCountrydata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        let response;
        if (params && params.payload && params.payload.id) {
            response = yield call(() => putRequest('admin/country/update', params.payload))

            if (response) {
               params.callBackAction(true);
               message.success(response.data.name);
               yield put({
                   type: actions.CALL_COUNTRY_UPDATE_SUCESS
               })
               yield put({
                type: actions.CALL_LOADER,
                })
            }
        } else {

            response = yield call(() => postRequest('admin/country/create', params.payload))
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
                    type: actions.GET_ADMIN_COUNTRY_LIST
                })
                yield put({
                    type: actions.CALL_COUNTRY_SUCESS,
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

export function* deleteCountrydata(params) {
    try {

        yield put({
            type: actions.CALL_LOADER,
        })
        yield call(() => deleteRequest(`admin/country/delete?id=${params.id}`))

        yield put({
            type: actions.GET_ADMIN_COUNTRY_LIST,
        })
        message.success("Country has been deleted successfully");
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


export function* getCountry(params) {
    try {

        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest(`admin/country/get?id=${params.id}`))
        if(response.data.code == 200 ) {
            yield put({
                type: actions.COUNTRY_RESPONSE,
                payload: response.data.data[0],
            })
            params.callBackAction(true,response.data.data[0]);
        }
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


//area api list
export function* getAdminAreadata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest('public/area/getall'))
        yield put({
            type: actions.AREA_LIST_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.CALL_LOADER,
        })
    } catch (error) {
        yield put({
            type: actions.CALL_LOADER,
        })
        message.error(getLocaleMessages({id:"area.list.error"}));
    }
}
export function* postAreadata(params) {
    try {
        yield put({
            type: actions.CALL_LOADER,
        })
        let response;
        if (params && params.payload && params.payload.id) {
            response = yield call(() => putRequest('admin/area/update', params.payload))

            if (response) {
               params.callBackAction(true);
               message.success(response.data.name);
               yield put({
                   type: actions.CALL_AREA_UPDATE_SUCESS
               })
               yield put({
                type: actions.CALL_LOADER,
                })
            }
        } else {

            response = yield call(() => postRequest('admin/area/create', params.payload))
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
                    type: actions.GET_ADMIN_AREA_LIST
                })
                yield put({
                    type: actions.CALL_AREA_SUCESS,
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

export function* deleteAreadata(params) {
    try {

        yield put({
            type: actions.CALL_LOADER,
        })
        yield call(() => deleteRequest(`admin/area/delete?id=${params.id}`))

        yield put({
            type: actions.GET_ADMIN_AREA_LIST,
        })
        message.success("Area has been deleted successfully");
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


export function* getArea(params) {
    try {

        yield put({
            type: actions.CALL_LOADER,
        })
        const response = yield call(() => getRequest(`admin/area/get?id=${params.id}`))
        if(response.data.code == 200) {
            yield put({
                type: actions.AREA_RESPONSE,
                payload: response.data.data[0]
            })
            params.callBackAction(true,response.data.data[0]);
        }
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

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ADMIN_CITY_LIST, getAdminCitydata),
    takeEvery(actions.POST_CITY, postCitydata),
    takeEvery(actions.DELETE_CITY, deleteCitydata),
    takeEvery(actions.GET_CITY, getCity),

    takeEvery(actions.GET_ADMIN_COUNTRY_LIST, getAdminCountrydata),
    takeEvery(actions.POST_COUNTRY, postCountrydata),
    takeEvery(actions.DELETE_COUNTRY, deleteCountrydata),
    takeEvery(actions.GET_COUNTRY, getCountry),

    takeEvery(actions.GET_ADMIN_AREA_LIST, getAdminAreadata),
    takeEvery(actions.POST_AREA, postAreadata),
    takeEvery(actions.DELETE_AREA, deleteAreadata),
    takeEvery(actions.GET_AREA, getArea),

    takeEvery(actions.GET_USER_CITY_LIST, getUserCitydata),
    takeEvery(actions.GET_USER_COUNTRY_LIST, getUserCountrydata),
  ]);
}
