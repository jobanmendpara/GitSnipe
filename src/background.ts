import { Action, CustomMessage } from './types';

let links: Array<string> = [];

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const customMessage = message as CustomMessage;
  switch (customMessage.action) {
    case Action.SEND_LINKS:
      // TODO: Deduplicate
      // TODO: Verify link is valid repo
      links = customMessage.payload.links;
      break;
    case Action.GET_LINKS:
      sendResponse(links);
      break;
  }

  return true;
});
