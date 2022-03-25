/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FC } from "react";
import { HOURS, WEEKDAYS } from "../../utils/types";

import { getTableStyles } from "./FocusHoursTable.styles";

const formatFocusHours = (focusHours: number[][]) => {
  return focusHours.map((day, index) => (
    <tr>
      <td>{WEEKDAYS[index]}</td>
      {HOURS.map((_hour, hourIndex) => {
        const isBlocked = day.includes(hourIndex);
        return <td data-isBlocked={isBlocked} />;
      })}
    </tr>
  ));
};

interface FocusHoursTableProps {
  readonly focusHours: number[][];
  readonly isInEditMode: boolean;
}
export const FocusHoursTable: FC<FocusHoursTableProps> = ({
  focusHours,
  isInEditMode,
}) => {
  const tableStyles = getTableStyles(isInEditMode);

  return (
    <table css={tableStyles}>
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
