"use client";

import WorkflowKanbanView from "@/components/WorkflowKanbanView";

const initialCustomers = [
  {
    id: "1",
    name: "TEST LEAD",
    asplId: "ASPL-0007",
    phone: "7894561995",
    date: "06 Nov 2026, 03:09 pm",
    stageId: 1, // Pending
  },
  {
    id: "2",
    name: "TEST CUSTOMER",
    asplId: "ASPL-0006",
    phone: "9870543210",
    date: "29 Oct 2026, 02:53 pm",
    stageId: 1, // Pending
  },
];

export default function DocumentVerificationPage() {
  return (
    <WorkflowKanbanView
      workflowTitle="Document Verification"
      activeSubItemName="Document Verification"
      initialCustomers={initialCustomers}
    />
  );
}

