import hotelService from '@/services/hotelServices'

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.common.Expires = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toGMTString()
  })
  $axios.onError(async (error) => {
    if (/amadeus/.test(error.config.url) && error.response.status === 401) {
      const token = await hotelService($axios).refreshToken()
      error.config.headers.Authorization = 'Bearer ' + token
      return $axios.request(error.config)
    }
  })
}
