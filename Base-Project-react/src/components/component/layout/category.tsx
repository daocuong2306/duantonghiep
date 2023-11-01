import { useGetDataQuery } from '@/api/home'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Category = (props: Props) => {
    const { data } = useGetDataQuery()

    return (
        <div>
            <section className='bg-gray-100'>
                <div className=" mx-auto max-w-7xl px-2 sm:px-6 pt-10 pb-10 ">
                    <div
                        className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
                    >
                        <div
                            className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right"
                        >
                            <h2 className="text-3xl font-bold sm:text-4xl">Cùng xem có những sản phẩm nào trong danh mục</h2>
                            <Link
                                to="#"
                                className="mt-8 inline-block rounded bg-[#00ccff] px-12 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#00ccff] border border-[#00ccff]  focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Tất cả sản phẩm
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {data?.data.categories.map((category) =>
                                <Link
                                    className="block bg-white rounded-xl border  p-4 shadow-sm hover:border-[#00ccff]  hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                                    to="/accountant"
                                >
                                    <span className="inline-block rounded-lg bg-gray-50 p-3">
                                        <img src={`http://localhost:8000${category.image}`} alt="" className='h-[100px]' />
                                    </span>

                                    <h2 className="mt-2 font-bold text-center">{category.name}</h2>


                                </Link>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Category