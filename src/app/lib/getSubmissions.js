import Submission from "../models/submission";
import DBConnection from "./db";
import getAuthenticatedUser from "./getAuthenticatedUser";

export async function getSubmissions(id) {
  const { user } = await getAuthenticatedUser();
  try {
    await DBConnection();
    const result = await Submission.find({
      userId: user.name,
      questionId: id,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
