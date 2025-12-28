export type TestType =
  | "prep20"
  | "prep50"
  | "real"
  | "marathon"
  | "mistakes"
  | "tricky"
  | "topic"
  | "ticket";

export const TEST_ENDPOINTS: Record<TestType, string> = {
  prep20: "/tests/prep20/start/",
  prep50: "/tests/prep50/start/",
  real: "/tests/real/start/",
  marathon: "/tests/marafon/start/",
  mistakes: "/tests/mistakes/start/",
  tricky: "/tests/tricky/start/",
  topic: "/tests/topics", // slug qo‘shiladi
  ticket: "/tests/tickets", // number qo‘shiladi
};
