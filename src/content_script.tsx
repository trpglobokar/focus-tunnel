import { renderFocusTunnel } from "./components/FocusTunnel";
import { getBlockedSiteByName } from "./components/utils/utils";

const siteName = window.location.hostname;

if (!!getBlockedSiteByName(siteName)) {
  let focusTunnelRoot = document.createElement("div");
  focusTunnelRoot.setAttribute("id", "focus-tunnel");
  document.getElementsByTagName("html")[0].prepend(focusTunnelRoot);
  renderFocusTunnel();
}
