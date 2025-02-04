import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface JobFormData {
  jobTitle: string;
  jobDescription: string;
  jobType: string;
  location: string;
}

const AddJobPage: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobDescription: '',
    jobType: '',
    location: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Job Data:', formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100vh', 
        padding: '20px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px', 
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Add a Job</h2>
        <form>
       
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

         
          <TextField
            label="Job Description"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />

         
          <FormControl fullWidth margin="normal">
            <InputLabel>Job Type</InputLabel>
            <Select
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

         
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Add Job
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddJobPage;
