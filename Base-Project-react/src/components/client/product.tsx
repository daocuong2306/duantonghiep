import { useGetUserQuery } from "@/api/user";
import { useGetCategoriesQuery } from "../../api/category";
import { useGetProductsQuery } from "../../api/product";
import { ICategory } from "../../interface/category";
import { IProduct } from "../../interface/product";
import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Spin } from "antd";
import { useGetOptionsQuery } from "@/api/option";
import Search from "./search";
const Product = () => {
    const [find, setFind] = useState({});
    const { data: products, isLoading } = useGetProductsQuery(find);
    const { data: categories } = useGetCategoriesQuery();
    const { data: options } = useGetOptionsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;//số lượng sản phẩm hiển thị thay đổi ở đây

    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products?.product?.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products?.product?.length / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const [isExpanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded(!isExpanded);
    };
    const [expandedOptions, setExpandedOptions] = useState([]);

    const toggleExpansionV = (index) => {
        const updatedOptions = [...expandedOptions];
        updatedOptions[index] = !updatedOptions[index];
        setExpandedOptions(updatedOptions);
    };
    return (
        <Spin spinning={isLoading}>

            <div className="bg-white">
                <div>
                    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

                        <div className="fixed inset-0 z-40 flex">

                            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>
                            <div className="flex items-center">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button
                                            type="button"
                                            className="group inline-flex justify-center text-sm font-medium text-gray-700 py-[1%] hover:text-gray-900"
                                            id="menu-button"
                                            aria-expanded={isMenuOpen}
                                            aria-haspopup="true"
                                            onClick={toggleMenu}
                                        >
                                            Lựa chọn
                                            <svg
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {isMenuOpen && (
                                        <div
                                            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="menu-button"
                                            tabIndex={-1}
                                        >
                                            <div className="py-1" role="none">
                                                <div className="flex justify-center items-center">
                                                    <button className="text-center hover:underline hover:text-red-500">Phổ biến nhất</button>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <button className="text-center hover:underline hover:text-red-500">Mới nhất</button>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <button className="text-center hover:underline hover:text-red-500">Giá: từ nhỏ đến lớn</button>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <button className="text-center hover:underline hover:text-red-500">Giá: từ lớn đến nhỏ</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">Products</h2>

                            <div className="flex gap-x-8 gap-y-10 lg:grid-cols-4">

                                <form className="hidden lg:block w-[20%]">
                                    <div className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                                                aria-controls="filter-section-1"
                                                aria-expanded={isExpanded}
                                                onClick={toggleExpansion}
                                            >
                                                <span className="font-medium text-gray-900">Danh mục</span>
                                                <span className="ml-6 flex items-center">
                                                    {isExpanded ? (
                                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                        </svg>
                                                    )}
                                                </span>
                                            </button>
                                        </h3>

                                        {categories?.categories.map((category) =>
                                            <div className={`pt-6 ${isExpanded ? '' : 'hidden'}`} id="filter-section-1">
                                                <div className="space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="filter-category"
                                                            name="category"
                                                            value="category"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor="filter-category" className="ml-3 text-sm text-gray-600">
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {options?.options.map((option, index) => (
                                        <div className="border-b border-gray-200 py-6" key={index}>
                                            <h3 className="-my-3 flow-root">
                                                <button
                                                    type="button"
                                                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                                                    aria-controls={`filter-section-${index}`}
                                                    aria-expanded={expandedOptions[index]}
                                                    onClick={() => toggleExpansionV(index)}
                                                >
                                                    <span className="font-medium text-gray-900">{option.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        {expandedOptions[index] ? (
                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                </button>
                                            </h3>

                                            {option?.value.map((optionValue, optionValueIndex) => (
                                                <div className={`pt-6 ${expandedOptions[index] ? '' : 'hidden'}`} id={`filter-section-${index}`} key={optionValueIndex}>
                                                    <div className="space-y-4">
                                                        <div className="flex items-center">
                                                            <input
                                                                id={`filter-option-${index}-${optionValueIndex}`}
                                                                name={`option-${index}`}
                                                                value={optionValue.name}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`filter-option-${index}-${optionValueIndex}`} className="ml-3 text-sm text-gray-600">
                                                                {optionValue.name}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <button className="btn-filter">Lọc</button>
                                </form>
                                <div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {currentProducts?.map((product) => (
                                            <Link to={`/product/detail/${product.id}`} key={product.id}>
                                                <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                                    <img
                                                        src={`http://localhost:8000${product.image}`}
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