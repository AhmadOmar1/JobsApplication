import { useEffect, useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import styles from "./AdminLogin.module.css";
import { useFormik } from "formik";
import { LOGIN_VALIDATION_SCHEMA } from "../../constants";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const AdminLogin = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authContext?.isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [authContext, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      const loginError = authContext?.login(values.email, values.password);
      if (!loginError) {
        navigate("/admin/dashboard"); 
      } else {
        setError(loginError);
      }
    },
  });

  return (
    <div className={styles.container}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            color="secondary"
            component="h1"
            align="left"
            gutterBottom
          >
            Admin Login
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
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
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="info"
              sx={{ width: "50%", margin: "auto" }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
