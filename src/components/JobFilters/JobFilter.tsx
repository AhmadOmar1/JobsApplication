import React from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { JobType } from "../../types/jobTypes";

interface IFilterProps {
  onFilterChange: (text: string) => void;
  onJobTypeChange: (jobType: JobType) => void;
  jobType: JobType | "";
}

const JobFilter = ({ onFilterChange, onJobTypeChange }: IFilterProps) => {
  const [jobType, setJobType] = React.useState<JobType | "">("");

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedJobType = e.target.value as JobType;
    setJobType(selectedJobType);
    onJobTypeChange(selectedJobType);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        backgroundColor: "#5D87A1",
        borderRadius: 2,
        marginBottom: 2,
        padding: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          select
          label="Job Type"
          variant="filled"
          value={jobType}
          onChange={handleJobTypeChange}
          sx={{
            width: 150,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Full-time">Full-Time</MenuItem>
          <MenuItem value="Part-time">Part-Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
        </TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          borderRadius: 2,
          width: "100%",
          padding: 1,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Jobs"
          variant="filled"
          fullWidth
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          onChange={(e) => onFilterChange(e.target.value)}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            color: "black",
            fontWeight: "bold",
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
            "&:hover": { backgroundColor: "#4C708A", color: "white" },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default JobFilter;
