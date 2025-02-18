import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
 
import { JobContext } from "../../providers/JobProvider";
import { filterJobs } from "../../utils/filters";
import slider from "../../assets/slider-1.jpg";
import JobCard from "../../components/JobCard/JobCard";
import ReviewsWeb from "../../components/reviewComponent/Review";


const JobListing = () => {
  const { jobs } = useContext(JobContext)!;
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ keyword: "" });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredJobs = filterJobs(jobs, {
    ...filters,
    jobType: "All",
    location: "",
    salaryRange: "All",
    postingDate: "All",
    sortBy: "Newest",
  });

  const displayedJobs = filteredJobs.slice(0, 9);

  return (
    <Box sx={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            height: "110vh",
            backgroundImage: `url(${slider})`,
            backgroundSize: {
              xs: "cover",
              md: "contain",
            },
            backgroundPosition: "center",
            filter: "brightness(1.2)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "rgb(196, 144, 40)",
                  textShadow: "2px 2px 2px rgba(255, 215, 0, 0.4)",
                }}
              >
                Find Your Dream Job!
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  marginTop: 2,
                  marginBottom: 18,
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                  color: "white",
                 
                }}
              >
                Explore Thousands of Job opportunities tailored just for you.
                Start Now!
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container sx={{ position: "relative", marginTop: "-50px" }}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              width: "80%",
              margin: "auto",
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by Job Title or Company"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              sx={{
                flex: "1",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px 24px",
                borderRadius: "6px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#004ba0",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </motion.div>

      <Container sx={{ marginTop: 5 }}>
        {displayedJobs.length === 0 && (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "#d32f2f", marginTop: 3 }}
          >
            No jobs found matching your search criteria.
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2,
            justifyContent: "center",
          }}
        >
          {displayedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <JobCard
                {...job}
                onViewDetails={() => navigate(`/job/${job.id}`)}
              />
            </motion.div>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            onClick={() => navigate("/view-more")}
            sx={{
              backgroundColor: "#1976d2",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#004ba0",
                transform: "translateY(-2px)",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              },
              display: "block",
              margin: "30px auto",
            }}
          >
            View More
          </Button>
        </motion.div>
      </Container>
      <ReviewsWeb />
    </Box>
  );
};

export default JobListing;
