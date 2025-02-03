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

interface JobFormProps {
  onSubmit: (jobData: Omit<IJob, "id">) => void;
}

const JobForm = ({ onSubmit }: JobFormProps) => {
  const [jobData, setJobData] = useState<Omit<IJob, "id">>({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    deadline: "",
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
      if (value === "") {
        setJobData((prev) => ({
          ...prev,
          salary: "",
        }));
        return;
      }

      const numericValue = value.replace(/\D/g, "");
      if (!isNaN(Number(numericValue))) {
        setJobData((prev) => ({
          ...prev,
          salary: `${numericValue}$`,
        }));
      }
    } else {
      setJobData((prev) => ({ ...prev, [name]: value }));
    }

    if (name !== "salary") {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
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
      const jobDataToStore = { ...jobData };
      onSubmit(jobDataToStore);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Job Title"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        required
      />
      <TextField
        label="Company"
        name="company"
        value={jobData.company}
        onChange={handleChange}
        error={!!errors.company}
        helperText={errors.company}
        required
      />
      <TextField
        label="Location"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        error={!!errors.location}
        helperText={errors.location}
        required
      />
      <TextField
        label="Salary"
        name="salary"
        value={jobData.salary}
        onChange={handleChange}
        error={!!errors.salary}
        helperText={errors.salary}
        required
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            min: "0",
          },
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
      />
      <FormControl required>
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
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Button type="submit" variant="contained" color="primary">
        Post Job
      </Button>
    </Box>
  );
};

export default JobForm;
