import { getChildCategoriesFromName, getProductsFromCategory } from "@/utils/productService";
import CategoryContainer from "../categoryContainer";

export default async function CategoryPage({ params }: { params: any }) {
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

  const childCategoriesData = await getChildCategoriesFromName(
    currentCategory
  );

  const data = await getProductsFromCategory(currentCategory, gender);

  return(
      <CategoryContainer currentCategory={params.slug[params.slug.length - 1]} categoryData={data} childCategories={childCategoriesData} parentCategory={params.slug.length > 1 ? params.slug[0] : undefined} />
  )

}