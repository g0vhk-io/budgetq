import { combineReducers } from 'redux';
import { LOAD_REPLY, LOAD_MEETINGS } from './const';


let replyReducer = (state=null, action) => {
  if (action.type === LOAD_REPLY) {
    return action.value;
  }
  return state;
};

let meetingReducer = (state={}, action) => {
  if (action.type === LOAD_MEETINGS) {
    let newState = {...state}
    newState[action.year] = action.value;
    return newState;
  }
  return state;
};



export default combineReducers({
  reply: replyReducer,
  meeting: meetingReducer 
});
