import axios from "axios";


const instance = axios.create({

  baseURL: "http://127.0.0.1:8000",

});



// Automatically attach JWT token
instance.interceptors.request.use(

(config) => {


  const token = localStorage.getItem("token");


  if(token){

    config.headers.Authorization = `Bearer ${token}`;

  }



  return config;


},


(error)=>{

  return Promise.reject(error);

}

);




// Handle common API errors
instance.interceptors.response.use(


(response)=>{

  return response;

},


(error)=>{


  if(error.response){


    const status = error.response.status;



    if(status === 401){

      localStorage.removeItem("token");
      localStorage.removeItem("user");

    }


  }



  return Promise.reject(error);


}


);



export default instance;