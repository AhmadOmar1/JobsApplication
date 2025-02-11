import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useApplications } from "../../hooks/useApplications";
import { useJobs } from "../../hooks/useJobs";
import { getApplicationsFromLocalStorage } from "../../utils/localStorage";

const AdminDashboard = () => {
  const { applications, updateApplicationStatus } = useApplications();
  const { jobs } = useJobs();
  const [filterStatus, setFilterStatus] = useState("All");
  const [messages, setMessages] = useState<
    { id: string; name: string; email: string; message: string }[]
  >([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [localApplications, setLocalApplications] = useState(applications);

  useEffect(() => {
    const storedApplications = getApplicationsFromLocalStorage();
    setLocalApplications(storedApplications);
  }, [applications]);

  useEffect(() => {
    const storedMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );
    setMessages(storedMessages);
  }, []);

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  };

  const jobApplicationCount = localApplications.reduce((countMap, app) => {
    countMap[app.jobId] = (countMap[app.jobId] || 0) + 1;
    return countMap;
  }, {} as Record<string, number>);

  const jobsWithApplications = jobs.filter(
    (job) => jobApplicationCount[job.id]
  );
  
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {jobsWithApplications.length > 0 && (
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            📊 Total Applications Per Job
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 290 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="center">Total Applications</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsWithApplications.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell align="center">
                      {jobApplicationCount[job.id]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          📄 Job Applications
        </Typography>
        <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">All Applications</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Reviewed">Reviewed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        {!isSmallScreen ? (
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>Cover Letter</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications
                  .filter(
                    (app) =>
                      filterStatus === "All" || app.status === filterStatus
                  )
                  .map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{app.phone || "N/A"}</TableCell>
                      <TableCell>
                        {jobs.find((job) => job.id === app.jobId)?.title ||
                          "Unknown"}
                      </TableCell>
                      <TableCell>
                        {app.resume ? (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#007bff",
                              color: "#fff",
                              textTransform: "none",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                            }}
                            onClick={() => window.open(app.resume, "_blank")}
                          >
                            📄 Open Resume
                          </Button>
                        ) : (
                          "No Resume"
                        )}
                      </TableCell>
                      <TableCell>
                        {app.coverLetter ? (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#6c757d",
                              color: "#fff",
                              textTransform: "none",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                            }}
                            onClick={() =>
                              window.open(app.coverLetter, "_blank")
                            }
                          >
                            📝 Open Cover Letter
                          </Button>
                        ) : (
                          "No Cover Letter"
                        )}
                      </TableCell>
                      <TableCell>{app.status}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#28a745",
                              color: "#fff",
                              textTransform: "none",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                            }}
                            onClick={() =>
                              updateApplicationStatus(app.id, "Reviewed")
                            }
                          >
                            ✅ Reviewed
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#dc3545",
                              color: "#fff",
                              textTransform: "none",
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                            }}
                            onClick={() =>
                              updateApplicationStatus(app.id, "Rejected")
                            }
                          >
                            ❌ Reject
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Box>
            {applications
              .filter(
                (app) => filterStatus === "All" || app.status === filterStatus
              )
              .map((app) => (
                <Paper key={app.id} sx={{ marginBottom: 2, padding: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {app.name}
                  </Typography>
                  <Typography variant="body2">Email: {app.email}</Typography>
                  <Typography variant="body2">
                    Phone: {app.phone || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Job Title:{" "}
                    {jobs.find((job) => job.id === app.jobId)?.title ||
                      "Unknown"}
                  </Typography>
                  <Typography variant="body2">Status: {app.status}</Typography>
                  <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        textTransform: "none",
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                      }}
                      onClick={() =>
                        updateApplicationStatus(app.id, "Reviewed")
                      }
                    >
                      ✅ Reviewed
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        textTransform: "none",
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                      }}
                      onClick={() =>
                        updateApplicationStatus(app.id, "Rejected")
                      }
                    >
                      ❌ Reject
                    </Button>
                  </Box>
                </Paper>
              ))}
          </Box>
        )}
      </Paper>

 
      <Paper sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          📩 Contact Messages
        </Typography>
        {messages.length > 0 ? (
          !isSmallScreen ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.message}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteMessage(msg.id)}
                        size="small"
                        sx={{
                          padding: "4px 8px",
                          fontSize: "0.75rem",
                          borderRadius: "4px",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box>
              {messages.map((msg) => (
                <Paper key={msg.id} sx={{ marginBottom: 2, padding: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {msg.name}
                  </Typography>
                  <Typography variant="body2">Email: {msg.email}</Typography>
                  <Typography variant="body2">
                    Message: {msg.message}
                  </Typography>
                  <Box sx={{ marginTop: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteMessage(msg.id)}
                      size="small"
                      sx={{
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )
        ) : (
          <Typography align="center">No messages found.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
