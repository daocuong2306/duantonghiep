import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDataQuery } from '@/api/home';

const NewProducts = () => {
    const { data } = useGetDataQuery();
    console.log(data);

    const [showMore, setShowMore] = useState(false);

    // Display 4 products initially
    const initialProducts = data?.data.productNew.slice(0, 4);

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            {initialProducts?.map((product) => (
                    <div className="card mx-auto col-10 mt-5">
                        <img
                            className='mx-auto img-thumbnail'
                            src={`http://localhost:8000${product.image}`}
                            alt={product.name}
                            width="auto"
                            height="auto"
                        />
                        <div className="card-body text-center mx-auto">
                            <div className='cvp'>
                                <h5 className="card-title font-weight-bold">{product.name}</h5>
                                <p className="card-text">$299</p>
                                <Link to={`/product/detail/${product.id}`} className="btn details px-auto">
                                    <i className="fas fa-eye text-primary mr-1"></i>Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default NewProducts;
