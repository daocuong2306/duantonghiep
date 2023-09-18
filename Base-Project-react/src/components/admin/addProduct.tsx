

const AddProduct = () => {

    return <div>
        <h2 className="text-5xl font-black text-gray-900 text-center mb-10">Add Product</h2>
        <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 ml-200 mr-200 ">
            <div className="col-span-1">
                <img className="h-40 w-80 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLs3s-DKPsQYMxVOJnqHnBzM4KhkkG9D6I7HZFw1Qcg&s" alt="image description" />
            </div>
            <div>
                <div className="col-span-2">
                    <form>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Product Name</label>
                        <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Product Name" required />
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Price</label>
                            <input type="number" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Price" required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Description</label>
                            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-white-900 bg-white-50 border border-white-300 focus:ring-white-500 focus:border-white-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-gray dark:focus:ring-white-500 dark:focus:border-white-500" placeholder="Leave a description..."></textarea>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <fieldset>
                                <legend className="sr-only">Countries</legend>
                                <div className="flex items-center mb-4">
                                    <input id="country-option-1" type="radio" name="countries" value="USA" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-black-500">
                                        United States
                                    </label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input id="country-option-2" type="radio" name="countries" value="Germany" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-black-300">
                                        Germany
                                    </label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input id="country-option-3" type="radio" name="countries" value="Spain" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="country-option-3" className="block ml-2 text-sm font-medium text-gray-900 dark:text-black-300">
                                        Spain
                                    </label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input id="country-option-4" type="radio" name="countries" value="United Kingdom" className="w-4 h-4 border-black-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="country-option-4" className="block ml-2 text-sm font-medium text-gray-900 dark:text-black-300">
                                        United Kingdom
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Product Code</label>
                                <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Product Code" required />
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Quantity</label>
                                <input type="number" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Quantity" required />
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray" htmlFor="user_avatar">Upload file</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white-50 dark:text-gray-400 focus:outline-none dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div>





}

export default AddProduct



