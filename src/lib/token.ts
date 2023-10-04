import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(payload: object): string {
  if (JWT_SECRET) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  } else {
    return "";
  }
}
