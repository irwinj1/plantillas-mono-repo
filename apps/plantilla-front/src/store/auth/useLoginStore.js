import {defineStore} from 'pinia';
import {login} from '../../services/auth/login.service.js';
import {jwtDecode} from 'jwt-decode';

export const useLoginStore = defineStore('login', {
  state: () => ({
    formulario: {
      email: '',
      password: ''
    }
  }),
  actions: {
    async submit() {
      try{
        const response = await login(this.formulario);
        
        if (response && response?.data?.token) {
          const data = response?.data;
          const decodedToken = jwtDecode(data.token);          
          localStorage.setItem('roles', JSON.stringify(decodedToken.roles));
          localStorage.setItem('permissions', JSON.stringify(decodedToken.permissions));
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data?.status;
      }catch(error){
        console.error(error);
      }
    }
  }
})