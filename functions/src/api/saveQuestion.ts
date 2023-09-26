import axios from "axios";
import { Question } from "../types";

/**
 * Saves a question into the PeerPrep questions repository.
 *
 * @param question Question to save.
 * @returns The response of the post request from posting the question to the questions repository.
 */
export async function saveQuestion(question: Question) {
  const url = "http://127.0.0.1:3001/api/questions";
  return axios.post(url, question);
}
