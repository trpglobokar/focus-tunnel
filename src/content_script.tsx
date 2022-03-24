import { renderFocusTunnel } from "./components/content/FocusTunnel";
import { getBlockedSiteByName } from "./utils/utils";

const siteName = window.location.hostname;

chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
  if (!!getBlockedSiteByName(blockedSites, siteName)) {
    let focusTunnelRoot = document.createElement("div");
    focusTunnelRoot.setAttribute("id", "focus-tunnel");
    document.getElementsByTagName("html")[0].prepend(focusTunnelRoot);
    renderFocusTunnel();
  }
});
