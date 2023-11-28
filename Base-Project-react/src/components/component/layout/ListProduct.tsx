import { useGetDataQuery } from "@/api/home"
import { useState } from "react";
import { Link } from "react-router-dom";
import img from "../img/infor.jpg"
export default function Example() {
    const { data } = useGetDataQuery()
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="container-fluid pt-5">
            <div className="flex flex-wrap px-5 pb-3">
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6 h-[100%]">
                        <i className="fa fa-check text-[#00ccff] text-3xl mr-3"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">Sản phẩm chất lượng</h5>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6 h-[100%]">
                        <i className="fa fa-shipping-fast text-[#00ccff] text-2xl mr-2"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">Miễn phí vận chuyển</h5>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6 h-[100%]">
                        <i className="fas fa-exchange-alt text-[#00ccff] text-3xl mr-3"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">7 ngày đổi trả</h5>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6 h-[100%]">
                        <i className="fa fa-phone-volume text-[#00ccff] text-3xl mr-3"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">Tư vấn tận tâm</h5>
                    </div>
                </div>
            </div>
        </div>

    )
}
