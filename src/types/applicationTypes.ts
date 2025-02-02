export interface IApplication {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  status: "Pending" | "Reviewed" | "Rejected";
}
