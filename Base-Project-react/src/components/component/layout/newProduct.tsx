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
        <div className="row">
            {initialProducts?.map((product) => (
                <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md text-center">
                        <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to={`/product/detail/${product.id}`}>
                            <img className="h-[120%]" src={`http://localhost:8000${product.image}`} alt="product image" />
                        </Link>
                        <div className="mt-4 px-5 pb-5">
                            <Link to="#">
                                <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                            </Link>
                            <div className="mt-2 mb-5 text-center">
                                <p>
                                    <span className="text-3xl font-bold text-slate-900">{product.price}</span>
                                </p>
                            </div>
                            <Link to={`/product/detail/${product.id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewProducts;
