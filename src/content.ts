function findGitLinks(): Set<string> {
  const getLinkRegex = /https?:\/\/(?:www\.)?(github|gitlab)\.com\/[^\s<>)"']+/g;

  const links = document.getElementsByTagName('a');
  const gitLinks: Set<string> = new Set<string>();

  for (const link of links) {
    if (link.href.match(getLinkRegex)) {
      gitLinks.add(link.href);
    }
  }

  return gitLinks;
}

const links = findGitLinks();
chrome.runtime.sendMessage({
  action: 'sendLinks',
  payload: {
    links: [...links],
  }
});
