import { Link } from "react-router-dom"

const MenuBar = () => {
    const token = localStorage.getItem("header")
    const role = localStorage.getItem("role")
    const logout = () => {
        localStorage.removeItem("header")
        localStorage.removeItem("role")

    }
    return (
        token && role ?
            <div className="grid grid-cols-2 px-[5%]">
                <div className="flex gap-[2%]">
                    <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Trang chủ</Link></div>
                    <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Sản phẩm</Link></div>
                    <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Thông tin</Link></div>
                </div>
                <div className="flex gap-[2%] justify-end">
                    <div className="py-[2%]"><Link to="/account" className="text-[#40D6FF]">Tài khoản</Link></div>
                    <button className="py-[2%]" onClick={() => logout()}><Link to="/login" className="text-[#40D6FF]">Đăng xuất</Link></button>
                </div>
            </div>
            :
            <div className="grid grid-cols-2 px-[5%]">
                <div className="flex gap-[2%]">
                    <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Trang chủ</Link></div>
                    <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Sản phẩm</Link></div>
                    <div className="py-[2%]"><Link to="" className="text-[#40D6FF]">Thông tin</Link></div>
                </div>
                <div className="flex gap-[2%] justify-end">
                    <div className="py-[2%]"><Link to="/login" className="text-[#40D6FF]">Đăng nhập</Link></div>
                    <div className="py-[2%]"><Link to="/signup" className="text-[#40D6FF]">Đăng ký</Link></div>
                </div>
            </div>
    )
}

export default MenuBar