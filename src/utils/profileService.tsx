const GetProfile = async () => {
    const token = localStorage.getItem('accessToken');
    let api = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Profile';

    try{
        const response = await fetch(api, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if(!response.ok){
            return [];
        }
        const profile = response.json();
        return profile;
    }
    catch(error){
        return [];
    }
}
export default GetProfile;