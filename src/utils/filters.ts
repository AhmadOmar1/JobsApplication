import { IJob } from "../types/jobTypes";

interface IFilters {
  postingDate: string;
  keyword: string;
  jobType: string;
  location: string;
  salaryRange: string;
  sortBy: string;
}

export const filterJobs = (jobs: IJob[], filters: IFilters) => {
  return jobs
    .filter((job) => {
      const salary = job.salary
        ? parseFloat(job.salary.replace(/[^\d.-]/g, "")) || 0
        : 0;
      const jobDate = new Date(job.postedAt).getTime();
      const now = Date.now();

      let isDateMatch = true;
      if (filters.postingDate === "Last Hour") {
        isDateMatch = jobDate >= now - 60 * 60 * 1000;
      } else if (filters.postingDate === "Last 24 Hours") {
        isDateMatch = jobDate >= now - 24 * 60 * 60 * 1000;
      } else if (filters.postingDate === "Last 7 Days") {
        isDateMatch = jobDate >= now - 7 * 24 * 60 * 60 * 1000;
      } else if (filters.postingDate === "Last 14 Days") {
        isDateMatch = jobDate >= now - 14 * 24 * 60 * 60 * 1000;
      } else if (filters.postingDate === "Last 30 Days") {
        isDateMatch = jobDate >= now - 30 * 24 * 60 * 60 * 1000;
      }

      return (
        isDateMatch &&
        (filters.keyword === "" ||
          job.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          job.company?.toLowerCase().includes(filters.keyword.toLowerCase())) &&
        (filters.jobType === "All" || job.type === filters.jobType) &&
        (filters.location === "" ||
          job.location
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (filters.salaryRange === "All" ||
          (filters.salaryRange === "Below 50k" && salary < 50000) ||
          (filters.salaryRange === "50k-100k" &&
            salary >= 50000 &&
            salary <= 100000) ||
          (filters.salaryRange === "Above 100k" && salary > 100000))
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.postedAt).getTime();
      const dateB = new Date(b.postedAt).getTime();

      if (filters.sortBy === "Newest") {
        return dateB - dateA;
      } else if (filters.sortBy === "Oldest") {
        return dateA - dateB;
      } else if (filters.sortBy === "Highest Salary") {
        return (
          (b.salary ? parseFloat(b.salary.replace(/[^\d.-]/g, "")) : 0) -
          (a.salary ? parseFloat(a.salary.replace(/[^\d.-]/g, "")) : 0)
        );
      } else if (filters.sortBy === "Lowest Salary") {
        return (
          (a.salary ? parseFloat(a.salary.replace(/[^\d.-]/g, "")) : 0) -
          (b.salary ? parseFloat(b.salary.replace(/[^\d.-]/g, "")) : 0)
        );
      }
      return 0;
    });
};
