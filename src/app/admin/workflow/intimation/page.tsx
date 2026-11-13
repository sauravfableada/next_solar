"use client";

import WorkflowKanbanView, { WorkflowStage } from "@/components/WorkflowKanbanView";

const intimationStages: WorkflowStage[] = [
  { id: 1, name: "Intimation Pending", order: 1 },
  { id: 2, name: "Intimation Done", order: 2 },
];

export default function IntimationPage() {
  return (
    <WorkflowKanbanView
      workflowTitle="Intimation"
      activeSubItemName="Intimation"
      initialStages={intimationStages}
      initialCustomers={[]}
    />
  );
}


