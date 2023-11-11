import { useGetDataQuery } from '@/api/home'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowRightCircleFill } from "react-icons/bs"

type Props = {}

const Category = (props: Props) => {
    const { data } = useGetDataQuery();
    console.log(data);

    return (
        <div className="container-fluid pt-5">
            <div className="flex flex-wrap px-5 pb-3">
                {data?.data.categories.map((category) =>
                    <div className="w-full md:w-1/2 lg:w-1/3 pb-1">
                        <div className="flex flex-col border mb-4 p-6">
                            <Link to="">
                                <div className="cat-img relative overflow-hidden mb-3 group">
                                    <img src={`http://localhost:8000${category.image}`} alt="" className="w-full transition-transform transform-gpu group-hover:scale-110" /> {/* Sử dụng classes Tailwind CSS */}
                                </div>
                                <h5 className="font-semibold m-0">{category.name}</h5>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Category
