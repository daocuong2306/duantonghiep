import BaseBreadcrumb from '../../shared/BaseBreadcrumb';
import { CiShoppingCart } from 'react-icons/ci';
import { FaCoins } from 'react-icons/fa';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import ApexCharts from 'react-apexcharts';
import Chart from "react-apexcharts";



const Statistical = () => {
    useEffect(() => {
        const progressBar = document.getElementById('progressBar');
        const currentProgress = 60;

        progressBar.style.width = currentProgress + '%';
        progressBar.setAttribute('aria-valuenow', currentProgress);
    }, []);
    const series= [
        {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13]
        }
    ]
    const options = {

        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Average High & Low Temperature',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Temperature'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };

    // const chart = new ApexCharts(document.querySelector("#chart"), options);
    // chart.render();
    return (

        <div>
            <BaseBreadcrumb title='Thống kê'/>
            <div className="flex">
                <div className=" w-1/2  ">
                    <div className=' w-11/12 rounded bg-sky-200 p-10 m-auto '>
                        <div className="card-box">
                            <div className="row">
                                <div className="col-6">
                                    <div className="avatar-sm bg-light rounded">
                                        <CiShoppingCart className="text-3xl w-100 text-green-700 rounded" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-right">
                                        <h3 className="text-dark my-1 "><span data-plugin="counterup" className='text-zinc-500 text-5xl font-bold '><CountUp end={1576} /></span></h3>
                                        <p className="text-zinc-500 text-xl">Doanh số tháng Giêng</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h6 className="text-uppercase text-zinc-500 text-xl">Mục tiêu <span className="float-right text-zinc-500 text-xl">49%</span></h6>
                                <div className="progress progress-sm mt-1">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-green-700 h-2.5 rounded-full" style={{ width: '49%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-1/2  ">
                    <div className=' w-11/12 rounded bg-sky-200 p-10 m-auto '>
                        <div className="card-box">
                            <div className="row">
                                <div className="col-6">
                                    <div className="avatar-sm bg-light rounded">
                                        <FaCoins className="text-3xl w-100 text-fuchsia-700 rounded" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-right">
                                        <h3 className="text-dark my-1 "><span data-plugin="counterup" className='text-zinc-500 text-5xl font-bold '>$<CountUp end={12145} /></span></h3>
                                        <p className="text-zinc-500 text-xl">Tình trạng thu nhập</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h6 className="text-uppercase text-zinc-500 text-xl">Mục tiêu <span className="float-right text-zinc-500 text-xl">60%</span></h6>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div
                                        id="progressBar"
                                        className="bg-fuchsia-700 h-2.5 rounded-full"
                                        role="progressbar"
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    // aria-valuenow={60}
                                    // style={{ width: '60%' }}
                                    >
                                        {/* <span className="sr-only">49% Complete</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-8/12 h-1/4 p-5'> <Chart options={options} series={series } /></div>
        </div>
    )
}

export default Statistical