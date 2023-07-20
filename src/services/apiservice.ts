import axios from 'axios'

export function GetApiService(url:string){
  return axios.get(url, {
    headers: {
      accept: "application/json"
    }
  })
}