import { useGetCategoriesQuery } from '../../../api/category'
import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product'
import { ICategory } from '../../../interface/category'
import { IProduct } from '../../../interface/product'
import { useAppDispatch } from '../../../store/hook'
import { Link } from 'react-router-dom'
import { FcFullTrash, FcSupport } from 'react-icons/fc'
import { useGetUserQuery } from '@/api/user'
const Dashboard = () => {
    const dispatch = useAppDispatch()
    const { data: products, isLoading } = useGetProductsQuery();
    console.log(products);

    const { data: categories } = useGetCategoriesQuery();
    const [deleteProduct] = useRemoveProductMutation()
    const deleteP = (id: number) => {
        const check = window.confirm("Are you sure you want to delete");
        if (check) {
            deleteProduct(id);
            alert("da xoa")
        }
    }
    console.log(isLoading);
    return (<div>
        {isLoading && <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>}
        {!isLoading && <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className='flex justify-between justify-center'>
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
                    <div >
                        <Link to="/admin/product/add"><button className="bg-blue-400 p-[10px] rounded-lg text-bold text-white">Add new product</button></Link>
                    </div>
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
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.product.map((product: IProduct['product'], index: number) => (
                                <tr
                                    key={index}
                                    className={`bg-white border-b ${index % 2 === 0 ? 'dark:bg-white-800 dark:border-white-700' : 'dark:bg-white-700 dark:border-white-600'}`}
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${index}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-white-800 dark:focus:ring-offset-white-800 focus:ring-2 dark:bg-white-700 dark:border-white-600"
                                            />
                                            <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black hover:text-blue-500">
                                        {product.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img className="h-20 w-50 rounded-lg" src={`http://127.0.0.1:8000${product?.image}`} alt="image description" />
                                    </td>
                                    <td className="px-6 py-4">{product.code}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">{product.description}</td>
                                    {categories?.categories.map((category: ICategory) => {
                                        if (category.id == product.id_category) {
                                            return <td className="px-6 py-4">{category.name}</td>
                                        }
                                    })}
                                    <td className="px-6 py-4">XS</td>
                                    <td className="px-6 py-4">White</td>
                                    <td className="px-6 py-4 ">
                                        <div className="flex ">
                                            <Link to={`/admin/product/update/${product?.id}`}>
                                                <FcSupport className='w-6 h-6 blue mr-2' />
                                            </Link>
                                            <Link to="">
                                                <FcFullTrash className='w-6 h-6' onClick={() => { deleteP(Number(product.id)) }} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>}
    </div >
    )
}

export default Dashboard