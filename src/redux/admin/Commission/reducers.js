import actions from './actions';

const initialState = {
    commissionLoader: false,
    commissionData:[],
};

const reducer = function (state = initialState, action) {

    switch (action.type) {

        case actions.GET_COMMISSION_LIST: {
            return {
                ...state,
                commissionLoader: true,
            };
        }
        case actions.GET_COMMISSION_LIST_SUCCESS: {
            return {
                ...state,
                commissionData: action.payload,
                commissionLoader: false,
            };
        }
        case actions.GET_COMMISSION_LIST_FAILURE: {
            return {
                ...state,
                commissionLoader: false,
            };
        }
        case actions.NEW_COMMISSION: {
            return {
                ...state,
                commissionLoader: true,
            };
        }
        case actions.NEW_COMMISSION_SUCCESS: {
            return {
                ...state,
                commissionData: action.payload,
                commissionLoader: false,
            };
        }
        case actions.NEW_COMMISSION: {
            return {
                ...state,
                commissionLoader: false,
            };
        }        
        default:
            break;
    }
    return state;
};

export default reducer;
