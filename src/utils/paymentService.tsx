
const PostPayment = async (cardName:string, CardNumber:string, Cvv:string, ExpDate:string) => {
    const token = localStorage.getItem('accessToken');
    
    const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Payment";
    const PaymentSchema = {
        cardName,
        CardNumber,
        Cvv,
        ExpDate,
    }
    try{
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(PaymentSchema)
    });
    if (!response.ok) {
        throw new Error('Failed to post address');
    }
    const responseData = await response.json();
    const paymentId = responseData;
    return paymentId;
    }
    catch(error){
        console.error('Error posting address:', error);
    }
    }

    export interface PaymentDetail {
    id:number;
    cardName:string;
    cardNumber: string;
    cvv:string
    expDate:string;
    }

    const GetPayment = async () => {

        const token = localStorage.getItem('accessToken');
        const apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Payment/paymentdetail';
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        };
        try {
            const response = await fetch(apiRoute, requestOptions);
            const payment:PaymentDetail = await response.json();
            return payment;
        } catch (error) {
            console.error('Error fetching payment:', error);
            return null;
        }
    };


    export  {PostPayment, GetPayment};