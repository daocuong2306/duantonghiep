import { useGetProductsQuery } from "../../../api/product";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Spin } from "antd";
const Product = () => {
    const { category } = useParams()
    console.log(category);
    const dataKey = {
        id: category,
        keyword: ""
    }
    const { data: products, isLoading }: { data: any, isLoading: any } = useGetProductsQuery(dataKey) as { data: any, isLoading: any };

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;//số lượng sản phẩm hiển thị thay đổi ở đây

    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    console.log(products);

    const totalPages = Math.ceil(products?.product?.length / productsPerPage);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };


    return (
        <Spin spinning={isLoading}>

            <div className="bg-white">
                <div>
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>
                        </div>
                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <div className="flex gap-x-8 gap-y-10 lg:grid-cols-4">
                                <div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {products?.product?.map((product: any) => (
                                            <Link to={`/product/detail/${product.id}`} key={product.id}>
                                                <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                                    <img
                                                        src={`https://briteshop.store${product.image}`}
                                                        alt="Product"
                                                        className="h-[400px] w-[300px] rounded-lg object-cover rounded-t-xl"
                                                    />
                                                    <div className="px-4 py-3 w-72">
                                                        <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                                                        <div className="flex items-center">
                                                            <p className="text-lg font-semibold text-black cursor-auto my-3">{product.price}</p>
                                                            <div className="ml-auto text-[#00CCFF]">Xem thông tin chi tiết</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex justify-center mt-6 pt-4">
                                        <ul className="flex">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li key={index} className="mx-2">
                                                    <button
                                                        onClick={() => handlePageChange(index + 1)}
                                                        className={`${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                                                            } px-3 py-1 rounded-md focus:outline-none pagination duration-300 ease-in-out hover:bg-blue-500 hover:text-white`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

        </Spin >
    )
}

export default Product