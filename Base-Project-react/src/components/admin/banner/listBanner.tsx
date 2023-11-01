import { useGetListBannerQuery, useRemoveBannerMutation } from "@/api/banner";
import { Button, Image, Space, Table, TableColumnsType } from "antd"
import { Link } from "react-router-dom"
const BannerDashboard = () => {
    const { data: banners, isLoading } = useGetListBannerQuery();
    console.log(banners);
    const [deleteBanner] = useRemoveBannerMutation()
    const deleteB = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteBanner(id);
            alert("da xoa")
        }
    }
    const columns: TableColumnsType<any> = [
        { title: 'Nội dung', dataIndex: 'content', key: 'content' },
        {
            title: 'Ảnh', dataIndex: 'image', key: 'name', render: (dataIndex) => {
                return <Image
                    width={100}
                    src={`${dataIndex}`}
                />
            }
        },
        {
            title: '', key: 'id', dataIndex: 'id', render: (dataIndex) => {
                return <>
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteB(dataIndex)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            }
        },
    ];
    const data: any[] = banners?.banner
    return (
        <div>
            <Space>
                <Link to='/admin/banner/add'> <Button primary>Thêm Ảnh</Button></Link>
            </Space>
            <Table
                columns={columns}
                // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
            />
        </div >
    )
}

export default BannerDashboard