import { LOAD_REPLY, LOAD_MEETINGS } from '../reducers/const';


const ENDPOINT = "http://api.g0vhk.io";

function updateMeetings(year, meetings) {
  return {
    type: LOAD_MEETINGS,
    year: year,
    value: meetings
  };
}



function updateReply(reply) {
  return {
    type: LOAD_REPLY,
    value: reply
  };
}

function updateReplyError(error) {
  console.log(error);
  return {
    type: LOAD_REPLY,
    value: null
  };
}


export function loadReply(replyId) {
  return (dispatch) => {
    return fetch(ENDPOINT + '/budget/replies/' + replyId + '/').then(
      response => {
        if (response.ok) {
          response.json().then((json) => dispatch(updateReply(json)));
        } else {
          dispatch(updateReplyError(null))
        }
      },
      error => dispatch(updateReplyError(error))
    )
  }
};

export function loadMeetings(year) {
  return (dispatch) => {
    return fetch(ENDPOINT + '/budget/meeting/' + year + '/').then(
      response => {
        if (response.ok) {
          response.json().then((json) => dispatch(updateMeetings(year, json)));
        } else {
          dispatch(updateMeetings(year, []))
        }
      },
      error => dispatch(updateMeetings(year, []))
    )
  }
};
