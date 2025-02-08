import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListing from '../pages/JobListing/JobListing';  
import JobDetails from '../pages/JobDetails/JobDetails';  
import ApplyJob from '../pages/ApplyJob/ApplyJob';  

export const JobRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListing />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} /> 
      </Routes>
    </Router>
  );
};
