export type FocusHours = boolean[][];
export interface BlockedSite {
  id: string;
  siteName: string;
  focusHours: FocusHours;
  stretchBreakTime: number;
}

//TODO: make these customizable by user
export const BREAK_LENGTH_IN_MINUTES = 5;
export const NEXT_BREAK_TIME_IN_MINUTES = 60;

export enum SITE_STATUS {
  FocusBlocked = "Go Back to Work",
  OnBreak = "SHOW THE COUNTDOWN",
  StretchBlocked = "Go Stretch",
  TotallyFree = "Suppity Duppity",
}
export enum OptionButtonDisplayMode {
  Always,
  EditOnly,
  ViewOnly,
}

export const WEEKDAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
export const HOURS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
