
const PostOrder = async (paymentDetailId:number, addressId:number, totalPrice:number) => {
    const token = localStorage.getItem('accessToken');

    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Order";
    const OrderSchema = {
        paymentDetailId,
        addressId,
        totalPrice,
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
        throw new Error('Failed to post address');
    }
    const responseData = await response.json();
    const orderId = responseData;
    return orderId;
    }
    catch(error){
        console.error('Error posting address:', error);
    }
    }
    export default PostOrder;