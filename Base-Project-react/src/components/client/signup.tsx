import { useGetUserQuery, useRegisterMutation } from "../../api/user"
import { IUser } from "../../interface/user"
import { useAppDispatch } from "../../store/hook"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Button, notification, Spin } from 'antd';
import React, { useState } from 'react';
type signUpForm = {
    id?: number;
    name: null;
    email: string;
    image: null;
    role: number;
    phone: null;
    address: null;
    password: string;
    confirmPassword: string
}
const Signup = () => {
    const [registerUser, { data, isLoading, error }] = useRegisterMutation()
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch()
    const url = useNavigate()
    const { register, handleSubmit } = useForm()
    const onHandleSubmit = (dataUser: signUpForm) => {
        registerUser({
            "email": dataUser.email,
            "password": dataUser.password,
            "password_confirmation": dataUser.confirmPassword,
            "name": dataUser.name
        })
        setLoading(true);
    }
    ///Notification
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (text: string) => {
        api.open({
            message: text,
        });
    };
    if (error) {
        openNotification("Email đã tồn tại")
        setTimeout(() => {
            setLoading(false);
            window.location.reload();
        },
            2000);
    }
    if (!isLoading && !error) {
        console.log(data);
        if (data?.status) {
            openNotification("Đăng kí thành công")
            setTimeout(() => {
                setLoading(false);
                url('/login');
            },
                2000);

        }
    }
    return (
        <div>
            <Spin spinning={loading}>
                <div>
                    {contextHolder}
                    <section className="bg-gray-50 ">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  -gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                       Đăng kí tài khoản
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onHandleSubmit)}>

                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tên của bạn</label>
                                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600    " placeholder="" required
                                                {...register("name")}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Tên email</label>
                                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600    " placeholder="name@company.com" required
                                                {...register("email")}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu</label>
                                            <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600    " required
                                                {...register("password")}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Xác nhận mật khẩu</label>
                                            <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600    " required
                                                {...register("confirmPassword")}
                                            />
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  " required />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms" className="font-light text-gray-500 ">Đồng ý với điều khoản </label>
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Tạo tài khoản</button>
                                        <p className="text-sm font-light text-gray-500 ">
                                           Bạn đã có tài khoản?   <Link to={`/login`}><span className="font-medium text-primary-600 hover:underline ">Đăng nhập</span></Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Spin>
        </div>

    )
}

export default Signup