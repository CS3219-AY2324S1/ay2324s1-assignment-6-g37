import { LeetcodeTopicTag } from "../types";
import { hasKey, isString } from ".";

/**
 * Checks that the given input is a Leetcode Topic Tag.
 * @param unknown item of unknown type.
 * @returns True if the item is a Leetcode Topic Tag, false otherwise.
 */
export function isLeetcodeTopicTag(unknown: unknown): unknown is LeetcodeTopicTag {
  return hasKey(unknown, 'name') && isString(unknown['name']);
}