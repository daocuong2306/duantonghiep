import { useListStatisticalQuery } from '@/api/statistics';
import BrandOne from '../images/brand/brand-01.svg';
import BrandTwo from '../images/brand/brand-02.svg';
import BrandThree from '../images/brand/brand-03.svg';
import BrandFour from '../images/brand/brand-04.svg';
import BrandFive from '../images/brand/brand-05.svg';

const TableOne = () => {
  const { data: statisData, isLoading } = useListStatisticalQuery()
  console.log(statisData?.product);
  const products = statisData?.product;
  const sortedProducts = Array.isArray(products)
    ? [...products].sort((a, b) => b.quantity - a.quantity)
    : [];
  console.log(sortedProducts);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">
        Top Channels
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tên sản phẩm
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Giá
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mã sản phẩm
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Số lượng bán
            </h5>
          </div>
        </div>

        {sortedProducts?.map((product: any) => (
          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {/* Use the actual product image */}
                <img src={`http://127.0.0.1:8000${product.product_info.image}`} alt="Product" className="w-8 h-8 rounded-full" />
              </div>
              <p className="text-black sm:block">{product.product_info.name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">${product.product_info.price}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{product.product_info.code}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black">{product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default TableOne;
