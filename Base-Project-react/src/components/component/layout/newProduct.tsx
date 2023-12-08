import { Link } from 'react-router-dom';
import { useGetDataQuery } from '@/api/home';

const NewProducts = () => {
    const { data }: { data?: any } = useGetDataQuery();
    console.log(data);

    return (
        <div className="py-5 md:px-20 md:mx-[190px] sm:mx-10">
            <div className="row pb-5 mb-3">
                {data?.data.productNew?.map((product: any, index: any) => (
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
                                <p className="small text-muted font-italic">{product.price} VND</p>
                                <ul className="list-inline small">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <li key={star} className="list-inline-item m-0">
                                            <i className={`fa fa-star${star <= product.rating ? '' : '-o'} text-success`}></i>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewProducts;
