import ChartOne from './component/ChartOne'
import { useListStatisticalQuery } from '@/api/statistics'
import { Spin } from 'antd'
import TableOne from './component/TableOne'


const Statistics = () => {
    const { data: statisData, isLoading } = useListStatisticalQuery(null);
    return (
        <>
            <Spin spinning={isLoading}>
                <div>
                    <div className="main-content">
                        <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
                            <div className="container-fluid">
                                <h2 className="mb-5">Doanh thu tháng</h2>
                                <div className="header-body">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="card card-stats mb-4 mb-xl-0">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Doanh thu</h5>
                                                            <span className="h2 font-weight-bold mb-0">
                                                                {parseFloat(statisData?.statusAmout.current_month_total).toLocaleString('en-US')} đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-success mr-2">{statisData?.statusAmout.status == "Tăng" ? <i className="fa fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}   {parseFloat(statisData?.statusAmout.increase_decrease).toLocaleString('en-US')} đ </span>
                                                        <span className="text-nowrap">So với tháng trước</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-2 col-lg-2">
                                            <div className="card card-stats mb-4 mb-xl-0">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Chờ duyệt</h5>
                                                            <span className="h2 font-weight-bold mb-0">{statisData?.statusTotal.Pending} đơn</span>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-nowrap">Cần sử lí</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-2 col-lg-2">
                                            <div className="card card-stats mb-4 mb-xl-0">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Đã xác nhận</h5>
                                                            <span className="h2 font-weight-bold mb-0">{statisData?.statusTotal.Browser} đơn</span>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-nowrap">Cần sử lí</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-2 col-lg-2">
                                            <div className="card card-stats mb-4 mb-xl-0">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 className="card-title text-uppercase text-muted mb-0">Vận chuyển</h5>
                                                            <span className="h2 font-weight-bold mb-0">{statisData?.statusTotal.Transport} đơn</span>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-0 text-muted text-sm">
                                                        <span className="text-nowrap">Cần sử lí</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto p-4">
                    <ChartOne />
                    <div className="mt-4 d-flex align-items-stretch gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                        <TableOne />
                    </div>
                </div>


            </Spin>
        </>

    )
}

export default Statistics
