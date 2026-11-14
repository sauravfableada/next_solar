import apiClient from "./client";

export const partnersService = {
  // Get partners list with KPIs
  getPartners: async (params?: Record<string, any>) => {
    const response = await apiClient.get("/agents", { params });
    return response.data;
  },

  // Get partner details, referral statistics & calculation breakdown
  getPartner: async (id: number | string) => {
    const response = await apiClient.get(`/agents/${id}`);
    return response.data;
  },

  // Create partner
  createPartner: async (data: Record<string, any>) => {
    const response = await apiClient.post("/agents", data);
    return response.data;
  },

  // Update partner
  updatePartner: async (id: number | string, data: Record<string, any>) => {
    const response = await apiClient.put(`/agents/${id}`, data);
    return response.data;
  },

  // Delete partner
  deletePartner: async (id: number | string) => {
    const response = await apiClient.delete(`/agents/${id}`);
    return response.data;
  },
};

