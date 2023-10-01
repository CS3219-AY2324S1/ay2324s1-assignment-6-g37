import { Question, WithId } from "../types";
import { hasKey, isQuestion } from ".";

/**
 * Checks that the given input is a Question with id.
 * @param unknown item of unknown type.
 * @returns True if the item is a Question with id, false otherwise.
 */
export function isQuestionWithId(unknown: unknown): unknown is WithId<Question> {
  if (!hasKey(unknown, '_id')
      || typeof unknown['_id'] !== 'string') {
    return false;
  }
  return isQuestion(unknown);
}
