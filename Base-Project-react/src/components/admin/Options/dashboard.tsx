import React from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useGetOptionsQuery } from '@/api/option';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

const DashboardOptions: React.FC = () => {
    const { data: options } = useGetOptionsQuery();
    const expandedRowRender = (e) => {
        console.log(e);
        const columns: TableColumnsType<any> = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
        ];
        return <Table columns={columns} dataSource={e.value} pagination={false} />;
    };
    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Action', key: 'operation', render: () => <a>Xóa</a> },
    ];
    const newData = options?.options.map(item => ({
        ...item,
        key: item.optionId
    }));
    const data: DataType[] = newData;
    console.log(options?.options);
    return (
        <>
            <Space>
                <Link to="add">  <Button primary>Thêm giá trị</Button></Link>
                <Link to='OptionsValue/add'> <Button primary>Thêm giá trị</Button></Link>
            </Space>
            <Table
                columns={columns}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
            />
        </>
    );
};

export default DashboardOptions;
