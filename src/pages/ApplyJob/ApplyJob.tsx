import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { useApplications } from "../../hooks/useApplications";
import { IApplication } from "../../types/applicationTypes";

import ApplicationForm from "../../components/ApplicationForm/ApplicationForm";
const ApplyJob = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const { addApplication } = useApplications();
  const { isAuthenticated } = useAuth();

  const job = jobs.find((job) => job.id === jobId);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

  if (!job) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" color="error">
          Job not found.
        </Typography>
      </Box>
    );
  }

  const handleFormSubmit = (formData: FormData) => {
    const resume = formData.get("resume") as string;
    const coverLetter = (formData.get("coverLetter") as string) || "";

    const newApplication: IApplication = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      resume,
      coverLetter,
      status: "Pending",
    };

    addApplication(newApplication);

    navigate("/", { state: { refresh: true } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Apply for {job.title}
        </Typography>

        {!isAuthenticated ? (
          <ApplicationForm jobId={job.id} onSubmit={handleFormSubmit} />
        ) : (
          <Typography variant="body1" color="error">
            Admins cannot apply for jobs.
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default ApplyJob;
