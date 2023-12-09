import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useGetDetailQuery } from '@/api/detail'
import { useParams } from 'react-router-dom'
import { useAddCartMutation } from '@/api/cart'
import { useForm } from "react-hook-form";
import Comment from '../comment/comment'
import { notification, Spin } from 'antd';

const reviews = { href: '#', average: 4, totalCount: 117 }
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function DetailProduct() {
    const { id } = useParams()
    const { handleSubmit } = useForm();
    const [addCart, { data: add }] = useAddCartMutation();
    const [selectedColor, setSelectedColor] = useState(1);
    const [selectedSize, setSelectedSize] = useState(2);
    const [loading, setLoading] = useState(false);
    //Thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (m: any, d: any) => {
        api.open({
            message: m,
            description: d
        });
    };
    const selectC = (color: any) => {
        setSelectedColor(color);
    };
    const selectS = (size: any) => {
        setSelectedSize(size);
    };
    const prodcuts = {
        id, selectP: [selectedSize, selectedColor]
    }
    const { data: detaiProduct } = useGetDetailQuery(prodcuts);
    console.log(detaiProduct);

    const jsonArray = detaiProduct?.data.variant
        ? Object.entries(detaiProduct.data.variant).map(([key, value]) => ({ key, value }))
        : [];
    const newData = jsonArray.map((item: any) => ({
        ...item,
        value: item.value.map((option: any) => ({ ...option, inStock: true })),
    }));
    console.log(newData);

    const onHandleSubmit = () => {
        if (detaiProduct?.data.priceSku == null) {
            openNotification("vui lòng chọn kích cỡ và size", 'Bạn chưa chọn kích cỡ và size')
        } else if (detaiProduct?.data.priceSku[0]?.sku_stoke == 0) {
            openNotification("Kích cỡ và size của bạn chọn đã hết hàng", 'Vui lòng chọn khiểu dáng khác')
        }
        else {
            addCart({
                "product_id": id,
                "quantity": 1,
                "sku_id": detaiProduct?.data.priceSku[0].sku_id
            });
            setLoading(true)
        }
    }
    console.log("aa", detaiProduct);


    console.log(add);

    useEffect(() => {
        if (add) {
            if (add?.message == "Bạn Phải Đăng nhập") {
                openNotification('Bạn chưa đăng nhập', 'bạn phải đăng nhập để sử dụng chức năng này');
                setLoading(false); // This will not trigger a re-render immediately
            } else {
                openNotification('Thêm sản phẩm vào giỏ hàng thành công', 'Bạn đã thêm sản phẩm vào giỏ hàng thành công');
                setLoading(false); // This will not trigger a re-render immediately
            }
        }
    }, [add]);
    const priceValue = detaiProduct?.data.priceSku == null
        ? detaiProduct?.data.product?.[0]?.price
        : detaiProduct?.data.priceSku?.[0]?.sku_price;

    const formattedPrice = priceValue?.toLocaleString() || 'N/A';

    return (
        <Spin spinning={loading}>
            <div className="bg-white mt-[50px]">
                {contextHolder}
                <div className="pt-6">
                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={`https://briteshop.store${detaiProduct?.data.product[0]?.image}`}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className=" pl-[2%] aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <div className="pt-[5%] lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{detaiProduct?.data.product[0]?.name}</h1>
                            </div>
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{formattedPrice} đ</p>

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
                                    </div>
                                </div>

                                <form className="mt-10" onSubmit={handleSubmit(onHandleSubmit)}>
                                    {/* Colors */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Danh mục</h3>
                                        <p className='text-sm font-base text-gray-500 pb-[5%] pt-[1%]'>{detaiProduct?.data.product[0]?.category_name}</p>
                                    </div>
                                    <div>
                                        {newData?.map((data, index) => (
                                            <div key={data.key} className='mb-10'>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium uppercase text-gray-900">{data.key}</h3>
                                                </div>
                                                <RadioGroup
                                                    value={index === 1 ? selectedColor : selectedSize}
                                                    onChange={index === 1 ? selectC : selectS}
                                                    className="mt-4"
                                                >
                                                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                        {data.value.map((size: any) => (
                                                            size.inStock ? (
                                                                <RadioGroup.Option
                                                                    key={size}
                                                                    value={size.option_value_id}
                                                                    disabled={!size.inStock}
                                                                    className='cursor-pointer text-gray-900 shadow-sm relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase sm:flex-1 sm:py-6 transition-colors ease-in-out duration-300'
                                                                    onClick={() => {
                                                                        // Handle the click event and update the state or perform any other actions
                                                                        // You can use the onClick handler to update the selectedColor or selectedSize state
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
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </RadioGroup.Option>
                                                            ) : (
                                                                <div
                                                                    key={size.option_value_id}
                                                                    className="cursor-not-allowed bg-gray-50 text-gray-200 relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 sm:flex-1 sm:py-6"
                                                                >
                                                                    <RadioGroup.Label as="span" className="line-through">{size.value}</RadioGroup.Label>
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
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                </RadioGroup>

                                            </div>
                                        ))}
                                    </div>
                                    {/* Sizes */}
                                    <div className="mt-10">
                                    </div>
                                    <div className='m-10'>
                                        Số Lượng : {detaiProduct?.data.priceSku == null ? 0 : detaiProduct?.data.priceSku[0]?.sku_stoke}
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </form>
                            </div>

                        </div>

                    </div>

                    <div className="app container mx-auto p-4">
                        <div className="py-10 lg:col-span-2 lg:col-start-1  lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Mô tả</h3>

                                <div className="space-y-6">
                                    <div className="space-y-6" dangerouslySetInnerHTML={{ __html: detaiProduct?.data.product[0]?.description }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <Comment />
            </div >
        </Spin >
    )
}

