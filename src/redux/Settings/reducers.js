import actions from './actions';
import ObjectAssign from 'object-assign';

const initialState = {
    imageLoader: false,
    smtp:{
        smtp_host: '',
        smtp_encryption: '',
        smtp_port: '',
        smtp_username: '',
        smtp_password: '',
        is_smtp: 0,
    },
    sms: {    
        sms_username: "",
        sms_password: "",
        sms_from: "",
        sms_countrycode: "",
        is_sms: 0,
    },
    social_media:{
        facebook: "",
        twitter: "",
        instagram: "",
        google_plus: ""
    },
    app_config_data: {},
    imgDetails: {},
    uploadfilepath0: null,
    uploadImages: [],
};

const reducer = function (state = initialState, action) {

    switch (action.type) {

        case actions.UPDATE_SMS_RESPONSE: {

            return {
                ...state,
                sms: action.payload,
            };
        }

        case actions.SHOW_LOADER: {
            return ObjectAssign({}, state, {
                imageLoader: !state.imageLoader
            });
        }

        case actions.SAVE_IMAGE_PATH: {
            return {
                ...state,
                uploadImages: action.payload,
            }
        }

        case actions.UPDATE_SMTP_RESPONSE: {

            return {
                ...state,
                smtp: action.payload,
            };
        }

        case actions.UPDATE_SOCIAL_MEDIA_RESPONSE: {

            return {
                ...state,
                socail_media: action.payload,
            };
        }

        case actions.GET_SOCIAL_DETAILS_RESPONSE:{
            return{
                ...state,
                social_media: action.payload.length ? action.payload[0] : state.social_media,
            }
        }

        case actions.GET_SMS_DETAILS_RESPONSE:{
            return{
                ...state,
                sms: action.payload.length ? action.payload[0] : state.sms,
            }
        }

        case actions.GET_SMS_DETAILS:{
            return{
                ...state,
            }
        }

        case actions.GET_SMTP_DETAILS:{
            return{
                ...state,
            }
        }

        case actions.GET_SMTP_DETAILS_RESPONSE:{
            return{
                ...state,
                smtp: action.payload.length ? action.payload[0] : state.smtp,
            }
        }

        case actions.UPDATE_CONFIG: {
            return {
                ...state,
            };
        }

        case actions.UPLOAD_SITEIMAGE_RESPONSE: {

            return ObjectAssign({}, state, {
                imgDetails: action.payload,
            });
        }
        
        case actions.UPLOAD_SITEIMG: {

            return ObjectAssign({}, state, {
            });
        }
        
        case actions.UPLOAD_SITEIMG_RESPONSE: {

            return ObjectAssign({}, state, {
                uploadfilepath0: action.payload && action.payload[0].data && action.payload[0].data.filePath,
            });
        }
        
        case actions.GET_APPCONFIG_RESPONSE: {
            return ObjectAssign({}, state, {
                app_config_data: action.payload,
            });
        }

        default:
            break;
    }

    return state;
};

export default reducer;
