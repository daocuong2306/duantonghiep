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
import { Spin } from 'antd'

type Props = {}

const Home = (props: Props) => {
    const { isLoading } = useGetDataQuery();

    return (
        isLoading ? <Spin spinning={isLoading}></Spin> :
            <div>
                <body>
                    <div className="container-fluid">
                        <div className="row bg-secondary py-2 px-xl-5">
                        </div>
                        <div className="row align-items-center py-3 px-xl-5">
                            <Header />
                        </div>
                    </div>
                    <div className="container-fluid mb-5">
                        <div className="row border-top px-xl-5">
                            <div className="col-lg-3 d-none d-lg-block">

                                <div className="navbar-nav w-100 overflow-hidden" >
                                    <Category />
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                                    <Link to="" className="text-decoration-none d-block d-lg-none">
                                        <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                                    </Link>
                                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                        <div className="navbar-nav mr-auto py-0">
                                            <Link to="index.html" className="nav-item nav-link active">Home</Link>
                                            <Link to="shop.html" className="nav-item nav-link">Shop</Link>
                                            <Link to="detail.html" className="nav-item nav-link">Shop Detail</Link>
                                            <div className="nav-item dropdown">
                                                <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</Link>
                                                <div className="dropdown-menu rounded-0 m-0">
                                                    <Link to="cart.html" className="dropdown-item">Shopping Cart</Link>
                                                    <Link to="checkout.html" className="dropdown-item">Checkout</Link>
                                                </div>
                                            </div>
                                            <Link to="contact.html" className="nav-item nav-link">Contact</Link>
                                        </div>
                                        <div className="navbar-nav ml-auto py-0">
                                            <Link to="" className="nav-item nav-link">Login</Link>
                                            <Link to="" className="nav-item nav-link">Register</Link>
                                        </div>
                                    </div>
                                </nav>
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
                                <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                                    <img src="https://themewagon.github.io/eshopper/img/offer-1.png" alt="" />
                                    <div className="position-relative" >
                                        <h5 className="text-uppercase text-primary mb-3">Giảm giá 20% cho các sản phẩm Hạ - Thu</h5>
                                        <h1 className="mb-4 font-weight-semi-bold">Áo Polo, T-shirt</h1>
                                        <Link to="" className="btn btn-outline-primary py-md-2 px-md-3">Mua ngay</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                                    <img src="https://themewagon.github.io/eshopper/img/offer-2.png" alt="" />
                                    <div className="position-relative" >
                                        <h5 className="text-uppercase text-primary mb-3">Giảm giá 20% cho các sản phẩm Thu - Đông</h5>
                                        <h1 className="mb-4 font-weight-semi-bold">Áo khoác, Hoodie</h1>
                                        <Link to="" className="btn btn-outline-primary py-md-2 px-md-3">Mua ngay</Link>
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
                    {/* <div className="container-fluid bg-secondary my-5">
                    <div className="row justify-content-md-center py-5 px-xl-5">
                        <div className="col-md-6 col-12 py-5">
                            <div className="text-center mb-2 pb-2">
                                <h2 className="section-title px-5 mb-3"><span className="bg-secondary px-2">Stay Updated</span></h2>
                                <p>Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet diam labore at justo ipsum eirmod duo labore labore.</p>
                            </div>
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control border-white p-4" placeholder="Email Goes Here" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary px-4">Subscribe</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
 */}

                    {/* <div className="container-fluid pt-5">
                    <div className="text-center mb-4">
                        <h2 className="section-title px-5"><span className="px-2">Just Arrived</span></h2>
                    </div>
                    <div className="row px-xl-5 pb-3">
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-1.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-2.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-3.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-4.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-5.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-6.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-7.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="https://themewagon.github.io/eshopper/img/product-8.jpg" alt="" />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                    <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 */}

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