import { Box, Typography, Container } from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import avatar1 from "../../assets/avatar-01.png";
import avatar2 from "../../assets/avatar-02.png";
import avatar3 from "../../assets/avatar-03.png";

const reviews = [
  {
    id: 1,
    name: "Malek Najar",
    date: "14/9/2025",
    review: "Easy to navigate with a fantastic range of books...",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "Elyas Alhaj",
    date: "14/10/2025",
    review: "Simple layout, great recommendations...",
    avatar: avatar2,
  },
  {
    id: 3,
    name: "Waseem Atrash",
    date: "14/11/2025",
    review: "Clean design and useful suggestions...",
    avatar: avatar3,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5, ease: "easeInOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const ReviewsWeb = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgb(229, 167, 162), rgb(156, 135, 85))",
          paddingY: 8,
          paddingX: 2,
          marginTop: 15,
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: 6,
                color: "black",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              What Our Users Say
            </Typography>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Slider {...sliderSettings}>
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      padding: "24px",
                      textAlign: "center",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                      margin: "0 10px",
                      height: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        marginBottom: 3,
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      "{review.review}"
                    </Typography>
                    <img
                      src={review.avatar}
                      alt={review.name}
                      style={{
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                        marginBottom: "16px",
                        border: "3px solid #FF6F61",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {review.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>
                      {review.date}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default ReviewsWeb;
