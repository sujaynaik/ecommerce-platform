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
  login(request: LoginRequest): LoginResponse {

    const { email, password } = request;

    if (
      email !== "admin@commerce.com" ||
      password !== "admin123"
    ) {
      throw new Error("Invalid credentials");
    }

    return {
      token: "temporary-jwt",

      user: {
        id: "1",
        name: "Commerce Admin",
        email,
      },
    };
  }
}