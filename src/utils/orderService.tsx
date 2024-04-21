import { Product } from "@/types/product";

const PostOrder = async (paymentDetailId:number, addressId:number, totalPrice:number, orderProducts:any) => {
    const token = localStorage.getItem('accessToken');

    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Order";
    const OrderSchema = {
        paymentDetailId,
        addressId,
        totalPrice,
        orderProducts
    }
    try{
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(OrderSchema)
    });
    if (!response.ok) {
        throw new Error('Failed to post order');
    }
    const responseData = await response.json();
    const orderId = responseData;
    return orderId;
    }
    catch(error){
        console.error('Error posting address:', error);
    }
    }

   export interface OrderProduct {
        id: string; 
        product: Product;
        size?: string; 
      }
      
    export  interface Order {
        id: string;
        orderProducts: OrderProduct[];
      }
      
      export type OrderHistory = Order[];
    const GetOrders = async () => {
        const token = localStorage.getItem('accessToken');
    
        const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Order/getOrderHistory";
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        };
        try {
            const response = await fetch(url, requestOptions);
            const Orders:OrderHistory[]  = await response.json();
            return Orders;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            
        }
    }
    


    export  {PostOrder, GetOrders};