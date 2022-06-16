import actions from './actions';
import ObjectAssign from 'object-assign';

const initialState = {
    submitLoader: false,
    isSettingpage:true,
    isappconfigLoad:false,
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
    rating_data:[],
    isRatingProfile: true
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
                submitLoader: !state.submitLoader
            });
        }

        case actions.UPDATE_SMTP_RESPONSE: {

            return {
                ...state,
                smtp: action.payload,
            };
        }

        case actions.UPDATE_CHECKED: {

            let is_smtp = { ...state.smtp };

            return {
                ...state,
                is_smtp:0,
            };
        }

        case actions.UPDATE_SOCIAL_MEDIA_RESPONSE: {

            return {
                ...state,
                socail_media: action.payload,
                isSettingpage:false,
            };
        }

        case actions.GET_SOCIAL_DETAILS_RESPONSE:{
            return{
                ...state,
                social_media: action.payload.length ? action.payload[0] : state.social_media,
                isSettingpage:false
            }
        }

        case actions.GET_SMS_DETAILS_RESPONSE:{
            return{
                ...state,
                sms: action.payload.length ? action.payload[0] : state.sms,
                isSettingpage:false,
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
                isSettingpage:false,
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

        case actions.UPLOAD_SITEDOC: {

            return ObjectAssign({}, state, {
            });
        }

        case actions.UPLOAD_SITEDOC_RESPONSE: {

            return ObjectAssign({}, state, {
                uploadfilepath0: action.payload && action.payload[0].data && action.payload[0].data.filePath,
            });
        }

        case actions.GET_APPCONFIG_RESPONSE: {
            return ObjectAssign({}, state, {
                app_config_data: action.payload,
                isSettingpage:false,
                isappconfigLoad:true
            });
        }
        case actions.GET_ADMIN_RATING_DETAILS_RESPONSE: {

            return ObjectAssign({}, state, {
                rating_data: action.payload,
                isRatingProfile: false
            });
        }



        default:
            break;
    }

    return state;
};

export default reducer;
