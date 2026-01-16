import { useState } from 'react';
import { useGetDataQuery } from '@/api/home';
import { Link } from 'react-router-dom';

type Props = {};

const Category = (props: Props) => {
    const { data } = useGetDataQuery();
    console.log(data);

    return (
        <div className="container py-5">
            <div className="row pb-5 mb-3">
                {data?.data.productNew?.map((product, index) => (
                    <div key={index} className="col-lg-3 col-md-6 mb-4">
                        <div className="card rounded shadow-sm border-0">
                            <div className="card-body p-4">
                                <img
                                    src={`http://localhost:8000${product.image}`}
                                    alt=""
                                    className="img-fluid d-block mx-auto mb-3 rounded-lg"
                                    style={{ height: '300px', width: '300px', objectFit: 'cover' }}
                                />
                                <h5>
                                    <Link to={`/product/detail/${product.id}`} className="text-dark">
                                        {product.name}
                                    </Link>
                                </h5>
                                <p className="small text-muted font-italic" >{product.price} VND</p>
                                <ul className="list-inline small">
                                    <li className="list-inline-item m-0">
                                        <i className="fa fa-star text-success"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fa fa-star text-success"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fa fa-star text-success"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fa fa-star text-success"></i>
                                    </li>
                                    <li className="list-inline-item m-0">
                                        <i className="fa fa-star-o text-success"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </div>

    );
}

export default Category;
