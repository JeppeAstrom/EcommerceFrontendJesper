
const PostAddress = async (firstName:string, lastName:string, street:string, postalCode:string, city:string) => {
const token = localStorage.getItem('accessToken');

const url = "https://wa-okx-jesper-aa.azurewebsites.net/api/Address";
const AddressSchema = {
    firstName,
    lastName,
    street,
    postalCode,
    city
}
try{
const response = await fetch(url, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(AddressSchema)
});
if (!response.ok) {
    throw new Error('Failed to post address');
}
const responseData = await response.json();
const addressId = responseData;

return addressId;
}
catch(error){
    console.error('Error posting address:', error);
}
}

export interface Address {
id:number;
firstName: string;
lastName:string;
street:string;
postalCode:string;
city:string;
}
const GetAddress = async () => {

    const token = localStorage.getItem('accessToken');
    const apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Address/address';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    };
    try {
        const response = await fetch(apiRoute, requestOptions);
        const address:Address = await response.json();
        return address;
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
};

export  {PostAddress, GetAddress};