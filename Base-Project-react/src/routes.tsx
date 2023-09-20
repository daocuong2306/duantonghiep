import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Login from "./components/client/login";
import Signup from "./components/client/signup";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import Product from "./components/client/product";
import Dashboard from "./components/admin/Products/Dashboard";
import AddProduct from "./components/admin/Products/addProduct";
import CategoryDashboard from "./components/admin/categories/categoryDashboard";
import AddCategory from "./components/admin/categories/addCategory";
import UpdateCategory from "./components/admin/categories/updateCategory";


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
                        < Dashboard />
                    </div>
                ),
            },
            {
                path: "product/add",
                element: <AddProduct />,
            },


            {
                path: "categories",
                element: <CategoryDashboard />
            },
            {
                path: "categories/add",
                element: <AddCategory />
            },
            {
                path: "categories/update/:id",
                element: <UpdateCategory />
            }

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