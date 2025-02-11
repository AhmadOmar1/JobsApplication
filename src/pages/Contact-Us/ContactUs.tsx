import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
    };

    const existingMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );

    const updatedMessages = [...existingMessages, newMessage];

    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box sx={{ minHeight: "100vh", paddingY: 6, backgroundColor: "#f7f9fc" }}>
      <Container>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 4,
            color: "#333",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "1.2rem",
            marginBottom: 4,
            color: "#555",
          }}
        >
          Have questions or need support? Fill out the form below and we’ll get
          back to you as soon as possible.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: 600,
            margin: "auto",
          }}
        >
          <TextField
            label="Full Name"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Message"
            required
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Send Message
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
