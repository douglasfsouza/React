import axios from "axios";
//api:https://api.themoviedb.org/3/movie/550?api_key=2263249d6015ce9991b7e66fed701491
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})
export default api;