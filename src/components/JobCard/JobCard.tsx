import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ICardJob } from '../../types/jobTypes';

const JobCard = ({ id, title, company, location, salary, type }: ICardJob) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/job/${id}`);
    };

    return (
        <Card
            sx={{
                width: 300,
                height: 250,
                margin: 4,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                    boxShadow: 6,
                    cursor: 'pointer',
                },
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Box p={1} gap='8px' display={'flex'} flexDirection={'column'}>
                    <Typography variant="body2" color="text.secondary" >
                        <strong>Company:</strong> {company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <strong>Location:</strong> {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <strong>Salary:</strong> {salary}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <strong>Type:</strong> {type}
                    </Typography>
                </Box>
            </CardContent>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#5D87A1',
                    '&:hover': { backgroundColor: '#4C708A' },
                    borderRadius: '0 0 8px 8px',
                }}
                onClick={handleViewDetails}
            >
                View Details
            </Button>
        </Card>
    );
};

export default JobCard;