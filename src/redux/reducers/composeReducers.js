import { combineReducers } from 'redux';
import auth from './auth';
import event from './event';
import category from './category';
import msgalert from './msgalert';
export default combineReducers({ auth, event, category, msg: msgalert });
