import hotelService from '@/services/hotelServices'

export default function ({ $axios }) {
  $axios.onError(async (error) => {
    if (/amadeus/.test(error.config.url) && error.response.status === 401) {
      const token = await hotelService($axios).refreshToken()
      error.config.headers.Authorization = 'Bearer ' + token
      return $axios.request(error.config)
    }
  })
}
