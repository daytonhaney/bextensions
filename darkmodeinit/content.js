(() => {
  const STYLE_ID = "dark-mode-init-style";
  const existingStyle = document.getElementById(STYLE_ID);

  if (existingStyle) {
    existingStyle.remove();
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
html {
  filter: invert(1) hue-rotate(180deg) !important;
  background: #111 !important;
}

img, video, picture, canvas, iframe {
  filter: invert(1) hue-rotate(180deg) !important;
}
`;
  document.documentElement.appendChild(style);
})();
