import React, { ChangeEvent, FC, useState } from "react";
import { BlockedSite, HOURS, WEEKDAYS } from "../../utils/types";
import { EditButton } from "./EditButton";
import { SaveButton } from "./SaveButton";

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
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [tempSiteName, setTempSiteName] = useState(site.siteName);

  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const handleSaveClick = () => {
    chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
      const newBlockedSites: BlockedSite[] = blockedSites.map(
        (storedSite: BlockedSite) => {
          if (storedSite.siteName === site.siteName) {
            const newBlockedSite: BlockedSite = {
              siteName: tempSiteName,
              focusHours: storedSite.focusHours,
              stretchBreakTime: storedSite.stretchBreakTime,
            };
            return newBlockedSite;
          }
          return storedSite;
        }
      );

      chrome.storage.sync.set({
        blockedSites: newBlockedSites,
      });

      setIsInEditMode(false);
    });
  };

  const onSiteNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempSiteName(e.target.value);
  };

  const SiteNameDisplay = isInEditMode ? (
    <input
      type="text"
      value={tempSiteName}
      onChange={(e) => onSiteNameInputChange(e)}
    />
  ) : (
    <span>{tempSiteName}</span>
  );

  return (
    <li key={site.siteName}>
      <label>Site Name:</label> {SiteNameDisplay}
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
      <EditButton handleEditClick={handleEditClick} />
      <SaveButton handleSaveClick={handleSaveClick} />
    </li>
  );
};
