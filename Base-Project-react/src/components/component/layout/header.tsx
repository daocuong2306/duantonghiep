import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png'
const Header = () => {
    const token = localStorage.getItem("header")
    const url = useNavigate()
    const onLogout = (token: string) => {
        localStorage.clear()
        url("/")
    }
    return (
        <div className="container-fluid">
            <div className="row bg-secondary py-2 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-dark" to="">FAQs</Link>
                        <span className="text-muted px-2">|</span>
                        <Link className="text-dark" to="">Help</Link>
                        <span className="text-muted px-2">|</span>
                        <Link className="text-dark" to="">Support</Link>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-dark px-2" to="">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link className="text-dark px-2" to="">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className="text-dark px-2" to="">
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link className="text-dark px-2" to="">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link className="text-dark pl-2" to="">
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-center py-1 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <Link to="" className="text-decoration-none">
                        <img src={Image} alt="" style={{ height: "100px", width: "75%" }} />
                    </Link>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form action="">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" />
                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-[#00CCFF]">
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <Link to="" className="btn border">
                        <i className="fas fa-heart text-[#00CCFF]"></i>
                        <span className="badge">0</span>
                    </Link>
                    <Link to="/cart" className="btn border">
                        <i className="fas fa-shopping-cart text-[#00CCFF]"></i>
                        <span className="badge">0</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header