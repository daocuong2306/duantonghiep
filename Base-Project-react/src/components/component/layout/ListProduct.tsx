import { useGetDataQuery } from "@/api/home"
import { useState } from "react";
import { Link } from "react-router-dom";
import img from "../img/infor.jpg"
export default function Example() {
    const { data } = useGetDataQuery()
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    // return (
    //     <div className="h-[80%]">
    //         <div>
    //             <h2 className="font-bold tracking-tight text-[#00ccff] text-center text-4xl pt-10">
    //                 Sản phẩm
    //             </h2>
    //         </div>
    //         <div className="container mx-auto lg:h-screen flex items-center justify-center">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //                 {data?.data.products.map((product) => (
    //                     // <div
    //                     //     key={product.id}
    //                     //     className="max-w-sm mx-auto relative cursor-pointer border border-gray-200 rounded-lg shadow"
    //                     //     onMouseEnter={() => {
    //                     //         setHoveredProductId(product.id);
    //                     //         setIsHovered(true);
    //                     //     }}
    //                     //     onMouseLeave={() => {
    //                     //         setHoveredProductId(null);
    //                     //         setIsHovered(false);
    //                     //     }}
    //                     // >
    //                     //     <img
    //                     //         src={`http://localhost:8000${product.image}`}
    //                     //         alt={`Img by Meriç Dağlı https://unsplash.com/@meric`}
    //                     //         className="w-[384px] h-[480px] object-cover rounded-lg"
    //                     //     />
    //                     //     <div
    //                     //         className={`absolute bottom-0 left-0 right-0 h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg opacity-0 transition-opacity duration-500 ${isHovered && hoveredProductId === product.id ? 'opacity-100' : ''
    //                     //             }`}
    //                     //     >
    //                     //         <h1 className="text-2xl font-semibold">
    //                     //             {product.name}
    //                     //         </h1>
    //                     //         <p className="mt-2">
    //                     //             <Link to="#" className="block text-center rounded bg-[#00ccff] px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto">Chi tiết</Link>
    //                     //         </p>
    //                     //     </div>
    //                     // </div>
    //                     <Link to="">
    //                         <div key={product.id}>
    //                             <div>
    //                                 <img
    //                                     className="rounded-lg w-full h-[350px]"
    //                                     src={`http://localhost:8000${product.image}`}

    //                                     alt="product image"
    //                                 />
    //                             </div>
    //                             <div className="px-5 pb-5">
    //                                 <p className='text-[18px] font-semibold'>{product.name}</p>

    //                                 <p className='text-[16px] text-red-500 font-bold'>{product.price} đ</p>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="container-fluid pt-5">
            <div className="flex flex-wrap px-5 pb-3">
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6">
                        <i className="fa fa-check text-[#00ccff] text-3xl mr-3"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">Sản phẩm chất lượng</h5>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6">
                        <i className="fa fa-shipping-fast text-[#00ccff] text-2xl mr-2"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">Miễn phí vận chuyển</h5>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6">
                        <i className="fas fa-exchange-alt text-[#00ccff] text-3xl mr-3"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">7 ngày đổi trả</h5>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 pb-1">
                    <div className="flex items-center border mb-4 p-6">
                        <i className="fa fa-phone-volume text-[#00ccff] text-3xl mr-3"></i>
                        <h5 className="font-semibold m-0 text-[#00ccff]">Tư vấn tận tâm</h5>
                    </div>
                </div>
            </div>
        </div>

    )
}
