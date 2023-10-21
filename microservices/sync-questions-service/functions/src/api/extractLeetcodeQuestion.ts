import { AxiosResponse } from "axios";
import { hasKey, isLeetcodeQuestion } from "../utility";

export function extractLeetcodeQuestion(
  response: AxiosResponse<unknown, unknown>,
  path: string[]
) {
  let result: unknown = response;
  for (let pathSegment of path) {
    if (!hasKey(result, pathSegment)) {
      return null;
    }
    result = result[pathSegment];
  }
  if (!isLeetcodeQuestion(result)) {
    return null;
  }
  return result;
}
