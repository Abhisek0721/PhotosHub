import properties from "../config/properties";
import axios from "axios";

class UnsplashApiCalls {
    private baseUrl:string;
    private params;

    constructor (
        params?:{}, 
        baseUrl:string=properties.UNSPLASH_URL, 
    ){
        this.baseUrl = baseUrl;
        this.params = params;
    }

    public async getRequest(endpoint:string){
        const options = {
            method: 'GET',
            url: this.baseUrl+endpoint,
            params: this.params,
            headers: {
              'Authorization': `Client-ID ${properties.UNSPLASH_ACCESS_KEY}`
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              return response.data;
          } catch (error) {
              console.error(error);
          }
    }

}


export default UnsplashApiCalls;