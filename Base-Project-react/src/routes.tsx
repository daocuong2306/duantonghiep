import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import AddProduct from "./components/admin/addProduct";
import Login from "./components/client/login";
import Signup from "./components/client/signup";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import Product from "./components/client/product";
export const router = createBrowserRouter([

    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            {
                path: 'products',
                element: <Product />
            }
        ]
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