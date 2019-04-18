import config from "../config";
import TokenService from "./token-service";

const LearningApiService = {

  getHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      }
    }).then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  makeGuess(input) {
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ guess: input })
    }).then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

};

export default LearningApiService;