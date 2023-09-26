import { onRequest } from "firebase-functions/v1/https";
import { formatQuestion, handleError, saveRepoQuestion, } from "../api";
import { fetchLeetcodeQuestion } from "../api/fetchLeetcodeQuestion";

/**
 * Syncs the question repository with leetcode's Question of the Day.
 * Updates the existing question if it exists, and adds it to the repo otherwise.
 */
export const syncSampleQuestions = onRequest(async (request, response) => {
  const titleSlugs = [
    'reverse-string', 'linked-list-cycle', 'roman-to-integer', 'add-binary', 'fibonacci-number',
    'implement-stack-using-queues', 'combine-two-tables', 'repeated-dna-sequences', 'course-schedule', 'lru-cache',
    'longest-common-subsequence', 'rotate-image', 'airplane-seat-assignment-probability', 'validate-binary-search-tree', 'sliding-window-maximum',
    'n-queens', 'serialize-and-deserialize-binary-tree', 'wildcard-matching', 'chalkboard-xor-game', 'trips-and-users'
  ];
    try {
      await Promise.all(titleSlugs.map(async titleSlug => {
        const leetcodeQuestion = await fetchLeetcodeQuestion(titleSlug);
        if (!leetcodeQuestion) {
          return;
        }
        const question = formatQuestion(leetcodeQuestion);
        await saveRepoQuestion(question);
      }));
      response.end();
    } catch (error) {
      handleError(error, response);
    }
});
