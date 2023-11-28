import { useGetDataQuery } from '@/api/home';
import React from 'react';
import { Link } from 'react-router-dom';

const ListCate = () => {
    const { data } = useGetDataQuery();

    return (
        data?.data.categories.map((category) => (
            <div className="col-lg-4 col-md-6 pb-1" key={category.id}>
                <div className="cat-item d-flex flex-column border mb-4" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Link to="" className="cat-img position-relative overflow-hidden mb-3" style={{ borderRadius: '8px 8px 0 0' }}>
                        <img
                            className="img-fluid"
                            src={`http://localhost:8000${category.image}`}
                            alt=""
                            style={{ width: '100%', height: 'auto', borderRadius: '8px 8px 0 0' }}
                        />
                    </Link>
                    <h5 className="font-weight-semi-bold m-0" style={{ padding: '10px', textAlign: 'center', background: '#f8f9fa', borderRadius: '0 0 8px 8px' }}>
                        {category.name}
                    </h5>
                </div>
            </div>
        ))
    );
};

export default ListCate;
