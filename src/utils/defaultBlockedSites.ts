import { BlockedSite, FocusHours } from "./types";

const defaultFocusWeekDay: boolean[] = [
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
];
const defaultFocusWeekendDay: boolean[] = [
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
];

const defaultFocusWeek: FocusHours = [
  defaultFocusWeekendDay,
  defaultFocusWeekDay,
  defaultFocusWeekDay,
  defaultFocusWeekDay,
  defaultFocusWeekDay,
  defaultFocusWeekDay,
  defaultFocusWeekendDay,
];

const reddit: BlockedSite = {
  siteName: "www.reddit.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 49,
};

const nytimes: BlockedSite = {
  siteName: "www.nytimes.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 49,
};

const youtube: BlockedSite = {
  siteName: "www.youtube.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 60,
};

const w3schoolsStretchTest: BlockedSite = {
  siteName: "www.w3schools.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 5,
};

const oregonFocusTest: BlockedSite = {
  siteName: "www.oregonlive.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 60,
};

export const defaultBlockedSites: BlockedSite[] = [
  reddit,
  nytimes,
  youtube,
  w3schoolsStretchTest,
  oregonFocusTest,
];
