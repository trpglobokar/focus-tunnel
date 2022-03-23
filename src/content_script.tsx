import { blockedSites } from './components/utils/blockedSiteList';
import { renderFocusTunnel } from './components/focusTunnel';

const siteName = window.location.hostname;

if (siteName in blockedSites) {
  let focusTunnelRoot = document.createElement("div");
  focusTunnelRoot.setAttribute('id', 'focus-tunnel');
  document.getElementsByTagName('html')[0].prepend(focusTunnelRoot);
  renderFocusTunnel();
}
