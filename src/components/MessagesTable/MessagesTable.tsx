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
  Pagination,
} from "@mui/material";
import { IMessage } from "../../types/jobTypes";

interface IMessagesTableProps {
  messages: IMessage[];
  currentMessagePage: number;
  totalMessagePages: number;
  handleMessagePageChange: (page: number) => void;
  deleteMessage: (id: string) => void;
  isSmallScreen: boolean;
}

const MessagesTable: React.FC<IMessagesTableProps> = ({
  messages,
  currentMessagePage,
  totalMessagePages,
  handleMessagePageChange,
  deleteMessage,
  isSmallScreen,
}) => {
  return (
    <Paper sx={{ padding: 2, marginTop: 3 }}>
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
                <Typography variant="body2">Message: {msg.message}</Typography>
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
  );
};

export default MessagesTable;
