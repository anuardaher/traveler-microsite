<template>
  <div class="container">
    <div class="container__find-hotel">
      <h1 class="container__find-hotel__title">Find the best hotel for you</h1>
      <form>
        <base-select label="country" :options="contrys" />
        <search-input> </search-input>
        <base-button class="action" text="Find Hotels" type="button" />
      </form>
    </div>
    <div class="container__best-hotels">
      <div v-if="loading"><load-spinner /></div>
      <card v-for="hotel in hotels" v-else :key="hotel.self" :data="hotel" />
    </div>
  </div>
</template>

<script>
import hotelService from '~/services/hotelServices'
import weatherService from '~/services/weatherServices'
import baseSelect from '~/components/form/baseSelect'
import searchInput from '~/components/form/searchInput'
import card from '~/components/cards/hotelCard'
import baseButton from '~/components/form/baseButton'
import loadSpinner from '~/components/spinners/loadSpinner'

export default {
  components: {
    baseSelect,
    searchInput,
    baseButton,
    card,
    loadSpinner,
  },
  data: () => ({
    hotels: [],
    contrys: [
      { value: 'br', text: 'Brazil' },
      { value: 'it', text: 'Italy' },
      { value: 'pt', text: 'Portugal' },
      { value: 'es', text: 'Spain' },
    ],
    citys: ['BSB', 'MAD', 'MXP', 'LIS'],
    loading: false,
  }),
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.loading = true
        const hotels = await this.getHotelOffers()
        const hotelsWithBestOffer = this.selectBestOffers(hotels)
        this.setHotelLocationWeather(hotelsWithBestOffer)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    getHotelOffers() {
      const promises = this.citys.map((code) => {
        return hotelService(this.$axios).findHotels({
          cityCode: code,
          radius: 300,
          lang: 'en-US',
        })
      })
      return Promise.all(promises)
    },
    selectBestOffers(hotels) {
      return hotels
        .filter(({ data }) => data.data && data.data.length > 0)
        .map(({ data }) => {
          return data.data.reduce((prev, current) => {
            const prevRating = Number(prev.hotel.rating || 0)
            const currentRating = Number(prev.hotel.rating || 0)
            const prevPrice = Number(prev.offers[0]?.price.total || 0)
            const currentPrice = Number(current.offers[0]?.price.total)
            const prevDesc = !!prev.hotel.description

            return prevRating >= currentRating &&
              prevPrice < currentPrice &&
              prevDesc
              ? prev
              : current
          })
        })
    },
    async getLocationKeys({ latitude, longitude }) {
      const { data } = await weatherService(this.$axios).getLocationKey(
        `${latitude},${longitude}`
      )
      return data.Key
    },
    async getLocationWeather(key) {
      const { data } = await weatherService(this.$axios).getWeatherData(key)
      return data.shift()
    },
    async setHotelLocationWeather(hotels) {
      for (let index = 0; index < hotels.length; index++) {
        const locationKey = await this.getLocationKeys(hotels[index].hotel)
        hotels[index].weather = await this.getLocationWeather(locationKey)
        this.hotels.push(hotels[index])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));

  &__best-hotels {
    position: relative;
    padding: 20px;
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    place-items: center;
  }

  &__find-hotel {
    padding: 20px;

    &__title {
      display: block;
      font-weight: 500;
      font-size: clamp(1.7rem, 5vw, 4rem);
      letter-spacing: 1px;
      word-wrap: break-word;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 50px;

      .action {
        margin-top: 40px;
      }
    }
  }
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
