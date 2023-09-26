import axios from "axios";
import { hasKey, isLeetcodeQuestion } from "../utility";

/**
 * Retrives the question of the day from leetcode.
 * 
 * @returns Question of the day if found, null otherwise.
 */
export async function fetchLeetcodeQotd() {
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
