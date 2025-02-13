import { IApplication } from "../types/applicationTypes";

export interface IAdminDashboardState {
  filterStatus: string;
  currentPage: number;
  currentJobPage: number;
  currentMessagePage: number;
  localApplications: IApplication[];
  messages: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
  }>;
}

export const initialState: IAdminDashboardState = {
  filterStatus: "All",
  currentPage: 1,
  currentJobPage: 1,
  currentMessagePage: 1,
  localApplications: [],
  messages: [],
};

type Action =
  | { type: "FILTER_STATUS"; payload: string }
  | { type: "CURRENT_PAGE"; payload: number }
  | { type: "CURRENT_JOB_PAGE"; payload: number }
  | { type: "CURRENT_MESSAGE_PAGE"; payload: number }
  | { type: "LOCAL_APPLICATIONS"; payload: IApplication[] }
  | {
      type: "SET_MESSAGES";
      payload: Array<{
        id: string;
        name: string;
        email: string;
        message: string;
      }>;
    };

export const adminDashboardReducer = (
  state: IAdminDashboardState = initialState,
  action: Action
): IAdminDashboardState => {
  switch (action.type) {
    case "FILTER_STATUS":
      return { ...state, filterStatus: action.payload };
    case "CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "CURRENT_JOB_PAGE":
      return { ...state, currentJobPage: action.payload };
    case "CURRENT_MESSAGE_PAGE":
      return { ...state, currentMessagePage: action.payload };
    case "LOCAL_APPLICATIONS":
      return { ...state, localApplications: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
