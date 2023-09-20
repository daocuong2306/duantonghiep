
import { useAppDispatch } from "../../../store/hook"
import { useForm, Controller } from "react-hook-form";
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../../api/category";
import { ICategory } from "../../../interface/category";

const AddCategory = () => {
    const dispatch = useAppDispatch();
    // Xử lý sự kiện khi người dùng chọn tệp
    const [selectedFile, setSelectedFile] = useState(null);
    const readerRef = useRef<any>(null);
    const url = useNavigate()
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileData = e.target.result;

            };

            // Lưu trữ biến reader vào useRef
            readerRef.current = reader;

            reader.readAsDataURL(file);
            setSelectedFile(reader);
        }
    };
    const [addCategory] = useAddCategoryMutation();
    const { control, handleSubmit, setValue, getValues, register } = useForm();
    const onHandleSubmit = (data: ICategory) => {
        const name = getValues('name');
        const newData = {
            name:"ao",
            image: "data:image/jpeg;base64,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"
        }
        addCategory(newData)
        console.log(newData);
        url("/admin/categories")
    }

    return <div>
        <h2 className="text-5xl font-black text-gray-900 text-center mb-10">Add Category</h2>
        <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 ml-200 mr-200 ">
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
                                    onChange={handleFileChange} // Gắn sự kiện onChange để xử lý khi người dùng chọn tệp
                                />
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div>





}


export default AddCategory



