import { Link } from "react-router-dom"

const MenuBar = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="flex gap-[2%]">
                <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Trang chủ</Link></div>
                <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Sản phẩm</Link></div>
                <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Thông tin</Link></div>
            </div>
            <div className="flex gap-[2%] justify-end">
                <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Đăng nhập</Link></div>
                <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Đăng ký</Link></div>
            </div>
        </div>
    )
}

export default MenuBar