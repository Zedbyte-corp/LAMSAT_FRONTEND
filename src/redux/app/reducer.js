import actions from './actions';
// import { getCurrentPath } from 'redux/helper';

const initState = {
  currentKey: '',
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_MENU: {
      return {
        ...state,
        currentKey: action.payload,
      };
    }
    default:
      return state;
  }
}
