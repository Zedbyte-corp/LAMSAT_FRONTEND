import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import {
  putRequest,
  getRequest,
  uploadRequest,
  uploadImageRequest,
} from "helpers/axiosClient";
//import swal from 'sweetalert';
//import { getLocaleMessages } from 'redux/helper';
import { message } from "antd";

// export function* updateSMS(params) {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => putRequest('common/sms_update', params.payload))

//         yield put({
//             type: actions.UPDATE_SMS_RESPONSE,
//             payload: response.data.data[0],
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         swal({
//             title: getLocaleMessages("Update SMS"),
//             text: getLocaleMessages("Your SMS settings updated successfully"),
//             icon: 'success',
//             button: false,
//             timer: 1500,
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         let newErrorCustomization = '';
//         if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
//         error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
//             newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
//             return errorMessage;
//         })
//         } else {
//         newErrorCustomization = error.response && error.response.data && error.response.data.message;
//         }
//         swal({
//             title: getLocaleMessages("SMS Error"),
//             text: newErrorCustomization,
//             icon: "error",
//             button: false,
//             //timer: 1500,
//         });
//     }
// }

// export function* getSMS() {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => getRequest(`common/sms_get?status=1`))

//         yield put({
//             type: actions.GET_SMS_DETAILS_RESPONSE,
//             payload: response.data.data,
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         swal({
//             title: getLocaleMessages("SMS Error"),
//             text: `${error.response && error.response.data && error.response.data.message}`,
//             icon: "error",
//             button: true,
//             //timer: 1500,
//         });
//     }
// }

// export function* getSMTP() {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => getRequest(`common/smtp_get?status=1`))

//         yield put({
//             type: actions.GET_SMTP_DETAILS_RESPONSE,
//             payload: response.data.data,
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         swal({
//             title: getLocaleMessages("SMTP Error"),
//             text: `${error.response && error.response.data && error.response.data.message}`,
//             icon: "error",
//             button: true,
//             //timer: 1500,
//         });
//     }
// }

// export function* updateSMTP(params) {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => putRequest('common/smtp_update', params.payload))

//         yield put({
//             type: actions.UPDATE_SMTP_RESPONSE,
//             payload: response.data.data[0],
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         swal({
//             title: getLocaleMessages("Update SMTP"),
//             text: getLocaleMessages("Your SMTP settings updated successfully"),
//             icon: 'success',
//             button: false,
//             timer: 1500,
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         let newErrorCustomization = '';
//         if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
//         error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
//             newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
//             return errorMessage;
//         })
//         } else {
//         newErrorCustomization = error.response && error.response.data && error.response.data.message;
//         }
//         swal({
//             title: getLocaleMessages("SMTP Error"),
//             text: newErrorCustomization,
//             icon: "error",
//             button: false,
//             //timer: 1500,
//         });

//     }
// }

// export function* updateSocialMedia(params) {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => putRequest('common/social_update', params.payload))

//         yield put({
//             type: actions.UPDATE_SOCIAL_MEDIA_RESPONSE,
//             payload: response.data.data[0],
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })

//         swal({
//             title: getLocaleMessages("Update Social Media"),
//             text: getLocaleMessages("Your Social Media link updated successfully"),
//             icon: 'success',
//             button: false,
//             timer: 1500,
//         })

//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         let newErrorCustomization = '';
//         if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
//         error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
//             newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
//             return errorMessage;
//         })
//         } else {
//         newErrorCustomization = error.response && error.response.data && error.response.data.message;
//         }
//         swal({
//             title: getLocaleMessages("Social Media Error"),
//             text: newErrorCustomization,
//             icon: "error",
//             button: false,
//             //timer: 1500,
//         });
//     }
// }

// export function* getSocialMedia() {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => getRequest('common/social_getAll?status=1'))

//         yield put({
//             type: actions.GET_SOCIAL_DETAILS_RESPONSE,
//             payload: response.data.data,
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         swal({
//             title: getLocaleMessages("Social media Error"),
//             text: `${error.response && error.response.data && error.response.data.message}`,
//             icon: "error",
//             button: true,
//             //timer: 1500,
//         });
//     }
// }

// export function* getAppConfig() {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => getRequest('common/auth/app_configget?status=1'))
//         yield put({
//             type: actions.GET_APPCONFIG_RESPONSE,
//             payload: response.data,
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         swal({
//             title: getLocaleMessages("App config Error"),
//             text: `${error.response && error.response.data && error.response.data.message}`,
//             icon: "error",
//             button: true,
//             //timer: 1500,
//         });
//     }
// }

// export function* updateAppConfig(params) {
//     try {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         const response = yield call(() => putRequest('common/auth/app_configupdate', params.payload))

//         swal({
//             title: getLocaleMessages("App Config Updated Successfully"),
//             text: `${response && response.data &&response.data.name}`,
//             icon: "success",
//             button: false,
//             timer: 1500,
//         });
//         yield put({
//             type: actions.GET_APPCONFIG,
//         })
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//     } catch (error) {
//         yield put({
//             type: actions.SHOW_LOADER
//         })
//         let newErrorCustomization = '';
//         if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
//             error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
//                 newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
//                 return errorMessage;
//             })
//         } else {
//             newErrorCustomization = error.response && error.response.data && error.response.data.message;
//         }
//         swal({
//             title: getLocaleMessages("App config Error"),
//             text: newErrorCustomization,
//             icon: "error",
//             button: false,
//             //timer: 1500,
//         });
//     }
// }

export function* createSaloonNumber(params) {
  try {
    yield put({
      type: actions.SHOW_LOADER,
    });
    const response = yield call(() => getRequest(`common/getnumber`));
    params.callBackAction(response, true);
    yield put({
      type: actions.SHOW_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.SHOW_LOADER,
    });
    // swal({
    //     title: getLocaleMessages("SMTP Error"),
    //     text: `${error.response && error.response.data && error.response.data.message}`,
    //     icon: "error",
    //     button: true,
    //     //timer: 1500,
    // });
  }
}

export function* createPartnerNumber(params) {
  try {
    yield put({
      type: actions.SHOW_LOADER,
    });
    const response = yield call(() =>
      getRequest(`public/partneraccount/getvendornumber`)
    );
    params.callBackAction(response, true);
    yield put({
      type: actions.SHOW_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.SHOW_LOADER,
    });
  }
}

export function* getSiteImageUploadedResponse(params) {
  try {
    yield put({
      type: actions.SHOW_LOADER,
    });
    const response = yield call(() =>
      uploadRequest(`common/common/upload_img`, params.payload)
    );
    if (params.callBackAction) {
      yield put({
        type: actions.SHOW_LOADER,
      });
      params.callBackAction(
        response.data[0].data.filePath,
        response.data[0].data.image_url
      );
      var imgArr = [];
      imgArr.push(response.data[0].data.filePath);
      yield put({
        type: actions.SAVE_IMAGE_PATH,
        payload: imgArr,
      });
    } else {
      yield put({
        type: actions.SHOW_LOADER,
      });
      message.success("Image Upload Successfully");
    }
    yield put({
      type: actions.UPLOAD_SITEIMG_RESPONSE,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.SHOW_LOADER,
    });
    message.error("Image Upload Failed,Please Try Again");
  }
}

export function* getPublicImageUploadedResponse(params) {
  try {
    const response = yield call(() =>
      uploadImageRequest(`public/general/upload`, params.payload)
    );
    if (response.data) {
      if (params.callBackAction) {
        params.callBackAction(
          response.data[0].data.filePath,
          response.data[0].data.image_url
        );
        var imgArr = [];
        imgArr.push(response.data[0].data.filePath);
      } else {
        message.success("Image Upload Successfully");
      }
    }
  } catch (error) {
    message.error("Image Upload Error");
  }
}

export default function* rootSaga() {
  yield all([
    // takeEvery(actions.UPDATE_SMS, updateSMS),
    // takeEvery(actions.GET_SMS_DETAILS, getSMS),
    // takeEvery(actions.UPDATE_SMTP, updateSMTP),
    // takeEvery(actions.GET_SMTP_DETAILS, getSMTP),
    // takeEvery(actions.GET_SOCIAL_DETAILS, getSocialMedia),
    // takeEvery(actions.UPDATE_SOCIAL_MEDIA, updateSocialMedia),
    // takeEvery(actions.UPDATE_CONFIG, updateAppConfig),
    // takeEvery(actions.GET_APPCONFIG, getAppConfig),
    takeEvery(actions.UPLOAD_SITEIMG, getSiteImageUploadedResponse),
    takeEvery(actions.CREATE_SALOON_NUMBER, createSaloonNumber),
    takeEvery(actions.CREATE_PARTNER_NUMBER, createPartnerNumber),
    takeEvery(actions.UPLOAD_COMMONIMG, getPublicImageUploadedResponse),
  ]);
}
