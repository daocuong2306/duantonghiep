import { useGetDataQuery } from '@/api/home'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowRightCircleFill } from "react-icons/bs"

type Props = {}

const Category = (props: Props) => {
    const { data } = useGetDataQuery();
    console.log(data);

    return (
        <div>
            {/* <div className="nav-item dropdown">
                <a href="#" className="nav-link" data-toggle="dropdown">Dresses <i className="fa fa-angle-down float-right mt-1"></i></a>
                <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <Link to="" className="dropdown-item">Men's Dresses</Link>
                    <Link to="" className="dropdown-item">Women's Dresses</Link>
                    <Link to="" className="dropdown-item">Baby's Dresses</Link>
                </div>
            </div> */}
            {data?.data.categories.map((category) =>
                <Link to="" className="nav-item nav-link text-[#00CCFF]">{category.name}</Link>
            )}

        </div>
    )
}

export default Category
