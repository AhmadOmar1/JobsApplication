import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import './apply-job.css'

const ApplyJob = () => {
  const { jobId } = useParams<{ jobId: string }>();  
  const navigate = useNavigate();  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const fakeJobs = [
    { id: '1', title: 'Software Engineer', Responsibilities: 'Design, develop, and maintain software', RequiredSkills: 'Programming, problem-solving, analysis.', Qualifications: 'Degree in Computer Science or related field', Tools: 'Programming languages like Python, Java, C++' },
    { id: '2', title: 'Product Manager', Responsibilities: 'Manage product development from ideation to execution', RequiredSkills: 'Strategic planning, communication, team management', Qualifications: 'Background in business or engineering', Tools: 'Project management tools like Jira, Asana' },
    { id: '3', title: 'Data Scientist', Responsibilities: 'Analyze data and extract actionable insights', RequiredSkills: 'Data analysis, machine learning, statistics.', Qualifications: 'Degree in Data Science, Mathematics, or related field', Tools: 'Python, R, SQL, Machine Learning tools' },

  ];

  const job = fakeJobs.find((job) => job.id === jobId);

  if (!job) {
    return <Typography variant="h5">Job not found</Typography>;
  }

  const handleSubmit = () => {
    const applicationData = { name, email, coverLetter, phone, resume };
    console.log(applicationData);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h6">Apply for {job.title}</Typography>

      <TextField
        label="Your Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Your Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Your Phone"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Cover Letter"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="outlined"
        component="label"
        sx={{
          marginBottom: 2,
          borderColor: '#7a92cf',
          color: '#7a92cf',
          '&:hover': {
            borderColor: '#6a82b6',
            color: '#6a82b6',
          }
        }}
      >
        Upload Resume
        <input
          type="file"
          hidden
          onChange={handleResumeChange}
        />
      </Button>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button className="submit-button" onClick={handleSubmit}>Submit</Button>
        <Button className="cancel-button" onClick={handleCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default ApplyJob;
