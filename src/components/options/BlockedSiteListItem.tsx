import React, { FC } from "react";
import { BlockedSite, HOURS, WEEKDAYS } from "../../utils/types";

const formatFocusHours = (focusHours: number[][]) => {
  return focusHours.map((day, index) => (
    <tr>
      <td>{WEEKDAYS[index]}</td>
      {HOURS.map((_hour, hourIndex) => {
        const blockedStatus = day.includes(hourIndex) ? "X" : "O";
        const backgroundStyle = day.includes(hourIndex) ? "#d85a5a" : "#afd7af";
        return (
          <td style={{ backgroundColor: backgroundStyle }}>{blockedStatus}</td>
        );
      })}
    </tr>
  ));
};

interface BlockedSiteListItemProps {
  readonly site: BlockedSite;
}
export const BlockedSiteListItem: FC<BlockedSiteListItemProps> = ({ site }) => {
  return (
    <li key={site.siteName}>
      {site.siteName}
      <br />
      <table>
        <tr>
          <th>Day</th>
          {HOURS.map((hour) => (
            <td>{hour}</td>
          ))}
        </tr>
        {formatFocusHours(site.focusHours)}
      </table>
    </li>
  );
};
