import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, List, ListItem } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { motion } from "framer-motion";
import { useEffect } from "react";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { jobs } = useJobs();

  const job = jobs.find((job) => job.id === jobId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!job) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Job not found
        </Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          margin: "auto",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {job.title}
        </Typography>

        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
          <strong>Company:</strong> {job.company}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          <strong>Location:</strong> {job.location}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          <strong>Salary:</strong> ${job.salary}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          <strong>Type:</strong> {job.type}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          <strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          <strong>Deadline:</strong> {job.deadline}
        </Typography>

        <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold" }}>
          Job Description:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          {job.description}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Qualifications:
        </Typography>
        <List sx={{ marginBottom: 3 }}>
          {job.qualifications?.length > 0 ? (
            job.qualifications.map((qualification, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                ✅ {qualification}
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No qualifications available.
            </Typography>
          )}
        </List>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Requirements:
        </Typography>
        <List sx={{ marginBottom: 3 }}>
          {job.requirements?.length > 0 ? (
            job.requirements.map((requirement, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                🔹 {requirement}
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No requirements available.
            </Typography>
          )}
        </List>

        {!isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/apply/${job.id}`)}
            sx={{ mt: 2, width: "100%" }}
          >
            Apply Now
          </Button>
        )}
      </Box>
    </motion.div>
  );
};

export default JobDetails;
