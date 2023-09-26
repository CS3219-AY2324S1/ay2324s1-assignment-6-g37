import { onRequest } from "firebase-functions/v1/https";
import { fetchQotd, formatQuestion, handleError, saveQuestion } from "../api";
import { CODE_NOT_FOUND } from "../utility";

export const syncQotd = onRequest(async (request, response) => {
  fetchQotd()
      .then(async leetcodeQuestion => {
        if (!leetcodeQuestion) {
          response.sendStatus(CODE_NOT_FOUND).end();
          return;
        } 
        const question = formatQuestion(leetcodeQuestion);
        await saveQuestion(question);
        response.end();
      }).catch(error => 
        handleError(error, response)
      );
});
