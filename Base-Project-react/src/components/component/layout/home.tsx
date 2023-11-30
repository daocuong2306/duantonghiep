import React from 'react'
import Header from './header'
import Footer from './footer/footer'
import Category from './category'
import Banner from './banner'
import Example from './ListProduct'
import { Link } from 'react-router-dom'
import NewProducts from './newProduct'
import ListCate from './listCate'
import { useGetDataQuery } from '@/api/home'
import { Menu, Spin } from 'antd'
import MenuBar from './menu'
import img1 from "../img/bst-new-arrivals-nam_jpg.jpg";
import img2 from "../img/upsell_t1123_4__jpg.jpg";
import banner from "../../../../img/maxresdefault.jpg"
import Comment from './commen'
type Props = {}

const Home = (props: Props) => {
    const { isLoading } = useGetDataQuery();

    return (
        isLoading ? <Spin spinning={isLoading} className='pl-[50%]'></Spin> :
            <div className=''>
                <body>
                    <Banner />
                    {/* <Example /> */}
                    <div className="container-fluid pt-5">
                        <div className="row px-xl-5 pb-3">
                            <ListCate />
                        </div>
                    </div>
                    {/* <div className="container-fluid offer pt-5">
                        <div className="row px-xl-5">
                            <div className="col-md-6 pb-4">
                                <div className="position-relative text-center text-md-right mb-2 py-5 px-5 offer-card">
                                    <img src={img1} alt="" className="img-fluid" />
                                    <div className="position-relative text-light">
                                        <h5 className="text-uppercase mb-3 offer-title" style={{ color: "#FF6600" }}>
                                            Giảm giá 20% cho các sản phẩm Hạ - Thu
                                        </h5>
                                        <h1 className="mb-4 font-weight-semi-bold offer-heading">Áo Polo, T-shirt</h1>
                                        <Link to="" className="btn btn-primary py-md-2 px-md-3">
                                            Mua ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className="position-relative text-center text-md-left mb-2 py-5 px-5 offer-card">
                                    <img src={img2} alt="" className="img-fluid" />
                                    <div className="position-relative text-light">
                                        <h5 className="text-uppercase mb-3 offer-title" style={{ color: "#FF6600" }}>
                                            Giảm giá 20% cho các sản phẩm Thu - Đông
                                        </h5>
                                        <h1 className="mb-4 font-weight-semi-bold offer-heading">Áo khoác, Hoodie</h1>
                                        <Link to="" className="btn btn-primary py-md-2 px-md-3">
                                            Mua ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div>
                        <img src={banner} alt="" className='h-screen w-screen' />
                    </div>
                    <div className="container-fluid pt-5">
                        <div className="text-center mb-4">
                            <h2 className="section-title px-5"><span className="px-2">Sản phẩm mới</span></h2>
                        </div>
                        <NewProducts />
                    </div>

                    <Comment />
                    <Link to="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></Link>
                </body>
            </div>
    )
}

export default Home