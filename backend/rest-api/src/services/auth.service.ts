import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class AuthService {
  async login(request: LoginRequest): Promise<LoginResponse> {

    const { email, password } = request;

    if (email !== user.email) {
      throw new Error("Invalid email");
    }
    const valid = await bcrypt.compare(
      password,
      user.password
    );
    if (!valid) throw new Error("Invalid password");

    return {
      token: generateAccessToken({
        id: user.id,
        email: user.email
      }),
      user: {
        id: "1",
        name: "Commerce Admin",
        email,
      },
    };
  }
}

const user = {
    id: "1",
    email: "admin@commerce.com",
    name: "Commerce Admin",
    password: "$2b$10$Q4/jsgMKJDSCZKIZXDQLUO6JgbzcZoLWoR6MMF9dwbBXvA4s8z3Pe"
}