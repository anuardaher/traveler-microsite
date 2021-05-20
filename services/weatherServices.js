export default ($axios) => ({
  getLocationKey: (location) => {
    return $axios.get(`/weatherapi/locations/v1/cities/geoposition/search`, {
      params: {
        apikey: process.env.WEATHER_API_SECRET,
        q: location,
      },
    })
  },

  getWeatherData: (cityKey) => {
    return $axios.get(`/weatherapi/currentconditions/v1/${cityKey}`, {
      params: {
        apikey: process.env.WEATHER_API_SECRET,
      },
    })
  },
})
