import apiClient from "./client";

export interface CustomerFilterParams {
  page?: number;
  per_page?: number;
  search?: string;
  stage_id?: string | number;
  city_id?: string | number;
}

export const customersService = {
  // Get paginated customers list
  getCustomers: async (params?: CustomerFilterParams) => {
    const response = await apiClient.get("/customers", { params });
    return response.data;
  },

  // Get single customer details
  getCustomer: async (id: number | string) => {
    const response = await apiClient.get(`/customers/${id}`);
    return response.data;
  },

  // Create customer
  createCustomer: async (data: Record<string, any>) => {
    const response = await apiClient.post("/customers", data);
    return response.data;
  },

  // Update customer
  updateCustomer: async (id: number | string, data: Record<string, any>) => {
    const response = await apiClient.put(`/customers/${id}`, data);
    return response.data;
  },

  // Update pipeline stage directly
  updateStage: async (id: number | string, stageId: number | string) => {
    const response = await apiClient.patch(`/customers/${id}`, {
      stage_id: stageId,
    });
    return response.data;
  },

  // Delete customer
  deleteCustomer: async (id: number | string) => {
    const response = await apiClient.delete(`/customers/${id}`);
    return response.data;
  },
};

