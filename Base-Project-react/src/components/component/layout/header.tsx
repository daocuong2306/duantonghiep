import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png'
const Header = () => {
  const token = localStorage.getItem("header")
  const url = useNavigate()
  const onLogout = (token: string) => {
    localStorage.clear()
    url("/")
  }
  return (
    <div className="w-full mt-[2%]">
      <header className="pb-0 bg-white fixed top-0 left-0 right-0 z-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex">
              <Link to="/" className="">
                <img className="" src={Image} alt="Transistor" width="150" height="100"></img>
              </Link>
              <div className="hidden pl-[30px] lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                <Link to="/products" className="text-base font-medium text-black transition-all duration-200 hover:text-[#02CCFE] focus:text-[#02CCFE]">Sản phẩm</Link>
                <Link to="" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-[#02CCFE] focus:text-[#02CCFE]"> Xu hướng </Link>
                <Link to="" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-[#02CCFE] focus:text-[#02CCFE]">  </Link>
                <Link to="" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-[#02CCFE] focus:text-[#02CCFE]">  </Link>
              </div>
            </div>

            <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
              <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
              </svg>

              <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className=" flex items-center justify-between space-x-10">
              <div className="w-[300px]">
                <div className="w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Tìm kiếm
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18.36 13.6832C17.3672 12.2923 15.9872 11.2216 14.3906 10.6034C15.2631 9.73531 15.8576 8.62882 16.0989 7.42395C16.3401 6.21908 16.2172 4.96998 15.7458 3.83471C15.2744 2.69944 14.4756 1.72902 13.4505 1.04624C12.4254 0.363469 11.22 -0.000976563 9.98698 -0.000976562C8.75394 -0.000976563 7.54861 0.363469 6.5235 1.04624C5.49839 1.72902 4.69958 2.69944 4.22815 3.83471C3.75672 4.96998 3.63385 6.21908 3.87509 7.42395C4.11633 8.62882 4.71084 9.73531 5.58339 10.6034C3.93899 11.2492 2.52736 12.3726 1.53173 13.8277C0.536095 15.2829 0.00243009 17.0027 0 18.7639C0 19.0915 0.130619 19.4057 0.363121 19.6374C0.595623 19.869 0.910966 19.9992 1.23977 19.9992C1.56858 19.9992 1.88392 19.869 2.11643 19.6374C2.34893 19.4057 2.47955 19.0915 2.47955 18.7639C2.48115 17.0901 3.14914 15.4853 4.33692 14.3016C5.5247 13.118 7.13524 12.4523 8.81508 12.4506H11.1858C12.8654 12.4528 14.4756 13.1187 15.6631 14.3022C16.8507 15.4858 17.5186 17.0903 17.5204 18.7639C17.5204 19.0915 17.6511 19.4057 17.8836 19.6374C18.1161 19.869 18.4314 19.9992 18.7602 19.9992C19.089 19.9992 19.4044 19.869 19.6369 19.6374C19.8694 19.4057 20 19.0915 20 18.7639C19.9983 16.9413 19.4249 15.1649 18.36 13.6832ZM13.7193 6.24204C13.7193 7.10254 13.4199 7.93643 12.872 8.60162C12.3242 9.2668 11.5618 9.72213 10.7148 9.89002C9.8678 10.0579 8.98857 9.92797 8.22693 9.52235C7.4653 9.11672 6.86838 8.4605 6.53788 7.6655C6.20738 6.87051 6.16375 5.98592 6.41443 5.16246C6.66511 4.33901 7.19459 3.62764 7.91264 3.14956C8.6307 2.67148 9.4929 2.45627 10.3523 2.54061C11.2118 2.62494 12.0153 3.0036 12.626 3.61206C12.9737 3.9566 13.2494 4.36646 13.4371 4.8179C13.6248 5.26935 13.7207 5.7534 13.7193 6.24204Z" fill="#464646" />
                </svg>
              </div>
              {/* yêu thích */}
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.63166 9.59647C0.586773 8.54232 0 7.11756 0 5.63208C0 4.13836 0.592948 2.70538 1.64916 1.64917C2.70536 0.59296 4.13835 0 5.63207 0C7.12579 0 8.55878 0.59296 9.61499 1.64917L9.99999 2.03418L10.385 1.64917C11.4412 0.59296 12.8732 0 14.3669 0C15.8616 0 17.2936 0.59296 18.3498 1.64917C19.406 2.70538 20 4.13836 20 5.63208C20 7.11756 19.4132 8.54232 18.3673 9.59647L10.7268 17.6869C10.5384 17.8866 10.2749 17.9998 9.99999 17.9998C9.72513 17.9998 9.4616 17.8866 9.27321 17.6869L1.63166 9.59647ZM9.99999 15.5436L16.9158 8.22113L16.9364 8.20054C17.6168 7.51905 17.9998 6.59564 17.9998 5.63208C17.9998 4.66852 17.6168 3.74511 16.9364 3.06362C16.2549 2.38213 15.3305 1.99918 14.3669 1.99918C13.4044 1.99918 12.4799 2.38213 11.7984 3.06362L10.7072 4.15586C10.316 4.54602 9.68293 4.54602 9.29277 4.15586L8.20053 3.06362C7.52006 2.38213 6.59563 1.99918 5.63207 1.99918C4.66851 1.99918 3.74511 2.38213 3.06362 3.06362C2.38213 3.74511 2.0002 4.66852 2.0002 5.63208C2.0002 6.59564 2.38213 7.51905 3.06362 8.20054C3.07082 8.20775 3.077 8.21392 3.08317 8.22113L9.99999 15.5436Z" fill="#464646" />
                </svg>
              </div>
              {/* giỏ hàng */}
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <g clip-path="url(#clip0_1_1406)">
                    <path d="M16.1847 13.9868H16.182C15.3973 13.9965 14.6481 14.3176 14.0966 14.8804C13.5451 15.4432 13.2358 16.2024 13.2358 16.9935C13.2358 17.7846 13.5451 18.5438 14.0966 19.1066C14.6481 19.6694 15.3973 19.9904 16.182 20.0001C16.9667 19.9908 17.7161 19.6701 18.2679 19.1075C18.8196 18.545 19.1292 17.7859 19.1296 16.9948C19.1299 16.2038 18.821 15.4444 18.2698 14.8813C17.7186 14.3183 16.9694 13.9969 16.1847 13.9868ZM16.9995 16.9933C16.9997 17.1012 16.9787 17.2081 16.9377 17.3079C16.8968 17.4076 16.8366 17.4982 16.7608 17.5744C16.6077 17.7283 16.4005 17.8149 16.1843 17.8155C16.0756 17.818 15.9675 17.7987 15.8663 17.7585C15.7651 17.7184 15.6729 17.6583 15.5952 17.5817C15.5174 17.5051 15.4556 17.4136 15.4134 17.3126C15.3712 17.2116 15.3495 17.1031 15.3495 16.9935C15.3495 16.8839 15.3712 16.7754 15.4134 16.6744C15.4556 16.5734 15.5174 16.4819 15.5952 16.4053C15.6729 16.3287 15.7651 16.2686 15.8663 16.2284C15.9675 16.1883 16.0756 16.1689 16.1843 16.1715C16.4004 16.1721 16.6075 16.2585 16.7608 16.4121C16.8366 16.4883 16.8968 16.5789 16.9377 16.6786C16.9787 16.7784 16.9997 16.8853 16.9995 16.9933Z" fill="#464646" />
                    <path d="M20.7735 4.13487C20.6726 4.00241 20.5428 3.89517 20.3942 3.82151C20.2455 3.74784 20.082 3.70972 19.9164 3.71012H6.64237L6.22237 2.05115H6.21831C6.03568 1.45726 5.66918 0.937945 5.17251 0.569274C4.67584 0.200603 4.07511 0.00195823 3.45831 0.00244229H1.08222C0.795067 0.00244229 0.519675 0.117432 0.316628 0.322115C0.113581 0.526798 -0.000488281 0.804407 -0.000488281 1.09387C-0.000488281 1.38334 0.113581 1.66095 0.316628 1.86563C0.519675 2.07031 0.795067 2.1853 1.08222 2.1853H3.45515C3.61554 2.18482 3.77153 2.2382 3.89847 2.33702C4.02542 2.43584 4.11611 2.57447 4.1562 2.73102L6.27651 11.1532C6.43658 11.7784 6.79816 12.3323 7.30443 12.7278C7.81071 13.1233 8.43298 13.3381 9.0735 13.3384H16.541C17.1777 13.3385 17.7966 13.1265 18.3014 12.7354C18.8062 12.3442 19.1686 11.7958 19.3321 11.1755L20.9603 5.07805C21.0031 4.91694 21.0086 4.74804 20.9762 4.58446C20.9438 4.42088 20.8745 4.26703 20.7735 4.13487ZM17.2448 10.6007C17.2049 10.7566 17.1148 10.8947 16.9887 10.9934C16.8625 11.0922 16.7075 11.146 16.5478 11.1464H9.0771C8.91694 11.1466 8.76127 11.0931 8.6346 10.9943C8.50793 10.8955 8.41745 10.757 8.37741 10.6007L7.19274 5.88389H18.5048L17.2452 10.6007H17.2448Z" fill="#464646" />
                    <path d="M8.78759 13.9863H8.77541C7.98676 13.99 7.23164 14.3083 6.67508 14.8715C6.11852 15.4348 5.80576 16.1972 5.80518 16.9922C5.80512 17.3871 5.88222 17.778 6.03208 18.1428C6.18194 18.5076 6.40162 18.8391 6.67858 19.1182C6.95553 19.3974 7.28433 19.6189 7.6462 19.7699C8.00807 19.921 8.39591 19.9987 8.78759 19.9987H8.79165C9.57634 19.9884 10.3254 19.6669 10.8765 19.1037C11.4276 18.5405 11.7364 17.7811 11.7358 16.99C11.7353 16.1989 11.4255 15.4399 10.8737 14.8775C10.3218 14.3151 9.57229 13.9945 8.78759 13.9854V13.9863ZM7.9724 16.9932C7.96985 16.8844 7.98891 16.7762 8.02845 16.6749C8.06798 16.5736 8.1272 16.4814 8.20263 16.4035C8.27805 16.3257 8.36816 16.2638 8.46765 16.2216C8.56714 16.1793 8.674 16.1576 8.78195 16.1576C8.8899 16.1576 8.99675 16.1793 9.09624 16.2216C9.19573 16.2638 9.28583 16.3257 9.36126 16.4035C9.43669 16.4814 9.49591 16.5736 9.53545 16.6749C9.57499 16.7762 9.59404 16.8844 9.59149 16.9932V17.1296C9.5576 17.3329 9.44916 17.5159 9.28767 17.6423C9.12619 17.7688 8.92345 17.8294 8.71968 17.8123C8.51591 17.7951 8.32598 17.7013 8.18756 17.5496C8.04914 17.3979 7.97234 17.1993 7.9724 16.9932Z" fill="#464646" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1406">
                      <rect width="21" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header