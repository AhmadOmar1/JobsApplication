import { IJob } from "../types/jobTypes";
import { IApplication } from "../types/applicationTypes";

export const getItemFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const setItemInLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};


export const getAuthStatus = (): boolean => {   
  return getItemFromLocalStorage<boolean>("isAdmin", false);
};

export const setAuthStatus = (isAuthenticated: boolean): void => {
  setItemInLocalStorage("isAdmin", isAuthenticated);
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
