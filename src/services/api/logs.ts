import apiClient from "./client";

export const logsService = {
  // Get paginated user activity audit logs
  getLogs: async (params?: { page?: number; per_page?: number; search?: string }) => {
    const response = await apiClient.get("/user-logs", { params });
    return response.data;
  },

  // Clear single log entry
  clearLog: async (id: number | string) => {
    const response = await apiClient.delete(`/user-logs/${id}`);
    return response.data;
  },

  // Delete all activity logs
  deleteAllLogs: async () => {
    const response = await apiClient.delete("/user-logs");
    return response.data;
  },
};

