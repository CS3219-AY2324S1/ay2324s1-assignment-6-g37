import axios from "axios";
import { extractLeetcodeQuestion } from "./extractLeetcodeQuestion";

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
  console.log('fetching leetcode QOTD');
  return axios
      .get(url, options)
      .then(response => extractLeetcodeQuestion(
        response,
        ['data', 'data', 'activeDailyCodingChallengeQuestion', 'question']
      ));
}
