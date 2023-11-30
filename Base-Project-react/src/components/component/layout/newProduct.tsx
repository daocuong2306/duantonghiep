import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDataQuery } from '@/api/home';

const NewProducts = () => {
    const { data } = useGetDataQuery();
    console.log(data);

    const [showMore, setShowMore] = useState(false);

    // Display 4 products initially
    const initialProducts = data?.data.productNew.slice(0, 3);

    return (
        <div className="container py-5">
            <div className="row pb-5 mb-4">
                {initialProducts?.map((product) =>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                        <div className="card rounded shadow-sm border-0">
                            <div className="card-body p-4"><img src={`http://localhost:8000${product.image}`} alt="" className="img-fluid d-block mx-auto mb-3 rounded-lg" style={{ height: '400px', width: '300px', objectFit: 'cover' }} />
                                <h5> <Link to={`/product/detail/${product.id}`} className="text-dark">{product.name}</Link></h5>
                                <p className="small text-muted font-italic" dangerouslySetInnerHTML={{ __html: product.description }}></p>

                                <ul className="list-inline small">
                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                    <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}


            </div>


           
        </div>



    );
};

export default NewProducts;
