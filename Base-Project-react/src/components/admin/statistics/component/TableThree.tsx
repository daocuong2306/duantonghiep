const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
      <h1>Thống kê theo loại</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left ">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black  xl:pl-11">
                Loại
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                Tổng bán
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                Tỉ lệ
              </th>
              <th className="py-4 px-4 font-medium text-black ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11 ">
                <h5 className="font-medium text-black flex">
                  <img src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp' className="w-10" alt="" />
                  Áo
                </h5>
                <p className="text-sm">11 Sản phẩm</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 ">
                <p className="text-black ">11Tr</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 ">
                <p >
                  11%
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 ">

              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
