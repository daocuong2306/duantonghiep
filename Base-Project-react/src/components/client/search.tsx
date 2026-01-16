import { useGetProductsQuery } from "@/api/product";
import { useState } from "react";

const Search = () => {
    const [find, setFind] = useState({});
    const { data: products, isLoading } = useGetProductsQuery(find);
    console.log(products);

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
        console.log(searchTerm);

        const filteredProducts = products?.product.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log(filteredProducts);

    }
    return (
        <div className="flex items-center pl-[70%]">
            <input
                type="text"
                className="border rounded-l py-2 px-4 outline-none"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white hover:bg-blue-700 rounded-r py-2 px-4"
                onClick={handleSearch}
            >
                Tìm kiếm
            </button>
        </div>
    );
}

export default Search