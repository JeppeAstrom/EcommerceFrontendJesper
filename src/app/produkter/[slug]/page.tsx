/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/app/context/cartContext";
import {
  ChildCategories,
  GetProduct,
  GetProductGroup,
  getChildCategoriesFromName,
  getProductsFromCategory,
} from "@/utils/productService";
import { Categories, Product, ProductGroup } from "@/types/product";
import { usePathname } from "next/navigation"; // Import from next/navigation instead of next/router
import Link from "next/link";
import Carousel from "@/components/carousel";

import Image from "next/image";

import { GetReviewFromProductId, ReviewDto } from "@/utils/reviewService";
import Star from "@/app/icons/star";
import HeartIcon from "@/app/icons/hearticon";
import LoadingSpinner from "@/components/spinners/loadingSpinner";
import Dropdown from "@/app/icons/dropdown";
import CartIcon from "@/app/icons/cartIcon";

const ProductPage = () => {
  const {
    handleAddToCart,
    addProductToFavouritesLocalStorage,
    getFavouritesFromLocalStorage,
  }: any = useContext(Context);
  const pageUrl = usePathname();
  const id = pageUrl.split("/").pop(); // Extract the id from the URL path

  const [fetchedProduct, setProduct] = useState<Product | undefined>();
  const [productGroup, setProductGroup] = useState<ProductGroup | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>();
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  const reviewRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const fetchedProduct: Product = await GetProduct(id);
          const ProductGroup: ProductGroup = await GetProductGroup(id);
          const reviews: ReviewDto[] = await GetReviewFromProductId(id);
          const recommendedProducts: Product[] = await getProductsFromCategory(
            fetchedProduct.categories[0].name
          );
      
          setProduct(fetchedProduct);
          setProductGroup(ProductGroup);
          setReviews(reviews);
          setRecommendedProducts(recommendedProducts);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    fetchData();
  }, [id]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [swatchAmount, setSwatchAmount] = useState<number>();
  useEffect(() => {
    if (window.innerWidth) {
      setSwatchAmount(window.innerWidth > 0 && window.innerWidth < 768 ? 3 : 4);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageScore = totalScore / reviews.length;
  

  const stars = (score: number, showNumber = true) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(<Star key={i} filled={i <= score} />);
    }
    return (
      <button onClick={scrollToReviews} className="flex flex-col">
        {showNumber && (
          <span className="ml-auto font-light text-slate-700">{`${score} av 5`}</span>
        )}
        <span className="flex">{stars}</span>
      </button>
    );
  };

  const scrollToReviews = () => {
    reviewRef.current?.scrollIntoView({'behavior': 'smooth'});
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [isReviewsExpanded, setReviewsExpanded] = useState(false);

  const visibleProducts =
    productGroup && productGroup.products
      ? isExpanded
        ? productGroup.products
        : productGroup.products.slice(0, swatchAmount || 3)
      : [];

  const visibleReviews =
    reviews && reviews
      ? isReviewsExpanded
        ? reviews
        : reviews.slice(0, 2)
      : [];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setIsOpen(false);
  };
  useEffect(() => {
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
 
  const [favourite, setFavourite] = useState<boolean>(false);
  const toggleFavourite = () => {
    addProductToFavouritesLocalStorage(fetchedProduct);
    setFavourite(!favourite);
  };
  useEffect(() => {
    const favouriteProducts: Product[] = getFavouritesFromLocalStorage();
    setFavourite(favouriteProducts.some((p) => p.id === fetchedProduct?.id));
  }, [getFavouritesFromLocalStorage, fetchedProduct?.id]);

  const addToCart = (product:Product, chosenSize:string |null) => {
    const productWithSize = {
      ...product,
      chosenSize: chosenSize
    };
    handleAddToCart(productWithSize);
  }

 
  if (!fetchedProduct) {
    return (
 <LoadingSpinner/>
    );
  }

  return (
    <div className="mx-auto px-4">
      <div className="flex w-full justify-center items-center mx-auto mb-10">
        <div className="lg:flex w-full">
          <Carousel
            visibleSlidesCountDesktop={1}
            visibleSlidesCountMobile={1}
            visibleSlidesCountTablet={1}
            useProgressBar={true}
          >
            {fetchedProduct.images.map((image, index) => (
              <figure
                key={index}
                className="lg:aspect-13/9 aspect-9/13 bg-neutral-100 min-h-full w-full"
              >
                <HeartIcon
                  favourite={favourite}
                  onClick={toggleFavourite}
                  className="h-12 w-12 absolute top-0 right-2"
                />
                <Image
                  className="min-w-full object-center max-h-full object-contain"
                  width={900}
                  height={1300}
                  alt={fetchedProduct.name}
                  src={image.imageUrl}
                />
              </figure>
            ))}
          </Carousel>

          <div className="lg:p-4 w-full lg:px-6 relative md:pt-2 pt-7">
            <span className="line-clamp-1 text-lg font-light">
              {fetchedProduct.name}
            </span>
            <div className="mt-1">
              <span className="mt-4 text-xl font-semibold line-clamp-8">
                {fetchedProduct.description}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-lg font-semibold">
                {fetchedProduct.price} kr
              </span>
              {reviews && reviews.length > 0 && stars(averageScore)}
            </div>

            <>
              {productGroup?.products &&
                productGroup.products.length > 1 &&
                visibleProducts && (
                  <div className="pt-4 grid grid-cols-3 md:grid-cols-4 gap-4 lg:w-[320px] justify-evenly items-center">
                  {
                    [...visibleProducts]
                      .sort((a, b) => {
                        if (a.id === fetchedProduct.id) return -1;
                        if (b.id === fetchedProduct.id) return 1;
                        return 0;
                      })
                      .map((product) => (
                        <Link
                          href={`/produkter/${product.id}`}
                          className="aspect-[9/13]"
                          key={product.id}
                        >
                          <Image
                            className="w-full h-full object-contain object-center"
                            width={900}
                            height={1300}
                            alt={product.name}
                            src={product.images[0].imageUrl}
                          />
                          <div
                            className={`inline-block w-full h-[2px] ${
                              product.id === fetchedProduct.id ? "bg-black" : "bg-gray-300"
                            }`}
                          ></div>
                        </Link>
                      ))
                  }
                </div>
                
                )}
              {productGroup &&
                Array.isArray(productGroup.products) &&
                productGroup?.products.length > 3 &&
                !isExpanded &&
                visibleProducts?.length !== productGroup.products.length && (
                  <button
                    className="text-center py-2 border-b border-black font-semibold px-1 text-sm"
                    onClick={() => setIsExpanded(true)}
                  >
                    Visa mer
                  </button>
                )}
              {productGroup &&
                Array.isArray(productGroup.products) &&
                productGroup?.products.length > 3 &&
                isExpanded && (
                  <button
                    className="text-center py-2 border-b border-black font-semibold px-1 text-sm"
                    onClick={() => setIsExpanded(false)}
                  >
                    Visa mindre
                  </button>
                )}
            </>
            <div className="pt-4">
              {fetchedProduct.sizes.length > 0 && (
                <div ref={wrapperRef} className="relative">
                  <button
                    className="border w-full text-start pl-4 p-2 flex justify-between items-center"
                    onClick={toggleDropdown}
                  >
                    <div className="flex items-center justify-center gap-1">
                    <span className="text-gray-700 font-sans">Storlek: </span> <span className="text-black font-sans">  {selectedSize || fetchedProduct.sizes[0].size}</span>
                    </div>
                    <Dropdown className={`w-8 h-8 ${isOpen ? 'rotate-180 transition-all' : 'transition-all'}`}/>
                  </button>
                  {isOpen && (
                    <ul className="absolute border-l border-r w-full bg-white z-[2] cursor-pointer">
                      {fetchedProduct.sizes.map((size, index) => (
                        <li
                          key={index}
                          className="p-3 border-b gap-1"
                          onClick={() => handleSizeSelect(size.size)}
                        >
                         <span className="text-gray-700 font-sans">Storlek:</span> <span className="text-black font-sans"> {size.size}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="pt-4 flex justify-center items-center">
                <button
                  onClick={() => addToCart(fetchedProduct, selectedSize ? selectedSize : fetchedProduct.sizes.length > 0 ? fetchedProduct.sizes[0].size : null)}
                  className="border w-full p-3 bg-black text-white font-semibold"
                >
                  Handla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visibleReviews && visibleReviews.length > 0 && (
        <div ref={reviewRef} className="flex flex-col gap-6 w-full md:w-[500px] px-4 mb-10 pt-4">
          <span className="font-sans text-2xl border-b border-black pb-2 w-fit font-semibold">Recensioner</span>
          {visibleReviews.map((review, index) => (
            <div key={index}>
              <div className="flex flex-col w-full">
                <span className="pb-2 font-semibold">
                  {review.appUser.firstName}
                </span>
                {stars(review.rating, false)}
              </div>
              <p className="pt-4 font-light text-sm">{fetchedProduct.name}</p>
              <p className="pt-2">{review.comment}</p>
            </div>
          ))}
          {visibleReviews && !isReviewsExpanded && reviews.length > 2 && (
            <button
              className="text-center py-2 border-b border-black font-semibold px-1 text-sm w-[70px]"
              onClick={() => setReviewsExpanded(true)}
            >
              Visa mer
            </button>
          )}
          {visibleReviews && isReviewsExpanded && reviews.length > 2 && (
            <button
              className="text-center py-2 border-b border-black font-semibold px-1 text-sm w-[90px]"
              onClick={() => setReviewsExpanded(false)}
            >
              Visa mindre
            </button>
          )}
        </div>
      )}
      {recommendedProducts && (
        <div className="mb-10 py-4">
          <span className="font-semibold text-lg">
            Rekommenderade produkter
          </span>
          <Carousel
            visibleSlidesCountDesktop={5}
            visibleSlidesCountTablet={2}
            visibleSlidesCountMobile={1}
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
