import React, { FC } from "react";
import { HOURS, WEEKDAYS } from "../../utils/types";

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

interface FocusHoursTableProps {
  readonly focusHours: number[][];
}
export const FocusHoursTable: FC<FocusHoursTableProps> = ({ focusHours }) => {
  return (
    <table>
      <tr>
        <th>Day</th>
        {HOURS.map((hour) => (
          <td>{hour}</td>
        ))}
      </tr>
      {formatFocusHours(focusHours)}
    </table>
  );
};
