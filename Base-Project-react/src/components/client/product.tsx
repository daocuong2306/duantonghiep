import { useGetUserQuery } from "@/api/user";
import { useGetCategoriesQuery } from "../../api/category";
import { useGetProductsQuery } from "../../api/product";
import { ICategory } from "../../interface/category";
import { IProduct } from "../../interface/product";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const sortOptions = [
    { name: 'Phổ biến nhất', href: '#', current: false },
    { name: 'Mới nhất', href: '#', current: false },
    { name: 'Giá: từ thấp đến cao', href: '#', current: false },
    { name: 'Giá: từ cao đến thấp', href: '#', current: false },
]
const subCategories = [
    // { name: 'Totes', href: '#' },
    // { name: 'Backpacks', href: '#' },
    // { name: 'Travel Bags', href: '#' },
    // { name: 'Hip Bags', href: '#' },
    // { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Màu',
        options: [
            { label: 'Trắng', value: 'White', checked: false },
            { label: 'Xanh lá', value: 'Green', checked: false },
            { label: 'Xanh dương', value: 'Blue', checked: false },
            { label: 'Xám', value: 'Brown', checked: false },
            { label: 'Đỏ', value: 'Red', checked: false },
            { label: 'Tím', value: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Danh mục',
        options: [
            { label: 'Áo', value: 'New Arrivals', checked: false },
            { label: 'Quần', value: 'Sale', checked: false },
            { label: 'Giày', value: 'Travel', checked: false },
            { label: 'Vest', value: 'Organization', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Kích cỡ',
        options: [
            { label: 'XS', value: 'XS', checked: false },
            { label: 'S', value: 'S', checked: false },
            { label: 'M', value: 'M', checked: false },
            { label: 'L', value: 'L', checked: false },
            { label: 'XL', value: 'XL', checked: false },
            { label: '2XL', value: '2XL', checked: false },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Product = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const token = localStorage.getItem("header")
    const { data } = useGetUserQuery(`${token}`)
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const { data: products, error, isLoading } = useGetProductsQuery("");
    const { data: categories } = useGetCategoriesQuery();
    const { control, handleSubmit, watch, register } = useForm()
    const { min }: number = watch(['min']);
    const { max }: number = watch(['max']);
    console.log("1", products);
    const onSubmit = (formData: any) => {
        if (Number(formData.min) < 0 && Number(formData.max) < 0) {
            console.log("giá phải là số dương")
        }
        if (Number(formData.min) > Number(formData.max) && Number(formData.max) != 0) {
            console.log("vui lòng nhập đúng khoảng giá");
        }
        if (Number(formData.min) > 0 && Number(formData.max) == 0) {
            const filterProduct = products?.filter((item: any) => item?.price >= formData.min)
            console.log(filterProduct);
            setFilteredProducts(filterProduct);
        }
        if (Number(formData.min) < Number(formData.max)) {
            const filterProduct = products?.filter((item: any) => item?.price >= formData.min && item?.price <= formData.max)
            console.log(filterProduct);
            setFilteredProducts(filterProduct);
        }
        if (Number(formData.min) == 0 && Number(formData.max) == 0) {
            setFilteredProducts(products);
        }
    };
    const handleCheckboxChange = (checkboxData: string) => {
        console.log(checkboxData);

        if (checkboxData == "0") {
            setFilteredProducts(products);
        } else if (checkboxData) {
            const filteredProducts = products?.filter((item: IProduct) => item?.cateId == checkboxData)
            setFilteredProducts(filteredProducts)
        }
    }
    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href} className="block px-2 py-3">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul> */}

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Nhu cầu
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            <div className="lg:col-span-3">
                                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {filteredProducts.length > 0 // Use filteredProducts here instead of products
                                        ? filteredProducts.map((product: any) => {
                                            return <li key={product.id}>
                                                <Link to={`/details/${product.slug}`} className="group block overflow-hidden">
                                                    <img
                                                        src={`http://127.0.0.1:8000${product.image}`}
                                                        alt=""
                                                        className="w-full rounded-xl object-cover transition duration-500 group-hover:scale-105 group-hover:rounded-xl sm:h-[375px]"
                                                    />
                                                    <div className="relative bg-white pt-3">
                                                        <h3
                                                            className="text-[14px] text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                                        >
                                                            {product.name}
                                                        </h3>

                                                        <p className="mt-2">

                                                            <span className="tracking-wider text-gray-900 text-[16px] font-bold"> {product.price} VND </span>
                                                        </p>

                                                    </div>
                                                </Link>
                                                {/* <a
                                                className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                                            >
                                                <span
                                                    className="absolute inset-0 border border-red-600 group-active:border-red-500"
                                                ></span>
                                                <span
                                                    className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                                                    onClick={() => onHandleSubmit(product.id)}
                                                >
                                                    Add to cart
                                                </span>
                                            </a> */}
                                            </li>
                                        })
                                        : products?.product.map((product: any) => {
                                            return <li key={product.id}>
                                                <Link to={`/product/detail/${product.id}`} className="group block overflow-hidden">
                                                    <img
                                                        src={`http://127.0.0.1:8000${product.image}`}
                                                        alt=""
                                                        className="w-full rounded-xl object-cover transition duration-500 group-hover:scale-105 group-hover:rounded-xl sm:h-[375px]"
                                                    />
                                                    <div className="relative bg-white pt-3">
                                                        <h3
                                                            className="text-[14px] text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                                        >
                                                            {product.name}
                                                        </h3>

                                                        <p className="mt-2">
                                                            <span className="sr-only"> Regular Price </span>

                                                            <span className="tracking-wider text-gray-900 text-[16px] font-bold"> {product.price} VND </span>
                                                        </p>

                                                    </div>
                                                </Link>
                                                {/* <a
                                                className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                                            >
                                                <span
                                                    className="absolute inset-0 border border-red-600 group-active:border-red-500"
                                                ></span>
                                                <span
                                                    className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                                                    onClick={() => onHandleSubmit(product.id)}
                                                >
                                                    Add to cart
                                                </span>
                                            </a> */}
                                            </li>
                                        })}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
        // <div>
        //     <section>
        //         <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        //             <div className="mt-8 block lg:hidden">
        //                 <button
        //                     className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
        //                 >
        //                     <span className="text-sm font-medium"> Filters & Sorting </span>

        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="none"
        //                         viewBox="0 0 24 24"
        //                         stroke-width="1.5"
        //                         stroke="currentColor"
        //                         className="h-4 w-4 rtl:rotate-180"
        //                     >
        //                         <path
        //                             stroke-linecap="round"
        //                             stroke-linejoin="round"
        //                             d="M8.25 4.5l7.5 7.5-7.5 7.5"
        //                         />
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        //                 <div className="hidden space-y-4 lg:block">

        //                     <div>
        //                         <p className="block text-xs font-medium text-gray-700">Filters</p>

        //                         <div className="mt-1 space-y-2">
        //                             <details
        //                                 className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
        //                             >
        //                                 <summary
        //                                     className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
        //                                 >
        //                                     <span className="text-sm font-medium"> Category </span>

        //                                     <span className="transition group-open:-rotate-180">
        //                                         <svg
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             fill="none"
        //                                             viewBox="0 0 24 24"
        //                                             stroke-width="1.5"
        //                                             stroke="currentColor"
        //                                             className="h-4 w-4"
        //                                         >
        //                                             <path
        //                                                 stroke-linecap="round"
        //                                                 stroke-linejoin="round"
        //                                                 d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        //                                             />
        //                                         </svg>
        //                                     </span>
        //                                 </summary>
        //                                 <div className="border-t border-gray-200 bg-white">

        //                                     <div className="space-y-1 border-t border-gray-200 p-4">
        //                                         <div>
        //                                             <label
        //                                                 htmlFor="FilterRed"
        //                                                 className="inline-flex items-center gap-2"
        //                                             >
        //                                                 <input
        //                                                     type="checkbox"
        //                                                     value="0" // Đặt giá trị cho tất cả các danh mục thành "0"

        //                                                     onChange={() => handleCheckboxChange('0')} // Truyền '0' khi ô checkbox được chọn
        //                                                     className="h-5 w-5 rounded border-gray-300"
        //                                                 />
        //                                                 <span className="text-sm font-medium text-gray-700">
        //                                                     All categories
        //                                                 </span>
        //                                             </label>
        //                                         </div>
        //                                         {categories?.categories.map((item: ICategory) =>
        //                                             <div key={item.id}>
        //                                                 <label
        //                                                     htmlFor={`Filter${item.name}`}
        //                                                     className="inline-flex items-center gap-2"
        //                                                 >
        //                                                     <input
        //                                                         type="checkbox"
        //                                                         value={item.id} // Đặt giá trị cho mỗi danh mục từ mảng categories
        //                                                         onChange={() => handleCheckboxChange(String(item?.id))} // Truyền cateId khi ô checkbox được chọn
        //                                                         className="h-5 w-5 rounded border-gray-300"
        //                                                     />
        //                                                     <span className="text-sm font-medium text-gray-700">
        //                                                         {item.name}
        //                                                     </span>
        //                                                 </label>
        //                                             </div>
        //                                         )}

        //                                     </div>
        //                                 </div>
        //                             </details>

        //                             <details
        //                                 className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
        //                             >
        //                                 <summary
        //                                     className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
        //                                 >
        //                                     <span className="text-sm font-medium"> Price </span>

        //                                     <span className="transition group-open:-rotate-180">
        //                                         <svg
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             fill="none"
        //                                             viewBox="0 0 24 24"
        //                                             stroke-width="1.5"
        //                                             stroke="currentColor"
        //                                             className="h-4 w-4"
        //                                         >
        //                                             <path
        //                                                 stroke-linecap="round"
        //                                                 stroke-linejoin="round"
        //                                                 d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        //                                             />
        //                                         </svg>
        //                                     </span>
        //                                 </summary>

        //                                 <div className="border-t border-gray-200 bg-white">

        //                                     <form onSubmit={handleSubmit(onSubmit)}>
        //                                         <div className='flex'>
        //                                             <div className='w-[40%]'>
        //                                                 <Controller
        //                                                     name="min"
        //                                                     control={control}
        //                                                     defaultValue="0"
        //                                                     render={({ field }) => (
        //                                                         <div>
        //                                                             <input
        //                                                                 className='w-full'
        //                                                                 placeholder='Min price'
        //                                                                 type="text"
        //                                                                 {...field}
        //                                                             />
        //                                                         </div>
        //                                                     )}
        //                                                 />
        //                                             </div>
        //                                             <div className='w-[20%]'></div>
        //                                             <div className='w-[40%]'>
        //                                                 <Controller
        //                                                     name="max"
        //                                                     control={control}
        //                                                     defaultValue="0"
        //                                                     render={({ field }) => (
        //                                                         <div>
        //                                                             <input
        //                                                                 className='w-full'
        //                                                                 placeholder='Max price'
        //                                                                 type="text"
        //                                                                 {...field}
        //                                                             />
        //                                                         </div>
        //                                                     )}
        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                         <button type="submit" className='p-[5px] bg-green-500'>Filter</button>

        //                                     </form>
        //                                 </div>
        //                             </details>

        //                             <details
        //                                 className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
        //                             >
        //                                 <summary
        //                                     className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
        //                                 >
        //                                     <span className="text-sm font-medium"> Colors </span>

        //                                     <span className="transition group-open:-rotate-180">
        //                                         <svg
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             fill="none"
        //                                             viewBox="0 0 24 24"
        //                                             stroke-width="1.5"
        //                                             stroke="currentColor"
        //                                             className="h-4 w-4"
        //                                         >
        //                                             <path
        //                                                 stroke-linecap="round"
        //                                                 stroke-linejoin="round"
        //                                                 d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        //                                             />
        //                                         </svg>
        //                                     </span>
        //                                 </summary>

        //                                 <div className="border-t border-gray-200 bg-white">
        //                                     <header className="flex items-center justify-between p-4">
        //                                         <span className="text-sm text-gray-700"> 0 Selected </span>

        //                                         <button
        //                                             type="button"
        //                                             className="text-sm text-gray-900 underline underline-offset-4"
        //                                         >
        //                                             Reset
        //                                         </button>
        //                                     </header>

        //                                     <ul className="space-y-1 border-t border-gray-200 p-4">
        //                                         <li>
        //                                             <label
        //                                                 htmlFor="FilterRed"
        //                                                 className="inline-flex items-center gap-2"
        //                                             >
        //                                                 <input
        //                                                     type="checkbox"
        //                                                     id="FilterRed"
        //                                                     className="h-5 w-5 rounded border-gray-300"
        //                                                 />

        //                                                 <span className="text-sm font-medium text-gray-700">
        //                                                     Red
        //                                                 </span>
        //                                             </label>
        //                                         </li>
        //                                     </ul>
        //                                 </div>
        //                             </details>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="lg:col-span-3">
        //                     <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        //                         {filteredProducts.length > 0 // Use filteredProducts here instead of products
        //                             ? filteredProducts.map((product: any) => {
        //                                 return <li key={product.id}>
        //                                     <Link to={`/details/${product.slug}`} className="group block overflow-hidden">
        //                                         <img
        //                                             src={`http://127.0.0.1:8000${product.image}`}
        //                                             alt=""
        //                                             className="w-full rounded-xl object-cover transition duration-500 group-hover:scale-105 group-hover:rounded-xl sm:h-[375px]"
        //                                         />
        //                                         <div className="relative bg-white pt-3">
        //                                             <h3
        //                                                 className="text-[14px] text-gray-700 group-hover:underline group-hover:underline-offset-4"
        //                                             >
        //                                                 {product.name}
        //                                             </h3>

        //                                             <p className="mt-2">

        //                                                 <span className="tracking-wider text-gray-900 text-[16px] font-bold"> {product.price} VND </span>
        //                                             </p>

        //                                         </div>
        //                                     </Link>
        //                                     {/* <a
        //                                         className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        //                                     >
        //                                         <span
        //                                             className="absolute inset-0 border border-red-600 group-active:border-red-500"
        //                                         ></span>
        //                                         <span
        //                                             className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        //                                             onClick={() => onHandleSubmit(product.id)}
        //                                         >
        //                                             Add to cart
        //                                         </span>
        //                                     </a> */}
        //                                 </li>
        //                             })
        //                             : products?.product.map((product: any) => {
        //                                 return <li key={product.id}>
        //                                     <Link to={`/product/detail/${product.id}`} className="group block overflow-hidden">
        //                                         <img
        //                                             src={`http://127.0.0.1:8000${product.image}`}
        //                                             alt=""
        //                                             className="w-full rounded-xl object-cover transition duration-500 group-hover:scale-105 group-hover:rounded-xl sm:h-[375px]"
        //                                         />
        //                                         <div className="relative bg-white pt-3">
        //                                             <h3
        //                                                 className="text-[14px] text-gray-700 group-hover:underline group-hover:underline-offset-4"
        //                                             >
        //                                                 {product.name}
        //                                             </h3>

        //                                             <p className="mt-2">
        //                                                 <span className="sr-only"> Regular Price </span>

        //                                                 <span className="tracking-wider text-gray-900 text-[16px] font-bold"> {product.price} VND </span>
        //                                             </p>

        //                                         </div>
        //                                     </Link>
        //                                     {/* <a
        //                                         className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        //                                     >
        //                                         <span
        //                                             className="absolute inset-0 border border-red-600 group-active:border-red-500"
        //                                         ></span>
        //                                         <span
        //                                             className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        //                                             onClick={() => onHandleSubmit(product.id)}
        //                                         >
        //                                             Add to cart
        //                                         </span>
        //                                     </a> */}
        //                                 </li>
        //                             })}

        //                         {/* {products?.map((product: IProduct) => {
        //                             return (
        //                                 <li key={product.id}>
        //                                     <Link to={`/details/${product.id}`} className="group block overflow-hidden">
        //                                         <img
        //                                             src={product.image}
        //                                             alt=""
        //                                             className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        //                                         />
        //                                         <div className="relative bg-white pt-3">
        //                                             <h3
        //                                                 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
        //                                             >
        //                                                 {product.name}
        //                                             </h3>

        //                                             <p className="mt-2">
        //                                                 <span className="sr-only"> Regular Price </span>

        //                                                 <span className="tracking-wider text-gray-900"> {product.price} $ </span>
        //                                             </p>

        //                                         </div>

        //                                     </Link>
        //                                     <a
        //                                         className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
        //                                     >
        //                                         <span
        //                                             className="absolute inset-0 border border-red-600 group-active:border-red-500"
        //                                         ></span>
        //                                         <span
        //                                             className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        //                                         // onClick={() => onHandleSubmit(product.id)}
        //                                         >
        //                                             Add to cart
        //                                         </span>
        //                                     </a>
        //                                 </li>
        //                             )
        //                         })} */}
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </div>
    )
}

export default Product