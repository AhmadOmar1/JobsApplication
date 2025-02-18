import styles from "./job-form.module.css";
import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

import { IJob } from "../../types/jobTypes";
import { validateField, validateForm } from "../../utils/validation";

const jobTypes: IJob["type"][] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
];

interface IJobFormProps {
  onSubmit: (jobData: Omit<IJob, "id">) => void;
}

const JobForm = ({ onSubmit }: IJobFormProps) => {
  const [jobData, setJobData] = useState<Omit<IJob, "id">>({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    deadline: "",
    qualifications: [],
    requirements: [],
    postedAt: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof Omit<IJob, "id">, string | undefined>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as {
      name: keyof Omit<IJob, "id">;
      value: string;
    };

    if (name === "salary") {
      const numericValue = value.replace(/\D/g, "");
      setJobData((prev) => ({
        ...prev,
        salary: numericValue,
      }));

      const error = validateField(name, numericValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setJobData((prev) => ({ ...prev, [name]: value }));

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleQualificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = e.target.value.split(",").map((q) => q.trim());
    setJobData((prev) => ({ ...prev, qualifications: values }));
    setErrors((prev) => ({ ...prev, qualifications: undefined }));
  };

  const handleRequirementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",").map((r) => r.trim());
    setJobData((prev) => ({ ...prev, requirements: values }));
    setErrors((prev) => ({ ...prev, requirements: undefined }));
  };

  const handleTypeChange = (e: SelectChangeEvent<IJob["type"]>) => {
    setJobData((prev) => ({
      ...prev,
      type: e.target.value as IJob["type"],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(jobData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(jobData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Job Title"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        required
        className={styles.textField}
      />
      <TextField
        label="Company"
        name="company"
        value={jobData.company}
        onChange={handleChange}
        error={!!errors.company}
        helperText={errors.company}
        required
        className={styles.textField}
      />
      <TextField
        label="Location"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        error={!!errors.location}
        helperText={errors.location}
        required
        className={styles.textField}
      />
      <TextField
        label="Salary"
        name="salary"
        value={jobData.salary ? `${jobData.salary}$` : ""}
        onChange={handleChange}
        error={!!errors.salary}
        helperText={errors.salary}
        required
        className={styles.textField}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
      />
      <FormControl required className={styles.select}>
        <Select name="type" value={jobData.type} onChange={handleTypeChange}>
          {jobTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Job Description"
        name="description"
        value={jobData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        required
        multiline
        rows={4}
        className={styles.textField}
      />

      <TextField
        label="Qualifications (comma separated)"
        name="qualifications"
        value={jobData.qualifications.join(", ")}
        onChange={handleQualificationsChange}
        error={!!errors.qualifications}
        helperText={errors.qualifications}
        required
        className={styles.textField}
      />

      <TextField
        label="Requirements (comma separated)"
        name="requirements"
        value={jobData.requirements.join(", ")}
        onChange={handleRequirementsChange}
        error={!!errors.requirements}
        helperText={errors.requirements}
        required
        className={styles.textField}
      />

      <TextField
        label="Posted At (Date & Time)"
        name="postedAt"
        type="datetime-local"
        value={jobData.postedAt}
        onChange={handleChange}
        error={!!errors.postedAt}
        helperText={errors.postedAt}
        required
        className={styles.textField}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <TextField
        label="Deadline"
        name="deadline"
        type="date"
        value={jobData.deadline}
        onChange={handleChange}
        error={!!errors.deadline}
        helperText={errors.deadline}
        required
        className={styles.textField}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={styles.button}
      >
        Post Job
      </Button>
    </Box>
  );
};

export default JobForm;
