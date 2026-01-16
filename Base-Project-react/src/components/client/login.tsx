import { useGetUserQuery, useLoginMutation } from "../../api/user";
import { IUserLogin } from "../../interface/user";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, notification, Alert, Spin, Switch } from 'antd';
import React, { useState } from 'react';
const Login = () => {
    //loading spin
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [login, { data, isLoading, error, status }] = useLoginMutation();
    const { data: user } = useGetUserQuery(data?.access_token);
    const url = useNavigate();
    const onHandleSubmit = (dataUser: IUserLogin) => {
        login({
            "email": dataUser.email,
            "password": dataUser.password
        });
        setLoading(true);
    }
    // Notification
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: 'Sai Email hoặc Mật khẩu',
            description:
                'Bạn vui lòng nhập đúng lại tài khoản hoặc mật khẩu'
        });
    };
    if (error) {
        openNotification();
        setTimeout(() => {
            setLoading(false);
            window.location.reload();
        },
            2000);
    }
    if (!isLoading && !error) {
        localStorage.setItem("header", data?.access_token);
        if (user?.role < 3) {
            localStorage.setItem("role", user?.role);
            localStorage.setItem("status", user?.status);
            setLoading(false);
            url("/");
        }
    }
    return (
        <div>
            <Spin spinning={loading}>
                {contextHolder}
                <section className="bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        </a>
                        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl ">
                                    Đăng Nhập
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onHandleSubmit)}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Tài khoản của bạn</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="name@company.com"
                                            required
                                            {...register('email')}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu</label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            required
                                            {...register('password')}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                    >Đăng nhập</button>
                                    <p className="text-sm font-light text-gray-500 ">
                                        Bạn chưa có tài khoản?
                                        <Link to={'/signup'} className="font-medium text-primary-600 hover:underline ">Đăng kí</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Spin>

        </div>
    )
}

export default Login
