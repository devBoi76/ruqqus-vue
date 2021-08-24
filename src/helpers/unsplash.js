// Unsplash documentation - https://unsplash.com/documentation
// Axios documentation - https://github.com/axios/axios

import axios from 'axios'
// Return a random Unsplash photo given search query
export function getRandomPhoto(query){
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
    return axios.get(url);
}