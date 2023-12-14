import { useAddDiscountMutation } from "@/api/discount";
import { DatePicker, DatePickerProps, Spin } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';

const Discount = () => {
    const [addDiscount, { data: dataDiscount, error }] = useAddDiscountMutation()
    const errors: any = error
    const { handleSubmit, getValues, register } = useForm();
    const [Date, setDate] = useState("")
    const url = useNavigate()
    const [loading, setLoading] = useState(false);
    const onChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
        console.log(dateString, date);
        setDate(dateString)
    };
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    const onHandleSubmit = async () => {
        const amount = getValues('amount');
        const discount_code = getValues('name');
        const formData = new FormData();

        // Append form fields to formData
        formData.append('discount_code', discount_code);
        formData.append('amount', amount);
        formData.append('expiry_date', Date);
        formData.append('type', `${1}`);
        // Append the selected file to formData (if available)
        setLoading(true);
        try {
            await addDiscount(formData);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(dataDiscount, error);

    if (dataDiscount?.message == "Thêm thành công") {
        url("/admin/Discount")
    } else if (dataDiscount?.message == "Mã đã lưu nhưng hết hạn") {
        openNotification('Mã đã lưu nhưng hết hạn')
    }

    useEffect(() => {
        if (errors?.data?.errors) {
            openNotification("Bạn đã nhập sai vui lòng nhập lại");
            setLoading(false);
        }
    }, [error]);
    return <Spin spinning={loading}>
        {contextHolder}
        <div>
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-7">
                            <form onSubmit={handleSubmit(onHandleSubmit)}>
                                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                                    <div className="w-full sm:w-1/2 ">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black "
                                            htmlFor="fullName"
                                        >
                                            Mã hiệu giảm giá
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Tên sản phẩm"
                                            required
                                            {...register('name')}
                                        />
                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black "
                                            htmlFor="phoneNumber"
                                        >
                                            Phần trăm giảm giá
                                        </label>
                                        <input
                                            type="number"
                                            id="amount"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="%"
                                            required
                                            {...register('amount')}
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-full mb-5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black "
                                        htmlFor="Username"
                                    >
                                        Mã sản phẩm
                                    </label>
                                    <DatePicker
                                        onChange={onChange}
                                        placeholder="Lựa chọn hạn sử dụng"
                                        format="YYYY-MM-DD"
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Thêm mã giảm giá</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    </Spin>
}

export default Discount




