import axios from "axios";
import { Question } from "../types";
import { fetchRepoQuestions } from "./fetchRepoQuestions";

/**
 * Saves a question into the PeerPrep questions repository.
 * Updates the existing question if it exists, and adds it to the repo otherwise.
 *
 * @param question Question to save.
 * @returns The response of the post or put request from posting the question to the questions repository.
 */
export async function saveRepoQuestion(question: Question) {
  const existingQuestions = await fetchRepoQuestions(question.title);
  if (existingQuestions.length > 0) {
    const url = `http://127.0.0.1:3001/api/questions/${existingQuestions[0]._id}`;
    return axios.put(url, question);
  }
  const url = "http://127.0.0.1:3001/api/questions";
  return axios.post(url, question);
}
