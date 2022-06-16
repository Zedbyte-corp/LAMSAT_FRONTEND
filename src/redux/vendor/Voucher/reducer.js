import actions from "./actions";

const initState = {
  voucherCode: "",
  voucherCodeLoader: false,
  getVendorVoucherLanguage: [],
  vendorVoucherLangLoader: false,
  voucherList: [],
  voucherTypeList: [],
  vendorVoucherList: [],
  userList: [],
  loading: false,
};

export default function voucherReducer(state = initState, action) {
  switch (action.type) {
    case actions.CALL_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case actions.VOUCHER_LIST_RESPONSE: {
      return {
        ...state,
        voucherList: action.payload ? action.payload : [],
      };
    }
    case actions.GET_VENDOR_VOUCHER_TYPE_SUCCESS: {
      return {
        ...state,
        voucherTypeList: action.payload ? action.payload : [],
      };
    }
    case actions.GET_VENDOR_VOUCHER_LIST_RESPONSE: {
      return {
        ...state,
        vendorVoucherList: action.payload ? action.payload : [],
      };
    }
    case actions.GET_ALL_USER_RESPONSE: {
      return {
        ...state,
        userList: action.payload ? action.payload : [],
      };
    }
    case actions.GET_VENDOR_VOUCHER_CODE: {
      return {
        ...state,
        voucherCodeLoader: true,
      };
    }
    case actions.GET_VENDOR_VOUCHER_CODE_SUCCESS: {
      return {
        ...state,
        voucherCode: action.payload,
        voucherCodeLoader: false,
      };
    }
    case actions.GET_VENDOR_VOUCHER_CODE_FAILURE: {
      return {
        ...state,
        voucherCodeLoader: false,
      };
    }
    case actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST: {
      return {
        ...state,
        vendorVoucherLangLoader: true,
      };
    }
    case actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST_SUCCESS: {
      return {
        ...state,
        vendorVoucherLangLoader: false,
        getVendorVoucherLanguage: action.payload,
      };
    }
    case actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST_FAILURE: {
      return {
        ...state,
        vendorVoucherLangLoader: false,
      };
    }
    default:
      return state;
  }
}
