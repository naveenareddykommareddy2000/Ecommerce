import axios from 'axios';

const API_URL='https://fakestoreapi.com';

export const fetchProducts=async()=>{
    try{
        const response=await axios.get(`${API_URL}/products`);
        return response.data;
    }catch(error){
        console.error("Error fetching Products:" , error);
    }  
}

export const fetchProductsById=async(id)=>{
    try{
        const response=await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    }catch(error){
        console.error("Error Fetching Product id: ",error);
    }
}