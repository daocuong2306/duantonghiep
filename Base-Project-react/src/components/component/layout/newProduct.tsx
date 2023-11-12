import { useGetDataQuery } from '@/api/home';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewProducts = () => {
    const { data } = useGetDataQuery();
    console.log(data);

    const [showMore, setShowMore] = useState(false);

    // Display 3 products initially
    const initialProducts = data?.data.productNew.slice(0, 4);
    return (
        initialProducts?.map((product) =>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">

                <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img className="img-fluid w-100" src={`http://localhost:8000${product.image}`} alt="" />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">{product.name}</h6>
                        <div className="d-flex justify-content-center">
                            <h6>{product.price}</h6>
                            {/* <h6 className="text-muted ml-2"><del>$123.00</del></h6> */}
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                        <Link to={`/product/detail/${product.id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>Xem chi tiết</Link>
                        <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Thêm vào giỏ hàng</Link>
                    </div>
                </div>

            </div>
        )
    );
};

export default NewProducts;
