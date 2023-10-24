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
export async function fetchRepoQuestions(questionTitle: string, questionServiceUrl: string ) {
  const url = `${questionServiceUrl}/api/questions`;
  const data: Partial<Question> = {
    title: questionTitle
  };
  const config = {
    data: data
  };
  console.log('checking for existing question');
  const response = await axios.get(url, config);
  const questions = response.data;
  if (isArrayOfType<WithId<Question>>(questions, isQuestionWithId)) {
    return questions;
  }
  return [];
}

