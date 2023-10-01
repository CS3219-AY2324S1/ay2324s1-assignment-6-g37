import { onRequest } from "firebase-functions/v1/https";
import { fetchLeetcodeQotd, formatQuestion, handleError, saveRepoQuestion } from "../api";
import { CODE_NOT_FOUND } from "../utility";

/**
 * Syncs the question repository with leetcode's Question of the Day.
 * Updates the existing question if it exists, and adds it to the repo otherwise.
 */
export const syncQotd = onRequest(async (request, response) => {
  try {
    const leetcodeQuestion = await fetchLeetcodeQotd();
    if (!leetcodeQuestion) {
      response.sendStatus(CODE_NOT_FOUND).end();
      return;
    } 
    const question = formatQuestion(leetcodeQuestion);
    await saveRepoQuestion(question);
    response.end();
  } catch (error) {
    handleError(error, response)
  }
});
