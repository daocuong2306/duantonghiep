type Props = {}

const Banner = (props: Props) => {
    return (
        <section
            className="relative bg-[url(https://binbadecor.vn/wp-content/uploads/2022/03/mau-shop-quan-ao-dep-5.jpg)] bg-cover bg-center bg-no-repeat"
        >
            <div
                className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-[#00ccff]">
                       Lựa chọn thỏa thích
                        <strong className="block font-extrabold text-[#00ccff]">
                            Hãy đến với Brite Shop
                        </strong>
                    </h1>
                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a
                            href="#"
                            className="block w-full rounded bg-[#00ccff] px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto"
                        >
                           Xem thêm
                        </a>

                        <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#00ccff] shadow hover:text-white hover:bg-[#00ccff]  focus:outline-none focus:ring active:text-[#00ccff] active:bg-white sm:w-auto"
                        >
                            Sản phẩm
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner