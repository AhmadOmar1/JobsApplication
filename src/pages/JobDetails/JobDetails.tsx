import React, { useEffect } from 'react'

const JobDetails = () => {
    useEffect(() => {
        document.title = 'Job Details'
    }, []);
    
    return (
        <div>JobDetails</div>
    )
}

export default JobDetails