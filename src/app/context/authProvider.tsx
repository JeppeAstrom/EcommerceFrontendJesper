"use client"
import { ReactNode, createContext } from "react";
export const Context = createContext<any>(null)

function Authentication({ children }: { children: ReactNode }) { 

  const handleRegister = async (firstName:string, lastName:string, email:string, password:string) => {
    const user = {
        firstName,
        lastName,
        email,
        password,
      };
  const registerUrl = '';
      const result = await fetch(registerUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
  
      })
      if (result.status === 201) {
          return true;
      }
      
      
      return false;
  };

  const handleLogin = async (email:string, password:string, rememberMe:string) => {
    const user = {
        email: email,
        password: password,
        rememberMe: rememberMe ? true : false,
      };
    
    const loginUrl = '';
      try {
        const result = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
    
        if (result.status === 200) {
          const accessToken = await result.text();
          localStorage.setItem('accessToken', accessToken);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
  };

   const CheckJWTToken = async () => {
    const authUrl = '';
    const accessToken = localStorage.getItem('accessToken');
    let result = await fetch(authUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      return response.ok;
    });
  
    return result;
  
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  }

  const isAuthenticated = async () => {
    return await CheckJWTToken();
  }



  return (
    <Context.Provider value={{handleRegister, handleLogin, handleLogout, isAuthenticated}}>
      {children}
    </Context.Provider>
  );

};
export default Authentication;
