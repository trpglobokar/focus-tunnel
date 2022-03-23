import { formatTimeToString } from "../utils/formatTimeToString";

test("1 + 1 = 2", () => {
  expect(formatTimeToString(61)).toBe("1:01");
});
