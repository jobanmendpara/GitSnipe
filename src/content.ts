function findGitLinks(): Array<string> {
  const getLinkRegex = /https?:\/\/(?:www\.)?(github|gitlab)\.com\/[^\s<>)"']+/g;

  const links = document.getElementsByTagName('a');
  const gitLinks: Array<string> = [];

  for (const link of links) {
    if (link.href.match(getLinkRegex)) {
      gitLinks.push(link.href);
    }
  }

  return gitLinks;
}

const links = findGitLinks();
chrome.runtime.sendMessage({
  action: 'sendLinks',
  payload: {
    links,
  }
});
