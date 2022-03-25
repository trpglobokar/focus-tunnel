import React, { ChangeEvent, FC, useState } from "react";

interface SiteNameProps {
  readonly isInEditMode: boolean;
  readonly siteName: string;
  readonly handleOnSiteNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const SiteName: FC<SiteNameProps> = ({
  isInEditMode,
  siteName,
  handleOnSiteNameChange,
}) => {
  return (
    <div>
      <label>Site Name:</label>
      {isInEditMode ? (
        <input type="text" value={siteName} onChange={handleOnSiteNameChange} />
      ) : (
        <span>{siteName}</span>
      )}
    </div>
  );
};
