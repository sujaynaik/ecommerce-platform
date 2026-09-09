import { api } from "../client/api";
import { PlatformUser } from "./types";

export const usersApi = {
  async getAll() {
    const { data } = await api.get<PlatformUser[]>("/users");
    return data;
  },
};
