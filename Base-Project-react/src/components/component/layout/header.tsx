import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const token = localStorage.getItem("header")
  const url = useNavigate()
  const onLogout = (token: string) => {
    localStorage.clear()
    url("/")
  }
  return (
    <div>
      <header>
        <nav className="bg-[#ffffff] border-gray-200 px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="https://flowbite.com" className="flex items-center">
              <img src="../../../../img/blob.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              {token?.length > 5 ? <button onClick={() => onLogout(token)}><div className="block w-full rounded bg-[#00ccff] px-4 ml-2 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto">Log out</div></button> : <Link to="/login" className="block w-full rounded bg-[#00ccff] px-4 ml-2 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto">Log in</Link>}
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link to="#" className="block py-2 pr-4 pl-3 text-[#09ceff] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 " aria-current="page">Trang chủ</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 pr-4 pl-3 text-[#09ceff] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ">Sản Phẩm</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 pr-4 pl-3 text-[#09ceff] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 pr-4 pl-3 text-[#09ceff] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 ">Liên Hệ</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header