import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png'
const Header = () => {
   
   
        const token=localStorage.getItem("header")
        const role=localStorage.getItem("role")
    
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

                {role && token ? role == "2" ? <div className="hidden lg:flex space-x-4">
                    <Link to="/" className="text-dark hover:text-[#00CCFF]">Trang chủ</Link>
                    <Link to="/products" className="text-dark hover:text-[#00CCFF]">Sản phẩm</Link>
                    <Link to="" className="text-dark hover:text-[#00CCFF]">Thông tin</Link>
                </div> :
                    <div className="hidden lg:flex space-x-4">
                        <Link to="/" className="text-dark hover:text-[#00CCFF]">Trang chủ</Link>
                        <Link to="/admin" className="text-dark hover:text-[#00CCFF]">Trang quản trị</Link>

                    </div>
                    : <div className="hidden lg:flex space-x-4">
                        <Link to="/" className="text-dark hover:text-[#00CCFF]">Trang chủ</Link>
                        <Link to="/products" className="text-dark hover:text-[#00CCFF]">Sản phẩm</Link>
                        <Link to="" className="text-dark hover:text-[#00CCFF]">Thông tin</Link>
                    </div>
                }

            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4 lg:w-1/3">
                <input type="text" placeholder="Tìm kiếm sản phẩm" className="border border-black rounded px-2 py-1" />
                <button className="bg-[#00CCFF] text-white rounded px-4 py-1">Tìm kiếm</button>
            </div>

            {/* User Actions */}
            {role && token ? role == "2" ? <div className="flex items-center space-x-4">
                <Link to="/account" className="text-dark hover:text-[#00CCFF]">Tài khoản</Link>
                <button onClick={() => logout()} className="text-dark hover:text-[#00CCFF]">Đăng xuất</button>
            </div> :
                <div className="flex items-center space-x-4">
                    <Link to="/account" className="text-dark hover:text-[#00CCFF]">Tài khoản</Link>
                    <button onClick={() => logout()} className="text-dark hover:text-[#00CCFF]">Đăng xuất</button>
                </div>
                : <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-dark hover:text-[#00CCFF]">Đăng nhập</Link>
                    <Link to="/signup" className="text-dark hover:text-[#00CCFF]">Đăng ký</Link>
                </div>
            }
        </div>
    )
}

export default Header