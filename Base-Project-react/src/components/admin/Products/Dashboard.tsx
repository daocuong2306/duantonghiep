import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Image } from 'antd';
import Update from './Update';
import { useGetValueIdQuery } from '@/api/variant';
const Dashboard = () => {
    const [find, setFind] = useState({})
    const [id, setId] = useState(null)
    const { data: products } = useGetProductsQuery(find);
    const [deleteProduct] = useRemoveProductMutation()
    const { data: variants, isLoading } = useGetValueIdQuery(id)
    const deleteP = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteProduct(id);
            alert("da xoa")
        }
    }

    const expandedRowRender = (e) => {
        setId(e.id)
        console.log(e);
        const columns: TableColumnsType<any> = [
            {
                title: 'Tên',
                dataIndex: 'option_value',
                key: 'name',
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
        ];
        const data: any[] = variants ? Object.values(variants.handleVariant) : [];
        console.log(data);

        return <Table columns={columns} dataSource={data} pagination={false} />
    };

    const columns: TableColumnsType<any> = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        {
            title: 'Ảnh', dataIndex: 'image', key: 'name', render: (dataIndex) => {
                return <Image
                    width={100}
                    src={`http://127.0.0.1:8000${dataIndex}`}
                />
            }
        },
        { title: 'Mã sản phẩm', dataIndex: 'code', key: 'code' },
        { title: 'Mô tả sản phẩm', dataIndex: 'description', key: 'description' },
        { title: 'Loại', dataIndex: 'category_name', key: 'category_name' },
        {
            title: '', key: 'id', dataIndex: 'id', render: (dataIndex) => {
                return <>
                    <Update id={dataIndex} />
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteP(dataIndex)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            }
        },
    ];
    const data: any[] = products?.product;
    return (
        <div>
            <Space>
                <Link to='/admin/product/add'> <Button primary>Thêm Sản Phẩm</Button></Link>
            </Space>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: [0], // Set the key of the row you want to be expanded by default
                }}
                dataSource={data}
            />
        </div >
    )
}

export default Dashboard