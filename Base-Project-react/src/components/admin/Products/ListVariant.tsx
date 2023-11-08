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
        { title: 'Số Lượng', dataIndex: 'stock', key: 'stock' },
        { title: 'Mã', dataIndex: 'sku_id', key: 'sku_id' }
    ];

    const handleVariant = variants?.handleVariant || {}; // Đảm bảo handleVariant tồn tại hoặc là một đối tượng trống
    const data = Object.values(handleVariant);

    const [isEmpty, setIsEmpty] = useState(true); // State để kiểm tra dữ liệu có rỗng hay không
    useEffect(() => {
        setIsEmpty(false);
    }, [data]);
    return (
        <div>
            {isEmpty ? (
                <p>Dữ liệu trống.</p>
            ) : (
                <div> <div className="p-4  flex items-center justify-between">
                    <div className="product-image-container flex items-center">
                        <div className="product-image-thumbnail rounded-full overflow-hidden">
                            <img
                                className="w-20 h-20"
                                src={`http://127.0.0.1:8000${product?.product.image}`}
                                alt=""
                            />
                        </div>
                        <div className="product-details ml-4">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                                {product?.product.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-2">
                                Giá: {product?.product.code}
                            </p>
                        </div>
                    </div>
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">Xóa</button>
                </div>
                    <div className="mt-8">
                        <div className="border border-gray-200 p-4 rounded-lg shadow-lg">
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </div></div>




            )}
        </div>
    )
}

export default ListVariant