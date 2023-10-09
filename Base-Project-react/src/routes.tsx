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
import ImageUpload from "./components/admin/Products/Update";
import Home from "./components/component/check/home";
import InForAdmin from "./components/admin/InforAdmin/infor";
import Update from "./components/admin/Products/Update";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            {
                path: 'products',
                element: <Product />
            },
            {
                index: true,
                element: <Home />
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
                path: "profile",
                element: <InForAdmin />,
            },
            {
                path: "product/update/:id",
                element: <Update />,
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
            },
            {
                path: 'test',
                element: <ImageUpload />
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