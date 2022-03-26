import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { OptionsButton } from "./OptionsButton";

export const GlobalSettings: FC = () => {
  const [tempBreakLength, setTempBreakLength] = useState<number>();
  const [tempBreakGapLength, setTempBreakGapLength] = useState<number>();

  useEffect(() => {
    chrome.storage.sync.get(
      ["breakLength", "breakGapLength"],
      ({ breakLength, breakGapLength }) => {
        setTempBreakLength(breakLength);
        setTempBreakGapLength(breakGapLength);
      }
    );
  }, []);

  const saveGlobalSettings = () => {
    chrome.storage.sync.set({
      breakLength: tempBreakLength,
      breakGapLength: tempBreakGapLength,
    });
    //TODO: Add save confirmation
  };

  return (
    <>
      <h3>Global Settings:</h3>
      <div>
        Break Length (in minutes):
        <input
          type="text"
          value={tempBreakLength}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newValue =
              e.target.value === "" ? 0 : parseInt(e.target.value);
            setTempBreakLength(newValue);
          }}
        />
      </div>
      <div>
        Time Between Breaks (in minutes):
        <input
          type="text"
          value={tempBreakGapLength}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newValue =
              e.target.value === "" ? 0 : parseInt(e.target.value);
            setTempBreakGapLength(newValue);
          }}
        />
      </div>
      <OptionsButton label="Save" handleClick={saveGlobalSettings} />
    </>
  );
};
