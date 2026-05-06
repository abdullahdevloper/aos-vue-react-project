export function parseLink(match, text, link) {
  const isInternal = !(
    link.indexOf("http") > -1 || link.indexOf("mailto") > -1
  );
  const isSamePage = link.startsWith("#");

  const attrs = isInternal ? "" : `target="_blank" rel="noopener"`;
  const classes = "v-markdown--link";
  const icon = isInternal ? "page-next" : "open-in-new";
  const [url = "", hash = ""] = link.split("#");

  if (isInternal && !isSamePage) {
    // Reset link
    // link = `/${preferredLanguage}`;

    // Remove leading/trailing slashes
    if (url) link += `/${url.replace(/^\/|\/$/, "")}/`;
    // Append hash
    if (hash) link += `#${hash}`;
  } else if (isInternal && hash) {
    link = `#${hash}`;
  }

  return `<a href="${link}" ${attrs} class="${classes}">${text}<i class="v-icon mdi mdi-${icon}"></i></a>`;
}
