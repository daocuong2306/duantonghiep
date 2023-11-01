import { useState, useEffect } from 'react';
import { useGetDataQuery } from "@/api/home";
import { Link } from 'react-router-dom';

const Banner = (props: Props) => {
    const { data, isLoading } = useGetDataQuery();
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const token = localStorage.getItem("header");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % (data?.data.banner.length || 1));
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [data]);

    const bannerStyle = {
        transition: "transform 1s, opacity 1s",
        opacity: 0,
    };

    if (data) {
        bannerStyle.opacity = 1;
    }

    return (
        <div className="banner-container">
            {data?.data.banner.map((banner, index) => (
                <section
                    key={index}
                    style={{
                        ...bannerStyle,
                        backgroundImage: `url(${banner.image})`,
                        display: index === currentBannerIndex ? 'block' : 'none',
                        transform: `translateX(${(index - currentBannerIndex) * 100}%)`, // Trượt từ trái sang phải
                    }}
                    className="relative bg-cover bg-center bg-no-repeat"
                >
                    <div
                        className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                    ></div>

                    <div
                        className="relative mx-auto max-w-screen-xl px-4 pt-60 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                    >
                        <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
                            <h1 className="text-3xl font-extrabold sm:text-5xl text-[#00ccff]">
                                Lựa chọn thỏa thích
                                <strong className="block font-extrabold text-[#00ccff]">
                                    Hãy đến với Brite Shop
                                </strong>
                            </h1>
                            <div className="mt-8 flex flex-wrap gap-4 text-center">
                                {token ? "" : (
                                    <Link
                                        to="/login"
                                        className="block w-full rounded bg-[#00ccff] px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-[#00ccff] focus:outline-none focus:ring active:bg-[#00ccff] active:text-white sm:w-auto"
                                    >
                                        Đăng nhập
                                    </Link>
                                )}
                                <a
                                    href="#"
                                    className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#00ccff] shadow hover:text-white hover:bg-[#00ccff]  focus:outline-none focus:ring active:text-[#00ccff] active-bg-white sm:w-auto"
                                >
                                    Sản phẩm
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default Banner;
