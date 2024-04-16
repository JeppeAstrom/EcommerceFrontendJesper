/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/app/context/cartContext";
import {
  GetProduct,
  GetProductGroup,
  getProductsFromCategory,
} from "@/utils/productService";
import { Product, ProductGroup } from "@/types/product";
import { usePathname, useSearchParams } from "next/navigation"; // Import from next/navigation instead of next/router
import Link from "next/link";
import Carousel from "@/components/carousel";
import { useRouter } from "next/router";
import CarouselPDP from "@/components/carouselPDP";
import Image from "next/image";
import ProductRain from "@/components/productrain";

const ProductPage = () => {
  const { handleAddToCart }: any = useContext(Context);
  const pageUrl = usePathname();
  const id = pageUrl.split("/").pop(); // Extract the id from the URL path

  const [fetchedProduct, setProduct] = useState<Product | null>(null);
  const [productGroup, setProductGroup] = useState<ProductGroup | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const fetchedProduct: Product = await GetProduct(id);
          const ProductGroup: ProductGroup = await GetProductGroup(id);
          const recommendedProducts: Product[] = await getProductsFromCategory(
            fetchedProduct.categories[0].name
          );
          setProduct(fetchedProduct);
          setProductGroup(ProductGroup);
          setRecommendedProducts(recommendedProducts);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    fetchData();
  }, [id]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setIsOpen(false);
  };
  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  if (!fetchedProduct) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto">
    <div className="flex w-3/4 justify-center items-center mx-auto mb-10">
      <div className="lg:flex w-full">
        <div className="aspect-[9/13] bg-white h-full w-full relative">
          <Carousel
            visibleSlidesCountDesktop={1}
            visibleSlidesCountMobile={1}
            visibleSlidesCountTablet={1}
            useProgressBar={true}
          >
            {fetchedProduct.images.map((image, index) => (
              <figure
                key={index}
                className="aspect-[9/13] bg-white min-h-full min-w-full"
              >
                <Image
                  className="min-w-full object-center h-full object-contain"
                  width={900}
                  height={1300}
                  alt={fetchedProduct.name}
                  src={image.imageUrl}
                />
              </figure>
            ))}
          </Carousel>
        </div>
        <div className="lg:p-4 lg:px-6 relative md:pt-2 pt-7">
          <span className="line-clamp-1 text-lg">{fetchedProduct.name}</span>
          <div className="mt-1">
            <span className="mt-4 text-lg font-semibold line-clamp-8 ">
              {fetchedProduct.description}
            </span>
          </div>
          <div className="pt-2">
            <span className="text-lg font-normal">
              {fetchedProduct.price} kr
            </span>
          </div>
          {productGroup?.products && productGroup.products.length > 0 && (
            <div className="pt-4 grid grid-cols-3 md:grid-cols-4 gap-4 w-[400px]">
              {productGroup.products.map((product, index) => (
                <Link
                  href={`/produkter/${product.id}`}
                  className="aspect-[9/13]"
                  key={index}
                >
                  <Image
                    className="w-full h-full object-contain object-center"
                    width={900}
                    height={1300}
                    alt={product.name}
                    src={product.images[0].imageUrl}
                  />
                  <div
                    className={`inline-block w-full  h-1 ${
                      product.id === fetchedProduct.id
                        ? "bg-black"
                        : "bg-gray-300"
                    }`}
                  ></div>
                </Link>
              ))}
            </div>
          )}
          <div className="pt-4">
            {fetchedProduct.sizes.length > 0 && (
              <div ref={wrapperRef} className="relative">
                <button
                  className="border w-full text-start pl-4 p-2"
                  onClick={toggleDropdown}
                >
                  {selectedSize || "Välj storlek"}
                </button>
                {isOpen && (
                  <ul className="absolute border-l border-r w-full bg-white z-[2] cursor-pointer">
                    {fetchedProduct.sizes.map((size, index) => (
                      <li
                        key={index}
                        className="p-3 border-b"
                        onClick={() => handleSizeSelect(size.size)}
                      >
                        {size.size}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="pt-4 flex justify-center items-center">
              <button onClick={() => handleAddToCart(fetchedProduct)} className="border w-full p-3 bg-black text-white font-semibold">
                Handla
              </button>
            </div>
          </div>
        </div>
      </div>
  
    </div>
        {recommendedProducts && (
          <div className="mb-10 px-8 py-4">
            <span className="font-semibold text-lg">Rekommenderade produkter</span>
            <Carousel
              visibleSlidesCountDesktop={5}
              visibleSlidesCountTablet={2}
              visibleSlidesCountMobile={1}
              useProgressBar={true}
            >
              {recommendedProducts.map((product, index) => (
                <Link
                href={`/produkter/${product.id}`}
                  className="aspect-[9/13] bg-white min-h-full min-w-full pt-4"
                  key={index}
                >
                  <Image
                    className="min-w-full object-center h-full object-contain"
                    width={900}
                    height={1300}
                    alt={product.name}
                    src={product.images[0].imageUrl}
                  />
                </Link>
              ))}
            </Carousel>
          </div>
        )}
        </div>
  );
};

export default ProductPage;
