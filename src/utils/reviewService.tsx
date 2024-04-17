import { Product } from "@/types/product";

interface Review {
    id: string;
    rating: number;
    comment: string;
    productId: string;
    product: Product | null;
    appUserId?: string; 
}

export interface ReviewDto {
    appUser: {
        firstName: string;
        lastName: string;
        location: string | null;
        imageUrl: string | null;
        addresses: any | null;
        paymentDetails: any | null; 
        reviews: Review[]; 
    };
    comment: string;
    id: string;
    product:Product | null;
    productId: string;
    rating: number;
}

const GetReviewFromProductId = async (id:string) => {
let apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Review/review/' + id;

const reviews: ReviewDto[] = await fetch(apiRoute).then(res => res.json());

return reviews;
}
export default GetReviewFromProductId;