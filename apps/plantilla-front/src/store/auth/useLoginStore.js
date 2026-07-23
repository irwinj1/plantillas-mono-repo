import {defineStore} from 'pinia';
import {login} from '../../services/auth/login.service.js';

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
        console.log(response);
        
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        return response;
      }catch(error){
        console.error(error);
      }
    }
  }
})