import { combineReducers } from 'redux';
import imageSource from './imageSource';
import settings from './settings';

const photoEdit = combineReducers({
  imageSource,
  settings
});

export default photoEdit;
