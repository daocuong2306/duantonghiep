import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png'
const Header = () => {


    const token = localStorage.getItem("header")
    const role = localStorage.getItem("role")

    const url = useNavigate()
    const logout = () => {
        localStorage.removeItem("header")
        localStorage.removeItem("role")
        url("/")
    }
    return (
        <div className="flex items-center justify-between bg-secondary py-2 px-xl-5 mb-3">
            <div className="flex items-center space-x-2">
                <img src={Image} alt="" className="h-16 w-auto" />



            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4 lg:w-1/3">
                <div className="hidden lg:flex space-x-4">
                    <Link to="/" className="text-dark hover:text-[#00CCFF]">Trang chủ</Link>
                    <Link to="/products" className="text-dark hover:text-[#00CCFF]">Sản phẩm</Link>
                    <Link to="" className="text-dark hover:text-[#00CCFF]">Thông tin</Link>
                </div>
            </div>

            {/* User Actions */}
            {role && token ? role == "2" ? <div className="flex items-center space-x-4">
                <Link to="/account" className="text-dark hover:text-[#00CCFF]"><i className="fas fa-user-alt"></i>   Tài khoản</Link>
                <button onClick={() => logout()} className="text-dark hover:text-[#00CCFF]"><i className="fas fa-sign-out-alt"></i>   Đăng xuất</button>
            </div> :
                <div className="flex items-center space-x-4">
                    <Link to="/admin" className="text-dark hover:text-[#00CCFF]"><i className="fas fa-tasks"></i>   Trang quản trị</Link>
                    <button onClick={() => logout()} className="text-dark hover:text-[#00CCFF] hover:underline"><i className="fas fa-sign-out-alt"></i>   Đăng xuất</button>
                </div>
                : <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-dark hover:text-[#00CCFF]"><i className="fas fa-sign-in-alt"></i>   Đăng nhập</Link>
                    <Link to="/signup" className="text-dark hover:text-[#00CCFF]"><i className="fas fa-user-plus"></i>   Đăng ký</Link>
                </div>
            }
        </div>
    )
}

export default Header