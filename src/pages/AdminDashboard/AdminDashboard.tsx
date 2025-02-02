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
