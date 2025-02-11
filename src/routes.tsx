import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "./providers/AuthProvider";

import JobListing from "./pages/JobListing/JobListing";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import PostJob from "./pages/PostJob/PostJob";
import JobDetails from "./pages/JobDetails/JobDetails";
import ApplyJob from "./pages/ApplyJob/ApplyJob";
import AboutUs from "./pages/About-us/AboutUs";
import ContactUs from "./pages/Contact-Us/ContactUs";
import ViewMore from "./pages/view-more/ViewMore";

import Navbar from "./components/Nav-Bar/NavBar";
import Footer from "./components/footer/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

interface IRoute {
  path: string;
  element: JSX.Element;
  protected?: boolean;
  adminBlocked?: boolean; 
}

export const JobRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;

  
  const routes: IRoute[] = [
    { path: "/", element: <JobListing /> },
    { path: "/jobs", element: <JobListing /> },
    {
      path: "/about",
      element: isAuthenticated ? (
        <Navigate to="/admin/dashboard" replace />
      ) : (
        <AboutUs />
      ),
      adminBlocked: true,
    },
    {
      path: "/contact",
      element: isAuthenticated ? (
        <Navigate to="/admin/dashboard" replace />
      ) : (
        <ContactUs />
      ),
      adminBlocked: true,
    },
    { path: "/admin/login", element: <AdminLogin /> },
    { path: "/admin/dashboard", element: <AdminDashboard />, protected: true },
    { path: "/admin/post-job", element: <PostJob />, protected: true },
    { path: "/job/:jobId", element: <JobDetails /> },
    { path: "/apply/:jobId", element: <ApplyJob /> },
    { path: "/view-more", element: <ViewMore /> },
  ];

  useEffect(() => {
    if (
      isAuthenticated &&
      (location.pathname === "/about" || location.pathname === "/contact")
    ) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/admin/login" />;
  };

  const hideFooterPages = [
    "/admin/login",
    "/admin/dashboard",
    "/admin/post-job",
  ];
  const shouldHideFooter = hideFooterPages.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <ScrollToTopButton />
      <Box sx={{ flex: 1 }}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute key={route.path} element={route.element} />
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </Box>
      {!shouldHideFooter && <Footer />}
    </Box>
  );
};

export default JobRouter;
