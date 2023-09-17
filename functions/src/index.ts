import axios from "axios";
import {onRequest} from "firebase-functions/v2/https";
import { LeetcodeQuestion, Question } from "./types";
import { Response } from "firebase-functions/v1";
import { CODE_INTERNAL_SERVER_ERROR, CODE_NOT_FOUND, hasKey, isLeetcodeQuestion } from "./utility";

/**
 * Handles errors from sending requests fetching responses.
 *
 * @param error Error thrown.
 * @param response Response to return.
 */
function handleError(error: any, response: Response<any>) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
  response.sendStatus(CODE_INTERNAL_SERVER_ERROR);
}

/**
 * Retrives the question of the day from leetcode.
 * 
 * @returns Question of the day if found, null otherwise.
 */
async function fetchQotd() {
  const url = "https://leetcode.com/graphql";
  const graphQlQuery = "query questionOfToday {\nactiveDailyCodingChallengeQuestion {\nquestion {\ntitle\ndifficulty\ncontent\npaidOnly: isPaidOnly\ntopicTags {\nname\n}\n}\n}\n}";
  const options = {
    data: {
      query: graphQlQuery
    }
  }
  return axios
      .get(url, options)
      .then((response: unknown) => {
        if (!hasKey(response, 'data')
            || !hasKey(response.data, 'data')
            || !hasKey(response.data.data, 'activeDailyCodingChallengeQuestion')
            || !hasKey(response.data.data.activeDailyCodingChallengeQuestion, 'question')
        ) {
          return null;
        }
        const question = response.data.data.activeDailyCodingChallengeQuestion.question;
        if (!isLeetcodeQuestion(question)) {
          return null;
        }
        return question;
      });
}

/**
 * Formats a leetcode question to one following the format of PeerPrep Question.
 *
 * @param leetcodeQuestion Leetcode question to format.
 * @returns PeerPrep question.
 */
function formatQuestion(leetcodeQuestion: LeetcodeQuestion): Question {
  return {
    title: leetcodeQuestion.title,
    complexity: leetcodeQuestion.difficulty,
    categories: leetcodeQuestion.topicTags.map(tag => tag.name),
    description: leetcodeQuestion.content
  }
}

/**
 * Saves a question into the PeerPrep questions repository.
 *
 * @param question Question to save.
 * @returns The response of the post request from posting the question to the questions repository.
 */
async function saveQuestion(question: Question) {
  const url = "http://127.0.0.1:3000/api/questions";
  return axios.post(url, question);
}

export const syncQuestions = onRequest(async (request, response) => {
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
