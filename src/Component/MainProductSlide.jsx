import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BANNERS = [
  { id: 1, image_url: "assets/banner.jpg", link: "/combo", is_active: false },
  {
    id: 2,
    image_url: "assets/banner.jpg",
    link: "/nuts",
    is_active: false,
  },
  {
    id: 3,
    image_url: "assets/banner.jpg",
    link: "/nuts",
    is_active: false,
  },
  {
    id: 4,
    image_url: "assets/banner.jpg",
    link: "/combo",
    is_active: false,
  },
  {
    id: 5,
    image_url: "assets/banner.jpg",
    link: "/dates",
    is_active: false,
  },
  {
    id: 6,
    image_url: "assets/banner.jpg",
    link: "/combo",
    is_active: true,
  },
  {
    id: 7,
    image_url: "assets/banner.jpg",
    link: "/dryfruits",
    is_active: true,
  },
  {
    id: 8,
    image_url: "assets/banner.jpg",
    link: "/dryfruits",
    is_active: true,
  },
  {
    id: 9,
    image_url: "assets/banner.jpg",
    link: "/dates",
    is_active: true,
  },
];

const MainProductSlide = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(media.matches);
    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  const filteredBanners = BANNERS.filter((b) =>
    isMobile ? b.is_active : !b.is_active,
  );

  return (
    <>
      <div className="w-full h-[550px] md:h-[400px] lg:h-[600px] overflow-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={filteredBanners.length > 1}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="w-full h-full"
        >
          {filteredBanners.map((banner) => {
            const isExternal = banner.link?.startsWith("http");

            return (
              <SwiperSlide
                key={banner.id}
                className="!flex justify-center items-center"
              >
                <div className="w-full h-full">
                  {!isExternal ? (
                    <Link to={banner.link} className="block w-full h-full">
                      <img
                        src={banner.image_url}
                        alt="Banner"
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={banner.image_url}
                        alt="Banner"
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    </a>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #000;
            background: rgba(255,255,255,0.7);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding:10px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px !important;
            font-weight: bold !important;
          }

          .swiper-pagination {
            bottom: 20px !important;
          }

          .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            background: #bbb;
            opacity: 1;
            margin: 0 5px !important;
            transition: all 0.4s ease;
          }

          .swiper-pagination-bullet-active {
            background: #92553D;
            transform: scale(1.6);
          }

          .swiper-pagination-bullet-active-main {
            transform: scale(1.8);
          }

          .swiper-pagination-bullet-active-prev,
          .swiper-pagination-bullet-active-next {
            transform: scale(1.3);
          }
        `}
      </style>
    </>
  );
};

export default MainProductSlide;
