export interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  deadline: string; 
}
