import axios from "axios";

export async function resetPassword(email: string): Promise<void> {
  const response = await axios.post("/api/reset-password", { email });
  console.log("response: ", response);
  const { success } = response.data;
  if (!success) {
    throw new Error("Failed to reset password");
  }
}

export async function changePassword(obj: {
  email: string;
  password: string;
}): Promise<void> {
  const response = await axios.post("/api/change-password", { ...obj });
  const { success } = response.data;
  if (!success) {
    throw new Error("Failed to reset password");
  }
}
