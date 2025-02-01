import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import styles from './AdminLogin.module.css'
import { useFormik } from 'formik'
import { LOGIN_VALIDATION_SCHEMA } from '../../constants'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate();

  const formInitalValues = {
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues: formInitalValues,
    validationSchema: LOGIN_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      if (values.email === "admin@admin" && values.password === "admin") {
        alert("Login Successful")
        localStorage.setItem('admin', 'true')
        navigate('/admin/dashboard');
      }
      else {
        alert("Login Failed")
      }
    }
  })


  return (
    <div className={styles.container}>
      <Container maxWidth="md" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
        <Paper elevation={3} sx={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
        }}>
          <Typography variant="h5" color='secondary' component="h1" align="left" gutterBottom>
            Admin Login
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: '100%',
            }}
          >

            <TextField
              label="Email"
              type="email"
              name='email'
              onChange={formik.handleChange}
              fullWidth
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              label="Password"
              type="password"
              name='password'
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
              sx={{
                width: '50%',
                margin: 'auto'
              }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>

  )
}

export default AdminLogin