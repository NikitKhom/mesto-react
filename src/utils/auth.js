const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
   return checkServerStatus(
      fetch(`${BASE_URL}/signup`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({password, email})
      })
   )
   .catch(err => console.log(err))
};

export const authorize = (password, email) => {
   return  checkServerStatus(
      fetch(`${BASE_URL}/signin`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({password, email})
      })
   )
   .then(data => {
      if (data){
            localStorage.setItem('jwt', data.token);
            return data;
      }
   })
   .catch(err => console.log(err));
};

export const checkToken = (token) => {
   return checkServerStatus(
      fetch(`${BASE_URL}/users/me`, {
         method: 'GET',
         headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
         }
       })
   )
   .then(data => data)
   .catch(err => console.log(err));
};

const checkServerStatus = (promise) => {
   return promise
   .then(res => {
       if (res.ok) {
           return  res.json();
       }
      return Promise.reject(`Ошибка: ${res.status}`)
   })
}