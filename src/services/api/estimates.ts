import apiClient from "./client";

export const estimatesService = {
  // Get estimates list
  getEstimates: async (params?: Record<string, any>) => {
    const response = await apiClient.get("/estimates", { params });
    return response.data;
  },

  // Get single estimate with line items
  getEstimate: async (id: number | string) => {
    const response = await apiClient.get(`/estimates/${id}`);
    return response.data;
  },

  // Create estimate (BOM or Base price)
  createEstimate: async (data: Record<string, any>) => {
    const response = await apiClient.post("/estimates", data);
    return response.data;
  },

  // Update estimate
  updateEstimate: async (id: number | string, data: Record<string, any>) => {
    const response = await apiClient.put(`/estimates/${id}`, data);
    return response.data;
  },

  // Update status (pending, approved, rejected, completed)
  updateStatus: async (id: number | string, status: string) => {
    const response = await apiClient.patch(`/estimates/${id}/status`, { status });
    return response.data;
  },

  // Delete estimate
  deleteEstimate: async (id: number | string) => {
    const response = await apiClient.delete(`/estimates/${id}`);
    return response.data;
  },
};

