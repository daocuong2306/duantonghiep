import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import AddProduct from "./components/admin/addProduct";
import Login from "./components/client/login";
import Signup from "./components/client/signup";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <div>Home page!</div>,
    },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />,
            },
            {
                path: "dashboard",
                element: (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                    </div>
                ),
            },
            {
                path: "product/add",
                element: <AddProduct />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);