"use client";
import Carousel from "@/components/carousel";
import ProductRain from "@/components/productrain";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Promotion } from "@/types/promotion";
import { GetAllProducts, getMainCategories } from "@/utils/productService";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowLeft from "./icons/arrowleft";
import Dropdown from "./icons/dropdown";
const promotion: Promotion[] = [
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://hips.hearstapps.com/hmg-prod/images/adam-sandler-is-seen-at-jimmy-kimmel-live-on-june-01-2022-news-photo-1656425616.jpg",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://media.gq.com/photos/59230af034edbe5f3532edd0/master/w_1600%2Cc_limit/adam-sandler.jpg",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://media.gq-magazine.co.uk/photos/644663a9d8c083bf85028de7/master/w_1600%2Cc_limit/GettyImages-1252110511.jpg",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://hollywoodlife.com/wp-content/uploads/2023/03/adam-sandler-style-mega-07.jpg",
  },
];

const Home = () => {
  const productRainRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getMainCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  // const mounted = useRef(false);
  useEffect(() => {
    // if (!mounted.current) {
    //   mounted.current = true;
    //   return;
    // }
    const fetchProducts = async (pageNum: number) => {
      setLoading(true);
      
        const productList = await GetAllProducts(pageNum, pageSize);
        setProducts(prevProducts => [...prevProducts, ...productList]);
     
      setLoading(false);
    };
    fetchProducts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="px-4">
      <div className="mb-10 mt-6">
        <span className="text-2xl pl-1">Sandler kollektionen</span>
        <Carousel
          visibleSlidesCountDesktop={2}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
          scrollByItself={true}
        >
          {promotion.map((promo, index) => (
            <figure
              className="aspect-[9/13] bg-white min-h-full min-w-full pt-3"
              key={index}
            >
              <Image
                className="min-w-full object-center h-full object-fill"
                width={900}
                height={1300}
                alt={promo.promotionTitle}
                src={promo.promotionImage}
              />
            </figure>
          ))}
        </Carousel>
      </div>
      <div className="mb-10">
        <span className="text-2xl pl-1">Våra kategorier</span>

        <div className="relative">
          <Carousel
            visibleSlidesCountDesktop={4}
            visibleSlidesCountTablet={3}
            visibleSlidesCountMobile={2}
          >
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col min-h-full">
                <Link
                  href={`/produkter/kategori/${category.name}`}
                  className="aspect-[9/13] bg-white h-full min-w-full pt-4"
                >
                  <Image
                    className="min-w-full object-center h-full object-fill"
                    width={900}
                    height={1300}
                    alt={category.name}
                    src={category.imageUrl}
                  />
                </Link>
                <Link
                  href={`/produkter/kategori/${category.name}`}
                  className="mt-4 text-normal pl-1  font-semibold border-b w-fit border-black pb-1"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div ref={productRainRef} className="pt-10">
        <span className="text-xl md:text-2xl pl-1  border-b border-black pb-2 md:ml-20 ml-2">
          Nyheter
        </span>
        <ProductRain products={products} />

        {!loading && (
  <div className="flex w-full items-center justify-center gap-2 mb-10">

    <button
        className="p-3 font-semibold bg-black text-white px-6"
      onClick={handleNextPage}
    >
      Visa mer
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default Home;
