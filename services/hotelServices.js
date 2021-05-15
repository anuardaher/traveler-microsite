const querystring = require('querystring')

export default ($axios) => {
  $axios.setToken(window.localStorage.getItem('hotelToken'), 'Bearer')

  const refreshToken = async () => {
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    $axios.setToken(false)

    const data = {
      grant_type: 'client_credentials',
      client_id: 'mKvAnUXhIl8wMc56vf7nMQvyETC1ixlM',
      client_secret: 'ulcTGu1XVUDWCKby',
    }
    const response = await $axios.post(
      '/amadeus/v1/security/oauth2/token',
      querystring.stringify(data)
    )
    window.localStorage.setItem('hotelToken', response.data.access_token)
    return response.data.access_token
  }

  const findHotels = (params) => {
    return $axios.get('/amadeus/v2/shopping/hotel-offers', {
      params,
    })
  }

  return {
    findHotels,
    refreshToken,
  }
}
