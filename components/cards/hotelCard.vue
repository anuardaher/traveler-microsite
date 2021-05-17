<template>
  <div class="card">
    <div
      class="card__img"
      :style="`background-image: url(${getCountryFlag.background})`"
    >
      <div class="card__img__flag">
        <img :src="getCountryFlag.flag" alt="" />
      </div>
      <div class="card__img__weather">
        <i :class="getWeatherIcon"></i>
        <div>{{ getTemperature }}</div>
      </div>
      <div class="card__img__city">{{ data.hotel.address.cityName }}</div>
    </div>
    <div class="card__content">
      <div class="card__content__starts">
        <base-icon
          v-for="star in Number(data.hotel.rating)"
          :key="star"
          icon-color="#efce2c"
        >
          <star-icon />
        </base-icon>
      </div>
      <h1 class="card__content__name">{{ data.hotel.name }}</h1>
      <h3 class="card__content__description">
        {{ data.hotel.description.text }}
      </h3>
      <div class="card__content__price">
        {{ hotelPrice }}<span>/night</span>
      </div>
    </div>
  </div>
</template>

<script>
import baseIcon from '~/components/icons/BaseIcon'
import starIcon from '~/components/icons/startIcon'

export default {
  components: {
    baseIcon,
    starIcon,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        hotel: {
          address: {
            cityName: '',
            countryCode: '',
          },
          description: {},
        },
        weather: {
          Temperature: {},
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
      if (!this.data && !this.data.hotel) return countryInfo
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
    hotelPrice() {
      const offer = this.data.offers[0]
      const lang =
        navigator.languages && navigator.languages.length
          ? navigator.languages[0]
          : navigator.language
      return new Intl.NumberFormat(lang, {
        style: 'currency',
        currency: offer.price.currency,
      }).format(offer.price.total)
    },
    getTemperature() {
      return `${this.data.weather.Temperature.Metric.Value} °${this.data.weather.Temperature.Metric.Unit}`
    },
    getWeatherIcon() {
      let iconNumber = Number(this.data.weather.WeatherIcon).toLocaleString()
      iconNumber = iconNumber.length === 1 ? '0' + iconNumber : iconNumber
      return `wi icon-accu${iconNumber}`
    },
  },
}
</script>

<style lang="scss">
@import 'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css';
@import '~/assets/css/accuweatherIcons.scss';

.card {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 300px;
  max-width: 450px;

  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
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
        width: 80px;
        opacity: 0.8;
      }
    }

    &__weather {
      position: absolute;
      top: 10px;
      right: 15px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--light);
      font-weight: 600;
      font-size: 0.9rem;

      i {
        font-size: 25px;
        color: white;
      }
    }

    &__city {
      color: white;
      font-size: 2rem;
      z-index: 2;
      margin: 8px 15px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: 60%;

    &__starts {
      display: flex;
    }

    &__name {
      font-size: 1.1rem;
      text-transform: uppercase;
      font-weight: 700;
      padding: 3px;
    }

    &__description {
      font-size: 0.8rem;
      font-weight: 400;
      padding: 3px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__price {
      justify-self: flex-end;
      font-weight: 700;
      padding: 3px;
      font-size: 1.3rem;
      margin-top: auto;

      span {
        font-size: 0.7rem;
        font-weight: 400;
        margin-left: 3px;
      }
    }
  }
}
</style>
