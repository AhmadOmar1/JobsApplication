import { createContext, useState, useEffect, ReactNode } from "react";
import { IJob } from "../types/jobTypes";
import {
  getJobsFromLocalStorage,
  setJobsInLocalStorage,
} from "../utils/localStorage";

interface IJobContext {
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
}

export const JobContext = createContext<IJobContext | null>(null);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<IJob[]>(() => getJobsFromLocalStorage());

  useEffect(() => {
    setJobsInLocalStorage(jobs);
  }, [jobs]);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};
