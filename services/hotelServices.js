const querystring = require('querystring')

export default ($axios, key) => {
  $axios.setToken(key || window.localStorage.getItem('hotelToken'), 'Bearer')

  const refreshToken = async () => {
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    $axios.setToken(false)
    const data = {
      grant_type: 'client_credentials',
      client_id: process.env.HOTEL_API_CLIENT_ID,
      client_secret: process.env.HOTEL_API_CLIENT_SECRET,
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

  const findLocations = (params) => {
    return $axios.get('/amadeus/v1/reference-data/locations', {
      params,
    })
  }

  return {
    findHotels,
    refreshToken,
    findLocations,
  }
}
