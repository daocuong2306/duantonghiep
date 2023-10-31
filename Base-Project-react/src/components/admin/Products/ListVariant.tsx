import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Image } from 'antd';
import { useGetValueIdQuery } from '@/api/variant';
import { useParams } from 'react-router-dom';

const ListVariant = () => {
    let { id } = useParams();
    const { data: variants, isLoading } = useGetValueIdQuery(id)

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

    return (
        <div>
            {isEmpty ? (
                <p>Dữ liệu trống.</p>
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                />
            )}
        </div>
    )
}

export default ListVariant
