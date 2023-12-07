import { useListStatisticalQuery } from '@/api/statistics';
import { DatePicker } from 'antd';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


interface ChartOneProps {
  data: any; // Adjust the type of your data accordingly
}

const ChartOne: React.FC<ChartOneProps> = () => {
  const currentMonth = new Date().getMonth() + 1;

  const [day, setDay] = useState(currentMonth)
  const { data: statisData, isLoading } = useListStatisticalQuery(day);
  const monthlyData = statisData?.totalAmountPerDay ? Object.values(statisData?.totalAmountPerDay) : [];

  // Extracting values for each month from data (replace this with your actual data structure)
  console.log(statisData);

  const cate = Object.keys(statisData?.totalAmountPerDay || {}).map(Number);
  const maxTotalAmount = Math.max(...monthlyData);

  let chartData = [
    {
      name: '2023',
      data: monthlyData,
    },

  ];

  const options: ApexOptions = {
    xaxis: {
      type: 'category',
      categories: cate,
    },
  };

  useEffect(() => {
    if (monthlyData.length > 0) {
      chartData = [
        {
          name: 'Product One',
          data: monthlyData,
        }
      ];
    }
  }, [monthlyData]);
  const onChange = (date, dateString) => {
    // Chuyển đổi dateString thành đối tượng Date
    const selectedDate = new Date(dateString);

    // Lấy thông tin về tháng (1-12) từ đối tượng Date
    const monthNumber = selectedDate.getMonth() + 1;

    setDay(monthNumber);
  };
  return (
    <>
      <div className="col-12 p-0 m-0 rounded-sm border border-stroke bg-white pt-7.5 pb-5 shadow-default">
        {isLoading ? null : (
          <div>
            <DatePicker onChange={onChange} picker="month" suffix="Chọn tháng"/>
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