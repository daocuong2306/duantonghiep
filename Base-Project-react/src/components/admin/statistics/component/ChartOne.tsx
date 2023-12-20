import React, { useEffect, useState } from 'react';
import { useListStatisticalQuery } from '@/api/statistics';
import { DatePicker } from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ChartOne: React.FC = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const { data: statisData, isLoading } = useListStatisticalQuery(selectedMonth);
  const monthlyData = statisData?.totalAmountPerDay ? Object.values(statisData.totalAmountPerDay) : [];
  const categories = Object.keys(statisData?.totalAmountPerDay || {}).map(Number);
  const [chartData, setChartData] = useState([
    {
      name: 'Product One',
      data: [] as number[],
    },
  ]);
  useEffect(() => {
    setChartData([
      {
        name: 'Product One',
        data: monthlyData as number[],
      }
    ]);
  }, [monthlyData]);

  // ApexCharts options
  const chartOptions: ApexOptions = {
    xaxis: {
      type: 'category',
      categories: categories,
    },
  };

  // Handle date picker change
  const onChange = (dateString: any) => {
    const selectedDate = new Date(dateString);
    const selectedMonth = selectedDate.getMonth() + 1;
    setSelectedMonth(selectedMonth);
  };
  return (
    <div className="col-12 p-0 m-0 rounded-sm border border-stroke bg-white pt-7.5 pb-5 shadow-default">
      {!isLoading && (
        <div>
          <DatePicker onChange={onChange} picker="month" />
          {monthlyData.length > 0 ? (
            <div id="chartOne">
              <ReactApexChart options={chartOptions} series={chartData} type="area" height={350} />
            </div>
          ) : (
            <p>No data available for the selected month.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartOne;
