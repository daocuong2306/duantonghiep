import { useListStatisticalQuery } from '@/api/statistics';
import { FullscreenOutlined } from '@ant-design/icons';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: 'donut',
  },
  colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B', "#ea4335"],
  labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
  legend: {
    show: true,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: '100%',
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: '100%',
        },
      },
    },
  ],
};


const ChartThree: React.FC = () => {
  const { data: dataCmt } = useListStatisticalQuery();
  const handlecomment = dataCmt?.handlecomment ?? {};
  const countsArray = Object.values(handlecomment).map(item => item.count);
  console.log(countsArray);

  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    setState({
      series: countsArray,
    });
  }, [countsArray]);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-6 pt-7.5 pb-5 shadow-default sm:px-10 xl:col-span-5 w-300">
      <h3>Thống kê  bình luận</h3>
      <div id="chartThree" className="mx-auto flex justify-center">
        <ReactApexChart
          options={options}
          series={state.series}
          type="donut"
        />
      </div>
    </div>
  );
};

export default ChartThree;
