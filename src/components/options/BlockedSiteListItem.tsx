/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { ChangeEvent, FC, useState } from "react";
import { BlockedSite, OptionButtonDisplayMode } from "../../utils/types";

import { SiteName } from "./SiteName";
import { FocusHoursTable } from "./FocusHoursTable";

import { buttonWrapperStyles, listStyles } from "./BlockedSiteListItem.styles";
import { OptionsButton } from "./OptionsButton";

interface BlockedSiteListItemProps {
  readonly site: BlockedSite;
  readonly handleStorageDelete: (siteId: string) => void;
  readonly handleStorageSave: (updatedSite: BlockedSite) => void;
}
export const BlockedSiteListItem: FC<BlockedSiteListItemProps> = ({
  site,
  handleStorageDelete,
  handleStorageSave,
}) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [tempSiteName, setTempSiteName] = useState(site.siteName);
  const [tempFocusHours, setTempFocusHours] = useState(site.focusHours);

  return (
    <li css={listStyles}>
      <SiteName
        isInEditMode={isInEditMode}
        siteName={tempSiteName}
        handleOnSiteNameChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTempSiteName(e.target.value)
        }
      />
      <FocusHoursTable
        isInEditMode={isInEditMode}
        focusHours={tempFocusHours}
        handleFocusHourChange={(newFocusHours) => {
          setTempFocusHours(newFocusHours);
        }}
      />
      <div>Stretch Break: XX:{site.stretchBreakTime - 1} - XX:59</div>
      <div css={buttonWrapperStyles}>
        <OptionsButton
          label="Save"
          displayMode={OptionButtonDisplayMode.EditOnly}
          handleClick={() => {
            const updatedSite: BlockedSite = {
              id: site.id,
              siteName: tempSiteName,
              focusHours: tempFocusHours,
              stretchBreakTime: site.stretchBreakTime,
            };

            handleStorageSave(updatedSite);
            setIsInEditMode(false);
          }}
          isInEditMode={isInEditMode}
        />
        <OptionsButton
          label="Edit"
          displayMode={OptionButtonDisplayMode.ViewOnly}
          handleClick={() => {
            setIsInEditMode(true);
          }}
          isInEditMode={isInEditMode}
        />
        <OptionsButton
          label="Cancel"
          displayMode={OptionButtonDisplayMode.EditOnly}
          handleClick={() => {
            setTempSiteName(site.siteName);
            setTempFocusHours(site.focusHours);
            setIsInEditMode(false);
          }}
          isInEditMode={isInEditMode}
        />
        <OptionsButton
          label="Delete"
          displayMode={OptionButtonDisplayMode.Always}
          handleClick={() => {
            handleStorageDelete(site.id);
          }}
          isInEditMode={isInEditMode}
        />
      </div>
    </li>
  );
};
