import { apiClient } from "@/lib/axios";

const authService = {
  async signIn(email: string, password: string) {
    const response = await apiClient.post("/api/auth/sign-in", {
      email,
      password,
    });

    return response.data;
  },
};

export default authService;
