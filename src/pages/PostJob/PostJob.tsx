import { useContext } from "react";
import { useJobs } from "../../hooks/useJobs";
import { Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../types/jobTypes";
import JobForm from "../../components/JobForm/JobForm";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./post-job.module.css"; 

const PostJob = () => {
  const { jobs, setJobs } = useJobs();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = (jobData: Omit<IJob, "id">) => {
    const newJob: IJob = {
      id: `job${jobs.length + 1}`,
      ...jobData,
    };

    setJobs([...jobs, newJob]);
    navigate("/admin/dashboard");
  };

  const handleLogout = () => {
    authContext?.logout();
    navigate("/admin/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() => navigate("/admin/dashboard")}
          variant="contained"
          color="primary"
          className={styles.button}
        >
          🔙 Back to Dashboard
        </Button>

        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          className={styles.button}
        >
          🚪 Logout
        </Button>
      </div>

      <Paper className={styles.paper}>
        <Typography variant="h5" gutterBottom className={styles.title}>
          Post a New Job
        </Typography>
        <JobForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
};

export default PostJob;
