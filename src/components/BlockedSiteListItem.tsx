import React, { FC } from "react";
import { BlockedSite, WEEKDAYS } from "../utils/types";

const formatFocusHours = (focusHours: number[][]) => {
  const listForm = focusHours.map((day, index) => (
    <li key={index}>
      {WEEKDAYS[index]}: {day.join(",")}
    </li>
  ));

  return <ul>{listForm}</ul>;
};

interface BlockedSiteListItemProps {
  readonly site: BlockedSite;
}
export const BlockedSiteListItem: FC<BlockedSiteListItemProps> = ({ site }) => {
  return (
    <li key={site.siteName}>
      {site.siteName}
      <br />
      {formatFocusHours(site.focusHours)}
    </li>
  );
};
