import React from 'react';
import { Link } from 'react-router-dom';
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png';

const Footer = () => {
  return (
    <div className="container-fluid text-black mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <Link to="" className="text-decoration-none">
            <img src={Image} alt="" className="h-16 w-3/4" />
          </Link>
          <p>
            Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore
            amet erat.
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-[#00CCFF] mr-3"></i>123 Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-[#00CCFF] mr-3"></i>info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-[#00CCFF] mr-3"></i>+012 345 67890
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-[#00ccff] mb-4">Truy cập nhanh</h5>
              <div className="flex flex-col justify-start">
                <Link className="text-black mb-2 hover:text-[#00ccff]" to="/">
                  <i className="fa fa-angle-right mr-2"></i>Trang chủ
                </Link>
                <Link className="text-black mb-2 hover:text-[#00ccff]" to="/products">
                  <i className="fa fa-angle-right mr-2"></i>Sản phẩm
                </Link>
                <Link className="text-black mb-2 hover:text-[#00ccff]" to="">
                  <i className="fa fa-angle-right mr-2"></i>Thông tin
                </Link>
                <Link className="text-black mb-2 hover:text-[#00ccff]" to="">
                  <i className="fa fa-angle-right mr-2"></i>Giỏ hàng
                </Link>
                <Link className="text-black mb-2 hover:text-[#00ccff]" to="">
                  <i className="fa fa-angle-right mr-2"></i>Liên hệ
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-[#00ccff] mb-4">Ý kiến đóng góp</h5>
              <form action="">
                <div className="form-group">
                  <input type="text" className="form-control border-0 py-4" placeholder="Tên của bạn" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control border-0 py-4" placeholder="Email của bạn" />
                </div>
                <div>
                  <button className="text-[#00CCFF] border-1 border-black  py-3 px-[25%] rounded hover:bg-[#00CCFF] hover:text-white" type="submit">
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
