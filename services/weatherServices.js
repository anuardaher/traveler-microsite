export default ($axios) => ({
  getLocationKey: (location) => {
    return $axios.get(`/weatherapi/locations/v1/cities/geoposition/search`, {
      params: {
        apikey: 'k8xcp4ZKELx4kXZ1URC8Rl2rCn22Hwxb',
        q: location,
      },
    })
  },

  getWeatherData: (cityKey) => {
    return $axios.get(`/weatherapi/currentconditions/v1/${cityKey}`, {
      params: {
        apikey: 'k8xcp4ZKELx4kXZ1URC8Rl2rCn22Hwxb',
      },
    })
  },
})
