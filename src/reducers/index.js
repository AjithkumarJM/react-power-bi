import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userData from './user-data';

const rootReducer = combineReducers({
  userData,
  form: formReducer
});

export default rootReducer;
