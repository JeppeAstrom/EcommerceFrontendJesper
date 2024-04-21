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

const PostReview = async (rating:number, comment:string, productId:number) => {
    const token = localStorage.getItem('accessToken');

    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Review/postReview";
    const Review = {
        rating,
        comment,
        productId,
    }
    try{
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(Review)
    });
    if (!response.ok) {
        throw new Error('Failed to post review');
    }
    return response
    }
    catch(error){
        console.error('Error posting review:', error);
    }
    }



export  {GetReviewFromProductId, PostReview};