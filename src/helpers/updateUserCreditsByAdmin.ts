import User from "@/db/schemas/User";
import startDB from "@/lib/db";

export const updateUserCreditsByAdmin = async (
  email: string | null | undefined,
  credits: number
) => {
  try {
    await startDB();
    // Fetch the user document by email
    if (email) {
      await User.findOneAndUpdate(
        { email: email },
        { $inc: { userCredits: +credits, totalCredits: +credits } }, // Using $inc to decrement the totalCredits
        { new: true }
      );
      console.log(`Updated totalCredits for ${email} `);
    } else {
      console.log(`User with email ${email} not found`);
    }
  } catch (error) {
    console.error("Error updating totalCredits:", error);
  }
};
