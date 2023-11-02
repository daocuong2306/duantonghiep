
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
import Home from "./components/component/check/home";
import InForAdmin from "./components/admin/InforAdmin/infor";
import Statistical from "./components/admin/InforAdmin/statistical";
import NotFound from "./components/component/layout/NotFound";
import DashboardUser from "./components/admin/user/dashboard";
import AddOptions from "./components/admin/Options/addOptions";
import DashboardOptions from "./components/admin/Options/dashboard";
import AddValueOptions from "./components/admin/Options/addValues";

import BannerDashboard from "./components/admin/banner/listBanner";
import AddBanner from "./components/admin/banner/addBanner";
import DetailProduct from "./components/client/products/detail";
import MyComponent from "./components/component/check/test";
import ListVariant from "./components/admin/Products/ListVariant";



const role = localStorage.getItem('role');
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
                element: <Home />,
            },
            {
                path: 'product/detail/:id',
                element: <DetailProduct />
            },
        ]
    },
    {
        path: "/admin",
        element: role != "0" ? <NotFound /> : <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <Navigate to="user" />,
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
            }
            ,
            {
                path: "profile",
                element: <InForAdmin />,
            },
            {
                path: "statistical",
                element: <Statistical />,
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
                path: 'user',
                element: <DashboardUser />
            },
            {
                path: 'test',
                element: <MyComponent />
            },
            {
                path: 'Options/add',
                element: <AddOptions />
            },
            {
                path: 'Options',
                element: <DashboardOptions />,
            },
            {
                path: 'Options/OptionsValue/add',
                element: <AddValueOptions />
            }
            ,
            {
                path: 'Variant/list/:id',
                element: <ListVariant />
            },
            {
                path: 'banner',
                element: <BannerDashboard />
            },
            {
                path: 'banner/add',
                element: <AddBanner />
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

