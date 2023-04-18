import axios from "axios";
// URL DA API: https://api.themoviedb.org/3/
// URL TOTAL: /movie/now_playing?api_key=91c6acf14dbc046fd27da66113374ac0&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;
