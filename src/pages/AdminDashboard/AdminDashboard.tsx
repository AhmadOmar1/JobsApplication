import { useContext, useState } from "react";
import { useApplications } from "../../hooks/useApplications";
import { useJobs } from "../../hooks/useJobs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
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
import styles from "./AdminDashboard.module.css"; // استيراد ملف CSS

const AdminDashboard = () => {
  const { applications, updateApplicationStatus } = useApplications();
  const { jobs } = useJobs();
  const authContext = useContext(AuthContext);
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

  const handleLogout = () => {
    authContext?.logout();
    navigate("/admin/login");
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h4" gutterBottom className={styles.title}>
          Admin Dashboard
        </Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          className={styles.logoutButton}
        >
          Logout
        </Button>
      </Box>

      <Button
        onClick={() => navigate("/admin/post-job")}
        variant="contained"
        color="success"
        className={styles.postJobButton}
      >
        ➕ Post New Job
      </Button>

      {jobsWithApplications.length > 0 && (
        <Paper className={styles.paper}>
          <Typography variant="h6" gutterBottom>
            📊 Total Applications Per Job
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" className={styles.tableHeader}>
                  Job Title
                </TableCell>
                <TableCell align="center" className={styles.tableHeader}>
                  Total Applications
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsWithApplications.map((job) => (
                <TableRow key={job.id}>
                  <TableCell align="left" className={styles.tableRow}>
                    {job.title}
                  </TableCell>
                  <TableCell align="center" className={styles.tableCell}>
                    {jobApplicationCount[job.id]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Box className={styles.statusFilter}>
        <FormControl className={styles.filterForm}>
          <Select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value as "All" | "Pending" | "Reviewed" | "Rejected"
              )
            }
            className={styles.filterSelect}
          >
            <MenuItem value="All">All Applications</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Responsive Layout for Small Screens */}
      <Box className={styles.responsiveLayout}>
        {applications
          .filter(
            (app) => filterStatus === "All" || app.status === filterStatus
          )
          .map((app) => (
            <Paper key={app.id} className={styles.applicationCard}>
              <Box className={styles.applicationDetails}>
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
                <Box className={styles.applicationActions}>
                  <Button
                    onClick={() => updateApplicationStatus(app.id, "Reviewed")}
                    variant="contained"
                    color="primary"
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
                </Box>
              </Box>
            </Paper>
          ))}
      </Box>

      {/* Default Table Layout for Larger Screens */}
      <Paper className={styles.tableLayout}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Name</TableCell>
              <TableCell className={styles.tableHeader}>Email</TableCell>
              <TableCell className={styles.tableHeader}>Phone</TableCell>
              <TableCell className={styles.tableHeader}>Resume</TableCell>
              <TableCell className={styles.tableHeader}>Cover Letter</TableCell>
              <TableCell className={styles.tableHeader}>Job Title</TableCell>
              <TableCell className={styles.tableHeader}>Status</TableCell>
              <TableCell className={styles.tableHeader}>Actions</TableCell>
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
                    <Box className={styles.applicationActions}>
                      <Button
                        onClick={() =>
                          updateApplicationStatus(app.id, "Reviewed")
                        }
                        variant="contained"
                        color="primary"
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
                    </Box>
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
