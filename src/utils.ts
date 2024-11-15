export function filterValidRepos(urls: Array<string>): Array<string> {
  const validRepoPattern = /^(?:https?:\/\/)?((?:github|gitlab)\.com)\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)\/?$/;

  const validRepos = urls
    .filter(url => validRepoPattern.test(url))

  return validRepos;
}

export function extractRepo(url: string) {
  const cleanUrl = url.replace(/^(https?:\/\/)/, '');
  const parts = cleanUrl.split('/');

  return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};

