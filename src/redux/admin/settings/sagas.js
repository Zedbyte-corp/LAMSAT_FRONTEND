import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import {
  getRequest,
//   patchRequest,
   postRequest,
   putRequest,
   deleteRequest,
   uploadRequest,
} from 'helpers/axiosClient';
import swal from 'sweetalert';
import { getLocalData, getLocaleMessages } from 'redux/helper';

export function* updateSMS(params) {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => putRequest('admin/sms/update', params.payload))

        yield put({
            type: actions.UPDATE_SMS_RESPONSE,
            payload: response.data.data[0],
        })
        yield put({
            type: actions.GET_SMS_DETAILS
        })
        swal({
            title:  getLocaleMessages({id:"Update SMS"}),
            text: getLocaleMessages({id:"Your SMS settings updated successfully"}),
            icon: 'success',
            button: false,
            timer: 1500,
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
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
        swal({
            title: getLocaleMessages("SMS Error"),
            text: newErrorCustomization,
            icon: "error",
            button: false,
            //timer: 1500,
        });
    }
}


export function* sendSMS(){

    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => getRequest('admin/sms/sendsms'))

        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("SMS Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}



export function* getSMS() {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => getRequest(`admin/sms/getall`))

        yield put({
            type: actions.GET_SMS_DETAILS_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("SMS Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}





export function* deleteRatings(params) {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => deleteRequest(`admin/review/remove?id=${params.id}`))

        yield put({
            type: actions.GET_ADMIN_RATINGS
        })
        yield put({
            type: actions.SHOW_LOADER
        })

        swal({
            title:  getLocaleMessages({id:"Delete"}),
            text: getLocaleMessages({id:"Review Deleted successfully"}),
            icon: 'success',
            button: false,
            timer: 1500,
        })

    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("SMS Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}

export function* statusRatings(params) {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => putRequest(`admin/review/review_approval`,params.params))

        yield put({
            type: actions.GET_ADMIN_RATINGS
        })

        swal({
            title:  getLocaleMessages({id:"Update"}),
            text: getLocaleMessages({id:"Review Status Updated successfully"}),
            icon: 'success',
            button: false,
            timer: 1500,
        })
        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("SMS Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}


export function* getAdminRatings() {
    try {
        const response = yield call(() => getRequest(`admin/review/getall`))

        yield put({
            type: actions.GET_ADMIN_RATING_DETAILS_RESPONSE,
            payload: response.data.data,
        })
    } catch (error) {
      /*  yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("SMS Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });*/
    }
}


export function* getSMTP() {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => getRequest('admin/smtp/getall'))

        yield put({
            type: actions.GET_SMTP_DETAILS_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("SMTP Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}

export function* updateSMTP(params) {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => putRequest('admin/smtp/update', params.payload))

        yield put({
            type: actions.UPDATE_SMTP_RESPONSE,
            payload: response.data.data[0],
        })
        yield put({
            type: actions.GET_SMTP_DETAILS
        })
        swal({
            title:  getLocaleMessages({id:"Update SMTP"}),
            text: getLocaleMessages({id:"Your SMTP settings updated successfully"}),
            icon: 'success',
            button: false,
            timer: 1500,
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
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
        swal({
            title: getLocaleMessages("SMTP Error"),
            text: newErrorCustomization,
            icon: "error",
            button: false,
            //timer: 1500,
        });

    }
}

export function* updateSocialMedia(params) {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => putRequest('admin/socialmedia/update', params.payload))

        yield put({
            type: actions.UPDATE_SOCIAL_MEDIA_RESPONSE,
            payload: response.data.data[0],
        })
        yield put({
            type: actions.GET_SOCIAL_DETAILS
        })

        swal({
            title:  getLocaleMessages({id:"Update Social Media"}),
            text: getLocaleMessages({id:"Your Social Media link updated successfully"}),
            icon: 'success',
            button: false,
            timer: 1500,
        })

    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
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
        swal({
            title: getLocaleMessages("Social Media Error"),
            text: newErrorCustomization,
            icon: "error",
            button: false,
            //timer: 1500,
        });
    }
}


export function* getSocialMedia() {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => getRequest('admin/socialmedia/getall'))

        yield put({
            type: actions.GET_SOCIAL_DETAILS_RESPONSE,
            payload: response.data.data,
        })
        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("Social media Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}

export function* getAppConfig() {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => getRequest('admin/appconfig/get'))
        yield put({
            type: actions.GET_APPCONFIG_RESPONSE,
            payload: response.data.data[0],
        })
        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages("App config Error"),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}

export function* updateAppConfig(params) {
    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => putRequest('admin/appconfig/update', params.payload))

        swal({
            title:  getLocaleMessages({id:"App Config Updated Successfully"}),
            text: `${response && response.data &&response.data.name}`,
            icon: "success",
            button: false,
            timer: 1500,
        });
        yield put({
            type: actions.GET_APPCONFIG,
        })
        yield put({
            type: actions.SHOW_LOADER
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
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
        swal({
            title: getLocaleMessages("App config Error"),
            text: newErrorCustomization,
            icon: "error",
            button: false,
            //timer: 1500,
        });
    }
}

export function* getSiteImageUploadedResponse(params) {

    try {
        yield put({
            type: actions.SHOW_LOADER
        })
        const response = yield call(() => uploadRequest(`public/general/upload`, params.payload))

        if(params.callBackAction){
            yield put({
                type: actions.SHOW_LOADER
            })
            params.callBackAction(response.data[0].data.filePath)
          } else {
            yield put({
                type: actions.SHOW_LOADER
            })
            swal({
                title: getLocaleMessages("Image Upload Successfully"),
                text: getLocaleMessages("Site Image upload in the server"),
                icon: "success",
                button: false,
                timer: 1500,
              });
          }
        yield put({
            type: actions.UPLOAD_SITEDOC_RESPONSE,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: actions.SHOW_LOADER
        })
        swal({
            title: getLocaleMessages({ id: "Image Upload Error" }),
            text: `${error.response && error.response.data && error.response.data.message}`,
            icon: "error",
            button: true,
            //timer: 1500,
        });
    }
}

export default function* ratingSaga() {
    yield all([
        takeEvery(actions.UPDATE_SMS, updateSMS),
        takeEvery(actions.SEND_SMS, sendSMS),

        takeEvery(actions.GET_SMS_DETAILS, getSMS),
        takeEvery(actions.UPDATE_SMTP, updateSMTP),
        takeEvery(actions.GET_SMTP_DETAILS, getSMTP),
        takeEvery(actions.GET_SOCIAL_DETAILS, getSocialMedia),
        takeEvery(actions.UPDATE_SOCIAL_MEDIA, updateSocialMedia),
        takeEvery(actions.UPDATE_CONFIG, updateAppConfig),
        takeEvery(actions.GET_APPCONFIG, getAppConfig),
        takeEvery(actions.UPLOAD_SITEDOC, getSiteImageUploadedResponse),
        takeEvery(actions.GET_ADMIN_RATINGS, getAdminRatings),
        takeEvery(actions.DELETE_RATING, deleteRatings),
        takeEvery(actions.ADMIN_APPROVE_RATING, statusRatings),
        takeEvery(actions.ADMIN_UNAPPROVE_RATING, statusRatings),

    ]);
}
