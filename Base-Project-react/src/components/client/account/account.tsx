import { useInforUserQuery } from "@/api/user"
import { Spin } from "antd"
import { Link } from "react-router-dom"

const Account = () => {
    const token = localStorage.getItem("header")
    const { data, isLoading } = useInforUserQuery(token)
    console.log(data);

    return isLoading ?
        <Spin spinning={isLoading} className="pl-[50%]"></Spin>
        :
        <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="flex justify-between px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Thông tin người dùng
                </h3>
                <Link to="/account/update"><button
                    className="border-blue-500 text-center text-[#03CBFD] rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-[#03CBFD] hover:text-white p-2 ml-9">Cập nhật thông tin</button></Link>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Tên
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.name}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Tuổi
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.age}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Địa chỉ
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.address}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Số điện thoại
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data?.data.phone}
                        </dd>
                    </div>
                </dl>
            </div>

        </div>
}

export default Account