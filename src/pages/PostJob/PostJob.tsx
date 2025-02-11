import { useJobs } from "../../hooks/useJobs";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../types/jobTypes";
import JobForm from "../../components/JobForm/JobForm";
import styles from "./post-job.module.css";
import { setJobsInLocalStorage } from "../../utils/localStorage";

const PostJob = () => {
  const { jobs, setJobs } = useJobs();
  const navigate = useNavigate();

  const handleSubmit = (jobData: Omit<IJob, "id">) => {
    const newJob: IJob = {
      id: `job${jobs.length + 1}`,
      ...jobData,
      postedAt: new Date().toISOString().split("T")[0], 
      qualifications: jobData.qualifications ?? [],
      requirements: jobData.requirements ?? [],
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    setJobsInLocalStorage(updatedJobs);

    navigate("/");
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}></Box>

      <Paper className={styles.paper}>
        <Typography variant="h5" gutterBottom className={styles.title}>
          Post a New Job
        </Typography>
        <JobForm onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
};

export default PostJob;
