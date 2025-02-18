import styles from "./post-job.module.css";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { IJob } from "../../types/jobTypes";
import { useJobs } from "../../hooks/useJobs";
import { setJobsInLocalStorage } from "../../utils/localStorage";
import JobForm from "../../components/JobForm/JobForm";

const PostJob = () => {
  const { jobs, setJobs } = useJobs();
  const navigate = useNavigate();

  const handleSubmit = (jobData: Omit<IJob, "id">) => {
    const newJob: IJob = {
      id: `job${jobs.length + 1}`,
      ...jobData,
      postedAt: jobData.postedAt
        ? new Date(jobData.postedAt).toISOString()
        : new Date().toISOString(),
      qualifications: jobData.qualifications ?? [],
      requirements: jobData.requirements ?? [],
    };
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    setJobsInLocalStorage(updatedJobs);

    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Box className={styles.container}>
        <Box className={styles.header}></Box>

        <Paper className={styles.paper}>
          <Typography
            variant="h4"
            gutterBottom
            className={styles.title}
            sx={{
              textAlign: "center",
              marginBottom: 3,
              fontStyle: "italic",
              fontWeight: "bold", 
              color: " rgb(11, 86, 23)",
              textShadow: "2px 2px 5px rgba(106, 92, 11, 0.6)",
            }}
          >
            Post a New Job
          </Typography>
          <JobForm onSubmit={handleSubmit} />
        </Paper>
      </Box>
    </motion.div>
  );
};

export default PostJob;
