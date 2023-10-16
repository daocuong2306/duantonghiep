import { useBanUserMutation, useListUserQuery, useUnBanUserMutation } from '@/api/user';
import { Space, Switch, Table, Image, Button } from 'antd';
import { blue } from '@ant-design/colors';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { render } from 'react-dom';

interface DataType {
    key: React.ReactNode;
    name: string;
    age: number;
    address: string;
    children?: DataType[];
}



//unbanuser


// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log("haha", record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

const DashboardUser: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '10%',
            render: (image) => <Image height={90} width={100} src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp' />,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
            width: '12%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '20%',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'address',
            width: '15%',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
            key: 'email',
        },
        {
            title: 'Quền',
            dataIndex: 'role',
            width: '5%',
            key: 'role',
        },
        {
            title: 'Chức năng',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (dataIndex, record) => {
                return (
                    dataIndex == 0 ? <Button danger onClick={() => banUser(dataIndex)}>
                        Khóa tài khoản
                    </Button> : <Button primary onClick={() => unbanUser(dataIndex)}>
                        Mở tài khoản
                    </Button>
                );
            },
        },
    ];
    const [banUser] = useBanUserMutation();
    const [unbanUser] = useUnBanUserMutation();
    const { data: user } = useListUserQuery()
    console.log(user);

    const [checkStrictly, setCheckStrictly] = useState(false);
    const data: DataType[] = user?.user;
    return (
        <>
            <Space align="center" style={{ marginBottom: 16 }}>
                CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
            </Space>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={data}
            />
        </>
    );
};

export default DashboardUser;