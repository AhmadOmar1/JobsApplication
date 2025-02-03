import { useJobs } from "../../hooks/useJobs";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../types/jobTypes";
import JobForm from "../../components/JobForm/JobForm";

const PostJob = () => {
  const { jobs, setJobs } = useJobs();
  const navigate = useNavigate();

  const handleSubmit = (jobData: Omit<IJob, "id">) => {
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
        <JobForm onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
};

export default PostJob;
