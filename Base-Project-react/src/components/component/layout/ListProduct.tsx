import { useGetDataQuery } from "@/api/home"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Example() {
    const { data } = useGetDataQuery()
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="h-[80%]">
            <div>
                <h2 className="font-bold tracking-tight text-[#00ccff] text-center text-4xl pt-10">
                    Sản phẩm
                </h2>
            </div>
            <div className="container mx-auto lg:h-screen flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.data.products.map((product) => (
                        <div
                            key={product.id}
                            className="max-w-sm mx-auto relative cursor-pointer border border-gray-200 rounded-lg shadow"
                            onMouseEnter={() => {
                                setHoveredProductId(product.id);
                                setIsHovered(true);
                            }}
                            onMouseLeave={() => {
                                setHoveredProductId(null);
                                setIsHovered(false);
                            }}
                        >
                            <img
                                src={`http://localhost:8000${product.image}`}
                                alt={`Img by Meriç Dağlı https://unsplash.com/@meric`}
                                className="w-[384px] h-[480px] object-cover rounded-lg"
                            />
                            <div
                                className={`absolute bottom-0 left-0 right-0 h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg opacity-0 transition-opacity duration-500 ${isHovered && hoveredProductId === product.id ? 'opacity-100' : ''
                                    }`}
                            >
                                <h1 className="text-2xl font-semibold">
                                    {product.name}
                                </h1>
                                <p className="mt-2">
                                    <Link to="#" className="block text-center rounded bg-[#00ccff] px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto">Chi tiết</Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
