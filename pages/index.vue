<template>
  <div class="container">
    <transition name="fade">
      <div v-if="!isOnSmallDevice || searchState" class="container__find-hotel">
        <h1 class="container__find-hotel__title">
          Find the best hotel for you
        </h1>
        <form
          class="container__find-hotel__form"
          autocomplete="off"
          @submit.prevent="searchBestHotels()"
        >
          <base-select
            v-model="form.country"
            label="country"
            :options="countrys"
          />
          <base-select
            v-model="form.city"
            label="city"
            :options="citys"
            :disabled="!form.country"
            :required="!!form.country"
          />
          <base-input v-model="checkin" type="date" label="checkin" />
          <base-input v-model="checkout" type="date" label="checkout" />
          <base-button class="action" text="Find Hotel" type="submit" />
        </form>
      </div>
    </transition>
    <div ref="hotels" class="container__best-hotels">
      <div v-if="loading"><load-spinner /></div>
      <div
        v-else-if="!loading && isOnErrorOrEmpty.active"
        class="container__best-hotels__error"
      >
        <error
          :title="isOnErrorOrEmpty.title"
          :subtitle="isOnErrorOrEmpty.subtitle"
        />
      </div>

      <nuxt-link
        v-for="hotel in hotels"
        v-else
        :key="hotel.self"
        tag="div"
        :to="`/hotel/${hotel.hotel.hotelId}`"
        class="container__best-hotels__card"
      >
        <hotel-card :data="hotel" clickable />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import hotelService from '~/services/hotelServices'
import weatherService from '~/services/weatherServices'
import baseSelect from '~/components/form/baseSelect'
import baseInput from '~/components/form/baseInput'
import hotelCard from '~/components/cards/hotelCard'
import baseButton from '~/components/form/baseButton'
import loadSpinner from '~/components/spinners/loadSpinner'
import Citys from '~/mock/citys'
import Error from '~/components/errorHandler/error.vue'

export default {
  components: {
    baseSelect,
    baseInput,
    baseButton,
    hotelCard,
    loadSpinner,
    Error,
  },
  data: () => ({
    form: {},
    hotels: [],
    citys: [],
    countrys: [
      { value: 'BR', text: 'Brazil' },
      { value: 'IT', text: 'Italy' },
      { value: 'PT', text: 'Portugal' },
      { value: 'ES', text: 'Spain' },
    ],
    loading: false,
    isOnErrorOrEmpty: {
      active: false,
      title: '',
      subtitle: '',
    },
    searchState: false,
    checkin: new Date().toLocaleDateString('en-CA'),
    // adding one day, sorry about this mess :(
    checkout: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString('en-CA'),
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
    isOnSmallDevice() {
      return window.screen.width < 600
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
    this.searchBestHotels()
    this.$root.$on('search', () => (this.searchState = !this.searchState))
  },
  methods: {
    async searchBestHotels() {
      this.$refs.hotels.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
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
          title: 'An error has occurred 😓',
          subtitle: 'Refresh or try again later',
        }
      } finally {
        this.loading = false
        if (this.hotels.length === 0 && !this.isOnErrorOrEmpty.active) {
          this.isOnErrorOrEmpty = {
            active: true,
            title: 'No hotels are available now 😪',
            subtitle: 'Try a different city or refresh',
          }
        }
      }
    },
    async getHotelOffers() {
      const citys = this.form.city ? [this.form.city] : this.defaultCitys
      const promises = citys.map((code) => {
        return hotelService(this.$axios).findHotels({
          cityCode: code,
          radius: 300,
          checkInDate: this.checkin,
          checkOutDate: this.checkout,
        })
      })
      const hotels = await Promise.all(promises)
      return hotels.map(({ data }) => data.data).flat()
    },
    filterBestOffers(hotels) {
      const sortedHotels = hotels
        .filter((data) => data && data.hotel.description)
        .sort((a, b) => {
          return this.compareAndFindBestHotel(a, b)
        })
      if (this.form.country) {
        return sortedHotels
          .filter(
            ({ hotel }) => hotel.address.countryCode === this.form.country
          )
          .slice(0, 4)
      }
      return this.countrys
        .map((country) =>
          sortedHotels.find(
            (data) => data.hotel.address.countryCode === country.value
          )
        )
        .filter((hotel) => !!hotel)
    },
    compareAndFindBestHotel(prev, current) {
      const prevRating = Number(prev.hotel.rating || 0)
      const currentRating = Number(prev.hotel.rating || 0)
      const prevPrice = Number(prev.offers[0].price.total || 0)
      const currentPrice = Number(current.offers[0].price.total || 0)

      if (prevPrice >= currentPrice && prevRating <= currentRating) return 1
      if (prevPrice <= currentPrice && prevRating >= currentRating) return -1
      return 0
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
  gap: 30px;
  align-items: center;
  min-height: 80vh;

  &__find-hotel {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 500px;
    padding: 10px;

    &__title {
      display: block;
      font-weight: 500;
      font-size: clamp(1.5rem, 4vw, 3rem);
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
        margin-top: 12px;
      }

      .action {
        margin-top: 40px;
      }
    }
  }

  &__best-hotels {
    position: relative;
    flex: 1 1 900px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    min-height: 300px;
    padding: 10px;

    &__card {
      max-width: 500px;
      flex: 1 1 400px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
