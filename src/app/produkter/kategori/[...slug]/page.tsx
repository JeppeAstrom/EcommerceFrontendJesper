'use client'
import { GetAllProducts, getChildCategoriesFromName, getProductsFromCategory } from "@/utils/productService";
import CategoryContainer from "../categoryContainer";
import { useEffect, useState } from "react";
import page from "../../[slug]/page";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import Dropdown from "@/app/icons/dropdown";

export default function CategoryPage({ params }: { params: any }) {

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

  if (["Herr", "Dam", "Barn"].includes(params.slug.length > 1 ? params.slug[0] : undefined)) {
    gender = determineGender(params.slug.length > 1 ? params.slug[0] : undefined);
  } else if (["Herr", "Dam", "Barn"].includes(currentCategory)) {
    gender = determineGender(currentCategory);
  }

  const [categoryData, setCategoryData] = useState<Product[]>([]);
  const [childCategories, setChildCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const childCategoriesData = await getChildCategoriesFromName(currentCategory);
      setChildCategories(childCategoriesData);

      const data = await getProductsFromCategory(currentCategory, gender, currentPage);
      setCategoryData(data);
    }

    fetchData();
  }, [currentCategory, gender, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };


  return(
    <div>
      <CategoryContainer currentCategory={params.slug[params.slug.length - 1]} categoryData={categoryData} childCategories={childCategories} parentCategory={params.slug.length > 1 ? params.slug[0] : undefined} />
      <div className="flex w-full items-center justify-center gap-2 mb-10">
          <button
            className={`p-3 font-semibold text-white  ${
              currentPage === 1 ? "opacity-50" : ""
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <button className="items-center flex">
              <Dropdown className="w-9 h-9 rotate-90" />
            </button>
          </button>
          <span>{`Sida ${currentPage}`}</span>
          <button
            className="p-3 font-semibold text-white "
            onClick={handleNextPage}
          >
            <button className="items-center flex" style={{ transform: "rotate(270deg)" }}>
              <Dropdown className="w-9 h-9" />
            </button>
          </button>
        </div>
      </div>
  )

}