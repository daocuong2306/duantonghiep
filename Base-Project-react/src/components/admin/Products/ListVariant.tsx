import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Image } from 'antd';
import { useGetValueIdQuery } from '@/api/variant';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/api/product';

const ListVariant = () => {
    let { id } = useParams();
    const { data: variants, isLoading } = useGetValueIdQuery(id)
    const { data: product } = useGetProductByIdQuery(id)
    const columns: TableColumnsType<any> = [
        {
            title: 'Tên',
            dataIndex: 'option_value',
            key: 'option_value',
            render: (dataIndex) => {
                if (Array.isArray(dataIndex)) {
                    return dataIndex.join('- ');
                } else {
                    return dataIndex;
                }
            }
        },
        { title: 'Giá', dataIndex: 'skus_price', key: 'price' },
        { title: 'Số Lượng', dataIndex: 'stock', key: 'stock' }
    ];

    const handleVariant = variants?.handleVariant || {}; // Đảm bảo handleVariant tồn tại hoặc là một đối tượng trống
    const data = Object.values(handleVariant);

    const [isEmpty, setIsEmpty] = useState(false); // State để kiểm tra dữ liệu có rỗng hay không
    useEffect(() => {
        setIsEmpty(data.length === 0);
    }, [data]);
    console.log(product);

    return (
        <div>
            {isEmpty ? (
                <p>Dữ liệu trống.</p>
            ) : (
                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-2">
                        <div className="flex rounded-sm border border-stroke bg-white shadow-default product-card">
                            <div className="w-1/2">
                                <div className="overflow-hidden relative product-image">
                                    <img className="w-30 h-auto transition duration-700 ease-in-out group-hover:opacity-60" src={`http://127.0.0.1:8000${product?.product.image}`} alt="image" />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="px-4 py-3 bg-white">
                                    <h1 className="text-2xl font-semibold text-gray-800 hover:text-red-500 transition duration-300 ease-in-out">
                                        {product?.product.name}
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Loại: {product?.product.category_name}
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        Mã sản phẩm: {product?.product.code}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <Table
                                columns={columns}
                                dataSource={data}
                            />
                        </div>
                    </div>
                </div>




            )}
        </div>
    )
}

export default ListVariant
