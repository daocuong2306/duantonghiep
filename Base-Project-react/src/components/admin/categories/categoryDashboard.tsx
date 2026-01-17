import { useGetCategoriesQuery, useRemoveCategoryMutation } from "@/api/category"
import { ICategory } from "@/interface/category"
import { Button, Image, Space, Spin, Table, TableColumnsType } from "antd"
import { FcFullTrash, FcSupport } from "react-icons/fc"
import { Link } from "react-router-dom"
import UpdateCategory from "./updateCategory"

const CategoryDashboard = () => {

    const { data: categories, isLoading: dataLoading } = useGetCategoriesQuery();
    const [deleteCate, { isLoading }] = useRemoveCategoryMutation()
    const deleteC = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteCate(id);
        }
    }
    const columns: TableColumnsType<any> = [
        { title: 'Tên', dataIndex: 'name', key: 'name' },
        {
            title: 'Ảnh', dataIndex: 'image', key: 'name', render: (dataIndex) => {
                return <Image
                    width={100}
                    src={`http://127.0.0.1:8000${dataIndex}`}
                />
            }
        },
        {
            title: '', key: 'id', dataIndex: 'id', render: (dataIndex) => {
                return <>
                    <UpdateCategory id={dataIndex} />
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteC(dataIndex)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            }
        },
    ];
    const data: any[] = categories?.categories;
    return (
        <div>
            <Spin spinning={dataLoading} className="pl-[50%]">
                <Spin spinning={isLoading} className="pl-[50%]">
                    <Space>
                        <Link to='/admin/categories/add'> <Button primary>Thêm Danh Mục</Button></Link>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </Spin>
            </Spin>

        </div >
    )
}

export default CategoryDashboard