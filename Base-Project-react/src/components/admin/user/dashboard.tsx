import { useBanUserMutation, useListUserQuery, useUnBanUserMutation } from '@/api/user';
import { Table, Image, Button, notification, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
    key: React.ReactNode;
    name: string;
    age: number;
    address: string;
    children?: DataType[];
}



//unbanuser




const DashboardUser: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '10%',
            render: () => <Image height={90} width={100} src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp' />,
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
            width: '5%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '15%',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'address',
            width: '10%',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            key: 'email',
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            width: '10%',
            key: 'role',
            render: (dataIndex: number) => {
                return dataIndex == 0 ? <p>Admin</p> : <p>Người dùng</p>
            }
        },
        {
            title: 'Chức năng',
            dataIndex: 'status',
            key: 'id',
            width: '10%',
            render: (dataIndex: any, key: any) => {
                return (
                    key.id == 1 ? <></> :
                        dataIndex == 0 ? <Button danger onClick={() => handBanUser(key.id)}>
                            Hạn chế tài khoản
                        </Button> : <Button onClick={() => handUnBanUser(key.id)}>
                            Bỏ hạn chế tài khoản
                        </Button>
                );
            },
        },
    ];


    const { data: user, isLoading } = useListUserQuery()
    console.log(user);
    ///Notification
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (text: string) => {
        api.open({
            message: text
        });
    };
    //banUser 
    const [banUser, { error: banError }] = useBanUserMutation();
    const handBanUser = (id: any) => {
        const check = window.confirm("Bạn có muốn khóa tài khoản không ?");
        if (check) {
            banUser(id)
            if (!banError) {
                openNotification("Khóa tài khoản thành công")
            } else {
                openNotification("Khóa tài khoản thất bại")
            }
        }
    }
    //unBanUser 
    const [unbanUser, { error: unBanError }] = useUnBanUserMutation();
    const handUnBanUser = (id: any) => {
        const check = window.confirm("Bạn có muốn mở khóa tài khoản không ?");
        if (check) {
            unbanUser(id)
            if (!unBanError) {
                openNotification("Mở tài khoản thành công")
            } else {
                openNotification("Mở tài khoản thất bại")
            }
        }
    }
    const data: DataType[] = user?.user;
    return (
        <>
            <Spin spinning={isLoading}>
                {contextHolder}
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </Spin>
        </>
    );
};

export default DashboardUser;