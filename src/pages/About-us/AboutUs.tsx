import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import about2 from "../../assets/about-2.jpeg";
import about3 from "../../assets/about-3.jpeg";
import about4 from "../../assets/about-4.jpeg";
import about5 from "../../assets/about-5.jpeg";

const MotionBox = motion.create(Box);

const AboutUs = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", paddingY: 6 }}>
      <Container>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 2,
              color: "#333",
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
            }}
          >
            Welcome to{" "}
            <span
              style={{
                color: "rgb(8, 92, 175)",
                textShadow: "2px 2px 5px rgba(13, 222, 180, 0.6)",
              }}
            >
              Your Career Hub
            </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#555",
              marginBottom: 4,
              fontSize: { xs: "0.9rem", sm: "1.2rem" },
            }}
          >
            Empowering professionals and job seekers to connect and grow. We are
            committed to creating opportunities that lead to meaningful careers.
          </Typography>
        </MotionBox>
      </Container>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                lineHeight: 1.8,
                marginBottom: 3,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              At our platform, we believe that every individual deserves the
              chance to find a job they love. We connect businesses with top
              talent while helping job seekers find positions that align with
              their goals and values.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                lineHeight: 1.8,
                marginBottom: 3,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Our mission is simple: to create a seamless and modern job portal.
              Whether you're looking for your next opportunity or searching for
              the perfect candidate, we're here to help.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: 2,
                "&:hover": { backgroundColor: "#555" },
                paddingX: { xs: 2, sm: 4 },
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
              onClick={() => navigate("/")}
            >
              Apply Now
            </Button>
          </MotionBox>

          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{
              flex: 1,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            {[about2, about3, about4, about5].map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`About Us ${index + 1}`}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "48%",
                  height: "auto",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
            ))}
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
