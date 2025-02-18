import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";

import { JobContext } from "../../providers/JobProvider";
import { filterJobs } from "../../utils/filters";

import bgImage from "../../assets/bg-1.jpg";
import JobCard from "../../components/JobCard/JobCard";

const ViewMore = () => {
  const { jobs } = useContext(JobContext)!;
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    keyword: "",
    jobType: "All",
    location: "",
    salaryRange: "All",
    postingDate: "All",
    sortBy: "Newest",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredJobs = filterJobs(jobs, filters);


  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            position: "relative",
            height: "500px",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            <Typography variant="h2" sx={{ fontWeight: "600" }}>
              Browse Jobs
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              <span style={{ marginRight: 3 ,cursor: "pointer" }} onClick={() => navigate("/")}>
                Home
              </span>
              / <span style={{ textDecoration: "underline" }}>Jobs</span>
            </Typography>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Container sx={{ paddingY: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by Title or Company"
              variant="outlined"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 250px" },
                maxWidth: { sm: "300px" },
              }}
            />

            <FormControl sx={{ flex: { xs: "1 1 100%", sm: "1 1 180px" } }}>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={filters.jobType}
                onChange={(e) => handleFilterChange("jobType", e.target.value)}
                label="Job Type"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              placeholder="Location"
              variant="outlined"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 250px" },
                maxWidth: { sm: "300px" },
              }}
            />

            <FormControl sx={{ flex: { xs: "1 1 100%", sm: "1 1 180px" } }}>
              <InputLabel>Salary Range</InputLabel>
              <Select
                value={filters.salaryRange}
                onChange={(e) =>
                  handleFilterChange("salaryRange", e.target.value)
                }
                label="Salary Range"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Below 50k">Below 50k</MenuItem>
                <MenuItem value="50k-100k">50k-100k</MenuItem>
                <MenuItem value="Above 100k">Above 100k</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: { xs: "1 1 100%", sm: "1 1 200px" } }}>
              <Select
                value={filters.postingDate}
                onChange={(e) =>
                  handleFilterChange("postingDate", e.target.value)
                }
              >
                <MenuItem value="All">Any Date</MenuItem>
                <MenuItem value="Last Hour">Last Hour</MenuItem>
                <MenuItem value="Last 24 Hours">Last 24 Hours</MenuItem>
                <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
                <MenuItem value="Last 14 Days">Last 14 Days</MenuItem>
                <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: { xs: "1 1 100%", sm: "1 1 180px" } }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                label="Sort By"
              >
                <MenuItem value="Newest">Newest First</MenuItem>
                <MenuItem value="Oldest">Oldest First</MenuItem>
                <MenuItem value="Highest Salary">Highest Salary</MenuItem>
                <MenuItem value="Lowest Salary">Lowest Salary</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
      </motion.div>

      <Container sx={{ paddingY: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={`${job.id}-${index}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                custom={index}
                style={{ flex: "1 1 300px", maxWidth: "300px" }}
              >
                <JobCard
                  {...job}
                  onViewDetails={() => navigate(`/job/${job.id}`)}
                />
              </motion.div>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No jobs match your filters.
            </Typography>
          )}
        </Box>
      </Container>
    </motion.div>
  );
};

export default ViewMore;
