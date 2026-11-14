import apiClient from "./client";

export interface UserProfileData {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  user_name?: string;
  role?: string;
  avatar?: string;
  department?: string;
}

export interface PasswordChangeData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export const profileService = {
  // Get authenticated profile
  getProfile: async () => {
    const response = await apiClient.get<{ success: boolean; data: UserProfileData }>("/profile");
    return response.data;
  },

  // Update profile details (supports both plain JSON and FormData with file)
  updateProfile: async (data: FormData | Partial<UserProfileData>) => {
    if (data instanceof FormData) {
      const response = await apiClient.post("/profile", data);
      return response;
    }
    const response = await apiClient.put("/profile", data);
    return response;
  },

  // Change password
  changePassword: async (data: PasswordChangeData) => {
    const response = await apiClient.post("/profile/change-password", data);
    return response;
  },
};
