import { useState } from "react";
import { useJobs } from "../../hooks/useJobs";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../types/jobTypes";

const jobTypes: IJob["type"][] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
];

const PostJob = () => {
  const { jobs, setJobs } = useJobs();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState<Omit<IJob, "id">>({
    title: "",
    company: "",
    location: "",
    salary: 0,
    type: "Full-time",
    description: "",
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (
    e: SelectChangeEvent<IJob["type"]>
  ) => {
    setJobData((prev) => ({
      ...prev,
      type: e.target.value as IJob["type"],
    }));
  };

  const isFormValid = () => {
    return (
      jobData.title.trim() &&
      jobData.company.trim() &&
      jobData.location.trim() &&
      jobData.salary > 0 &&
      jobData.type &&
      jobData.description.trim() &&
      jobData.deadline
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("⚠️ Please fill in all fields correctly!");
      return;
    }

    const newJob: IJob = {
      id: `job${jobs.length + 1}`,
      ...jobData,
    };

    setJobs([...jobs, newJob]);

    navigate("/admin/dashboard");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Post a New Job
        </Typography>

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
            required
          />
          <TextField
            label="Company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            required
          />
          <TextField
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={jobData.salary.toString()}
            onChange={handleChange}
            required
          />

          <FormControl required>
            <Select
              name="type"
              value={jobData.type}
              onChange={handleTypeChange}
            >
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
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Button type="submit" variant="contained" color="primary">
            Post Job
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PostJob;
