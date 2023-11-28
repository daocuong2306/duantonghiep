import React, { useEffect } from 'react';
import { useGetDataQuery } from "@/api/home";
import { Link } from 'react-router-dom';

const Banner = (props: Props) => {
    const { data } = useGetDataQuery();

    useEffect(() => {
        // Start the carousel when the component mounts
        const headerCarousel = document.getElementById('header-carousel');
        if (headerCarousel) {
            const carousel = new window.bootstrap.Carousel(headerCarousel, {
                interval: 3000, // Set the interval between slides (in milliseconds)
            });

            // Handle click on the previous button
            const prevButton = document.querySelector('.carousel-control-prev');
            prevButton.addEventListener('click', () => {
                carousel.prev();
            });

            // Handle click on the next button
            const nextButton = document.querySelector('.carousel-control-next');
            nextButton.addEventListener('click', () => {
                carousel.next();
            });
        }
    }, []);

    return (
        <div>
            <div id="header-carousel" className="carousel slide" data-ride="carousel" data-interval="3000">
                <div className="carousel-inner">
                    {data?.data.banner.map((banner, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img
                                className="h-[50%] w-full object-cover"
                                src={banner.image}
                                alt={`Image ${index + 1}`}
                                
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
                <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                    <div className="btn btn-dark">
                        <span className="carousel-control-prev-icon mb-n2"></span>
                    </div>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                    <div className="btn btn-dark">
                        <span className="carousel-control-next-icon mb-n2"></span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Banner;
