export interface Cart {
id:number;
items:CartItem[];
}
export interface CartItem {
    cartId?:number;
    name:string;
    description:string;
    imageUrl:string;
    chosenSize:string;
    productId:number;
    id:number;
    price:number;
    quantity:number
    totalPrice?:number;
}

const AddToCart = async (productId:number, name:string, imageUrl:string, description:string, price:number, chosenSize:string) => {
    const token = localStorage.getItem('accessToken');
   
    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Cart/AddToCart";
    const product = {
        productId,
        name,
        imageUrl,
        description,
        price,
        chosenSize
    }
    try{
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Failed to add to cart');
    }
 
    const cartItemId = await response.json();
  
    return cartItemId;
    }
    catch(error){
        console.error('Error adding to cart:', error);
    }
    }

const GetCart = async  () => {

    const token = localStorage.getItem('accessToken');
    
    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Cart";

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    };
    try {
        const response = await fetch(url, requestOptions);
        const Cart:Cart = await response.json();
        return Cart;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        
    }
}

const DecreaseItem = async  (cartItemId:number) => {

    const token = localStorage.getItem('accessToken');
    
    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Cart/DecreaseItem?cartItemId=" + cartItemId;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    };
    try {
        const response = await fetch(url, requestOptions);
        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        
    }
}

const DeleteItem = async  (cartItemId:number) => {

    const token = localStorage.getItem('accessToken');
    
    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Cart/DeleteFromCart?cartItemId=" + cartItemId;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    };
    try {
        const response = await fetch(url, requestOptions);
        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        
    }
}

const ResetCart = async  () => {

    const token = localStorage.getItem('accessToken');
    
    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Cart/ResetCart";

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    };
    try {
        const response = await fetch(url, requestOptions);
        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        
    }
}



export {GetCart, DecreaseItem, DeleteItem, AddToCart, ResetCart};