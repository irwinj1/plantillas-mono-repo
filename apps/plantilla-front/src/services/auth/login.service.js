import api from "../../utils/axios.js";

const login = async (form) => {
    try{
        const response = await api.post('auth/login', form);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

export {
    login
}
