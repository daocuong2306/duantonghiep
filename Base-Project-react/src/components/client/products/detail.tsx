import { useEffect, useMemo, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useGetDetailQuery } from '@/api/detail'
import { useParams } from 'react-router-dom'
import { useAddCartMutation } from '@/api/cart'
import { useForm } from "react-hook-form";

const reviews = { href: '#', average: 4, totalCount: 117 }
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function DetailProduct() {
    const { id } = useParams()
    const { register, handleSubmit } = useForm();
    const [addCart, { data: add, error }] = useAddCartMutation();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const selectC = (color: any) => {
        setSelectedColor(color);
    };

    const selectS = (size: any) => {
        setSelectedSize(size);
    };
    const newArray = useMemo(() => {
        return [selectedSize, selectedColor].filter(Boolean).map((item: any) => item.option_value_id);
    }, [selectedSize, selectedColor]);
    const prodcuts = {
        id, selectP: newArray
    }
    const { data: detaiProduct, isLoading } = useGetDetailQuery(prodcuts)
    const modifiedData = detaiProduct?.data.variant.size?.map((item: any) => ({
        ...item,
        inStock: true
    }));
    console.log(modifiedData);
    console.log(detaiProduct);
    const onHandleSubmit = (dataUser: any) => {
        if (detaiProduct?.data.priceSku == null) {
            alert("vui lòng chọn kích cỡ và size")
        } else {
            addCart({
                "product_id": id,
                "quantity": 1,
                "sku_id": detaiProduct?.data.priceSku[0].sku_id
            });
        }

    }
    if (add) {
        alert("thêm thành công")
    }
    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm">
                            {detaiProduct?.data.product[0].name}
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={`http://127.0.0.1:8000${detaiProduct?.data.product[0].image}`}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className=" pl-[2%] aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <div className="pt-[5%] lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{detaiProduct?.data.product[0].name}</h1>
                        </div>
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{detaiProduct?.data.priceSku == null ? detaiProduct?.data.product[0].price : detaiProduct?.data.priceSku[0].sku_price}</p>

                            Reviews
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>

                            <form className="mt-10" onSubmit={handleSubmit(onHandleSubmit)}>
                                {/* Colors */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Danh mục</h3>
                                    <p className='text-sm font-base text-gray-500 pb-[5%] pt-[1%]'>{detaiProduct?.data.product[0].category_name}</p>
                                </div>
                                <div>
                                   

                                    {detaiProduct?.data.variant.Mau ?
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
                                            <RadioGroup value={selectedColor} onChange={(color) => selectC(color)}>
                                                <RadioGroup.Label className="sr-only">Chọn một màu</RadioGroup.Label>
                                                <div className="flex items-center space-x-3">
                                                    {detaiProduct?.data.variant.Mau.map((color) => (
                                                        <RadioGroup.Option
                                                            key={color.value}
                                                            value={color}
                                                            className={({ active, checked }) =>
                                                                classNames(
                                                                    color.selectedClass,
                                                                    active && checked ? 'ring ring-offset-1' : '',
                                                                    !active && checked ? 'ring-2' : '',
                                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center p-0.5 focus:outline-none',
                                                                    checked ? 'bg-indigo-100' : ''
                                                                )
                                                            }
                                                        >
                                                            <RadioGroup.Label as="span" className="sr-only">
                                                                {color.value}
                                                            </RadioGroup.Label>
                                                            <span aria-hidden="true">{color.value}</span>
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>

                                        </div> : null}

                                </div>

                                {/* Sizes */}
                                <div className="mt-10">

                                    {detaiProduct?.data.variant.size ?
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium text-gray-900">Kích thước</h3>
                                                <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                    Bảng kích thước
                                                </div>
                                            </div>

                                            <RadioGroup value={selectedSize} onChange={(size) => selectS(size)} className="mt-4">
                                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                    {modifiedData.map((size) => (
                                                        <RadioGroup.Option
                                                            key={size.value}
                                                            value={size}
                                                            disabled={!size.inStock}
                                                            className={({ checked }) => {
                                                                return classNames(
                                                                    size.inStock
                                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                    'relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 sm:flex-1 sm:py-6',
                                                                    checked ? 'ring-2 ring-indigo-500' : 'ring-2 ring-transparent'
                                                                );
                                                            }}
                                                        >
                                                            {({ checked }) => (
                                                                <>
                                                                    <RadioGroup.Label as="span">{size.value}</RadioGroup.Label>
                                                                    {size.inStock ? (
                                                                        <span
                                                                            className={classNames(
                                                                                'pointer-events-none absolute -inset-px rounded-md',
                                                                                checked ? 'border-2 border-indigo-500' : 'border-2 border-transparent'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                        >
                                                                            <svg
                                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                viewBox="0 0 100 100"
                                                                                preserveAspectRatio="none"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        : null}

                                </div>
                                <div className='m-10'>
                                    Số Lượng : 10
                                </div>
                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </form>
                        </div>
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Mô tả</h3>

                                <div className="space-y-6">
                                    <div className="space-y-6" dangerouslySetInnerHTML={{ __html: detaiProduct?.data.product[0]?.description }}></div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-base font-medium text-gray-900">Chất liệu</h3>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                </div>
            </div >
        </div >
    )
}