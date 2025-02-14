import { useCallback, useEffect, useMemo, useReducer } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useApplications } from "../../hooks/useApplications";
import { useJobs } from "../../hooks/useJobs";
import { getApplicationsFromLocalStorage } from "../../utils/localStorage";
import {
  adminDashboardReducer,
  IAdminDashboardState,
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

import JobsTable from "../../components/JobsTable/JobsTable";
import ApplicationsTable from "../../components/ApplicationsTable/ApplicationsTable";
import MessagesTable from "../../components/MessagesTable/MessagesTable";
import PaginationControls from "../../components/PaginationControls/PaginationControls";

const AdminDashboard = () => {
  const { applications, updateApplicationStatus, deleteApplication } =
    useApplications();
  const { jobs } = useJobs();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, dispatch] = useReducer<
    React.Reducer<IAdminDashboardState, AdminDashboardAction>
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

  const deleteMessage = useCallback(
    (id: string) => {
      const updatedMessages = messages.filter((msg) => msg.id !== id);
      dispatch(setMessages(updatedMessages));
      localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    },
    [messages]
  );

  const jobApplicationCount = useMemo(() => {
    return localApplications.reduce((countMap, app) => {
      countMap[app.jobId] = (countMap[app.jobId] || 0) + 1;
      return countMap;
    }, {} as Record<string, number>);
  }, [localApplications]);

  const jobsWithApplications = jobs.filter(
    (job) => jobApplicationCount[job.id]
  );

  const filteredApplications = useMemo(() => {
    return applications.filter(
      (app) => filterStatus === "All" || app.status === filterStatus
    );
  }, [applications, filterStatus]);

  const currentApplications = useMemo(() => {
    const indexOfLastApplication = currentPage * applicationsPerPage;
    const indexOfFirstApplication =
      indexOfLastApplication - applicationsPerPage;
    return filteredApplications.slice(
      indexOfFirstApplication,
      indexOfLastApplication
    );
  }, [filteredApplications, currentPage]);

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

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  const handleJobPageChange = useCallback((page: number) => {
    dispatch(setCurrentJobPage(page));
  }, []);

  const handleMessagePageChange = useCallback((page: number) => {
    dispatch(setCurrentMessagePage(page));
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    dispatch(setFilterStatus(value));
    dispatch(setCurrentPage(1));
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            marginTop: 3,
            marginBottom: 3,
            fontStyle: "italic",
            color: " rgb(11, 86, 23)",
            textShadow: "2px 2px 5px rgba(106, 92, 11, 0.6)",
          }}
        >
          Admin Dashboard
        </Typography>
      </motion.div>

      {jobsWithApplications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <JobsTable
            jobs={currentJobs}
            jobApplicationCount={jobApplicationCount}
            currentJobPage={currentJobPage}
            totalJobPages={totalJobPages}
            handleJobPageChange={handleJobPageChange}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "rgb(126, 104, 16)",
              textShadow: "1px 1px 1px rgba(18, 23, 1, 0.4)",
              fontWeight: "bold",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
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

          <ApplicationsTable
            applications={currentApplications}
            jobs={jobs}
            updateApplicationStatus={updateApplicationStatus}
            deleteApplication={deleteApplication}
            isSmallScreen={isSmallScreen}
          />

          <PaginationControls
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => handlePageChange(page)}
          />
        </Paper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <MessagesTable
          messages={currentMessages}
          currentMessagePage={currentMessagePage}
          totalMessagePages={totalMessagePages}
          handleMessagePageChange={handleMessagePageChange}
          deleteMessage={deleteMessage}
          isSmallScreen={isSmallScreen}
        />
      </motion.div>
    </Box>
  );
};

export default AdminDashboard;
