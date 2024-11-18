function extractGitLinks(): Set<string> {
  const getLinkRegex = /https?:\/\/(?:www\.)?(github|gitlab)\.com\/[^\s<>)"']+/g;

  const links = document.getElementsByTagName('a');
  const gitLinks: Set<string> = new Set();

  for (const link of links) {
    if (link.href.match(getLinkRegex)) {
      gitLinks.add(link.href);
    }
  }

  return gitLinks;
}

window.addEventListener('load', () => {
  const gitLinks = Array.from(extractGitLinks());

  chrome.runtime.sendMessage({
    action: 'updateGitLinks',
    links: gitLinks,
  })
})
