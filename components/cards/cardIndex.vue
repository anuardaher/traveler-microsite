<template>
  <div class="card">
    <div
      class="card__img"
      :style="`background-image: url(${getCountryFlag.background})`"
    >
      <div class="card__img__flag">
        <img :src="getCountryFlag.flag" alt="" />
      </div>
      <div class="card__img__city">{{ data.hotel.address.cityName }}</div>
    </div>
    <div class="card__content">
      <div class="card__content__starts"></div>
      <div class="card__content__hotel-name"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        hotel: {
          address: {
            cityName: '',
            countryCode: '',
          },
        },
      }),
    },
  },
  computed: {
    getCountryFlag() {
      const countryInfo = {
        flag: '/imgs/br.png',
        background: '/imgs/br-background-image.jpg',
      }
      if (!this.data) return countryInfo
      switch (this.data.hotel.address.countryCode) {
        case 'IT':
          countryInfo.flag = '/imgs/italy.png'
          countryInfo.background = '/imgs/roma-background.jpg'
          break
        case 'ES':
          countryInfo.flag = '/imgs/spain.png'
          countryInfo.background = '/imgs/madrid-background.jpg'
          break
        case 'PT':
          countryInfo.flag = '/imgs/pt.jpg'
          countryInfo.background = '/imgs/lisboa-background.jpg'
          break
        default:
          return countryInfo
      }
      return countryInfo
    },
  },
}
</script>

<style lang="scss">
.card {
  padding: 5px;
  height: 300px;
  width: 100%;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  &__img {
    position: relative;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    &:after {
      content: '';
      position: absolute;
      background-color: black;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.6;
    }

    &__flag {
      position: absolute;
      top: 7px;
      left: 7px;
      z-index: 2;

      img {
        height: 100%;
        width: 100px;
        opacity: 0.8;
      }
    }

    &__city {
      color: white;
      font-size: 2rem;
      z-index: 2;
      margin: 8px 15px;
    }
  }
}
</style>
