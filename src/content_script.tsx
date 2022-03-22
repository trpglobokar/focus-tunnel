import { 
  blockedSites, 
  blockSite, 
  isFocusHour,
  isStretchBreak,
  unblockSite
} from './blockedSites';
import { renderFocusTunnel } from './focusTunnel';

const siteName = window.location.hostname;

if(siteName in blockedSites){
  let focusTunnelRoot = document.createElement("div");
  focusTunnelRoot.setAttribute('id', 'focus-tunnel');
  document.getElementsByTagName('html')[0].prepend(focusTunnelRoot);

  //const { checkIsBreakValid } = renderFocusTunnel();
  renderFocusTunnel();

  //IF ON BREAK, RENDER COUNTDOWN
  /*chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
    const currentTime = new Date().getTime();
    if (breakEndTime - currentTime > 0) {
      renderCountdown();
      //unblockSite();
    }
  });

  const siteBlocker = () => {
    const currentDate = new Date();

    chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
      if (breakEndTime - currentDate.getTime() > 0) {
        unblockSite();
        return;
      }
      if (isFocusHour(currentDate, siteName)) {
        blockSite();
      } else if (isStretchBreak(currentDate, siteName)) {
        blockSite(); //TODO: add 'go stretch' params & 'come back in X min' timer
      } else {
        unblockSite();
      }
    });
  };*/

  //siteBlocker();
  //setInterval(siteBlocker, 60000);
  //setInterval(checkIsBreakValid, 5000);
}

// NEXT TODO'S
// - MOVE BREAK VARIABLES TO BACKGROUND.JS, re-enable after 60min
//    - instead of ISBREAKVALID, have nextValidBreakTime
//    - make breakEndTime
// - focus button (i.e. click, block after 2min(?) warning, keep blocked for 20min)
// - figure out youtube focus music?
// - put blockedSiteHours into user defined storage (w/ defaults?), editable w/in app

/*chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});*/
