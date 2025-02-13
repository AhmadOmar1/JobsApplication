export interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: JobType;
  description: string;
  deadline: string;
  qualifications: string[];
  requirements: string[];
  postedAt: string;
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type ICardJob = Omit<
  IJob,
  "description" | "deadline" | "qualifications" | "requirements"
>;

export interface IMessage {
  id: string;
  name: string;
  email: string;
  message: string;
}
