const api = {
  transport(endpoint, method, accessToken) {
    return fetch('https://api.spotify.com/v1/me/player/' + endpoint, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
      .then(() => new Promise(resolve => setTimeout(resolve, 500)))
  }
}

export default api
