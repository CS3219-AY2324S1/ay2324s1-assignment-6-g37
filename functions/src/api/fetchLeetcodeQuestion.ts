import axios from "axios";
import { extractLeetcodeQuestion } from "./extractLeetcodeQuestion";

/**
 * Retrives the question of the day from leetcode.
 * 
 * @param titleSlug Unique URL string assigned to the leetcode question.
 * @returns Question of the day if found, null otherwise.
 */
export async function fetchLeetcodeQuestion(titleSlug: string) {
  const url = "https://leetcode.com/graphql";
  const graphQlQuery = "query questionTitle($titleSlug: String!){\nquestion(titleSlug: $titleSlug){\ntitle\ndifficulty\ncontent\ntopicTags{\nname\n}\n}\n}";
  const options = {
    data: {
      query: graphQlQuery,
      variables: {
        titleSlug
      }
    }
  }
  return axios
      .get(url, options)
      .then(response => extractLeetcodeQuestion(
        response,
        ['data', 'data', 'question']
      ));
}
