
import {
  ChildCategories,

} from "@/utils/productService";
import ProductRain from "@/components/productrain";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { NextPage } from "next";




interface Props {
childCategories:ChildCategories[];
categoryData:Product[];
currentCategory:string;
parentCategory:string;
}

const CategoryContainer:NextPage<Props> = ({childCategories, categoryData, currentCategory, parentCategory}) => {

  return (
      <ProductRain
        parentCategory={parentCategory}
        childCategories={childCategories}
        category={currentCategory}
        products={categoryData}
      />
  );
};
export default CategoryContainer;
