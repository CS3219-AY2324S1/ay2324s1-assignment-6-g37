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
export async function saveRepoQuestion(question: Question, host: String ='127.0.0.1') {
  const existingQuestions = await fetchRepoQuestions(question.title);
  if (existingQuestions.length > 0) {
    const url = `http://${host}:3001/api/questions/${existingQuestions[0]._id}`;
    console.log('Updating existing question:', question.title);
    return axios.put(url, question);
  }
  const url = `http://${host}:3001/api/questions`;
  console.log('Adding new question:', question.title);
  return axios.post(url, question);
}
