import apiClient from "./client";

export const settingsService = {
  // Get all settings or filter by group (with fallback to public settings if unauthenticated)
  getSettings: async (group?: string) => {
    try {
      const response = await apiClient.get<{ success: boolean; data: Record<string, any> }>("/settings", {
        params: group ? { group } : undefined,
      });
      return response.data;
    } catch (e: any) {
      if (e?.response?.status === 401) {
        const publicRes = await apiClient.get<{ success: boolean; data: Record<string, any> }>("/settings/public");
        return publicRes.data;
      }
      throw e;
    }
  },

  // Save settings (supports JSON object or FormData with files)
  saveSettings: async (data: FormData | Record<string, any>) => {
    const response = await apiClient.post("/settings", data);
    return response;
  },
};
