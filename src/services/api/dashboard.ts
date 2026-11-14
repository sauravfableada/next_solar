import apiClient from "./client";

export const dashboardService = {
  // 4 Top KPI metric cards
  getStats: async (params?: { start_date?: string; end_date?: string }) => {
    const response = await apiClient.get("/dashboard/stats", { params });
    return response.data?.data || response.data;
  },

  // 16 Pipeline stages customer count summary
  getPipelineSummary: async () => {
    const response = await apiClient.get("/dashboard/customer-report");
    return response.data?.data || response.data;
  },

  // Today's action list / tasks widget
  getActionsList: async () => {
    const response = await apiClient.get("/dashboard/tasks-widget");
    return response.data?.data || response.data;
  },

  // Daily activity spline chart data (leads, followups, meetings)
  getActivityTrend: async (period: string = "Last 30 days") => {
    const response = await apiClient.get("/dashboard/trend", {
      params: { period },
    });
    return response.data?.data || response.data;
  },

  // All Deals widget
  getDealsWidget: async () => {
    const response = await apiClient.get("/dashboard/deals-widget");
    return response.data?.data || response.data;
  },
};

