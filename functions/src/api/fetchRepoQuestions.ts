import axios from "axios";
import { Question, WithId } from "../types";
import { isQuestionWithId } from "../utility/isQuestionWithId";
import { isArrayOfType } from "../utility";

/**
 * Fetches question from the PeerPrep questions repository.
 *
 * @param questionTitle Title of the question to fetch.
 * @returns The question if exists, null otherwise.
 */
export async function fetchRepoQuestions(questionTitle: string) {
  const url = "http://127.0.0.1:3001/api/questions";
  const data: Partial<Question> = {
    title: questionTitle
  };
  const config = {
    data: data
  };
  const response = await axios.get(url, config);
  const questions = response.data;
  if (isArrayOfType<WithId<Question>>(questions, isQuestionWithId)) {
    return questions;
  }
  return [];
}

