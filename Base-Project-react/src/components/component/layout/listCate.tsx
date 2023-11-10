import { useGetDataQuery } from '@/api/home';
import React from 'react'
import { Link } from 'react-router-dom'

const ListCate = () => {
    const { data } = useGetDataQuery();
    return (
        data?.data.categories.map((category) =>
            <div className="col-lg-4 col-md-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" >
                    {/* <p className="text-right">15 Products</p> */}
                    <Link to="" className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={`http://localhost:8000${category.image}`} alt="" />
                    </Link>
                    <h5 className="font-weight-semi-bold m-0">{category.name}</h5>
                </div>
            </div>

        )
    )
}

export default ListCate