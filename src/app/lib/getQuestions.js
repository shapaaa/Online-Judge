import Question from "../models/question";
import DBConnection from "./db";

export async function getQuestions() {
  try {
    await DBConnection();
    const questions = await Question.find({});
    return questions;
  } catch (error) {
    throw new Error(error);
  }
}
