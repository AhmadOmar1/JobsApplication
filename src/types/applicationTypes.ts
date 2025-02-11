export interface IApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
  status: "Pending" | "Reviewed" | "Rejected";
}
