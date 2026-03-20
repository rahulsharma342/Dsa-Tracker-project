import axios from 'axios';

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true,
});

export const registerUser=async({name,email,password})=>{
    try {
        const response=await api.post('/api/auth/register',{name,email,password});
        return response.data;
    } catch (error){
        throw error.response?.data || { message: "Registration failed. Please try again." };
    }
};

export const loginUser=async({email,password})=>{
    try {
        const response=await api.post('/api/auth/login',{email,password});
        return response.data;
    } catch (error){
        throw error.response.data;
    }
};


export const logoutUser=async()=>{
    try {
        const response=await api.post('/api/auth/logout');
        return response.data;
    } catch (error){
        throw error.response.data;
    }
};

export const getCurrentUser=async()=>{
    try {
        const response=await api.get('/api/auth/get-me');
        return response.data;
    } catch (error){
        throw error.response.data;
    }
};