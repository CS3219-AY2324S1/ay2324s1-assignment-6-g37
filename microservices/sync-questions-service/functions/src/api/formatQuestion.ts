import { LeetcodeQuestion, Question } from "../types";

/**
 * Formats a leetcode question to one following the format of PeerPrep Question.
 *
 * @param leetcodeQuestion Leetcode question to format.
 * @returns PeerPrep question.
 */
export function formatQuestion(leetcodeQuestion: LeetcodeQuestion): Question {
  return {
    title: leetcodeQuestion.title,
    complexity: leetcodeQuestion.difficulty,
    categories: leetcodeQuestion.topicTags.map(tag => tag.name),
    description: leetcodeQuestion.content
  }
}
