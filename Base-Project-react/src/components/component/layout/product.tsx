import { useGetDataQuery } from '@/api/home';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../img/MUA_JEANS_EN_T_NG_UNDERWEAR-02_1_png.jpg"
import img1 from "../img/bst-new-arrivals-nam_jpg.jpg"
import img2 from "../img/upsell_t1123_4__jpg.jpg"
type Props = {};

const Product = (props: Props) => {
    
    return (
        <div className="container-fluid offer pt-5">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pb-4 p-[2%]">
                    <div className="relative bg-white text-center mb-2 py-5 px-5 flex">
                        <img src={img1} alt="" className='w-[160px] h-[224px]' />
                        <div className="relative pl-[10%]">
                            <h5 className="text-[#EDF1FF] uppercase mb-3">Giảm giá 20% cho các sản phẩm Hạ - Thu</h5>
                            <h1 className="font-semibold text-4xl mb-4">Sản phẩm</h1>
                            <Link to="#" className="text-[#D19C97] py-2 px-3"><button className='px-[3%] py-[2%] border-[1px] border-[#D19C97] rounded-lg hover:text-black hover:bg-[#D19C97]'> Mua ngay</button></Link>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 pb-4 p-[2%]">
                    <div className="relative bg-white text-center mb-2 py-5 px-5 flex">

                        <div className="relative pr-[10%]">
                            <h5 className="text-[#EDF1FF] uppercase mb-3">Giảm giá 20% cho các sản phẩm Thu - Đông</h5>
                            <h1 className="font-semibold text-4xl mb-4">Sản phẩm</h1>
                            <Link to="#" className="text-[#D19C97] py-2 px-3"><button className='px-[3%] py-[2%] border-[1px] border-[#D19C97] rounded-lg hover:text-black hover:bg-[#D19C97]'> Mua ngay</button></Link>
                        </div>
                        <img src={img2} alt="" className='w-[160px] h-[224px] ' />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Product;
