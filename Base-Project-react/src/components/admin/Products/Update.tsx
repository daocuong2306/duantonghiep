import { useAppDispatch } from "@/store/hook"
import { useForm, Controller } from "react-hook-form";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ICategory } from "@/interface/category";
import { useGetCategoriesQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/api/category";
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/api/product";

const Update = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const { data: product } = useGetProductByIdQuery(Number(id));
    const [updateProduct] = useUpdateProductMutation();
    const { data: categories, error, isLoading } = useGetCategoriesQuery()
    const readerRef = useRef<any>(null);
    const url = useNavigate();
    const { control, handleSubmit, setValue, getValues, register, reset } = useForm({
        defaultValues: {
            name: product?.product.name || ""
        }
    });
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileData = e.target.result;
            };
            readerRef.current = reader;

            reader.readAsDataURL(file);
        }
    };


    const onHandleSubmit = async (data) => {
        const name = getValues('name');
        const code = getValues('code');
        const description = getValues('description');
        const id_category = parseInt(getValues('id_category'));
        const price = parseInt(getValues('price'));
        const quantity = parseInt(getValues('quantity'));
        let status = 0;
        const formData = new FormData();
        if (quantity > 0) {
            status = 1;
        }
        // Append form fields to formData
        formData.append('name', "product");
        formData.append('code', 'ma');
        formData.append('description', 'haha');
        formData.append('id_category', String(1));
        formData.append('price', String(1000));
        formData.append('quantity', String(100));
        formData.append('status', String(1));
        // Append form fields to formData
        // Append the selected file to formData (if available)
        if (selectedFile) {
            formData.append('image', selectedFile);
        } else {
            // Use the existing image URL from category data
            formData.append('image', product?.product.image);
        }
        try {
            const response = await updateProduct(id, formData);
            console.log(formData);
            // Handle the response here if needed

            console.log(response);

            // Redirect to another page after successful form submission
            // url("/admin/categories");
        } catch (error) {
            // Handle any errors that occurred during form submission
            console.error(error);
        }
    };

    return <div>
        <h2 className="text-5xl font-black text-gray-900 text-center mb-10">Add Product</h2>
        <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 ml-200 mr-200 ">
            <div className="col-span-1">
                <div className="col-span-1">
                    {selectedFile === null ? (
                        <img className="h-40 w-80 rounded-lg" src={`http://127.0.0.1:8000${product?.product.image}`} alt="image description" />
                    ) : (
                        <img className="h-40 w-80 rounded-lg" src={selectedFile['result']} alt="image description" />
                    )}
                </div>
            </div>
            <div>
                <div className="col-span-2">
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Product Name"
                            required
                            {...register('name')}
                            defaultValue={product?.product.name}
                        />
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Price</label>
                            <input
                                type="number"
                                id="price"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Price"
                                required
                                {...register('price')}
                                defaultValue={product?.product.price}
                            />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Description</label>
                            <textarea
                                id="description"
                                rows="4"
                                class="block p-2.5 w-full text-sm text-white-900 bg-white-50 border border-white-300 focus:ring-white-500 focus:border-white-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-gray dark:focus:ring-white-500 dark:focus:border-white-500"
                                placeholder="Leave a description..."
                                {...register('description')}
                                defaultValue={product?.product.description}
                            ></textarea>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <fieldset>
                                <legend className="sr-only">id_category</legend>
                                {
                                    categories?.categories.map((category: ICategory) => {
                                        return (
                                            <div className="flex items-center mb-4" key={category.id}>
                                                <Controller
                                                    name="id_category"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            id="country-option-2"
                                                            type="radio"
                                                            value={category.id}
                                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                    )}
                                                />
                                                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-black-500">
                                                    {category.name}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </fieldset>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Product Code</label>
                                <input
                                    type="text"
                                    id="code"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Product Code"
                                    required
                                    {...register('code')}
                                    defaultValue={product?.product.code}
                                />
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Quantity"
                                    required
                                    {...register('quantity')}
                                    defaultValue={product?.product.quantity}
                                />
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray" htmlFor="user_avatar">
                                    Upload file
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white-50 dark:text-gray-400 focus:outline-none dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="user_avatar_help"
                                    id="user_avatar"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div>

};

export default Update;
