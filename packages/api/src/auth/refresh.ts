import { api } from "../client/api";
import { tokenService } from "./token.service";

export async function refreshAccessToken(): Promise<string> {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const response = await api.post("/auth/refresh", {
      refreshToken,
    });

    const accessToken = response.data.accessToken;

    tokenService.setAccessToken(accessToken);
    
    return accessToken;
}