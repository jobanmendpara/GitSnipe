import { Action, CustomMessage } from './types';
import { filterValidRepos } from './utils';

let links: Array<string> = [];

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const customMessage = message as CustomMessage;

  switch (customMessage.action) {
    case Action.SEND_LINKS:
      links = filterValidRepos(customMessage.payload.links);
      break;
    case Action.GET_LINKS:
      sendResponse(links);
      break;
  }

  return true;
});
