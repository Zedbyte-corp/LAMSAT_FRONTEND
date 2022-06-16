import actions from './actions';

const initState = {
    fileUploadLoader: false,
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.UPLOAD_FILE:{
        return {
            ...state,
            fileUploadLoader: true,
        }
    }
    case actions.UPLOAD_FILE_SUCCESS:{
        return {
            ...state,
            fileUploadLoader: false,
        }
    }
    case actions.UPLOAD_FILE_FAILURE:{
        return {
            ...state,
            fileUploadLoader: false,
        }
    }
    default:
      return state;
  }
}
