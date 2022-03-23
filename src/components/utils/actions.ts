export const blockSite = () => {
    document.getElementsByTagName('body')[0].style.display = 'none';
};

export const unblockSite = () => {
    document.getElementsByTagName('body')[0].style.display = 'initial';
};

export const startNewBreakCountdown = () => {
    const BREAK_LENGTH_IN_MINUTES = 5;
    const NEXT_BREAK_TIME_IN_MINUTES = 60;

    const currentTime = new Date().getTime();
    const breakEndTime = currentTime + BREAK_LENGTH_IN_MINUTES*60000;
    const nextValidBreakTime = currentTime + NEXT_BREAK_TIME_IN_MINUTES*60000;

    chrome.storage.sync.set({
        breakEndTime,
        nextValidBreakTime
    });
};