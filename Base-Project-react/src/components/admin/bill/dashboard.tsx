import { useGetBillQuery } from "@/api/adminBill";
import { Button, Image, Space, Spin, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";

const BillDashboard = () => {
    const data = [
        {
            "id": 2,
            "user_id": 3,
            "address": "hồ chí minh",
            "phone": "0987654321",
            "payments": "ON",
            "order_status": "Pending",
            "cart": [
                {
                    "id_product": 3,
                    "option_values": [
                        "đỏ",
                        "M"
                    ],
                    "name": "áo khoác",
                    "image": "/storage/images/jHl9ZfB5Rvqj4Pn2k5S9gT3.jpg",
                    "price": 2500,
                    "quantity": 1
                },
                {
                    "id_product": 4,
                    "option_values": [
                        "vàng",
                        "XL"
                    ],
                    "name": "giày thể thao",
                    "image": "/storage/images/gRyNpQ1kLmZz2tAsUvK0p9Yh.jpg",
                    "price": 1500,
                    "quantity": 4
                }
            ],
            "total_price": 8500
        },
        {
            "id": 5,
            "user_id": 2,
            "address": "đà nẵng",
            "phone": "0978123456",
            "payments": "OFF",
            "order_status": "Processing",
            "cart": [
                {
                    "id_product": 1,
                    "option_values": [
                        "xanh",
                        "S"
                    ],
                    "name": "áo polo",
                    "image": "/storage/images/PoL5oMhN2yVvRysZz2KYPMa3AT2K.jpg",
                    "price": 1200,
                    "quantity": 2
                },
                {
                    "id_product": 2,
                    "option_values": [
                        "đen",
                        "L"
                    ],
                    "name": "quần jeans",
                    "image": "/storage/images/JeAnS9WsZYhm00j8U0zlcVZqDxcGavBNPUZuR9QuaT6C3.jpg",
                    "price": 2800,
                    "quantity": 1
                }
            ],
            "total_price": 5200
        }
    ]

    // const { data } = useGetBillQuery()

    const columns: TableColumnsType<any> = [
        { title: 'Người đặt', dataIndex: 'user_id', key: 'user_id' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Đơn hàng', dataIndex: 'name', key: 'name' },
        { title: 'Tổng giá', dataIndex: 'total_price', key: 'total_price' },
        { title: 'Hình thức thanh toán', dataIndex: 'payments', key: 'payments' },
        { title: 'Trạng thái đơn hàng', dataIndex: 'name', key: 'name' },
        
    ];

    return (
        <div>
            {/* <Spin spinning={dataLoading} className="pl-[50%]">
                <Spin spinning={isLoading} className="pl-[50%]"> */}
            <Space>
                <Link to='/admin/categories/add'> <Button primary>Thêm Danh Mục</Button></Link>
            </Space>

            <Table
                columns={columns}
                dataSource={data}
            />
            {/* </Spin>
            </Spin> */}

        </div >
    )
}

export default BillDashboard