import axios from 'axios';
import { LOAD_REPLY, LOAD_MEETINGS, LOAD_BUREAU_MEETINGS, LOAD_SEARCH } from '../reducers/const';
import { ENDPOINT } from '../../env';

function updateMeetings(year, meetings) {
  return {
    year,
    type: LOAD_MEETINGS,
    value: meetings,
  };
}

function updateBureauMeetings(year, bureau, meetings, offset, limit, total) {
  return {
    bureau,
    year,
    offset,
    limit,
    total,
    value: meetings,
    type: LOAD_BUREAU_MEETINGS,
  };
}

function updateSearch(keyword, meetings, offset, limit, total) {
  return {
    keyword,
    offset,
    limit,
    total,
    type: LOAD_SEARCH,
    value: meetings,
  };
}


function updateReply(reply, loading = false) {
  return {
    loading,
    type: LOAD_REPLY,
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
    return axios.get(`${ENDPOINT}/budget/replies/${replyId}/`)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(updateReply(data));
        } else {
          dispatch(updateReplyError(null));
        }
      })
      .catch(error => dispatch(updateReplyError(error)));
  };
}

export function loadMeetings(year) {
  return dispatch => axios.get(`${ENDPOINT}/budget/meeting/${year}/`)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(updateMeetings(year, data));
      } else {
        dispatch(updateMeetings(year, []));
      }
    })
    .catch(() => dispatch(updateMeetings(year, [])));
}

export function loadBureauMeetings(year, bureau, page = 0, pageSize = 25) {
  return (dispatch) => {
    const offset = page * pageSize;
    return axios.get(`${ENDPOINT}/budget/replies/${year}/${bureau}/?offset=${offset}&limit=${pageSize}`)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(updateBureauMeetings(
            year,
            bureau,
            data.data,
            data.offset,
            data.limit,
            data.total,
          ));
        } else {
          dispatch(updateBureauMeetings(year, bureau, [], 0, 0, 0));
        }
      })
      .catch(() => dispatch(updateBureauMeetings(year, bureau, [], 0, 0, 0)));
  };
}

export function search(keyword, page = 0, pageSize = 25) {
  return (dispatch) => {
    dispatch(() => {
      const offset = page * pageSize;
      return axios.get(`${ENDPOINT}/budget/search/${keyword}/?offset=${offset}&limit=${pageSize}`)
        .then(({ status, data }) => {
          if (status === 200) {
            dispatch(updateSearch(
              keyword,
              data.data,
              data.offset,
              data.limit,
              data.total,
            ));
          } else {
            dispatch(updateSearch(keyword, [], 0, 0, 0));
          }
        })
        .catch(() => dispatch(updateSearch(keyword, [], 0, 0, 0)));
    });
  };
}
