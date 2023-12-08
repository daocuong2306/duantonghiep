import Banner from './banner'
import { Link } from 'react-router-dom'
import NewProducts from './newProduct'
import ListCate from './listCate'
import { useGetDataQuery } from '@/api/home'
import { Spin } from 'antd'
import banner from "../../../../img/maxresdefault.jpg"
import Comment from './commen'

const Home = () => {
    const { isLoading } = useGetDataQuery();

    return (
        isLoading ? <Spin spinning={isLoading} className='pl-[50%]'></Spin> :
            <div className='mt-[7.5%]'>
                <body>
                    <Banner />
                    <div className="container-fluid pt-5">
                        <div className="row px-xl-5 pb-3">
                            <ListCate />
                        </div>
                    </div>
                    <div>
                        <img src={banner} alt="" className='h-screen w-screen' />
                    </div>
                    <div className="container-fluid pt-5">
                        <div className="text-center mb-4">
                            <h2 className="section-title px-5"><span className="px-2">Sản phẩm mới</span></h2>
                        </div>
                        <NewProducts />
                    </div>

                    <Comment />
                    <Link to="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></Link>
                </body>
            </div>
    )
}

export default Home