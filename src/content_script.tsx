import { renderFocusTunnel } from "./components/FocusTunnel";
import { getBlockedSiteByName } from "./components/utils/utils";

const siteName = window.location.hostname;

chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
  if (!!getBlockedSiteByName(blockedSites, siteName)) {
    let focusTunnelRoot = document.createElement("div");
    focusTunnelRoot.setAttribute("id", "focus-tunnel");
    document.getElementsByTagName("html")[0].prepend(focusTunnelRoot);
    renderFocusTunnel();
  }
});
