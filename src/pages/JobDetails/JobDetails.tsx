import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import './JobDetails.css';

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>(); 
  const navigate = useNavigate();  

  const fakeJobs = [
    { id: '1', title: 'Software Engineer', Responsibilities: 'Design, develop, and maintain software', RequiredSkills: 'Programming, problem-solving, analysis.', Qualifications: 'Degree in Computer Science or related field', Tools: 'Programming languages like Python, Java, C++' },
    { id: '2', title: 'Product Manager', Responsibilities: 'Manage product development from ideation to execution', RequiredSkills: 'Strategic planning, communication, team management', Qualifications: 'Background in business or engineering', Tools: 'Project management tools like Jira, Asana' },
    { id: '3', title: 'Data Scientist', Responsibilities: 'Analyze data and extract actionable insights', RequiredSkills: 'Data analysis, machine learning, statistics.', Qualifications: 'Degree in Data Science, Mathematics, or related field', Tools: 'Python, R, SQL, Machine Learning tools' },

  ];

  const job = fakeJobs.find((job) => job.id === jobId);

  if (!job) {
    return <Typography variant="h5">Job not found</Typography>;
  }

  const handleApplyClick = () => {
    navigate(`/apply/${jobId}`);  
  };

  const handleCancelClick = () => {
    navigate(-1);  
  };

  return (
    <Box className="job-details-container"> 
      <Box className="job-details-box">
        <Typography className="job-details-title">{job.title}</Typography> 
        <Typography className="job-details-Responsibilities"> <strong>Responsibilities:</strong> {job.Responsibilities}</Typography>
        <Typography className="job-details-RequiredSkills"><strong>Required Skills:</strong> {job.RequiredSkills}</Typography>
        <Typography className="job-details-Tools"><strong>Tools:</strong> {job.Tools}</Typography>

        <Box className="job-details-buttons-container">
          <Button 
            className="job-details-button" 
            variant="contained" 
            onClick={handleApplyClick}
            sx={{
              backgroundColor: '#7a92cf', 
              color: 'white',
              '&:hover': {
                backgroundColor: '#6a82b6', 
              }
            }}
          >
            Apply
          </Button>
          <Button 
            className="job-details-button-cancel" 
            variant="outlined" 
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetails;
