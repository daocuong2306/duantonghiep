import { useGetDataQuery } from '@/api/home';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../img/MUA_JEANS_EN_T_NG_UNDERWEAR-02_1_png.jpg"
import img1 from "../img/bst-new-arrivals-nam_jpg.jpg"
import img2 from "../img/upsell_t1123_4__jpg.jpg"
type Props = {};

const Product = (props: Props) => {
    const { data } = useGetDataQuery();
    console.log(data);

    const [showMore, setShowMore] = useState(false);

    // Display 3 products initially
    const initialProducts = data?.data.productNew.slice(0, 4);

    // return (
    //     <section className="mx-auto max-w-7xl px-2 sm:px-6 pt-10 pb-10">
    //         <div>
    //             <h2 className="font-bold tracking-tight text-[#00ccff] text-3xl pb-10">
    //                 Sản phẩm mới
    //             </h2>
    //         </div>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //             {showMore ? data?.data.productNew : initialProducts?.map((product) => (
    //                 <Link to="">
    //                     <div key={product.id}>
    //                         <div>
    //                             <img
    //                                 className="rounded-lg w-full h-[350px]"
    //                                 src={`http://localhost:8000${product.image}`}
    //                                 alt="product image"
    //                             />
    //                         </div>
    //                         <div className="px-5 pb-5">
    //                             <p className='text-[18px] font-semibold'>{product.name}</p>

    //                             <p className='text-[16px] text-red-500 font-bold'>{product.price} đ</p>
    //                         </div>
    //                     </div>
    //                 </Link>
    //             ))}
    //         </div>

    //         {!showMore && data?.data.productNew.length > 3 && (
    //             <div className="text-center mt-5">
    //                 <button
    //                     onClick={() => setShowMore(true)}
    //                     className="block rounded bg-[#00ccff] px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto"
    //                 >
    //                     Xem thêm
    //                 </button>
    //             </div>
    //         )}
    //     </section>
    // );

    return (
        <div className="container-fluid offer pt-5">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pb-4 p-[2%]">
                    <div className="relative bg-[#EDF1FF] text-center mb-2 py-5 px-5 flex">
                        <img src={img1} alt="" className='w-[160px] h-[224px]'/>
                        <div className="relative pl-[10%]">
                            <h5 className="text-[#D19C97] uppercase mb-3">Giảm giá 20% cho các sản phẩm Hạ - Thu</h5>
                            <h1 className="font-semibold text-4xl mb-4">Sản phẩm</h1>
                            <Link to="#" className="text-[#D19C97] py-2 px-3"><button className='px-[3%] py-[2%] border-[1px] border-[#D19C97] rounded-lg hover:text-black hover:bg-[#D19C97]'> Mua ngay</button></Link>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 pb-4 p-[2%]">
                    <div className="relative bg-[#EDF1FF] text-center mb-2 py-5 px-5 flex">
                        
                        <div className="relative pr-[10%]">
                            <h5 className="text-[#D19C97] uppercase mb-3">Giảm giá 20% cho các sản phẩm Thu - Đông</h5>
                            <h1 className="font-semibold text-4xl mb-4">Sản phẩm</h1>
                            <Link to="#" className="text-[#D19C97] py-2 px-3"><button className='px-[3%] py-[2%] border-[1px] border-[#D19C97] rounded-lg hover:text-black hover:bg-[#D19C97]'> Mua ngay</button></Link>
                        </div>
                        <img src={img2} alt=""className='w-[160px] h-[224px] ' />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Product;
