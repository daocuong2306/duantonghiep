import { useGetListBannerQuery, useRemoveBannerMutation } from "@/api/banner";
import { Button, Image, Space, Spin, Table, TableColumnsType } from "antd"
import { Link } from "react-router-dom"
const BannerDashboard = () => {
    const { data: banners, isLoading } = useGetListBannerQuery();
    console.log(banners);
    const [deleteBanner, { isLoading: deleteLoading }] = useRemoveBannerMutation()
    const deleteB = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteBanner(id);

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
            <Spin spinning={deleteLoading} className="pl-[50%]">
                <Spin spinning={isLoading} className="pl-[50%]">
                    <Space>
                        <Link to='/admin/banner/add'> <Button primary>Thêm Ảnh</Button></Link>
                    </Space>
                    <Table
                        columns={columns}
                        // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                        dataSource={data}
                    />
                </Spin>
            </Spin>

        </div >
    )
}

export default BannerDashboard