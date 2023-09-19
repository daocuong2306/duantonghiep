import { Link } from "react-router-dom"

const CategoryDashboard = () => {
    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-white-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-white-500 dark:text-white-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-white-900 border border-white-300 rounded-lg w-80 bg-white-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-while-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>
                <div>
                    <Link to="/admin/categories/add"><button className="bg-blue-400 p-[10px] rounded-lg text-bold text-white">Add new category</button></Link>
                </div>
                <table className="w-full text-sm text-left text-white-500 dark:text-white-400">
                    <thead className="text-xs text-white-700 uppercase bg-white-50 dark:bg-white-700 dark:text-white-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white-800 dark:focus:ring-offset-white-800 focus:ring-2 dark:bg-white-700 dark:border-white-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-white-800 dark:border-white-700  ">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white-800 dark:focus:ring-offset-white-800 focus:ring-2 dark:bg-white-700 dark:border-white-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black hover:text-blue-500">
                                Apple MacBook Pro 17"
                            </th>
                            
                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default CategoryDashboard