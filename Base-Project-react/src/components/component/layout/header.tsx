import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png'
const Header = () => {
    

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };
    const token = localStorage.getItem("header")
    const role = localStorage.getItem("role")

    const url = useNavigate()
    const logout = () => {
        localStorage.removeItem("header")
        localStorage.removeItem("role")
        url("/")
    }
    return (
        <div className="header-container fixed w-full top-0 bg-white z-50">
            <div className="flex items-center justify-between py-2 px-xl-5 mb-3">
                <div className="flex items-center space-x-2">
                    <img src={Image} alt="" className="h-16 w-auto" />



                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-4 lg:w-1/3">
                    <div className="hidden lg:flex space-x-4">
                        <Link to="/" className="text-black hover:text-[#00CCFF] hover:no-underline hover:border-b-2 hover:border-[#00ccff] focus:text-[#00CCFF] relative py-3">
                            Trang chủ
                        </Link>
                        <Link to="/products" className="text-black hover:text-[#00CCFF] hover:no-underline hover:border-b-2 hover:border-[#00ccff] focus:text-[#00CCFF] relative py-3">
                            Sản phẩm

                        </Link>
                        <Link to="/about" className="text-black hover:text-[#00CCFF] hover:no-underline hover:border-b-2 hover:border-[#00ccff] focus:text-[#00CCFF] relative py-3">
                            Thông tin
                        </Link>
                    </div>
                </div>


                {/* User Actions */}
                <div className="relative">
                    <div onClick={handleMenuToggle} className="cursor-pointer">
                        <i className="fas fa-bars hover:text-[#00ccff]"></i>
                    </div>

                    {showMenu && (
                        <div className="absolute top-full right-0 bg-white border border-gray-300 p-4 shadow w-[200px]">
                            {/* Các phần tử menu */}
                            {role && token ? role === "2" ? (
                                <div className="">
                                    <div className='py-2 text-center'>
                                        <Link to="/account" className="text-black hover:text-[#00CCFF]">
                                            <i className="fas fa-user-alt hover:text-[#00ccff]"></i> Tài khoản
                                        </Link>
                                    </div>
                                    <div className=''>
                                        <button
                                            onClick={() => logout()}
                                            className="text-black m-4 hover:text-[#00CCFF]"
                                        >
                                            <i className="fas fa-sign-out-alt hover:text-[#00ccff]"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <div className='py-2 text-center'>
                                        <Link to="/admin" className="text-black hover:text-[#00CCFF]">
                                            <i className="fas fa-tasks hover:text-[#00ccff]"></i> Trang quản trị
                                        </Link>
                                    </div>
                                    <div className='py-2'>
                                        <button
                                            onClick={() => logout()}
                                            className="text-black hover:text-[#00CCFF] hover:underline ml-[6%]"
                                        >
                                            <i className="fas fa-sign-out-alt hover:text-[#00ccff]"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <div className='py-2 text-center'>
                                        <Link to="/login" className="text-black hover:text-[#00CCFF]">
                                            <i className="fas fa-sign-in-alt hover:text-[#00ccff]"></i> Đăng nhập
                                        </Link>
                                    </div>
                                    <div className='py-2 ml-[13%]'>
                                        <Link to="/signup" className="text-black hover:text-[#00CCFF]">
                                            <i className="fas fa-user-plus hover:text-[#00ccff]"></i> Đăng ký
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>



            </div>
        </div>
    )
}

export default Header