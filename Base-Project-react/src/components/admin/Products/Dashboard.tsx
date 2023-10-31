import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Image } from 'antd';
import Update from './Update';
const Dashboard = () => {
    const [find, setFind] = useState({})
    const { data: products } = useGetProductsQuery(find);
    const [deleteProduct] = useRemoveProductMutation()
    const deleteP = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteProduct(id);
            alert("da xoa")
        }
    }
    

    const columns: TableColumnsType<any> = [
        {
            title: 'Tên', dataIndex: 'name', key: 'id', render: (dataIndex, key) => {
                console.log(key);
                return <Link to={`/admin/Variant/list/${key.id}`}>{dataIndex}</Link>
            }
        },
        {
            title: 'Ảnh', dataIndex: 'image', key: 'image', render: (dataIndex) => {
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
    const newData = products?.product.map(item => ({
        ...item,
        key: item.id
    }));
    const data: any[] = newData;
    return (
        <div>
            <Space>
                <Link to='/admin/product/add'> <Button primary>Thêm Sản Phẩm</Button></Link>
            </Space>
            <Table
                columns={columns}
                // expandable={{ expandedRowRender }}
                dataSource={data}
            />
        </div >
    )
}

export default Dashboard