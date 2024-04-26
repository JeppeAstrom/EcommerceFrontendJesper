"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  ChildCategories,
  getChildCategoriesFromName,
  getProductsFromCategory,
} from "@/utils/productService";
import ProductRain from "@/components/productrain";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";





const CategoryPage = () => {
  const pathname = usePathname();
  const [childCategories, setChildCategories] = useState<ChildCategories[]>();
  const [categoryData, setCategoryData] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [parentCategory, setParentCategory] = useState<string>();
  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean); // Split and remove empty strings
    const currentCategory = pathSegments[pathSegments.length - 1];
    const parentCategory = pathSegments[pathSegments.length - 2];

    if (parentCategory !== "kategori") {
      setParentCategory(parentCategory);
    }

    setCurrentCategory(currentCategory);
    const fetchData = async () => {
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
      if (["Herr", "Dam", "Barn"].includes(parentCategory)) {
        gender = determineGender(parentCategory);
      } else if (["Herr", "Dam", "Barn"].includes(currentCategory)) {
        gender = determineGender(currentCategory);
      }

      const childCategoriesData = await getChildCategoriesFromName(
        currentCategory
      );
      const data = await getProductsFromCategory(currentCategory, gender);
      setCategoryData(data);
      setChildCategories(childCategoriesData);
    };
    fetchData();
  }, [pathname]);

  return (
    <>
      <ProductRain
        parentCategory={parentCategory}
        childCategories={childCategories}
        category={currentCategory}
        products={categoryData}
      />
    </>
  );
};
export default CategoryPage;
