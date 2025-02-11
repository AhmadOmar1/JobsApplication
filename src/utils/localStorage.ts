import { IJob } from "../types/jobTypes";
import { IApplication } from "../types/applicationTypes";

export const getItemFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return defaultValue;

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error accessing localStorage for ${key}:`, error);
    return defaultValue;
  }
};


export const setItemInLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
};


export const getAuthStatus = (): boolean => {
  return getItemFromLocalStorage<boolean>("isAdmin", false);
};

export const setAuthStatus = (isAuthenticated: boolean): void => {
  try {
    setItemInLocalStorage("isAdmin", isAuthenticated);
  } catch (error) {
    console.error("Error setting authentication status:", error);
  }
};

export const getJobsFromLocalStorage = (): IJob[] => {
  return getItemFromLocalStorage<IJob[]>("jobs", []);
};

export const setJobsInLocalStorage = (jobs: IJob[]): void => {
  setItemInLocalStorage("jobs", jobs);
};

export const getApplicationsFromLocalStorage = (): IApplication[] => {
  return getItemFromLocalStorage<IApplication[]>("applications", []);
};

export const setApplicationsInLocalStorage = (
  applications: IApplication[]
): void => {
  setItemInLocalStorage("applications", applications);
};
