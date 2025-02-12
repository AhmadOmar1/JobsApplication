import { useEffect, useReducer } from "react";

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
  Pagination,
} from "@mui/material";

import { useApplications } from "../../hooks/useApplications";
import { useJobs } from "../../hooks/useJobs";
import { getApplicationsFromLocalStorage } from "../../utils/localStorage";

import {
  adminDashboardReducer,
  AdminDashboardState,
  initialState,
} from "../../reducer-AdminDashboard/reducer";
import {
  setFilterStatus,
  setCurrentPage,
  setCurrentJobPage,
  setCurrentMessagePage,
  setLocalApplications,
  setMessages,
  AdminDashboardAction,
} from "../../reducer-AdminDashboard/actions";


const AdminDashboard = () => {
  const { applications, updateApplicationStatus } = useApplications();
  const { jobs } = useJobs();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, dispatch] = useReducer<
    React.Reducer<AdminDashboardState, AdminDashboardAction>
  >(adminDashboardReducer, initialState);
  const {
    filterStatus,
    currentPage,
    currentJobPage,
    currentMessagePage,
    localApplications,
    messages,
  } = state;

  const applicationsPerPage = 5;
  const jobsPerPage = 5;
  const messagesPerPage = 5;

  useEffect(() => {
    const storedApplications = getApplicationsFromLocalStorage();
    dispatch(setLocalApplications(storedApplications));
  }, [applications]);

  useEffect(() => {
    const storedMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );
    dispatch(setMessages(storedMessages));
  }, []);

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    dispatch(setMessages(updatedMessages));
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  };

  const jobApplicationCount = localApplications.reduce((countMap, app) => {
    countMap[app.jobId] = (countMap[app.jobId] || 0) + 1;
    return countMap;
  }, {} as Record<string, number>);

  const jobsWithApplications = jobs.filter(
    (job) => jobApplicationCount[job.id]
  );

  const filteredApplications = applications.filter(
    (app) => filterStatus === "All" || app.status === filterStatus
  );

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );
  const totalPages = Math.ceil(
    filteredApplications.length / applicationsPerPage
  );

  const indexOfLastJob = currentJobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsWithApplications.slice(
    indexOfFirstJob,
    indexOfLastJob
  );
  const totalJobPages = Math.ceil(jobsWithApplications.length / jobsPerPage);

  const indexOfLastMessage = currentMessagePage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalMessagePages = Math.ceil(messages.length / messagesPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleJobPageChange = (page: number) => {
    dispatch(setCurrentJobPage(page));
  };

  const handleMessagePageChange = (page: number) => {
    dispatch(setCurrentMessagePage(page));
  };

  const handleFilterChange = (value: string) => {
    dispatch(setFilterStatus(value));
    dispatch(setCurrentPage(1));
  };

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
                {currentJobs.map((job) => (
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

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={totalJobPages}
              page={currentJobPage}
              onChange={(_, page) => handleJobPageChange(page)}
              color="primary"
            />
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
            onChange={(e) => handleFilterChange(e.target.value)}
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
                {currentApplications.map((app) => (
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
                          onClick={() => window.open(app.coverLetter, "_blank")}
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
            {currentApplications.map((app) => (
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
                  {jobs.find((job) => job.id === app.jobId)?.title || "Unknown"}
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
                    onClick={() => updateApplicationStatus(app.id, "Reviewed")}
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
                    onClick={() => updateApplicationStatus(app.id, "Rejected")}
                  >
                    ❌ Reject
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => handlePageChange(page)}
            color="primary"
          />
        </Box>
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
                {currentMessages.map((msg) => (
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
              {currentMessages.map((msg) => (
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

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={totalMessagePages}
            page={currentMessagePage}
            onChange={(_, page) => handleMessagePageChange(page)}
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
