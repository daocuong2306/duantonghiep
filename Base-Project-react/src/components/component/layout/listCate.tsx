import { useGetDataQuery } from '@/api/home';
import { Link } from 'react-router-dom';

const ListCate = () => {
    const { data }: { data?: any } = useGetDataQuery();
    console.log(data);
    return (
        <>
            <div className=" py-5 md:px-20 md:mx-[190px] sm:mx-10">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Quần </span></h2>
                </div>
                <div className="row pb-5 mb-3">
                    {data?.data.groupedProducts.Quần?.map((product: any, index: any) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <div className="card rounded shadow-sm border-0">
                                <div className="card-body p-4">
                                    <img
                                        src={`https://briteshop.store${product?.image}`}
                                        alt=""
                                        className="img-fluid d-block mx-auto mb-3 rounded-lg"
                                        style={{ height: '300px', width: '300px', objectFit: 'cover' }}
                                    />
                                    <h5>
                                        <Link to={`/product/detail/${product?.id}`} className="text-dark">
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
            <div className=" py-5 md:px-20 md:mx-[190px] sm:mx-10">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Áo </span></h2>
                </div>
                <div className="row pb-5 mb-3">
                    {data?.data.groupedProducts.Áo?.map((product: any, index: any) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <div className="card rounded shadow-sm border-0">
                                <div className="card-body p-4">
                                    <img
                                        src={`https://briteshop.store${product?.image}`}
                                        alt=""
                                        className="img-fluid d-block mx-auto mb-3 rounded-lg"
                                        style={{ height: '300px', width: '300px', objectFit: 'cover' }}
                                    />
                                    <h5>
                                        <Link to={`/product/detail/${product?.id}`} className="text-dark">
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
        </>
    );
};

export default ListCate;
