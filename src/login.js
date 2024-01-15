import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


 const Login = ()=> {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post("http://localhost:8000/login", {
      username, 
      password
    });
    setErrorMessage(null);
    Cookies.set('token', response.data.token, { expires: 30 });
    console.log(response);
  } catch (err) {
    setErrorMessage('Incorrect username or password');
  }
  };



    return (
          <div className="flex h-screen w-full items-center justify-center bg-[#0a192f]">
            <div className="w-full max-w-xs">
              <form className="bg-transparent px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <img src="/mts.png" alt="Logo" class="mx-auto h-30 w-30" />
                </div>
                <div className="mb-6">
                  <label className="block text-white text-sm font-bold mb-2" for="username">
                    Username
                  </label>
                  <input
                    className="flex h-10 w-full border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-3 px-3 py-2 border rounded shadow appearance-none text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white text-sm font-bold mb-2" for="password">
                    Password
                  </label>
                  <input
                    className="flex h-10 w-full border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-3 px-3 py-2 border rounded shadow appearance-none text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="******************"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                  onClick={handleSubmit}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
    )
  }
  

  export default Login;