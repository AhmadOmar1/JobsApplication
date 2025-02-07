export interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: JobType;
  description: string;
  deadline: string;
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type ICardJob = Omit<IJob, "description" | "deadline">;