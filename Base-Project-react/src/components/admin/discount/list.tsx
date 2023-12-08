import { useRemoveCategoryMutation } from "@/api/category"
import { useGetDiscountQuery } from "@/api/discount"
import { Button, Space, Spin, Table, TableColumnsType } from "antd"
import { Link } from "react-router-dom"

const DiscountDashboard = () => {
    const { data: dataDiscount }: { data: any } = useGetDiscountQuery() as { data: any }
    const [deleteCate] = useRemoveCategoryMutation()
    const deleteC = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteCate(id);
        }
    }
    console.log(dataDiscount);

    const columns: TableColumnsType<any> = [
        { title: 'Số hiệu mã', dataIndex: 'discount_code', key: 'discount_code' },
        {
            title: 'Giảm giá', dataIndex: 'amount', key: 'amount',
        },
        {
            title: 'Thời gian hết hạn', dataIndex: 'expiry_date', key: 'expiry_date',
        },
        {
            title: '', key: 'id', dataIndex: 'id', render: (dataIndex) => {
                return <>
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteC(dataIndex)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            }
        },
    ];
    const data: any[] = dataDiscount?.valid_discounts;
    return (
        <div>
            <Spin spinning={false} className="pl-[50%]">
                <Space>
                    <Link to='/admin/addDiscount'> <Button >Thêm mã giảm giá</Button></Link>
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                />
            </Spin>

        </div >
    )
}

export default DiscountDashboard