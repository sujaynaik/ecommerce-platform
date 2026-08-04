import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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
    
    const payload = {
      id: user.id,
      email: user.email
    }
    
    let accessToken = '', refreshToken = ''
    try {
      // console.log('token payload:', payload);
      accessToken = generateAccessToken(payload)
      refreshToken = generateRefreshToken(payload)
    } catch(e) {
      console.error('token error:', e);
    }
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: "Commerce Admin",
        email,
      },
    };
  }

  async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const payload = verifyRefreshToken(request.refreshToken) as {
      id: string;
      email: string;
    }

    const accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
    });

    return {
      accessToken,
    };
  }
}

const user = {
    id: "1",
    email: "admin@commerce.com",
    name: "Commerce Admin",
    password: "$2b$10$Q4/jsgMKJDSCZKIZXDQLUO6JgbzcZoLWoR6MMF9dwbBXvA4s8z3Pe"
}