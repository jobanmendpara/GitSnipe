import { filterValidRepos } from "./utils";

let gitLinks: Array<string> = [];
let popupPort: chrome.runtime.Port | null = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    popupPort = port;
    port.onMessage.addListener((request) => {
      if (request.action === 'getGitLinks') {
        port.postMessage({ action: 'updatePopup', links: gitLinks });
      }
    });
    port.onDisconnect.addListener(() => {
      popupPort = null;
    });
  }
});

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.action === 'updateGitLinks') {
    gitLinks = filterValidRepos(request.links);
    if (popupPort) {
      popupPort.postMessage({ action: 'updatePopup', links: gitLinks });
    }
  }
});

chrome.tabs.onActivated.addListener((_info) => {
  if (popupPort) {
    popupPort.postMessage({ action: 'updatePopup', links:gitLinks });
  }
});
