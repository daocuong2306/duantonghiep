import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Image, Spin, Select, Input } from 'antd';
import Update from './Update';
import Search from 'antd/es/input/Search';
import { useGetCategoriesQuery } from '@/api/category';

const Dashboard = () => {
    const [find, setFind] = useState({});
    const { data: products } = useGetProductsQuery(find);
    const [deleteProduct, { data: dele, isLoading }] = useRemoveProductMutation();
    const { data: cateData } = useGetCategoriesQuery()
    const [loading, setLoading] = useState(false)
    const deleteP = (id: number) => {
        const check = window.confirm('Are you sure you want to delete?');
        if (check) {
            deleteProduct(id);
        }
    };
    const columns: TableColumnsType<any> = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'id',
            render: (dataIndex, key) => (
                <Link to={`/admin/Variant/list/${key.id}`}>{dataIndex}</Link>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (dataIndex) => (
                <Image width={100} src={`http://127.0.0.1:8000${dataIndex}`} />
            ),
        },
        { title: 'Mã sản phẩm', dataIndex: 'code', key: 'code' },
        {
            title: 'Mô tả sản phẩm', dataIndex: 'description', key: 'description',
            render: (dataIndex) => {
                return <div dangerouslySetInnerHTML={{ __html: dataIndex }} />;
            },
        },
        { title: 'Loại', dataIndex: 'category_name', key: 'category_name' },
        {
            title: '',
            key: 'id',
            dataIndex: 'id',
            render: (dataIndex) => (
                <>
                    <Update id={dataIndex} />
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteP(dataIndex)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            ),
        },
    ];

    const newData = products?.product.map((item) => ({
        ...item,
        key: item.id,
    }));
    const data: any[] = newData;
    //selech 
    console.log(cateData);
    const optionsA = cateData?.categories.map(item => ({
        label: item.name,
        value: item.id
    })) || [];

    const options: SelectProps['options'] = optionsA;

    const [dataKey, setDataKey] = useState(null)
    const [dataCate, setDataCate] = useState(null)
    const handleChange = (value: string[]) => {
        setDataCate(value)
        console.log(`selected ${value}`);
    };
    useEffect(() => {
        setLoading(false);
    }, [products]);
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setDataKey(value)
        setFind({
            id: dataCate,
            keyword: dataKey
        })
        console.log(info?.source, value);
        setLoading(true);
    }

    return (
        <div>
            <Spin spinning={loading}>
                <div className='d-flex justify-content-between w-full px-10 py-2'>
                    <Link to="/admin/product/add">
                        <Button primary>Thêm Sản Phẩm</Button>
                    </Link>
                    <div className='d-flex align-items-center justify-content-between mb-4'>
                        <Select
                            style={{ width: '300px', height: '40px' }}
                            placeholder="Lựa chọn danh mục"
                            onChange={handleChange}
                            options={options}
                        />
                        <Search
                            placeholder="Tìm kiếm sản phẩm"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                            style={{ width: '300px', height: '40px', marginLeft: '16px' }}
                        />
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </Spin>
        </div>
    );
};

export default Dashboard;
