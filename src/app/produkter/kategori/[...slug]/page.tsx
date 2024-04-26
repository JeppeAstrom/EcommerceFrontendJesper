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





export default function CategoryPage({params}:any)  {

  const [childCategories, setChildCategories] = useState<ChildCategories[]>();
  const [categoryData, setCategoryData] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [parentCategory, setParentCategory] = useState<string>(params.slug.length > 1 ? params.slug[0] : undefined);

  useEffect(() => {
    const currentCategory = params.slug[params.slug.length - 1];
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
  }, []);

  return (
      <ProductRain
        parentCategory={parentCategory}
        childCategories={childCategories}
        category={currentCategory}
        products={categoryData}
      />
  );
};
