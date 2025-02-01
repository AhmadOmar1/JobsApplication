import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import JobListing from "./pages/JobListing/JobListing";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

interface Route {
    path: string;
    element: JSX.Element;
    protected?: boolean;
}

const routes: Route[] = [
    {
        path: '/',
        element: <JobListing />,
    },
    {
        path: '/jobs',
        element: <JobListing />,
    },
    {
        path: '/admin/login',
        element: <AdminLogin />,
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
        protected: true,
    },
];

const isAuthenticated = () => {
    return true;
};

const router = createBrowserRouter(
    routes.map((route) => {
        if (route.protected) {
            return {
                path: route.path,
                element: isAuthenticated() ? route.element : <Navigate to="/admin/login" />,
            };
        }
        return route;
    })
);

export const JobRouter = () => <RouterProvider router={router} />;