import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyStateProps {
    message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = "No results found." }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '800px',
                color: 'gray',
                textAlign: 'center',
            }}
        >
            <InboxIcon sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h6">{message}</Typography>
        </Box>
    );
};

export default EmptyState;
