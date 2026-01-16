import React from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Spin } from 'antd';
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
    const { data: options, isLoading } = useGetOptionsQuery();
    const [removeOption, { isLoading: deleteLoading }] = useRemoveOptionMutation()
    const deleteO = (id: number) => {
        removeOption(id)
    }
    const expandedRowRender = (e) => {
        console.log(e);
        const columns: TableColumnsType<any> = [
            { title: 'Tên', dataIndex: 'name', key: 'name' },
            {
                title: 'Hành động', key: 'operation', dataIndex: 'optionId', render: (optionId) => {
                    return <>
                        <Space wrap>
                            <Button type="primary" danger onClick={() => deleteO(optionId)}>
                                Xóa
                            </Button>
                        </Space>
                    </>
                },
            }
        ];
        return <Table columns={columns} dataSource={e.value} pagination={false} />;
    };
    const columns: TableColumnsType<DataType> = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        {
            title: 'Hành động', key: 'operation', dataIndex: 'optionId', render: (optionId) => {
                return <>
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteO(optionId)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            },
        }
    ];
    const newData = options?.options.map(item => ({
        ...item,
        key: item.optionId
    }));
    const data: DataType[] = newData;
    console.log(options?.options);
    return (
        <>
            <Spin spinning={isLoading} className="pl-[50%]">
                <Spin spinning={deleteLoading} className="pl-[50%]">
                    <Space>
                        <Link to="add">  <Button primary>Thêm mục phụ</Button></Link>
                        <Link to='OptionsValue/add'> <Button primary>Thêm giá trị</Button></Link>
                    </Space>
                    <Table
                        columns={columns}
                        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                        dataSource={data}
                    />
                </Spin>
            </Spin>
        </>
    );
};

export default DashboardOptions;
