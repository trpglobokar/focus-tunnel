import { BlockedSite } from "./types";

const reddit: BlockedSite = {
  siteName: "www.reddit.com",
  focusHours: [
    [0, 1, 2, 23],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 23],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 23],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 23],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17, 23],
    [0, 1, 2, 3, 9, 11, 13, 14, 15, 16, 17, 23],
    [0, 1, 2, 23],
  ],
  stretchBreakTime: 49,
};

const nytimes: BlockedSite = {
  siteName: "www.nytimes.com",
  focusHours: [
    [0, 1, 2, 21],
    [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17, 23],
    [0, 1, 2, 3, 9, 10, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 13, 14, 15, 16, 17],
    [0, 1, 2],
  ],
  stretchBreakTime: 49,
};

const youtube: BlockedSite = {
  siteName: "www.youtube.com",
  focusHours: [
    [0, 1, 2],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 9, 10, 11, 13, 14, 15, 16, 17],
    [0, 1, 2],
  ],
  stretchBreakTime: 60,
};

const w3schoolsStretchTest: BlockedSite = {
  siteName: "www.w3schools.com",
  focusHours: [
    [0, 1, 2],
    [23, 0, 1, 2],
    [0, 1, 2, 12],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ],
  stretchBreakTime: 5,
};

const oregonFocusTest: BlockedSite = {
  siteName: "www.oregonlive.com",
  focusHours: [
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  ],
  stretchBreakTime: 60,
};

export const defaultBlockedSites: BlockedSite[] = [
  reddit,
  nytimes,
  youtube,
  w3schoolsStretchTest,
  oregonFocusTest,
];
