<template>
  <div v-if="loading">
    <load-spinner />
  </div>
  <div v-else-if="!loading && isOnErrorOrEmpty.active">
    <error
      :title="isOnErrorOrEmpty.title"
      :subtitle="isOnErrorOrEmpty.subtitle"
      return-option
    />
  </div>
  <section v-else class="details">
    <div class="details__hotel">
      <div class="details__hotel__card">
        <hotel-card v-if="data" :data="data" details></hotel-card>
      </div>
    </div>
    <div class="details__map">
      <google-map
        :latitude="data.hotel.latitude"
        :longitude="data.hotel.longitude"
      />
    </div>
  </section>
</template>

<script>
import hotelService from '~/services/hotelServices'
import weatherService from '~/services/weatherServices'
import hotelCard from '~/components/cards/hotelCard'
import googleMap from '~/components/maps/googleMap'
import loadSpinner from '~/components/spinners/loadSpinner'
import error from '~/components/errorHandler/error'

export default {
  components: {
    hotelCard,
    googleMap,
    loadSpinner,
    error,
  },
  data() {
    return {
      data: null,
      loading: true,
      isOnErrorOrEmpty: {
        active: false,
        title: '',
        subtitle: '',
      },
    }
  },
  computed: {
    address() {
      return `${this.data.hotel.address.cityName} - ${this.data.hotel.address.countryCode}`
    },
    contact() {
      return `${this.data.hotel.contact.phone} - ${this.data.hotel.contact.email}`
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.loading = true
      try {
        const hotelData = await this.getHotelData()
        try {
          const locationKey = await this.getLocationKeys(hotelData.hotel)
          hotelData.weather = await this.getLocationWeather(locationKey)
          this.data = hotelData
        } catch (error) {
          this.data = hotelData
          this.loading = false
        }
      } catch (error) {
        this.isOnErrorOrEmpty = {
          active: true,
          title: 'An error has ocurred 😐',
          subtitle: 'Try again later',
        }
      } finally {
        if (!this.data && this.isOnErrorOrEmpty.active) {
          this.isOnErrorOrEmpty = {
            active: true,
            title: 'This hotel was not found 😫',
            subtitle: 'Choose another one or try again later.',
          }
        }
        this.loading = false
      }
    },
    async getHotelData() {
      const hotelId = this.$route.params.id
      const { data } = await hotelService(this.$axios).findHotels({
        hotelIds: hotelId,
        lang: 'en-US',
      })
      if (!data.data || !data.data.length) throw new Error('Not found')
      return data.data[0]
    },
    async getLocationKeys({ latitude, longitude }) {
      const { data } = await weatherService(this.$axios).getLocationKey(
        `${latitude},${longitude}`
      )
      if (!data || !data.Key) throw new Error('Location key not found')
      return data.Key
    },
    async getLocationWeather(key) {
      const { data } = await weatherService(this.$axios).getWeatherData(key)

      if (!data || !data.length) throw new Error('Weather status not found')
      return data.shift()
    },
  },
}
</script>

<style lang="scss">
.error {
  height: 300px;
}
.details {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 1rem;
  padding: 1rem;
  &__hotel {
    flex: 1 1 450px;
    &__card {
      height: 100%;
    }
  }
  &__map {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;
    flex: 1 1 450px;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}

@media only screen and (max-width: 600px) {
  .details {
    padding: 0.3rem;
    &__hotel {
      &__bgimage {
        &:after {
          background: black;
        }
      }
    }
  }
}
</style>
