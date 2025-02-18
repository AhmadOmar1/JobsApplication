import styles from "./AdminLogin.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
} from "@mui/material";

import { useFormik } from "formik";
import { motion } from "framer-motion";
import { LOGIN_VALIDATION_SCHEMA } from "../../constants";
import { useAuth } from "../../hooks/useAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      const loginError = login(values.email, values.password);
      if (!loginError) {
        navigate("/admin/dashboard");
      } else {
        setError(loginError);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <Box className={styles.leftSection}>
        <Typography variant="h3" className={styles.welcomeText}>
          Welcome to Online Job Portal
        </Typography>
        <Typography variant="body1" className={styles.description}>
          Our platform connects job seekers with top employers. Whether you're
          looking for a full-time, part-time, or remote position, we've got you
          covered. Explore new career opportunities and take the next step in
          your professional journey.
        </Typography>
      </Box>
      <Box className={styles.rightSection}>
        <Container maxWidth="sm">
          <Box className={styles.formContainer}>
            <Typography
              variant="h5"
              color="secondary"
              component="h1"
              align="center"
              gutterBottom
              className={styles.title}
            >
              Admin Login
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className={styles.form}
            >
              <TextField
                label="Email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                fullWidth
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                fullWidth
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.loginButton}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default AdminLogin;
