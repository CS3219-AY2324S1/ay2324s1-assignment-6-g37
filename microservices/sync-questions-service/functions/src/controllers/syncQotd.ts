import { onRequest } from "firebase-functions/v2/https";
import { fetchLeetcodeQotd, formatQuestion, handleError, saveRepoQuestion } from "../api";
import { CODE_NOT_FOUND } from "../utility";

/**
 * Syncs the question repository with leetcode's Question of the Day.
 * Updates the existing question if it exists, and adds it to the repo otherwise.
 */
export const syncQotd = onRequest(
  { cors: true },
  async (request, response) => {
    try {
      const leetcodeQuestion = await fetchLeetcodeQotd();
      if (!leetcodeQuestion) {
        response.sendStatus(CODE_NOT_FOUND).end();
        return;
      } 
      const question = formatQuestion(leetcodeQuestion);
      const host = request.body.questionsServiceUrl;
      await saveRepoQuestion(question, host);
      response.end();
    } catch (error) {
      handleError(error, response)
    }
  }
);
