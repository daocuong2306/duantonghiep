import { useState, useEffect } from 'react';
import { useGetDataQuery } from "@/api/home";
import { Link } from 'react-router-dom';

const Banner = (props: Props) => {
    const { data } = useGetDataQuery();

    return (
        <div>
            <div id="header-carousel" className="carousel slide" data-ride="carousel" data-interval="3000">
                <div className="carousel-inner">
                    {data?.data.banner.map((banner, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img
                                className="img-fluid"
                                src={banner.image}
                                alt={`Image ${index + 1}`}
                                style={{ height: '550px' }}
                            />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3">
                                    <h4 className="text-light text-uppercase font-weight-medium mb-3">Giảm giá 10% cho đơn hàng đầu tiên</h4>
                                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">Lựa chọn các sản phẩm yêu thích</h3>
                                    <Link to="" className="btn btn-light py-2 px-3">Mua ngay</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                    <div className="btn btn-dark">
                        <span className="carousel-control-prev-icon mb-n2"></span>
                    </div>
                </Link>
                <Link className="carousel-control-next" href="#header-carousel" data-slide="next">
                    <div className="btn btn-dark">
                        <span className="carousel-control-next-icon mb-n2"></span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Banner;
