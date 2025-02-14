import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { ICardJob } from "../../types/jobTypes";

interface IJobCardProps extends ICardJob {
  onViewDetails: () => void;
}

const JobCard: React.FC<IJobCardProps> = ({
  title,
  company,
  location,
  salary,
  type,
  onViewDetails,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
        },
        width: "100%",
        maxWidth: "330px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            marginBottom: 1,
            color: " rgb(9, 89, 22)",
            textShadow: "2px 2px 5px rgba(222, 191, 12, 0.6)",
          }}
        >
          {title || "No Title"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#f0f0f0",
              padding: "4px 8px",
              borderRadius: 2,
              fontWeight: "bold",
              color: "#555",
            }}
          >
            {type || "Unknown"}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>Company:</strong> {company || "Unknown"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Location:</strong> {location || "Not specified"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Salary:</strong> {salary ? `$${salary}` : "Not disclosed"}
          </Typography>
        </Box>

        {company && (
          <Typography
            variant="body2"
            sx={{
              color: "#0288D1",
              fontWeight: "bold",
              marginTop: 3,
              marginBottom: 1.5,
            }}
          >
            ~{company.toLowerCase().replace(/\s+/g, "")}.com
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={onViewDetails}
          sx={{
            backgroundColor: "#0288D1",
            color: "#fff",
            padding: "6px 16px",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "bold",
            width: "100%",
            "&:hover": {
              backgroundColor: "#0277BD",
            },
          }}
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
