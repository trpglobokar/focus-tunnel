import uniqid from "uniqid";
import { BlockedSite, FocusHours } from "./types";

const defaultSleepingHours: boolean[] = new Array(4).fill(true);
const defaultMorningHours: boolean[] = new Array(5).fill(false);
const defaultEveningHours: boolean[] = new Array(7).fill(false);

const defaultFocusWeekDay: boolean[] = defaultSleepingHours.concat(
  defaultMorningHours,
  new Array(8).fill(true),
  defaultEveningHours
);
const defaultFocusWeekendDay: boolean[] = defaultSleepingHours.concat(
  defaultMorningHours,
  new Array(8).fill(false),
  defaultEveningHours
);

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
  id: uniqid(),
  siteName: "www.reddit.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 49,
};

const nytimes: BlockedSite = {
  id: uniqid(),
  siteName: "www.nytimes.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 49,
};

const youtube: BlockedSite = {
  id: uniqid(),
  siteName: "www.youtube.com",
  focusHours: defaultFocusWeek,
  stretchBreakTime: 60,
};

const w3schoolsStretchTest: BlockedSite = {
  id: uniqid(),
  siteName: "www.w3schools.com",
  focusHours: new Array(7).fill(new Array(24).fill(false)),
  stretchBreakTime: 5,
};

const oregonFocusTest: BlockedSite = {
  id: uniqid(),
  siteName: "www.oregonlive.com",
  focusHours: new Array(7).fill(new Array(24).fill(true)),
  stretchBreakTime: 60,
};

type GenerateNewBlockedSite = () => BlockedSite;
export const generateNewBlockedSite: GenerateNewBlockedSite = () => {
  const newId = uniqid();
  return {
    id: newId,
    siteName: "www.example.com",
    focusHours: defaultFocusWeek,
    stretchBreakTime: 50,
  };
};

export const defaultBlockedSites: BlockedSite[] = [
  reddit,
  nytimes,
  youtube,
  w3schoolsStretchTest,
  oregonFocusTest,
];
