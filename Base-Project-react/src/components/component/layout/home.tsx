import React from 'react'
import Header from './header'
import Footer from './footer'
import Category from './category'
import Banner from './banner'
import Example from './ListProduct'
import { Link } from 'react-router-dom'
import NewProducts from './newProduct'
import ListCate from './listCate'
import { useGetDataQuery } from '@/api/home'
import { Menu, Spin } from 'antd'
import MenuBar from './menu'

type Props = {}

const Home = (props: Props) => {
    const { isLoading } = useGetDataQuery();

    return (
        isLoading ? <Spin spinning={isLoading}></Spin> :
            <div className=''>
                <body>
                    <div className="container-fluid mb-5">
                        <div className="row border-top px-xl-5">
                            <div className="col-lg-3 d-none d-lg-block">

                                <div className="navbar-nav w-100 overflow-hidden" >
                                    <Category />
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <MenuBar />
                                <Banner />
                            </div>
                        </div>
                    </div>
                    <Example />
                    <div className="container-fluid pt-5">
                        <div className="row px-xl-5 pb-3">
                            <ListCate />
                        </div>
                    </div>
                    <div className="container-fluid offer pt-5">
                        <div className="row px-xl-5">
                            <div className="col-md-6 pb-4">
                                <div className="position-relative text-center text-md-right mb-2 py-5 px-5" style={{backgroundColor:"#00CCFF"}}>
                                    <img src="https://themewagon.github.io/eshopper/img/offer-1.png" alt="" />
                                    <div className="position-relative" >
                                        <h5 className="text-uppercase mb-3" style={{color:"#FF6600"}}>Giảm giá 20% cho các sản phẩm Hạ - Thu</h5>
                                        <h1 className="mb-4 font-weight-semi-bold">Áo Polo, T-shirt</h1>
                                        <Link to="" className="btn btn-primary py-md-2 px-md-3" style={{}}>Mua ngay</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className="position-relative text-center text-md-left mb-2 py-5 px-5" style={{backgroundColor:"#00CCFF"}}>
                                    <img src="https://themewagon.github.io/eshopper/img/offer-2.png" alt="" />
                                    <div className="position-relative" >
                                        <h5 className="text-uppercase mb-3" style={{color:"#FF6600"}}>Giảm giá 20% cho các sản phẩm Thu - Đông</h5>
                                        <h1 className="mb-4 font-weight-semi-bold">Áo khoác, Hoodie</h1>
                                        <Link to="" className="btn btn-primary py-md-2 px-md-3" >Mua ngay</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid pt-5">
                        <div className="text-center mb-4">
                            <h2 className="section-title px-5"><span className="px-2">Sản phẩm mới</span></h2>
                        </div>
                        <div className="row px-xl-5 pb-3">
                            <NewProducts />
                        </div>
                    </div>
                    <div className="container-fluid py-5">
                        <div className="row px-xl-5">
                            <div className="col">
                                <div className="owl-carousel vendor-carousel flex">
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-1.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-2.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-3.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-4.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-5.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-6.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-7.jpg" alt="" />
                                    </div>
                                    <div className="vendor-item border p-4">
                                        <img src="https://themewagon.github.io/eshopper/img/vendor-8.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Link to="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></Link>
                </body>
            </div>
    )
}

export default Home