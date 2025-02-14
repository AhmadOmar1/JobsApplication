
import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { IApplication } from "../../types/applicationTypes";
import { IJob } from "../../types/jobTypes";

interface IApplicationsTableProps {
  applications: IApplication[];
  jobs: IJob[];
  updateApplicationStatus: (
    id: string,
    status: "Reviewed" | "Rejected"
  ) => void;
  deleteApplication: (id: string) => void;
  isSmallScreen: boolean;
}

const ApplicationsTable: React.FC<IApplicationsTableProps> = ({
  applications,
  jobs,
  updateApplicationStatus,
  deleteApplication,
  isSmallScreen,
}) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
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
              {applications.map((app) => (
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
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {app.status !== "Rejected" ? (
                        <>
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
                        </>
                      ) : (
                        <>
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
                            onClick={() => deleteApplication(app.id)}
                          >
                            🗑️ Delete
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        <Box>
          {applications.map((app) => (
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
                {app.status !== "Rejected" ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                      onClick={() => deleteApplication(app.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ApplicationsTable;
