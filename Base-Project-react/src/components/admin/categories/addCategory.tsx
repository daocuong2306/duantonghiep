import { useAppDispatch } from "../../../store/hook";
import { useForm, Controller } from "react-hook-form";
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../../api/category";
import { ICategory } from "../../../interface/category";

const AddCategory = () => {
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const readerRef = useRef<any>(null);
    const url = useNavigate();
    const [addCategory] = useAddCategoryMutation();

    const { control, handleSubmit, setValue, getValues, register } = useForm();
    const onHandleSubmit = async (data: ICategory) => {
        const name = getValues('name');
        const formData = new FormData();

        // Append form fields to formData
        formData.append('name', name);

        // Append the selected file to formData (if available)
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        try {
            const response = await addCategory(formData);

            // Handle the response here if needed

            console.log(response);

            // Redirect to another page after successful form submission
            // url("/admin/categories");
        } catch (error) {
            // Handle any errors that occurred during form submission
            console.error(error);
        }
    };

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

    return (
        <div>
            <h2 className="text-5xl font-black text-gray-900 text-center mb-10">Add Category</h2>
            <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 ml-200 mr-200">
                <div className="col-span-1">
                    {selectedFile === null ? (
                        <img className="h-40 w-80 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLs3s-DKPsQYMxVOJnqHnBzM4KhkkG9D6I7HZFw1Qcg&s" alt="image description" />
                    ) : (
                        <img className="h-40 w-80 rounded-lg" src={selectedFile['result']} alt="image description" />
                    )}
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
                            />
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
    );
};

export default AddCategory;
