import { LOAD_REPLY, LOAD_MEETINGS, LOAD_BUREAU_MEETINGS, LOAD_SEARCH } from '../reducers/const';
import { ENDPOINT } from '../../env';

function updateMeetings(year, meetings) {
  return {
    type: LOAD_MEETINGS,
    year,
    value: meetings,
  };
}

function updateBureauMeetings(year, bureau, meetings, offset, limit, total) {
  return {
    type: LOAD_BUREAU_MEETINGS,
    bureau,
    year,
    value: meetings,
    offset,
    limit,
    total,
  };
}

function updateSearch(keyword, meetings, offset, limit, total) {
  return {
    type: LOAD_SEARCH,
    keyword,
    value: meetings,
    offset,
    limit,
    total,
  };
}


function updateReply(reply, loading = false) {
  return {
    type: LOAD_REPLY,
    loading,
    value: reply,
  };
}

function updateReplyError(error) {
  console.log(error);
  return {
    type: LOAD_REPLY,
    loading: false,
    value: null,
  };
}


export function loadReply(replyId) {
  return (dispatch) => {
    dispatch(updateReply(null, true));
    return fetch(`${ENDPOINT}/budget/replies/${replyId}/`).then(
      (response) => {
        if (response.ok) {
          response.json().then(json => dispatch(updateReply(json)));
        } else {
          dispatch(updateReplyError(null));
        }
      },
      error => dispatch(updateReplyError(error)),
    );
  };
}

export function loadMeetings(year) {
  return dispatch => fetch(`${ENDPOINT}/budget/meeting/${year}/`).then(
    (response) => {
      if (response.ok) {
        response.json().then(json => dispatch(updateMeetings(year, json)));
      } else {
        dispatch(updateMeetings(year, []));
      }
    },
    () => dispatch(updateMeetings(year, [])),
  );
}

export function loadBureauMeetings(year, bureau, page = 0, pageSize = 25) {
  return (dispatch) => {
    const offset = page * pageSize;
    return fetch(`${ENDPOINT}/budget/replies/${year}/${bureau}/?offset=${offset}&limit=${pageSize}`).then(
      (response) => {
        if (response.ok) {
          response.json()
            .then(json => dispatch(updateBureauMeetings(
              year,
              bureau,
              json.data,
              json.offset,
              json.limit,
              json.total,
            )));
        } else {
          dispatch(updateBureauMeetings(year, bureau, [], 0, 0, 0));
        }
      },
      () => dispatch(updateBureauMeetings(year, bureau, [], 0, 0, 0)),
    );
  };
}

export function search(keyword, page = 0, pageSize = 25) {
  return (dispatch) => {
    dispatch(() => {
      const offset = page * pageSize;
      return fetch(`${ENDPOINT}/budget/search/${keyword}/?offset=${offset}&limit=${pageSize}`).then(
        (response) => {
          if (response.ok) {
            response.json()
              .then(json => dispatch(updateSearch(
                keyword,
                json.data,
                json.offset,
                json.limit,
                json.total,
              )));
          } else {
            dispatch(updateSearch(keyword, [], 0, 0, 0));
          }
        },
        () => dispatch(updateSearch(keyword, [], 0, 0, 0)),
      );
    });
  };
}
