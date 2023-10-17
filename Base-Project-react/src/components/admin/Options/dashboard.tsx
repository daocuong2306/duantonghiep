import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useGetOptionsQuery, useRemoveOptionMutation } from '@/api/option';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}



const DashboardOptions: React.FC = () => {
    const { data: options, isLoading, error } = useGetOptionsQuery();
    console.log(options);
    const [deleteOptions] = useRemoveOptionMutation();
    const data: DataType[] = options?.options;
    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Chức năng',
            dataIndex: '',
            key: 'id',
            render: (key) => {
                return <div>
                    <Button danger onClick={() => dele(key.id)}>Xóa</Button>
                </div>
            },
        },
    ];
    const dele = (id: string) => {
        const check = window.confirm("bạn có muốn xóa");
        if (check) {
            deleteOptions(id)
        }
    }
    return (
        <>
            <Space>
                <Link to="add">  <Button primary>Thêm Options</Button></Link>
                <Link to='OptionsValue/add'> <Button primary>Thêm giá trị</Button></Link>
            </Space>
            <Table
                columns={columns}
                dataSource={data}
            />
        </>

    )
};

export default DashboardOptions;