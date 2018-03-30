import { createBrowserHistory, createMemoryHistory } from 'history';

export default function createHistory(isServer = false) {
  return isServer ? createMemoryHistory() : createBrowserHistory();
}
