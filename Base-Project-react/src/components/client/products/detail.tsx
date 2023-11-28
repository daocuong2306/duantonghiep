import { useEffect, useMemo, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useGetDetailQuery } from '@/api/detail'
import { useParams } from 'react-router-dom'
import { useAddCartMutation } from '@/api/cart'
import { useForm } from "react-hook-form";
import Comment from '../comment/comment'
import Showcomt from '../comment/showcomt'
import { Button, notification, Alert, Spin, Switch } from 'antd';

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
    const [loading, setLoading] = useState(false);
    //Thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (m, d) => {
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
    const newArray = useMemo(() => {
        return [selectedSize, selectedColor].filter(Boolean).map((item: any) => item.option_value_id);
    }, [selectedSize, selectedColor]);
    const prodcuts = {
        id, selectP: newArray
    }
    const { data: detaiProduct, isLoading } = useGetDetailQuery(prodcuts);


    const jsonArray = detaiProduct?.data.variant
        ? Object.entries(detaiProduct.data.variant).map(([key, value]) => ({ key, value }))
        : [];

    const newData = jsonArray.map(item => ({
        ...item,
        value: item.value.map(option => ({ ...option, inStock: true })),
    }));
    console.log(newData);

    const onHandleSubmit = (dataUser: any) => {
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
    const dataCmt = {
        cmt: detaiProduct?.data.comment,
        total: detaiProduct?.data.total_comment
    }
    useEffect(() => {
        if (add) {
            openNotification('Thêm sản phẩm vào giỏ hàng thành công', 'Bạn đã thêm sản phẩm vào giỏ hàng thành công');
            setLoading(false); // This will not trigger a re-render immediately
        }
    }, [add]);
    return (
        <Spin spinning={loading}>
            <div className="bg-white">
                {contextHolder}
                <div className="pt-6">
                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={`http://127.0.0.1:8000${detaiProduct?.data.product[0]?.image}`}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className=" pl-[2%] aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <div className="pt-[5%] lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{detaiProduct?.data.product[0]?.name}</h1>
                            </div>
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{detaiProduct?.data.priceSku == null ? detaiProduct?.data.product[0]?.price : detaiProduct?.data.priceSku[0]?.sku_price}</p>

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
                                                        {data.value.map((size) => (
                                                            <RadioGroup.Option
                                                                key={size.option_value_id}
                                                                value={size}
                                                                disabled={!size.inStock}
                                                                className={({ checked }) => {
                                                                    return classNames(
                                                                        `variant${size.value}${size.option_value_id} cursor-pointer text-gray-900 shadow-sm relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-red-500 focus:bg-[#00CCFF] sm:flex-1 sm:py-6 transition-colors ease-in-out duration-300`,
                                                                        checked ? 'bg-yellow-500' : 'ring-2 ring-transparent'
                                                                    );
                                                                }}
                                                                onClick={() => {
                                                                    if (index === 1) {
                                                                        selectC(size);
                                                                    } else {
                                                                        selectS(size);
                                                                    }
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

                <Comment />
                <Showcomt data={dataCmt} />
            </div >
        </Spin>
    )
}