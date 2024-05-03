import {  Product } from "@/types/product";

    
    const RemoveFromFavourites = async (productId:number) => {
        const token = localStorage.getItem('accessToken');
       
        const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Favourite/" + productId;
    
        try{
        const response = await fetch(url, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Failed to remove from favourites');
        }
        return response;
        }
        catch(error){
           
        }
        }
    
    const GetFavourites = async  () => {
    
        const token = localStorage.getItem('accessToken');
        
        const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Favourite";
    
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        };
        try {
            const response = await fetch(url, requestOptions);
            const favourites:Product[] = await response.json();
            return favourites;
        } catch (error) {
          
            
        }
    }
    
    const AddToFavourites = async  (productId:number) => {
    
        const token = localStorage.getItem('accessToken');
        
        const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Favourite?productId=" + productId;
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        };
        try {
            const response = await fetch(url, requestOptions);
            return response;
        } catch (error) {
        
            
        }
    }
    
    export {AddToFavourites, RemoveFromFavourites, GetFavourites};