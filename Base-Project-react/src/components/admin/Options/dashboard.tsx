import React, { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Spin, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useGetOptionsQuery, useRemoveOptionMutation, useRemoveValueMutation } from '@/api/option';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

const DashboardOptions: React.FC = () => {
    const { data: options, isLoading }: { data: any, isLoading: any } = useGetOptionsQuery() as { data: any, isLoading: any };
    const [removeOption, { data: dataRO }] = useRemoveOptionMutation()
    const [removeValue, { data: dataRV }] = useRemoveValueMutation()
    const [loading, setLoading] = useState(false)
    const deleteO = (id: number) => {
        const checkD = window.confirm("bạn có muốn xóa thuộc tình này ? ")
        if (checkD) {
            removeOption(id)
            setLoading(true)
        }
    }
    const deleteV = (id: number) => {
        const checkD = window.confirm("bạn có muốn xóa thuộc tình này ? ")
        if (checkD) {
            removeValue(id)
            setLoading(true)
        }
    }

    console.log(dataRO, dataRV);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    const Odata: any = dataRO
    const Vdata: any = dataRV
    useEffect(() => {
        if (Odata?.message == "Delete Successfull") {
            openNotification("Bạn đã xóa thuộc tính thành công")
            setLoading(false)
        }
        if (Vdata?.message == "Delete Successfull") {
            openNotification("Bạn đã xóa giá trị thành công")
            setLoading(false)
        }
    }, [dataRO, dataRV]);
    const expandedRowRender = (e: any) => {
        console.log(e);
        const columns: TableColumnsType<any> = [
            { title: 'Tên', dataIndex: 'name', key: 'name' },
            {
                title: 'Hành động',
                key: 'operation',
                dataIndex: 'id',
                render: (dataIndex) => {
                    return <>
                        <Space wrap>
                            <Button type="primary" danger onClick={() => deleteV(dataIndex)}>
                                Xóa giá trị
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
                            Xóa thuộc tính
                        </Button>
                    </Space>
                </>
            },
        }
    ];
    const newData = options?.options.map((item: any) => ({
        ...item,
        key: item.optionId
    }));
    const data: DataType[] = newData;
    console.log(options?.options);
    return (
        <>
            <Spin spinning={isLoading} className="pl-[50%]">
                <Spin spinning={loading} className="pl-[50%]">
                    {contextHolder}
                    <Space>
                        <Link to="add">  <Button >Thêm thuộc tính</Button></Link>
                        <Link to='OptionsValue/add'> <Button >Thêm giá trị thuộc tính</Button></Link>
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
