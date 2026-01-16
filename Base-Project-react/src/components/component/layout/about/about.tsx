

const About = () => {
    return (
        <div>
            <div className="bg-light">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4">Giới thiệu về Brite Shop</h1>
                            <p className="lead text-muted mb-4">Chào mừng bạn đến với trải nghiệm mua sắm trực tuyến tại Brite Shop, nơi mang đến cho bạn sự đa dạng và chất lượng.</p>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-5">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light">Tại sao chọn chúng tôi?</h2>
                            <p className="font-italic text-muted mb-4">Khám phá lý do Brite Shop là địa điểm lựa chọn hàng đầu của bạn.</p>
                            <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Tìm Hiểu Thêm</a>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                            <img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" className="img-fluid mb-4 mb-lg-0" />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-5 px-5 mx-auto">
                            <img src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg" alt="" className="img-fluid mb-4 mb-lg-0" />
                        </div>
                        <div className="col-lg-6">
                            <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light">Chất lượng hàng đầu</h2>
                            <p className="font-italic text-muted mb-4">Cam kết mang đến cho bạn những sản phẩm chất lượng nhất, được lựa chọn kỹ lưỡng.</p>
                            <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Tìm Hiểu Thêm</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-lg-12 text-center">
                            <h2 className="display-4 font-weight-light">Đội ngũ của chúng tôi</h2>
                            <p className="font-italic text-muted">Chúng tôi là đội ngũ đầy nhiệt huyết và sẵn lòng phục vụ bạn mọi lúc, mọi nơi.</p>
                        </div>
                    </div>

                    <div className="row text-center">
                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Manuella Nevoresky</h5>
                                <span className="small text-uppercase text-muted">CEO - Founder</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Thêm thông tin về các thành viên khác tại đây */}

                    </div>
                </div>
            </div>

            <footer className="bg-light pb-5">
                <div className="container text-center">
                    <p className="font-italic text-muted mb-0">&copy; Bản quyền thuộc về Brite Shop. Bảo lưu mọi quyền.</p>
                </div>
            </footer>
        </div>

    )
}

export default About