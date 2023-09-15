
import { useAddProductMutation } from '@/api/product';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    //tạo 1 biến navigate 
    const url = useNavigate()
    const [add] = useAddProductMutation();
    const { register, handleSubmit } = useForm();
    const onHandleSubmit = (data: any) => {
        add(data);
        url("/products")
    }
    return <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">

                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form action="" className="space-y-4" onSubmit={handleSubmit(onHandleSubmit)}>
                        <div>
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Name"
                                type="text"
                                id="name"
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="name">Price</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Price"
                                type="number"
                                id="price"
                                {...register("price")}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"

                            >
                                Add Product
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
}

export default AddProduct



