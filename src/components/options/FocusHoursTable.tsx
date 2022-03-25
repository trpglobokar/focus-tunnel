/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FC } from "react";
import { FocusHours, HOURS, WEEKDAYS } from "../../utils/types";

import { getTableStyles } from "./FocusHoursTable.styles";

const generateNewFocusHours = (
  focusHours: FocusHours,
  updatedDay: number,
  updatedHour: number
) => {
  return focusHours.map((day, dayIndex) => {
    if (dayIndex === updatedDay) {
      let newDay = [...day];
      newDay[updatedHour] = !newDay[updatedHour];
      return newDay;
    }
    return day;
  });
};

const formatFocusHours = (
  focusHours: FocusHours,
  handleFocusHourChange: (newFocusHours: FocusHours) => void,
  isInEditMode: boolean
) => {
  return focusHours.map((day, dayIndex) => (
    <tr>
      <td>{WEEKDAYS[dayIndex]}</td>
      {HOURS.map((_hour, hourIndex) => {
        const isBlocked = day[hourIndex];

        const onClickTD = isInEditMode
          ? () => {
              const newFocusHours = generateNewFocusHours(
                focusHours,
                dayIndex,
                hourIndex
              );
              handleFocusHourChange(newFocusHours);
            }
          : undefined;

        return <td data-isBlocked={isBlocked} onClick={onClickTD} />;
      })}
    </tr>
  ));
};

interface FocusHoursTableProps {
  readonly focusHours: FocusHours;
  readonly isInEditMode: boolean;
  readonly handleFocusHourChange: (newFocusHours: FocusHours) => void;
}
export const FocusHoursTable: FC<FocusHoursTableProps> = ({
  focusHours,
  isInEditMode,
  handleFocusHourChange,
}) => {
  const tableStyles = getTableStyles(isInEditMode);

  return (
    <div>
      <label>Blocked Hours:</label>
      <br />
      <table css={tableStyles}>
        <tr>
          <th>Day</th>
          {HOURS.map((hour) => (
            <td>{hour}</td>
          ))}
        </tr>
        {formatFocusHours(focusHours, handleFocusHourChange, isInEditMode)}
      </table>
    </div>
  );
};
