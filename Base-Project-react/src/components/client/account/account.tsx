import { useInforUserQuery } from "@/api/user"
import { Spin } from "antd"
import { Link } from "react-router-dom"
import image from "../../../../img/user.png"
const Account = () => {
    const token = localStorage.getItem("header")
    const { data, isLoading } = useInforUserQuery(token)
    console.log(data);

    return isLoading ?
        <Spin spinning={isLoading} className="pl-[50%]"></Spin>
        :
        (<section style={{ backgroundColor: "#eee;" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center d-flex flex-column align-items-center">
                                {data?.data.image ? (
                                    <img src={`http://localhost:8000${data?.data.image}`} alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                ) : (
                                    <img src={image} alt="avatar" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                )}
                                <h5 className="my-3">{data?.data.name}</h5>

                                <div className="">
                                    <Link to=""><button type="button" className="btn-cart-account">Giỏ hàng</button></Link>
                                    <Link to=""><button type="button" className="btn-bill-account">Thanh toán</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Tuổi</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{data?.data.age}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{data?.data.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Số điện thoại</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{data?.data.phone}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Địa chỉ</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{data?.data.address}</p>
                                    </div>
                                </div>
                                <hr />
                                <Link to={`/account/update`}><div className="row">
                                    <button className="btn btn-success rounded-pill custom-btn">
                                        Cập nhật thông tin
                                    </button>
                                </div></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        )
}

export default Account