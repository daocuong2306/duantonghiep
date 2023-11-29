import { useListStatisticalQuery } from '@/api/statistics';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartOneProps {
  data: any; // Adjust the type of your data accordingly
}

const ChartOne: React.FC<ChartOneProps> = () => {
  const { data: statisData, isLoading } = useListStatisticalQuery();

  // Extracting values for each month from data (replace this with your actual data structure)
  const monthlyData = Object.keys(statisData?.total_price || {}).map(
    (month) => Number(statisData?.total_price[month]?.total_amount) || 0
  );

  const maxTotalAmount = Math.max(...monthlyData);

  let chartData = [
    {
      name: 'Product One',
      data: monthlyData,
    },
    {
      name: 'Product Two',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    },
  ];

  const options: ApexOptions = {
    xaxis: {
      type: 'category',
      categories: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
  };

  useEffect(() => {
    if (monthlyData.length > 0) {
      chartData = [
        {
          name: 'Product One',
          data: monthlyData,
        },
        {
          name: 'Product Two',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
      ];
    }
  }, [monthlyData]);

  return (
    <>
      <h3>Thống kê theo năm</h3>

      <div className="col-12 p-0 m-0 rounded-sm border border-stroke bg-white pt-7.5 pb-5 shadow-default">
        {isLoading ? null : (
          <div>
            <div id="chartOne">
              <ReactApexChart options={options} series={chartData} type="area" height={350} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChartOne;
