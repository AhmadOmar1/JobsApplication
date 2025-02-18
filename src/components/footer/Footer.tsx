import { useRef } from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
  const { isAdmin } = useAuth();

 
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={footerRef}
      initial={{ opacity: 0, y: 50 }} 
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }} 
    >
      <Box
        sx={{
          backgroundColor: "#222",
          color: "#fff",
          paddingY: 5,
          marginTop: 20,
        }}
      >
        <Container>
          <Stack
            spacing={4}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
          >
            <Box sx={{ flex: 1, minWidth: "250px" }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                We are dedicated to connecting job seekers with top companies.
                Our platform makes job hunting seamless and efficient.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: "250px" }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {isAdmin ? (
                  <>
                    <Link
                      href="/admin/dashboard"
                      color="inherit"
                      underline="hover"
                      sx={{ opacity: 0.8, "&:hover": { color: "#1976d2" } }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/post-job"
                      color="inherit"
                      underline="hover"
                      sx={{ opacity: 0.8, "&:hover": { color: "#1976d2" } }}
                    >
                      Post Job
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/about"
                      color="inherit"
                      underline="hover"
                      sx={{ opacity: 0.8, "&:hover": { color: "#1976d2" } }}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      color="inherit"
                      underline="hover"
                      sx={{ opacity: 0.8, "&:hover": { color: "#1976d2" } }}
                    >
                      Contact
                    </Link>
                  </>
                )}
                <Link
                  href="/"
                  color="inherit"
                  underline="hover"
                  sx={{ opacity: 0.8, "&:hover": { color: "#1976d2" } }}
                >
                  Home
                </Link>
              </Stack>
            </Box>

            <Box sx={{ flex: 1, minWidth: "250px" }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  sx={{ color: "#fff", "&:hover": { color: "#1877F2" } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  sx={{ color: "#fff", "&:hover": { color: "#1DA1F2" } }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  sx={{ color: "#fff", "&:hover": { color: "#0077B5" } }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  href="mailto:support@jobportal.com"
                  sx={{ color: "#fff", "&:hover": { color: "#FF5733" } }}
                >
                  <EmailIcon />
                </IconButton>
              </Stack>
            </Box>
          </Stack>

          <Box
            sx={{
              marginTop: 4,
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              &copy; {new Date().getFullYear()} Online Job Portal. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;
