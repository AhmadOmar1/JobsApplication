import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 4,
              color: " rgb(9, 89, 22)",
              textShadow: "2px 2px 5px rgba(172, 154, 53, 0.6)",
            }}
          >
            Contact Us
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              marginBottom: 4,
              color: "#555",
            }}
          >
            Have questions or need support? Fill out the form below and we’ll
            get back to you as soon as possible.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                },
              }}
            />
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                },
              }}
            />
            <TextField
              label="Message"
              required
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                },
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                Send Message
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactUs;
