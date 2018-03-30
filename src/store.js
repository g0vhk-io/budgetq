import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

export default function initStore({
  initialState = {},
}) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk),
  );
}
