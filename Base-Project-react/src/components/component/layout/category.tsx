import { useGetDataQuery } from '@/api/home'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowRightCircleFill } from "react-icons/bs"
type Props = {}

const Category = (props: Props) => {
    const { data } = useGetDataQuery()

    return (
        <div className="py-[5%] grid grid-cols-4 gap-4 sm:grid-cols-4">
            {data?.data.categories.map((category) =>
                <div className="relative px-[5%] " >
                    <Link to={`/products`} className='rounded'>
                        <img src={`http://localhost:8000${category.image}`} className='h-[250%] w-[150%]' />
                        <h2 className="mt-2 font-bold text-center absolute top-0 left-0 text-[#00CCFF] text-[30px] pl-[10%] pt-[2%]">
                            {category.name}
                        </h2>

                    </Link>
                </div>
            )}
        </div>

    )
}

export default Category