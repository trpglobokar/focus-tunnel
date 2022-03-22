export interface BlockedSite { //TODO: make blockedSites an array
  siteName: string;
  focusHours: number[][];
  stretchBreakTime: number;
}

export const blockedSites: any = {
  'www.reddit.com': {
    focusHours: [
      [0, 1, 2, 23],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 23],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 23],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 23],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 23],
      [0, 1, 2, 3, 9, 11, 13, 14, 15, 16, 17, 23],
      [0, 1, 2, 23]
    ],
    stretchBreakTime: 49
  },
  'www.nytimes.com': {
    focusHours: [
      [0, 1, 2, 21],
      [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17, 23],
      [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 13, 14, 15, 16, 17],
      [0, 1, 2]
    ],
    stretchBreakTime: 49
  },
  'www.youtube.com': {
    focusHours: [
      [0, 1, 2],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
      [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
      [0, 1, 2]
    ],
    stretchBreakTime: 60
  },
  'www.w3schools.com': {
    focusHours: [
      [0, 1, 2],
      [23, 0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2]
    ],
    stretchBreakTime: 30
  }
};

export const isFocusHour = (currentDate: Date) => {
  const siteName = window.location.hostname;

  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDay();
  if(!blockedSites[siteName]){
    return false;
  }

  return blockedSites[siteName].focusHours[currentDay].includes(currentHour)
};

export const isStretchBreak = (currentDate: Date, siteName: string) => {
  if(!blockedSites[siteName]){
    return false;
  }
  return currentDate.getMinutes() > blockedSites[siteName].stretchBreakTime;
}

export const blockSite = () => {
  //document.getElementsByTagName('html')[0].setAttribute('id', 'yah-blocked');
  document.getElementsByTagName('body')[0].style.display = 'none';
};
export const unblockSite = () => {
  //document.getElementsByTagName('html')[0].setAttribute('id', 'yah-good');
  document.getElementsByTagName('body')[0].style.display = 'initial';
};