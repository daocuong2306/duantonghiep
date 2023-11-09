import BaseBreadcrumb from '../../shared/BaseBreadcrumb';
import Image from "../../../assets/assets/images/logo-dark.png";
import Avatar from "../../../assets/assets/images/th.jpg"
import { FaInternetExplorer, FaFacebookF,FaTwitter,FaInstagram } from 'react-icons/fa';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const InForAdmin = () => {
    const api =fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/admin/editinforshop' });
    console.log(api);
    
    return (
        <div>
            <BaseBreadcrumb title='Hồ sơ quản trị và cửa hàng'/>
            <div className="flex">
                <div className=" w-1/2  ">
                    <div className='w-11/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 m-auto'>
                        <p className='font-bold bg-indigo-100 p-2 rounded-t-lg text-xl text-blue-400'>Thay đổi hỗ sơ</p>
                        <div className='flex rounded-b-lg bg-slate-100 pt-4 pl-5'>
                            <div className="w-1/2 text-center flex flex-col items-center mt-4">
                                <img src={Image} alt="" className="mx-auto" width={250} />
                                <input type="file" className="block w-full text-sm text-slate-500
                                     file:mr-4 file:py-2 file:px-4
                                     file:rounded-full file:border-0
                                     file:text-sm file:font-semibold
                                     file:bg-violet-50 file:text-violet-700
                                     hover:file:bg-violet-100
                                    "/>
                            </div>
                            <div className='w-1/2 text-center flex flex-col items-center mt-4 p-3'>
                                <div className="shrink-0">
                                    <img className="h-16 w-16 object-cover rounded-full" src={Avatar} alt="Current profile photo" />
                                </div>
                                <input type="file" className="block w-full text-sm text-slate-500
                                     file:mr-4 file:py-2 file:px-4
                                     file:rounded-full file:border-0
                                     file:text-sm file:font-semibold
                                     file:bg-violet-50 file:text-violet-700
                                     hover:file:bg-violet-100
                                    "/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 ">
                    <div className='w-11/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 m-auto'>
                        <p className='font-bold bg-indigo-100 p-2 rounded-t-lg text-xl text-blue-400'>Đổi mật khẩu</p>

                        <div className='flex rounded-b-lg bg-slate-100 p-5 flex-col'>
                            <div className="flex flex-wrap">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-violet-600">
                                Mật khẩu cũ
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                            </div>
                            <div className="flex flex-wrap">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-violet-600">
                                Mật khẩu mới
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                            </div>
                            <div className="flex flex-wrap">
                                <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-violet-600">
                                Xác nhận mật khẩu mới
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>
                <p className='font-bold bg-indigo-100 p-2 rounded-t-lg text-xl text-blue-400'>Thông tin cơ bản</p>
                <div className='flex rounded-b-lg bg-slate-100 p-5' >
                    <div className='w-1/2'>
                        <div className='w-11/12'>
                            <div className="relative z-0 w-full mb-6 group">
                                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên cửa hàng</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Địa chỉ</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thành phố</label>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div className='w-11/12'>
                            <div className="relative z-0 w-full mb-6 group">
                                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Địa chỉ email</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Điện thoại</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>
                <p className='font-bold bg-indigo-100 p-2 rounded-t-lg text-xl text-blue-400'>Trên trang website</p>
                <div className='flex rounded-b-lg bg-slate-100 p-5' >
                    <div className='w-1/2'>
                        <div className="action w-11/12">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <FaInternetExplorer />
                                </span>
                                <input className="focus:outline-none rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="action mt-4 w-11/12">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <FaFacebookF />
                                </span>
                                <input className="focus:outline-none rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                    </div>
                    <div className='w-1/2'>
                        <div className="action w-11/12">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <FaTwitter />
                                </span>
                                <input className="focus:outline-none rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="action mt-4 w-11/12">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <FaInstagram />
                                </span>
                                <input className="focus:outline-none rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"     />
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default InForAdmin