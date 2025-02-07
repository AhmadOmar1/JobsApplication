import React, { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard/JobCard';
import { Box } from '@mui/material';
import JobFilter from '../../components/JobFilters/JobFilter';
import { ICardJob, JobType } from '../../types/jobTypes';
import EmptyState from '../../components/EmptyState/EmptyState';

const fakeJobs: ICardJob[] = [
    { id: '1', title: 'Software Engineer', company: 'Tech Corp', location: 'San Francisco, CA', salary: '$120,000 - $140,000', type: 'Full-time' },
    { id: '2', title: 'Product Manager', company: 'Innovate Inc', location: 'New York, NY', salary: '$130,000 - $150,000', type: 'Contract' },
    { id: '3', title: 'Data Scientist', company: 'DataWorks', location: 'Remote', salary: '$110,000 - $130,000', type: 'Remote' },
];

const JobListing = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('');

    const handleFilterChange = (text: string) => {
        setSearchText(text);
    };

    const handleJobTypeChange = (jobType: JobType) => {
        setSelectedJobType(jobType);
    };

    const filteredJobs = fakeJobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.company.toLowerCase().includes(searchText.toLowerCase()) ||
            job.location.toLowerCase().includes(searchText.toLowerCase());

        const matchesJobType = selectedJobType ? job.type === selectedJobType : true;

        return matchesSearch && matchesJobType;
    });

    useEffect(() => {
        document.title = 'Job Listing';
    }, []);

    return (
        <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh', padding: 2 }}>
            <JobFilter onFilterChange={handleFilterChange} onJobTypeChange={handleJobTypeChange} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => <JobCard key={job.id} {...job} />)
                ) : (
                    <EmptyState message="No jobs found." />
                )}
            </Box>
        </Box>
    );
};

export default JobListing;
