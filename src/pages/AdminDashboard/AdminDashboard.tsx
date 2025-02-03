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

  // Map job IDs to job titles
  const jobTitleMap = jobs.reduce((map, job) => {
    map[job.id] = job.title;
    return map;
  }, {} as Record<string, string>);

  // Calculate total applications per job
  const jobApplicationCount = applications.reduce((countMap, app) => {
    countMap[app.jobId] = (countMap[app.jobId] || 0) + 1;
    return countMap;
  }, {} as Record<string, number>);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Button
        onClick={() => navigate("/admin/post-job")}
        variant="contained"
        color="success"
        sx={{ marginBottom: 2 }}
      >
        ➕ Post New Job
      </Button>

      {/* Total Applications Per Job Section */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          📊 Total Applications Per Job
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Job Title</strong>
              </TableCell>
              <TableCell>
                <strong>Total Applications</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{jobApplicationCount[job.id] || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Filter Section */}
      <Box sx={{ display: "flex", marginBottom: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value as "All" | "Pending" | "Reviewed" | "Rejected"
              )
            }
          >
            <MenuItem value="All">All Applications</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Applications Table */}
      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Job Title</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
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
                    >
                      ✅ Mark as Reviewed
                    </Button>
                    <Button
                      onClick={() =>
                        updateApplicationStatus(app.id, "Rejected")
                      }
                      variant="contained"
                      color="error"
                      sx={{ marginLeft: 1 }}
                    >
                      ❌ Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
