// import Constants from 'pages/Login/constants';
import actions from './customActions';
import ObjectAssign from 'object-assign';

const initialState = {
    loading: false,
    hasError: {},
    help: {},
    error: null,
    data: {},
    email_address: '',
    password: '',
    isAuthenticated: false,
    showForgotPassword: false,
    languageLists: [],
    adminNotificationLists: [],
    adminNotifyCount: 0,

};

const reducer = function (state = initialState, action) {

    if (action.type === actions.GET_LOGIN_DATA) {

        return ObjectAssign({}, state, {
            loading: true
        });
    }

    if (action.type === actions.GET_LANGUAGE_RESPONSE) {
        return ObjectAssign({}, state, {
            languageLists: (action.payload) ? action.payload.data : []
        });
    }

    if (action.type === actions.GET_ADMIN_NOTIFICATIONS_RESPONSE) {
        return ObjectAssign({}, state, {
            adminNotificationLists: (action.payload) ? action.payload.data : []
        });
    }

    if (action.type === actions.GET_ADMIN_NOTIFY_COUNT_RESPONSE) {
        return ObjectAssign({}, state, {
            adminNotifyCount: (action.payload) ? action.payload.data : 0
        });
    }

    if (action.type === actions.REST_ADMIN_NOTIFICATION_RESPONSE) {
        return ObjectAssign({}, state, {
            adminNotifyCount: 0
        });
    }

    if (action.type === actions.GET_LOGIN_DATA_RESPONSE) {

        // const validation = ParseValidation(action.response);
        // let result = action.response ? action.response.data : {};

        // const token = result ? result : null;

        // return ObjectAssign({}, state, {
        //     loading: false,
        //     success: !action.err,
        //     error: validation.error,
        //     hasError: validation.hasError,
        //     help: validation.help,
        //     isAuthenticated: token ? true : false,
        //     user: token ? JWT.decode(token) : {},
        //     data: token ? result : {},
        // });
        return {
            ...state,
            data: action.payload,
        }
    }

    if (action.type === actions.SET_AUTHORIZATION) {

        const token = action.token ? action.token : null;

        return ObjectAssign({}, state, {
            isAuthenticated: token ? true : false,
        });
    }

    if (action.type === actions.CLEAR_AUTHORIZATION) {
        return ObjectAssign({}, state, {
            isAuthenticated: false,
            user: {}
        });
    }

    if (action.type === actions.GET_USERS_RESPONSE) {

        return ObjectAssign({}, state, {
            userData: action.response && action.response.data ? action.response.data : {}
        });
    }

    if (action.type === actions.SHOW_FORGOT_PASSWORD) {

        return ObjectAssign({}, state, {
            showForgotPassword: !state.showForgotPassword,
        })
    }

    if (action.type === actions.FORGOT_PASSWORD_RESPONSE) {

        return ObjectAssign({}, state, {
            showForgotPassword: action.response && action.response.statusCode === 200 ? false : true,
        })
    }

    return state;
};

export default reducer;
