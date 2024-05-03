import { Product, ProductGroup } from "@/types/product";
import { GetProduct, GetProductGroup, getProductsFromCategory } from "@/utils/productService";
import { ReviewDto, GetReviewFromProductId } from "@/utils/reviewService";
import PdpContainer from "./PdpContainer";



async function getReviews(params:any) {
  const reviews: ReviewDto[] = await GetReviewFromProductId(params);
  return reviews;
}

async function getProductGroup(params:any) {
  const ProductGroup: ProductGroup = await GetProductGroup(params);
  return ProductGroup;
}

async function getProduct(params:any) {

  const fetchedProduct: Product = await GetProduct(params);
  return fetchedProduct;
}


export default async function ProductPage({ params }: { params: any }) {

  try {
    const reviewPromise = getReviews(params.slug);
    const productGroupPromise = getProductGroup(params.slug);
    const productPromise = getProduct(params.slug);

    const [review, productGroup, product] = await Promise.all([reviewPromise, productGroupPromise, productPromise]);
    if (!product) throw new Error('Failed to load product details.');

    const categoryName = product.parentCategory || product.categories?.[0]?.name || 'defaultCategory';
    const recommendedProducts: Product[] = await getProductsFromCategory(categoryName, product.genderType);

    return <PdpContainer fetchedProduct={product} productGroup={productGroup} reviews={review} recommendedProducts={recommendedProducts}/>;
  } catch (error) {
    console.error('Error in ProductPage:', error);
   
    return <div>Error loading page</div>;  
  }
}
