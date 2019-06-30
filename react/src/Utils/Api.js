export function getContents(path) {
  return fetch(`https://api.github.com/repos/Show/contents/${path}`).then(
    response => response.json()
  );
}
