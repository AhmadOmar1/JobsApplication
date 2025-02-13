import { createContext, useState, useEffect, ReactNode } from "react";
import { IJob, JobType } from "../types/jobTypes";
import jobsData from "../data/jobs.json";
import {
  getJobsFromLocalStorage,
  setJobsInLocalStorage,
} from "../utils/localStorage";

interface IJobContextType {
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
}

export const JobContext = createContext<IJobContextType | null>(null);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<IJob[]>([]);

useEffect(() => {
  const storedJobs = getJobsFromLocalStorage();
  if (storedJobs.length > 0) {
    setJobs(
      storedJobs.map((job) => ({
        ...job,
        postedAt: isNaN(new Date(job.postedAt).getTime())
          ? new Date().toISOString()
          : new Date(job.postedAt).toISOString(),
      }))
    );
  } else {
    const formattedJobs: IJob[] = jobsData.map((job) => ({
      ...job,
      type: job.type as JobType,
      postedAt:
        job.postedAt && !isNaN(new Date(job.postedAt).getTime())
          ? new Date(job.postedAt).toISOString()
          : new Date().toISOString(),
    }));

    setJobs(formattedJobs);
    setJobsInLocalStorage(formattedJobs);
  }
}, []);



  useEffect(() => {
    if (jobs.length > 0) {
      setJobsInLocalStorage(jobs);
    }
  }, [jobs]);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};
