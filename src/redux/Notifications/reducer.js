import actions from "./actions";

const initState = {
  loader: false,
  notification: [],
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_NOTIFICATION: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        notification: action.payload,
      };
    }
    case actions.GET_NOTIFICATION_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.SET_NOTIFICATION: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.SET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.SET_NOTIFICATION_FAILUREs: {
      return {
        ...state,
        loader: false,
      };
    }

    default:
      return state;
  }
}
