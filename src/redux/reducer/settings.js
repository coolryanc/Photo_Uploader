import { defaultSetting } from '../../shared/config'

const settings = (state = defaultSetting, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      let newState = Object.assign({}, state);
      newState[action.id] = action.val;
      return newState;
    default:
      return state;
  }
}

export default settings;
