
import ChartOne from './component/ChartOne'

import TableThree from './component/TableThree'
import { DemoColumn } from './component/Card3'
import { useListStatisticalQuery } from '@/api/statistics'
import DemoPie from './component/Card2'
import CardOne from './component/CardOne'
import { Spin } from 'antd'

type Props = {}

const Statistics = (props: Props) => {
    const { data: statisData, isLoading } = useListStatisticalQuery()
    console.log(statisData);
    const dataMonth = statisData?.total_price;
    console.log(dataMonth);
    
    const dataComment = statisData?.handlecomment;
    return (
        <>
            <Spin spinning={isLoading}>
                <div className="container mx-auto p-4">
                    <h3 className="text-2xl font-semibold mb-4">Top 3 sản phẩm bán chạy</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Cards */}
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <CardOne />
                        </div>
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <CardOne />
                        </div>
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <CardOne />
                        </div>

                        {/* Chart */}
                        <div className="col-span-2 bg-white p-6 rounded-md shadow-md">
                            <ChartOne data={dataMonth} />
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <DemoPie dataComment={dataComment} />
                        </div>
                    </div>
                </div>
            </Spin>
        </>

    )
}

export default Statistics