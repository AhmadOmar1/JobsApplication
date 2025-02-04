import { useApplications } from "../../hooks/useApplications";
import { useJobs } from "../../hooks/useJobs";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@mui/material";
import { useState } from "react";

const AdminDashboard = () => {
  const { applications, updateApplicationStatus } = useApplications();
  const { jobs } = useJobs();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<
    "All" | "Pending" | "Reviewed" | "Rejected"
  >("All");

  const jobTitleMap = jobs.reduce((map, job) => {
    map[job.id] = job.title;
    return map;
  }, {} as Record<string, string>);

  const jobApplicationCount = applications.reduce((countMap, app) => {
    countMap[app.jobId] = (countMap[app.jobId] || 0) + 1;
    return countMap;
  }, {} as Record<string, number>);

  const jobsWithApplications = jobs.filter(
    (job) => jobApplicationCount[job.id]
  );

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Button
        onClick={() => navigate("/admin/post-job")}
        variant="contained"
        color="success"
        sx={{ marginBottom: 3, width: { xs: "100%", sm: "auto" } }}
      >
        ➕ Post New Job
      </Button>

      {jobsWithApplications.length > 0 && (
        <Paper
          sx={{
            padding: 3,
            marginBottom: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            📊 Total Applications Per Job
          </Typography>
          <Table
            sx={{
              "& .MuiTableCell-root": {
                fontSize: "1rem",
                color: "#555",
              },
              "& .MuiTableCell-head": {
                fontWeight: "bold",
                color: "#000",
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Job Title</TableCell>
                <TableCell align="center">Total Applications</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsWithApplications.map((job) => (
                <TableRow key={job.id}>
                  <TableCell align="left" sx={{ fontWeight: "medium" }}>
                    {job.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    {jobApplicationCount[job.id]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          marginBottom: 4,
          gap: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value as "All" | "Pending" | "Reviewed" | "Rejected"
              )
            }
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="All">All Applications</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Responsive Layout*/}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          marginBottom: 2,
        }}
      >
        {applications
          .filter(
            (app) => filterStatus === "All" || app.status === filterStatus
          )
          .map((app) => (
            <Paper
              key={app.id}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {app.name}
              </Typography>
              <Typography variant="body2">Email: {app.email}</Typography>
              <Typography variant="body2">
                Phone: {app.phone || "N/A"}
              </Typography>
              <Typography variant="body2">
                Job Title: {jobTitleMap[app.jobId] || "Unknown Job"}
              </Typography>
              <Typography variant="body2">Status: {app.status}</Typography>
              <Button
                onClick={() => updateApplicationStatus(app.id, "Reviewed")}
                variant="contained"
                color="primary"
                sx={{ marginTop: 1, marginRight: 1 }}
              >
                ✅ Reviewed
              </Button>
              <Button
                onClick={() => updateApplicationStatus(app.id, "Rejected")}
                variant="contained"
                color="error"
              >
                ❌ Reject
              </Button>
            </Paper>
          ))}
      </Box>

      {/* Default Table Layout */}
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          overflowX: "auto",
          display: { xs: "none", md: "block" },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Resume</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Cover Letter</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications
              .filter(
                (app) => filterStatus === "All" || app.status === filterStatus
              )
              .map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone || "N/A"}</TableCell>
                  <TableCell>
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </TableCell>
                  <TableCell>
                    {app.coverLetter ? (
                      <a
                        href={app.coverLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Cover Letter
                      </a>
                    ) : (
                      "No Cover Letter"
                    )}
                  </TableCell>
                  <TableCell>
                    {jobTitleMap[app.jobId] || "Unknown Job"}
                  </TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        updateApplicationStatus(app.id, "Reviewed")
                      }
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      ✅ Reviewed
                    </Button>
                    <Button
                      onClick={() =>
                        updateApplicationStatus(app.id, "Rejected")
                      }
                      variant="contained"
                      color="error"
                    >
                      ❌ Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
