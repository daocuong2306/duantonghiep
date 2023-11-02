import React from 'react';
import './ProductCard.css'; // Tạo một tệp CSS riêng (ProductCard.css) để tùy chỉnh sản phẩm thẻ

const ProductCard = () => {
    return (
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default product-card">
                <div className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
                    <div className="overflow-hidden relative product-image">
                        <img className="w-30 transition duration-700 ease-in-out group-hover:opacity-60" src="https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg" alt="image" />
                    </div>
                    <div className="px-4 py-3 bg-white">
                        <a href="#" className="product-title"><h1 className="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300 ease-in-out">White Line Dress</h1></a>
                        <div className="flex py-2">
                            <p className="product-price text-xs text-gray-600">$45.00</p>
                            <p className="product-discount text-xs text-red-600 line-through">$15.00</p>
                        </div>
                        <div className="flex">
                            <div className="product-rating">
                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                <i className="far fa-star text-gray-400 text-xs"></i>
                            </div>
                            <div className="ml-2 product-reviews">
                                <p className="text-gray-500 font-medium text-sm">(1)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
