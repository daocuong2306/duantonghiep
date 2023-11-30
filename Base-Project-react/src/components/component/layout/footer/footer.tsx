import React from 'react';
import { Link } from 'react-router-dom';
import Image from '@/assets/image/395664742_238305892304631_1626048229353873057_n.png';

const Footer = () => {
  return (
    <div className="container-fluid text-black ">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5 ">
          <div className='text-center mx-auto'>
            <Link to="" className="text-decoration-none">
              <img src={Image} alt="" className="h-16 w-2/4" />
            </Link>
          </div>
          <div className="text-left">
            <p>
              Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.
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
        </div>


        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-3 mb-3">
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
                  <input type="text" className="form-control border-1 py-4" placeholder="Tên của bạn" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control border-1 py-4" placeholder="Email của bạn" />
                </div>
                <div>
                  <button className="text-[#00CCFF] border border-[#00CCFF] py-3 px-[25%] rounded hover:bg-[#00CCFF] hover:text-white" type="submit">
                    Gửi
                  </button>

                </div>
              </form>
            </div>
            {/* map  */}
            <div className="col-md-5 mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1565.6976310582897!2d105.7443451604106!3d21.037585962097914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134548ce3b3454b%3A0xe5393463052d394c!2zMyBQLiBUcuG7i25oIFbEg24gQsO0LCBYdcOibiBQaMawxqFuZywgTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1701354085290!5m2!1svi!2s"
                width="100%"
                height="250"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
