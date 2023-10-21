import { LeetcodeQuestion } from "../types";
import { hasKey, isArrayOfType } from ".";
import { isLeetcodeTopicTag } from "./isLeetcodeTopicTag";

/**
 * Checks that the given input is a Leetcode Question
 * @param unknown item of unknown type.
 * @returns True if the item is a Leetcode Question, false otherwise.
 */
export function isLeetcodeQuestion(unknown: unknown): unknown is LeetcodeQuestion {
  if (!hasKey(unknown, 'title')
      || typeof unknown['title'] !== 'string') {
    return false;
  } else if (!hasKey(unknown, 'topicTags')
      || !isArrayOfType(unknown['topicTags'], isLeetcodeTopicTag)) {
    return false;
  } else if (!hasKey(unknown, 'difficulty')
      || typeof unknown['difficulty'] !== 'string'
      || !['Easy', 'Medium', 'Hard'].includes(unknown['difficulty'])) {
    return false;
  } else if (!hasKey(unknown, 'content')
      || typeof unknown['content'] !== 'string') {
    return false;
  }
  return true;
}