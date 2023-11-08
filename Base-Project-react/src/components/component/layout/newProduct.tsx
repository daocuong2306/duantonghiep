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
        <div className="container-fluid pt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-5 pb-3">
                {initialProducts?.map((product) => (
                    <div key={product.id} className="mb-4">
                        <div className="bg-white border rounded-lg p-4">
                            <div className="overflow-hidden relative">
                                <img
                                    className="w-full h-48 object-cover"
                                    src={`http://localhost:8000${product.image}`}
                                    alt=""
                                />
                            </div>
                            <div className="text-center mt-2">
                                <h6 className="text-xl font-semibold">{product.name}</h6>
                                <div className="flex justify-center mt-2">
                                    <h6 className="text-lg font-semibold">{product.price}</h6>
                                </div>
                            </div>
                            <div className="flex justify-between bg-gray-100 p-2 border-t">
                                <Link to={`/product/${product.id}`} className="text-black hover:text-[#00CCFF]">
                                <i className="fas fa-eye text-[#00CCFF] mr-1"/>
                                    View Detail
                                </Link>
                                <button className="text-black hover:text-[#00CCFF]">
                                <i className="fas fa-shopping-cart text-[#00CCFF] mr-1"/>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewProducts;
