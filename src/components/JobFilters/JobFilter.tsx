import React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { JobType } from '../../types/jobTypes';

interface FilterProps {
  onFilterChange: (text: string) => void;
  onJobTypeChange: (jobType: JobType) => void;
}

const JobFilter: React.FC<FilterProps> = ({ onFilterChange, onJobTypeChange }) => {
  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      backgroundColor: '#5D87A1',
      borderRadius: 2,
      marginBottom: 2,
      padding: 1
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <TextField
          select
          label="Job Type"
          variant="filled"
          onChange={(e) => onJobTypeChange(e.target.value as JobType)}
          sx={{
            width: 150,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
          }}
          InputProps={{
            disableUnderline: true, // <== added this
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Full-time">Full-Time</MenuItem>
          <MenuItem value="Part-time">Part-Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
        </TextField>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          borderRadius: 2,
          width: '100%',
          padding: 1,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Jobs"
          variant="filled"
          fullWidth
          sx={{ backgroundColor: 'white', borderRadius: 2 }}
          onChange={(e) => onFilterChange(e.target.value)}
          InputProps={{
            disableUnderline: true, // <== added this
          }}
        />
        <Button
          variant="contained"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
            '&:hover': { backgroundColor: '#4C708A',
               color: 'white'
             },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default JobFilter;
