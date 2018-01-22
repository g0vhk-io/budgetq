import { LOAD_REPLY, LOAD_MEETINGS, LOAD_BUREAU_MEETINGS, LOAD_SEARCH } from '../reducers/const';


const ENDPOINT = process.env.REACT_APP_ENDPOINT || "https://api.g0vhk.io";


function updateMeetings(year, meetings) {
  return {
    type: LOAD_MEETINGS,
    year: year,
    value: meetings
  };
}

function updateBureauMeetings(year, bureau, meetings, offset, limit, total) {
  return {
    type: LOAD_BUREAU_MEETINGS,
    bureau: bureau,
    year: year,
    value: meetings,
    offset: offset,
    limit: limit,
    total: total
  };
}

function updateSearch(keyword, meetings, offset, limit, total) {
  return {
    type: LOAD_SEARCH,
    keyword: keyword,
    value: meetings,
    offset: offset,
    limit: limit,
    total: total
  };
}




function updateReply(reply, loading=false) {
  return {
    type: LOAD_REPLY,
    loading: loading,
    value: reply
  };
}

function updateReplyError(error) {
  console.log(error);
  return {
    type: LOAD_REPLY,
    loading: false,
    value: null
  };
}


export function loadReply(replyId) {
  return (dispatch) => {
    dispatch(updateReply(null, true));
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

export function loadBureauMeetings(year, bureau, page=0, pageSize=10) {
  return (dispatch) => {
    const offset = page * pageSize;
    console.log(page, pageSize);
    return fetch(ENDPOINT + '/budget/replies/' + year + '/' + bureau + '/?offset=' + offset + '&limit=' + pageSize  ).then(
      response => {
        if (response.ok) {
          response.json().then((json) => dispatch(updateBureauMeetings(year, bureau, json.data, json.offset, json.limit, json.total)));
        } else {
          dispatch(updateBureauMeetings(year, bureau, [], 0, 0, 0))
        }
      },
      error => dispatch(updateBureauMeetings(year, bureau, [], 0, 0, 0))
    )
  }
};

export function search(keyword, page=0, pageSize=10) {
  return (dispatch) => {
    dispatch(() => {
      const offset = page * pageSize;
      return fetch(ENDPOINT + '/budget/search/' + keyword + '/?offset=' + offset + '&limit=' + pageSize  ).then(
      response => {
        if (response.ok) {
          response.json().then((json) => dispatch(updateSearch(keyword, json.data, json.offset, json.limit, json.total)));
        } else {
          dispatch(updateSearch(keyword, [], 0, 0, 0))
        }
      },
      error => dispatch(updateSearch(keyword, [], 0, 0, 0))
    )

    });
  }
};
