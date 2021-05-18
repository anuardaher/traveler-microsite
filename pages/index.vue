<template>
  <div class="container">
    <div class="container__find-hotel">
      <h1 class="container__find-hotel__title">Find the best hotel for you</h1>
      <form
        class="container__find-hotel__form"
        autocomplete="off"
        @submit.prevent="init()"
      >
        <base-select
          v-model="form.country"
          label="country"
          :options="countrys"
          required
        />
        <base-select
          v-model="form.city"
          label="city"
          :options="citys"
          :disabled="!form.country"
          required
        />
        <base-button class="action" text="Find Hotel" type="submit" />
      </form>
    </div>
    <div ref="hotels" class="container__best-hotels">
      <div v-if="loading"><load-spinner /></div>
      <div
        v-else-if="!loading && isOnErrorOrEmpty.active"
        class="container__best-hotels__error"
      >
        <h1>{{ isOnErrorOrEmpty.text }}</h1>
        <h4>{{ isOnErrorOrEmpty.subtitle }}</h4>
      </div>
      <card v-for="hotel in hotels" v-else :key="hotel.self" :data="hotel" />
    </div>
  </div>
</template>

<script>
import hotelService from '~/services/hotelServices'
import weatherService from '~/services/weatherServices'
import baseSelect from '~/components/form/baseSelect'
import card from '~/components/cards/hotelCard'
import baseButton from '~/components/form/baseButton'
import loadSpinner from '~/components/spinners/loadSpinner'
import Citys from '~/mock/citys'

export default {
  components: {
    baseSelect,
    baseButton,
    card,
    loadSpinner,
  },
  data: () => ({
    form: {},
    hotels: [],
    citys: [],
    countrys: [
      { value: 'br', text: 'Brazil' },
      { value: 'it', text: 'Italy' },
      { value: 'pt', text: 'Portugal' },
      { value: 'es', text: 'Spain' },
    ],
    loading: false,
    isOnErrorOrEmpty: {
      active: false,
      text: '',
    },
  }),
  computed: {
    citySearch() {
      return this.form.country
    },
    defaultCitys() {
      return this.countrys.map(({ value }) => {
        const citys = Citys(value)
        return citys[Math.floor(Math.random() * citys.length)].value
      })
    },
  },
  watch: {
    citySearch(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.citys = Citys(newValue)
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.isOnErrorOrEmpty.active = false
        this.loading = true
        const hotels = await this.getHotelOffers()
        const hotelsWithBestOffer = this.filterBestOffers(hotels)
        try {
          this.hotels = await this.setHotelLocationWeather(hotelsWithBestOffer)
        } catch (error) {
          this.hotels = hotelsWithBestOffer
        }
      } catch (error) {
        this.isOnErrorOrEmpty = {
          active: true,
          text: 'An error has occurred 😓',
          subtitle: 'Refresh or try again later',
        }
      } finally {
        this.loading = false
        if (this.hotels.length === 0 && !this.isOnErrorOrEmpty.active) {
          this.isOnErrorOrEmpty = {
            active: true,
            text: 'No hotels are available now 😪',
            subtitle: 'Try a different city or refresh',
          }
        }
        this.$refs.hotels.scrollIntoView()
      }
    },
    getHotelOffers() {
      const citys = this.form.city ? [this.form.city] : this.defaultCitys
      const promises = citys.map((code) => {
        return hotelService(this.$axios).findHotels({
          cityCode: code,
          radius: 300,
          lang: 'en-US',
        })
      })
      return Promise.all(promises)
    },
    filterBestOffers(hotels) {
      return hotels
        .filter(({ data }) => data.data && data.data.length > 0)
        .map(({ data }) => {
          return data.data.reduce((prev, current) => {
            return this.compareAndFindBestHotel(prev, current)
          })
        })
    },
    compareAndFindBestHotel(prev, current) {
      const prevRating = Number(prev.hotel.rating || 0)
      const currentRating = Number(prev.hotel.rating || 0)
      const prevPrice = Number(prev.offers[0]?.price.total || 0)
      const currentPrice = Number(current.offers[0]?.price.total)
      const prevDesc = !!prev.hotel.description

      return prevRating >= currentRating && prevPrice < currentPrice && prevDesc
        ? prev
        : current
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
    setHotelLocationWeather(hotels) {
      const promises = hotels.map(async (data) => {
        const locationKey = await this.getLocationKeys(data.hotel)
        data.weather = await this.getLocationWeather(locationKey)
        return data
      })
      return Promise.all(promises)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;

  &__best-hotels {
    position: relative;
    flex: 1 1 700px;
    padding: 0px 5px 25px 5px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    place-items: center;

    &__error {
      text-align: center;
      padding: 10px;
    }
  }

  &__find-hotel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    flex: 1 1 800px;

    &__title {
      display: block;
      font-weight: 500;
      font-size: clamp(1.7rem, 5vw, 4rem);
      letter-spacing: 1px;
      word-wrap: break-word;
      text-align: center;
    }

    &__form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 50px;
      width: 100%;
      max-width: 500px;

      > *:not(:first-child) {
        margin-top: 10px;
      }

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
