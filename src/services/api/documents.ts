import apiClient from "./client";

export const documentsService = {
  // Get all saved documents with search and filter
  getSavedDocuments: async (params?: { search?: string; type?: string }) => {
    const response = await apiClient.get("/documents", { params });
    return response.data;
  },

  // Save solar document form details
  saveSolarDocument: async (data: Record<string, any>) => {
    const response = await apiClient.post("/documents", {
      ...data,
      document_type: "Solar Documents",
    });
    return response.data;
  },

  // Save subsidy bond form details
  saveSubsidyBond: async (data: Record<string, any>) => {
    const response = await apiClient.post("/documents", {
      ...data,
      document_type: "Subsidy Bond",
    });
    return response.data;
  },

  // Delete document
  deleteDocument: async (id: number | string) => {
    const response = await apiClient.delete(`/documents/${id}`);
    return response.data;
  },
};

