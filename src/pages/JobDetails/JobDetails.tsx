import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, List, ListItem } from "@mui/material";
import { motion } from "framer-motion";

import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";

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
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            marginBottom: 2,
            textAlign: "center",
            color: " rgb(9, 89, 22)",
            textShadow: "2px 2px 5px rgba(222, 191, 12, 0.6)",
          }}
        >
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

        <Typography variant="h4" sx={{ marginTop: 3, fontWeight: "bold" }}>
          Job Description:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 3, marginTop: 1, fontSize: "18px",}}>
          {job.description}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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
