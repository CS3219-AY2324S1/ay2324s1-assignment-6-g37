// This file should be in charge of API calls
// For the Question type, need to have a shared type file!
import { Question } from "./types";

// originally directly fetch then update, deep coupling
// Now return a promise, let it de-couples from UI update
// Remove both re-fetching (let the getQuestions handle) and set
export const getQuestions = async (): Promise<Question[] | undefined> => {
  try {
    const res = await fetch("/api/questions");
    const questions: Question[] = await res.json();
    return questions;
  } catch (error) {
    console.error(error);
  }
};

export const addQuestion = async (newQuestion: Partial<Question>) => {
  // empty field check
  if (!newQuestion.title || !newQuestion.description) {
    alert("Question title and description cannot be empty.");
    return;
  }

  // set to others if no category
  if (!newQuestion.categories || newQuestion.categories.length == 0) {
    newQuestion.categories = ["Others"];
  }

  try {
    // First fetch all questions to check for duplicates
    const res = await fetch("/api/questions");
    const existingQuestions: Question[] = await res.json();

    const isDuplicateQuestion = existingQuestions.find(
      (q) => q.title === newQuestion.title
    );

    if (isDuplicateQuestion) {
      alert("Question with this title already exists.");
      return;
    }

    // If no duplicates, proceed to add question
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });

    if (response.status !== 200) {
      alert("Failed to add question");
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

// When using async/await, there is no need to wrap the code in a Promise
export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/questions/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 200) {
      alert("Failed to delete question");
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateQuestion = async (
  updatedQuestion: Question,
  id: string | number
): Promise<void> => {
  // Empty field check
  if (!updatedQuestion.title || !updatedQuestion.description) {
    alert("Question title and description cannot be empty.");
    return;
  }

  if (!updatedQuestion.categories || updatedQuestion.categories.length === 0) {
    updatedQuestion.categories = ["Others"];
  }

  // we wrap async/await code in a try-catch block because the async/await code
  // may throw errors
  try {
    // Do the duplicate check
    // the code will wait here, until the await function finishes
    const res = await fetch("/api/questions");
    const existingQuestions: Question[] = await res.json();

    const isDuplicatedQuestion = existingQuestions.find(
      (q) => q.title == updatedQuestion.title && q._id !== updatedQuestion._id
    );

    if (isDuplicatedQuestion) {
      alert("Question with this title already exists.");
      return;
    }

    const response = await fetch(`/api/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    });

    if (response.status !== 200) {
      alert("Failed to update question");
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
