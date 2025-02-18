import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../assets/icon_transparent.png";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isTransparentNavbar =
    location.pathname === "/" || location.pathname === "/view-more";
  const isAdmin = isAuthenticated;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    !isAdmin && { label: "About", path: "/about" },
    !isAdmin && { label: "Contact", path: "/contact" },
    isAdmin && { label: "Dashboard", path: "/admin/dashboard" },
    isAdmin && { label: "Post a Job", path: "/admin/post-job" },
  ].filter(Boolean) as { label: string; path: string }[];

  return (
    <>
      <AppBar
        position={isTransparentNavbar ? "absolute" : "static"}
        sx={{
          backgroundColor: isTransparentNavbar ? "transparent" : "#2f4780",
          boxShadow: isTransparentNavbar
            ? "none"
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease-in-out",
          padding: isTransparentNavbar ? "16px 0" : "8px 0",
          height: "70px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              color: isTransparentNavbar ? "#FFD700" : "#FFFFFF",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "100px",
                height: "100px",
                marginRight: "8px",
              }}
            />
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                sx={{
                  color: isTransparentNavbar ? "#FFD700" : "white",
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 5px rgba(175, 151, 18, 0.6)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: "#FFFFFF",
                    textShadow: "2px 2px 12px rgb(143, 123, 11)",
                    borderBottom: "2px solid #FFD700",
                  },
                }}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
            {!isAuthenticated ? (
              <Button
                sx={{
                  color: isTransparentNavbar ? "#FFD700" : "white",
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 5px  rgba(175, 151, 18, 0.6)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: "#FFFFFF",
                    textShadow: "2px 2px 12px rgb(143, 123, 11)",
                    borderBottom: "2px solid #FFD700",
                  },
                }}
                onClick={() => navigate("/admin/login")}
              >
                Admin Login
              </Button>
            ) : (
              <Button
                sx={{
                  color: isTransparentNavbar ? "#FFD700" : "white",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 5px rgba(255, 215, 0, 0.6)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: "#FFFFFF",
                    textShadow: "2px 2px 12px rgba(255, 215, 0, 1)",
                    borderBottom: "2px solid #FFD700",
                  },
                }}
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </Box>

          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
              color: isTransparentNavbar ? "#FFFFFF" : "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            backgroundColor: "#f5f5f5",
            color: "#333",
          },
        }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(link.path);
                  handleDrawerToggle();
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          {!isAuthenticated ? (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/admin/login");
                  handleDrawerToggle();
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemText primary="Admin Login" />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton
                onClick={logout}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
