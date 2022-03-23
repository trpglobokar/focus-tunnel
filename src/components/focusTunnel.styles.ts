import * as CSS from "csstype";

type GetFocusTunnelStyles = (isBlockerVisible: boolean) => CSS.Properties;
export const getFocusTunnelStyles: GetFocusTunnelStyles = (
  isBlockerVisible
) => {
  return {
    background:
      "radial-gradient(circle, rgba(159,203,169,1) 0%, rgba(82,121,111,1) 50%, rgba(47,62,70,1) 100%)",
    height: "100vh",
    display: isBlockerVisible ? "flex" : "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff !important",
    textAlign: "center",
    fontFamily: "monospace !important",
  };
};
