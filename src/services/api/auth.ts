import apiClient from "./client";

export interface LoginCredentials {
  email: string;
  password: string;
  device_name?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  is_active?: boolean;
}

export const authService = {
  // Login to Laravel backend using Sanctum
  login: async (credentials: LoginCredentials) => {
    const payload = {
      ...credentials,
      device_name: credentials.device_name || "nextjs-client",
    };
    const response = await apiClient.post("/login", payload);
    if (response?.data?.token) {
      localStorage.setItem("crm_auth_token", response.data.token);
      localStorage.setItem("crm_user", JSON.stringify(response.data.user));
    }
    return response;
  },

  // Logout and revoke token
  logout: async () => {
    try {
      await apiClient.post("/logout");
    } finally {
      localStorage.removeItem("crm_auth_token");
      localStorage.removeItem("crm_user");
    }
  },

  // Fetch current authenticated user profile
  me: async () => {
    const response = await apiClient.get("/me");
    return response?.data || response;
  },

  // Get locally stored user without network call
  getCurrentUser: (): UserProfile | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("crm_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if currently authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("crm_auth_token");
  },
};

