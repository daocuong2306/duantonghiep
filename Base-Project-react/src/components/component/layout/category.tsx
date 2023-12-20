import { useGetDataQuery } from '@/api/home';
import { Link } from 'react-router-dom';


const Category = () => {
    const { data }: { data?: any } = useGetDataQuery();
    console.log(data);

    return (
        <div className="container py-5">
            <div className="row pb-5 mb-3">
                {data?.data.productNew?.map((product: any, index: any) => (
                    <div key={index} className="col-lg-3 col-md-6 mb-4">
                        <div className="card rounded shadow-sm border-0">
                            <div className="card-body p-4">
                                <img
                                    src={`https://briteshop.store${product.image}`}
                                    alt=""
                                    className="img-fluid d-block mx-auto mb-3 rounded-lg"
                                    style={{ height: '300px', width: '300px', objectFit: 'cover' }}
                                />
                                <h5>
                                    <Link to={`/product/detail/${product.id}`} className="text-dark">
                                        {product.name}
                                    </Link>
                                </h5>
                                <p className="small text-muted font-italic" >
                                    {parseFloat(product.price).toLocaleString('en-US')} đ
                                </p>
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
