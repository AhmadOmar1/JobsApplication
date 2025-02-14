import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import { IJob } from "../../types/jobTypes";

interface IJobsTableProps {
  jobs: IJob[];
  jobApplicationCount: Record<string, number>;
  currentJobPage: number;
  totalJobPages: number;
  handleJobPageChange: (page: number) => void;
}

const JobsTable: React.FC<IJobsTableProps> = ({
  jobs,
  jobApplicationCount,
  currentJobPage,
  totalJobPages,
  handleJobPageChange,
}) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "rgb(126, 104, 16)",
          textShadow: "1px 1px 1px rgba(18, 23, 1, 0.4)",
          fontWeight: "bold",
        }}
      >
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
            {jobs.map((job) => (
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
  );
};

export default JobsTable;
