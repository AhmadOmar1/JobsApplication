import { IJob } from "../types/jobTypes";

export const validateField = (
  name: keyof Omit<IJob, "id">,
  value: string | number | string[] | undefined
): string | undefined => {
  switch (name) {
    case "title":
      if (!value || typeof value !== "string" || value.trim() === "")
        return "Job title is required.";
      if (value.trim().length < 5)
        return "Job title must be at least 5 characters.";
      break;

    case "company":
      if (!value || typeof value !== "string" || value.trim() === "")
        return "Company name is required.";
      if (value.trim().length < 5)
        return "Company name must be at least 5 characters.";
      break;

    case "location":
      if (!value || typeof value !== "string" || value.trim() === "")
        return "Location is required.";
      if (value.trim().length < 3)
        return "Location must be at least 3 characters.";
      break;

    case "salary":
      if (!value || typeof value !== "string" || value.trim() === "")
        return "Salary is required.";
      if (isNaN(Number(value))) return "Salary must be a valid number.";
      break;

    case "description":
      if (!value || typeof value !== "string" || value.trim() === "")
        return "Description is required.";
      if (value.trim().length < 10)
        return "Description must be at least 10 characters.";
      break;

    case "qualifications":
      if (!value || !Array.isArray(value) || value.length === 0)
        return "At least one qualification is required.";
      if (value.some((q) => q.trim().length < 3))
        return "Each qualification must be at least 3 characters.";
      break;

    case "requirements":
      if (!value || !Array.isArray(value) || value.length === 0)
        return "At least one requirement is required.";
      if (value.some((r) => r.trim().length < 3))
        return "Each requirement must be at least 3 characters.";
      break;

    case "deadline":
      if (!value || typeof value !== "string" || new Date(value) <= new Date())
        return "Deadline must be a future date.";
      break;

    default:
      return undefined;
  }
};

export const validateForm = (jobData: Omit<IJob, "id">) => {
  const errors: Partial<Record<keyof Omit<IJob, "id">, string | undefined>> =
    {};

  Object.entries(jobData).forEach(([key, value]) => {
    const error = validateField(
      key as keyof Omit<IJob, "id">,
      value as string | string[]
    );
    if (error) errors[key as keyof Omit<IJob, "id">] = error;
  });

  return errors;
};
