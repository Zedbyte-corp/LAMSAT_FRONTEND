import actions from './actions';

const initState = {
    editProfileLoader: false,
    editProfileSuccess: false,
    imageUploadLoader: false,
    userPasswordLoader: false,
    userPasswordSuccess: false,
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.EDIT_PROFILE: {
      return {
        ...state,
        editProfileLoader: true,
        editProfileSuccess: false,
      };
    }
    case actions.EDIT_PROFILE_SUCCESS: {
        return {
          ...state,
          editProfileLoader: false,
          editProfileSuccess: true,
        };
    }
    case actions.EDIT_PROFILE_FAILURE: {
        return {
            ...state,
            editProfileLoader: false,
            editProfileSuccess: false,
        };
    }
    case actions.SET_EDIT_PROFILE_SUCCESS:{
        return {
            ...state,
            editProfileSuccess: action.payload,
        }
    }
    case actions.UPLOAD_IMAGE:{
        return {
            ...state,
            imageUploadLoader: true,
        }
    }
    case actions.UPLOAD_IMAGE_SUCCESS:{
        return {
            ...state,
            imageUploadLoader: false,
        }
    }
    case actions.UPLOAD_IMAGE_FAILURE:{
        return {
            ...state,
            imageUploadLoader: false,
        }
    }
    case actions.UPDATE_PASSWORD:{
        return {
            ...state,
            userPasswordLoader: true,
            userPasswordSuccess: false,
        }
    }
    case actions.UPDATE_PASSWORD_SUCCESS:{
        return {
            ...state,
            userPasswordLoader: false,
            userPasswordSuccess: true,
        }
    }
    case actions.UPDATE_PASSWORD_FAILURE:{
        return {
            ...state,
            userPasswordLoader: false,
            userPasswordSuccess: false,
        }
    }
    case actions.SET_UPDATE_PASSWORD_SUCCESS:{
        return {
            ...state,
            userPasswordSuccess: action.payload,
        }
    }
    default:
      return state;
  }
}
