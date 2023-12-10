import { useGetListBannerQuery, useRemoveBannerMutation } from "@/api/banner";
import { Button, Image, Space, Spin, Table, TableColumnsType, notification } from "antd"
import { Link } from "react-router-dom"


const BannerDashboard = () => {
    const { data: banners, isLoading }: { data?: any; isLoading: boolean } = useGetListBannerQuery();

    const [deleteBanner, { data: dataR, isLoading: deleteLoading }] = useRemoveBannerMutation()
    const deleteB = (id: number) => {
        const check = window.confirm("Bạn có muốn xóa ảnh này không ?");
        if (check) {
            deleteBanner(id);
        }
    }
    console.log(dataR);
    const dataD: any = dataR

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    if (dataD?.message == "Delete Successfull") {
        openNotification("xóa sản phẩm thành công")
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
    const data: any[] = banners?.banner;

    return (
        <div>
            <Spin spinning={deleteLoading} className="pl-[50%]">
                <Spin spinning={isLoading} className="pl-[50%]">
                    {contextHolder}
                    <Space>
                        <Link to='/admin/banner/add'> <Button >Thêm Ảnh</Button></Link>
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