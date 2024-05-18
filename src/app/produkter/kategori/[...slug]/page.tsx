"use client";
import {
  GetAllProducts,
  getChildCategoriesFromName,
  getProductsFromCategory,
} from "@/utils/productService";
import CategoryContainer from "../categoryContainer";
import { useEffect, useRef, useState } from "react";
import page from "../../[slug]/page";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import Dropdown from "@/app/icons/dropdown";
import LoadingSpinner from "@/components/spinners/loadingSpinner";

export default function CategoryPage({ params }: { params: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState(1);
  const currentCategory = params.slug[params.slug.length - 1];
  let gender = 0;

  const determineGender = (category: string) => {
    switch (category) {
      case "Herr":
        return 1;
      case "Dam":
        return 2;
      case "Barn":
        return 3;
      default:
        return 0; // default case to handle undefined or unexpected categories
    }
  };

  if (
    ["Herr", "Dam", "Barn"].includes(
      params.slug.length > 1 ? params.slug[0] : undefined
    )
  ) {
    gender = determineGender(
      params.slug.length > 1 ? params.slug[0] : undefined
    );
  } else if (["Herr", "Dam", "Barn"].includes(currentCategory)) {
    gender = determineGender(currentCategory);
  }

  const [categoryData, setCategoryData] = useState<Product[]>([]);
  const [childCategories, setChildCategories] = useState([]);
  const [productCount, setProductCount] = useState<number>();
//test
  // const mounted = useRef(false);
  useEffect(() => {
    // if (!mounted.current) {
    //   mounted.current = true;
    //   return;
    // }
    
    async function fetchData() {
      const childCategoriesData = await getChildCategoriesFromName(
        currentCategory
      );
      setChildCategories(childCategoriesData);

      const data:any = await getProductsFromCategory(
        currentCategory,
        gender,
        currentPage
      );
      setProductCount(data.productCount);
      setCategoryData(prevProducts => [...prevProducts, ...data.products]);
      setIsLoading(false);
    }

    fetchData();
  }, [currentCategory, gender, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  
  const IsMoreProducts = () => {
    const currentAmount = currentPage * 12;
    if(productCount && currentAmount < productCount){
      return true
    }
    else{
      return false;
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <CategoryContainer
        currentCategory={params.slug[params.slug.length - 1]}
        categoryData={categoryData}
        childCategories={childCategories}
        parentCategory={params.slug.length > 1 ? params.slug[0] : undefined}
      />
      {IsMoreProducts() && (
        <div className="flex w-full items-center justify-center gap-2 mb-10">
          <button
     
            className="p-3 font-semibold text-white bg-black px-6"
            onClick={handleNextPage}
          >
            Visa mer
          </button>
        </div>
      )}
    </div>
  );
}
