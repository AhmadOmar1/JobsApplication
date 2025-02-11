import { useState, useContext, useEffect } from "react";
import { JobContext } from "../../providers/JobProvider";
import JobCard from "../../components/JobCard/JobCard";
import bgImage from "../../assets/bg-1.jpg";
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
import { useNavigate } from "react-router-dom";
import { filterJobs } from "../../utils/filters";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredJobs = filterJobs(jobs, filters);

  return (
    <Box>
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
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </span>
            / <span style={{ textDecoration: "underline" }}>Jobs</span>
          </Typography>
        </Box>
      </Box>

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
              <Box
                key={`${job.id}-${index}`}
                sx={{ flex: "1 1 300px", maxWidth: "300px" }}
              >
                <JobCard
                  {...job}
                  onViewDetails={() => navigate(`/job/${job.id}`)}
                />
              </Box>
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
    </Box>
  );
};

export default ViewMore;
