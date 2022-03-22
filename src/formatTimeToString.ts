export const formatTimeToString = (time: number) => {
  const minutes: number = Math.floor(time/60);
  const seconds: number = Math.floor(time%60);
  let secondsString: string = seconds < 10 ? "0" + seconds : seconds.toString();

  return minutes.toString() + ":" + secondsString;
};
