import axios from "../api/axios"

export const RegisterAPI = async (userName,email,password) => {

    try{
            const data = await axios.post('account/register',{
                Username:userName,
                Email:email,
                Password:password
            });
            return data;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log(error?.response?.data?.errors)
        }
    }
};

export const loginAPI = async (userName,password) => {

    try{
            const data = await axios.post('account/login',{
                userName,
                password
            });
            return data;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log(error?.response?.data?.errors)
        }
    }
};