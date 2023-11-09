import { useGetCategoriesQuery, useRemoveCategoryMutation } from "@/api/category"
import { ICategory } from "@/interface/category"
import { Button, Image, Space, Table, TableColumnsType } from "antd"
import { FcFullTrash, FcSupport } from "react-icons/fc"
import { Link } from "react-router-dom"
import UpdateCategory from "./updateCategory"

const CategoryDashboard = () => {
  
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [deleteProduct] = useRemoveCategoryMutation()
    const deleteP = (id: number) => {
        const check = window.confirm("Bạn có chắc chắn muốn xóa");
        if (check) {
            deleteProduct(id);
            alert("Đã xóa")
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
                        <Button type="primary" danger onClick={() => deleteP(dataIndex)}>
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
            <Space>
                <Link to='/admin/categories/add'> <Button primary>Thêm Sản Phẩm</Button></Link>
            </Space>
            <Table
                columns={columns}
                // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
            />
        </div >
    )
}

export default CategoryDashboard