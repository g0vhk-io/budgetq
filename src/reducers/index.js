import { combineReducers } from 'redux';
import { LOAD_REPLY, LOAD_MEETINGS, LOAD_BUREAU_MEETINGS, LOAD_SEARCH } from './const';


let replyReducer = (state={data: null, loading: true}, action) => {
  if (action.type === LOAD_REPLY) {
    return { data: action.value, loading: action.loading };
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

let bureauMeetingReducer = (state={}, action) => {
  if (action.type === LOAD_BUREAU_MEETINGS) {
    return {year: action.year, meetings: action.value, bureau: action.bureau, total:action.total, offset: action.offset, limit: action.limit};
  }
  return state;
};

let searchReducer = (state={}, action) => {
  if (action.type === LOAD_SEARCH) {
    return {keyword: action.keyword, meetings: action.value, total:action.total, offset: action.offset, limit: action.limit};
  }
  return state;
};



export default combineReducers({
  reply: replyReducer,
  meeting: meetingReducer,
  bureauMeeting: bureauMeetingReducer,
  search: searchReducer
});
