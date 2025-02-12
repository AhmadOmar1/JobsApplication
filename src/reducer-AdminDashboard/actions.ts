import { IApplication } from "../types/applicationTypes";

export const setFilterStatus = (status: string) => ({
  type: "FILTER_STATUS" as const,
  payload: status,
});

export const setCurrentPage = (page: number) => ({
  type: "CURRENT_PAGE" as const,
  payload: page,
});

export const setCurrentJobPage = (page: number) => ({
  type: "CURRENT_JOB_PAGE" as const,
  payload: page,
});

export const setCurrentMessagePage = (page: number) => ({
  type: "CURRENT_MESSAGE_PAGE" as const,
  payload: page,
});

export const setLocalApplications = (applications: IApplication[]) => ({
  type: "LOCAL_APPLICATIONS" as const,
  payload: applications,
});

export const setMessages = (
  messages: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
  }>
) => ({
  type: "SET_MESSAGES" as const,
  payload: messages,
});

export type AdminDashboardAction = ReturnType<
  | typeof setFilterStatus
  | typeof setCurrentPage
  | typeof setCurrentJobPage
  | typeof setCurrentMessagePage
  | typeof setLocalApplications
  | typeof setMessages
>;
