import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import JobListing from "./pages/JobListing/JobListing";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import PostJob from "./pages/PostJob/PostJob";
import JobDetails from "./pages/JobDetails/JobDetails";

interface IRoute {
  path: string;
  element: JSX.Element;
  protected?: boolean;
}

const routes: IRoute[] = [
  { path: "/", element: <JobListing /> },
  { path: "/jobs", element: <JobListing /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard />, protected: true },
  { path: "/admin/post-job", element: <PostJob />, protected: true },
  { path: "/job/:id", element: <JobDetails /> },
  { path: "/job-details/:id", element: <JobDetails /> },
];

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const authContext = useContext(AuthContext);
  return authContext?.isAuthenticated ? (
    element
  ) : (
    <Navigate to="/admin/login" />
  );
};

const router = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: route.protected ? (
      <ProtectedRoute element={route.element} />
    ) : (
      route.element
    ),
  }))
);

export const JobRouter = () => <RouterProvider router={router} />;
