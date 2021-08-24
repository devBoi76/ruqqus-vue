// Unsplash documentation - https://unsplash.com/documentation
// Axios documentation - https://github.com/axios/axios

import axios from 'axios'
// Return a random Unsplash photo given search query
const id = '9-1rAdvT2NwaxLIumU1kFAqHILRlBFJDRMoMaCdErug'

export function getRandomPhoto(query){
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${id}`
    return axios.get(url);
}