<template>
  <div class="container">
    <div class="container__find-hotel">
      <h1 class="container__find-hotel__title">Find the best hotel for you</h1>
      <form>
        <base-select label="country" :options="contrys" />
        <search-input> </search-input>
      </form>
    </div>
    <div class="container__best-hotels">
      <card v-for="hotel in hotels" :key="hotel.self" :data="hotel" />
    </div>
  </div>
</template>

<script>
import hotelService from '~/services/hotelServices'
import baseSelect from '~/components/form/baseSelect'
import searchInput from '~/components/form/searchInput'
import card from '~/components/cards/cardIndex'

export default {
  components: {
    baseSelect,
    searchInput,
    card,
  },
  data: () => ({
    hotels: [],
    contrys: [
      { value: 'br', text: 'Brazil' },
      { value: 'it', text: 'Italy' },
      { value: 'pt', text: 'Portugal' },
      { value: 'es', text: 'Spain' },
    ],
    citys: ['CGH', 'MAD', 'FCO', 'LIS'],
  }),
  mounted() {
    this.getHotelOffers()
  },
  methods: {
    async getHotelOffers() {
      const promisses = this.citys.map((code) => {
        return hotelService(this.$axios).findHotels({
          cityCode: code,
          radius: 20,
          view: 'LIGHT',
        })
      })
      try {
        const results = await Promise.all(promisses)
        this.hotels = results.map((result) => result.data.data.shift())
      } catch (error) {}
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
    padding: 20px;
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  &__find-hotel {
    padding: 20px;

    &__title {
      display: block;
      font-weight: 500;
      font-size: clamp(1.7rem, 5vw, 4rem);
      color: #35495e;
      letter-spacing: 1px;
      word-wrap: break-word;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:not(:first-child) * {
        margin-top: 15px;
      }
    }
  }
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
