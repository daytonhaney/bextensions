const STYLE_ID = "dark-mode-init-style";
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
let enabled = false;

function updateButtonState(isEnabled) {
  enabled = isEnabled;
  btn.textContent = enabled ? "Disable" : "Enable";
  btn.className = enabled ? "on" : "";
  btn.setAttribute("aria-pressed", String(enabled));
}

function setStatus(message) {
  statusEl.textContent = message;
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function readDarkModeState(styleId) {
  return Boolean(document.getElementById(styleId));
}

async function syncPopupState() {
  try {
    const tab = await getActiveTab();

    if (!tab?.id) {
      btn.disabled = true;
      setStatus("No active tab");
      return;
    }

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: readDarkModeState,
      args: [STYLE_ID],
    });

    btn.disabled = false;
    updateButtonState(Boolean(result));
    setStatus("");
  } catch (error) {
    btn.disabled = true;
    updateButtonState(false);
    setStatus("Unavailable here");
  }
}

btn.addEventListener("click", async () => {
  try {
    const tab = await getActiveTab();

    if (!tab?.id) {
      setStatus("No active tab");
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
      world: "MAIN",
    });

    await syncPopupState();
    setStatus(enabled ? "Enabled" : "Disabled");
  } catch (error) {
    setStatus("Unavailable here");
  }
});

void syncPopupState();
