import { Product, ProductGroup } from "@/types/product";
import { GetProduct, GetProductGroup, getProductsFromCategory } from "@/utils/productService";
import { ReviewDto, GetReviewFromProductId } from "@/utils/reviewService";
import PdpContainer from "./PdpContainer";

export default async function ProductPage({ params }: { params: any }) {
  const fetchedProduct: Product = await GetProduct(params.slug);
  const ProductGroup: ProductGroup = await GetProductGroup(params.slug);
  const reviews: ReviewDto[] = await GetReviewFromProductId(params.slug);
  const recommendedProducts: Product[] = await getProductsFromCategory(
    fetchedProduct.categories[0].name, fetchedProduct.genderType
  );

  return(
      <PdpContainer fetchedProduct={fetchedProduct} productGroup={ProductGroup} reviews={reviews} recommendedProducts={recommendedProducts}/>
  )
}