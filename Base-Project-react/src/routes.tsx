
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
import ListVariant from "./components/admin/Products/ListVariant";
import Home from "./components/component/layout/home";
import CartProduct from "./components/client/Cart/cart";
import Statistics from "./components/admin/statistics/statistics";
import PaymentOnline from "./components/client/payment/paymentOnline";
import ConfirmPayment from "./components/client/payment/confirmPayment";
import Bill from "./components/client/bill/Bill";
import Account from "./components/client/account/account";
import BillDashboard from "./components/admin/bill/dashboard";
import HistoryBill from "./components/admin/bill/historyBill";
import Checkbill from "./components/client/account/checkbill";
import About from "./components/component/layout/about/about";



const header = localStorage.getItem('header');
const roleKey = 'role';
const roleA = sessionStorage.getItem(roleKey);
const role = localStorage.getItem('role');
if (roleA) {
    // Đặt giá trị và hẹn giờ xóa trong sessionStorage
    sessionStorage.setItem(roleKey, roleA);
    setTimeout(() => {
        // Xóa role từ sessionStorage sau 15 phút
        sessionStorage.removeItem(roleKey);
        console.log('Role has been removed.');
    }, 900000); // 15 * 60 * 1000 milliseconds = 900000
}
if (header == undefined) {
    localStorage.removeItem('header');
}
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
            {
                path: 'cart',
                element: <CartProduct />
            },
            {
                path: 'payment',
                element: <PaymentOnline />
            },

            {
                path: "confirm",
                element: <ConfirmPayment />,
            },
            {
                path: "bill",
                element: <Bill />
            },
            {
                path: "/account",
                element: <Account />
            },
            {
                path: "about",
                element: <About />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
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
                path: "statistics",
                element: <Statistics />,
            },
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
            // {
            //     path: 'test',
            //     element: <MyComponent />
            // },
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
            {
                path: "statistics",
                element: <Statistics />,
            },
            {
                path: "bills",
                element: <BillDashboard />,
            },
            {
                path: "historybills/:id",
                element: <HistoryBill />,
            }
        ],
    },

]);

