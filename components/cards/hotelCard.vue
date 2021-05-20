<template>
  <div
    :class="[
      'card',
      clickable ? 'clickable' : null,
      details ? 'without-border' : null,
    ]"
  >
    <div
      class="card__img"
      :style="`background-image: url(${getCountryFlag.background})`"
    >
      <div class="card__img__flag">
        <img :src="getCountryFlag.flag" alt="" />
      </div>
      <div v-if="data.weather" class="card__img__weather">
        <i :class="getWeatherIcon"></i>
        <div>{{ getTemperature }}</div>
      </div>
      <div class="card__img__city">{{ data.hotel.address.cityName }}</div>
    </div>
    <div class="card__content">
      <div class="card__content__header">
        <div class="card__content__header__hotel">
          <div class="card__content__header__hotel__rating">
            <base-icon
              v-for="rating in Number(data.hotel.rating)"
              :key="rating"
              icon-color="var(--starColor)"
            >
              <star-icon />
            </base-icon>
          </div>
          <h1 class="card__content__header__hotel__name">
            {{ data.hotel.name }}
          </h1>
        </div>
        <div v-if="details" class="card__content__header__price">
          {{ hotelPrice }}<span>/night</span>
        </div>
      </div>
      <p
        :class="['card__content__description', !details ? 'short-text' : null]"
      >
        {{ data.hotel.description.text }}
      </p>
      <div v-if="details" class="card__content__information">
        <div class="card__content__information__date">
          <h3 class="card__content__information__date__title">Date</h3>
          <div class="card__content__information__date__checkin">
            <span class="material-icons">event</span>
            <span
              >{{
                new Date(offer.checkInDate).toLocaleDateString()
              }}
              check-in</span
            >
          </div>
          <div class="card__content__information__date__checkout">
            <span class="material-icons">event</span>
            <span
              >{{
                new Date(offer.checkOutDate).toLocaleDateString()
              }}
              check-out</span
            >
          </div>
        </div>
        <div class="card__content__information__contact">
          <h3>Contact</h3>
          <div>
            <span class="material-icons">phone</span
            >{{ data.hotel.contact.phone || 'Unavailable' }}
          </div>
          <div>
            <span class="material-icons">email</span
            >{{ data.hotel.contact.email || 'Unavailable' }}
          </div>
        </div>
        <div
          v-if="getAmenitiesList.length"
          class="card__content__information__amenities"
        >
          <h3 class="card__content__information__amenities__title">
            Amenities
          </h3>
          <div v-for="amenitie in getAmenitiesList" :key="amenitie">
            <span :title="amenitie.toLowerCase()" class="material-icons"
              >{{ amenitie.toLowerCase() }}
            </span>
            <span>{{ amenitie }}</span>
          </div>
        </div>
        <div
          v-if="offer.room || offer.guest"
          class="card__content__information__room"
        >
          <h3 class="card__content__information__room__title">Room</h3>
          <div class="card__content__information__room__guest">
            <span class="material-icons">emoji_people</span>
            <span>{{ offer.guests.adults }} Guest </span>
          </div>
          <div
            v-if="
              offer.room.typeEstimated.beds && offer.room.typeEstimated.bedType
            "
            class="card__content__information__room__guest"
          >
            <span class="material-icons">king_bed</span>
            <span
              >{{ offer.room.typeEstimated.beds }}
              {{ offer.room.typeEstimated.bedType }}</span
            >
          </div>
        </div>
      </div>

      <div v-if="!details" class="card__content__price">
        {{ hotelPrice }}<span>/night</span>
      </div>
    </div>
  </div>
</template>

<script>
import baseIcon from '~/components/icons/BaseIcon'
import starIcon from '~/components/icons/starIcon'

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
    clickable: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    amenitiesList: [
      'air',
      'atm',
      'accessible',
      'wifi',
      'tv',
      'meeting_room',
      'restaurant',
      'fitness_center',
    ],
  }),
  computed: {
    getCountryFlag() {
      const countryInfo = {}
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
          countryInfo.flag = '/imgs/br.png'
          countryInfo.background = '/imgs/br-background-image.jpg'
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
    getAmenitiesList() {
      return this.amenitiesList.filter((amenitie) => {
        const regex = new RegExp(amenitie, 'i')
        return this.data.hotel.amenities.find((icon) => regex.test(icon))
      })
    },
    offer() {
      return this.data.offers[0]
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/css/accuweatherIcons.scss';

.card {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 100%;
  min-width: 320px;
  min-height: 300px;

  &__img {
    position: relative;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: 150px;
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
      font-size: 1.7rem;
      z-index: 2;
      margin: 8px 15px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: 60%;

    &__header {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      &__hotel {
        &__rating {
          display: flex;
        }

        &__name {
          font-size: clamp(1.1rem, 2vw, 1.2rem);
          text-transform: uppercase;
          font-weight: 700;
          padding: 3px;
        }
      }

      &__price {
        font-weight: 700;
        font-size: clamp(1.5rem, 2vw, 1.9rem);
        margin-top: auto;

        span {
          font-size: 0.8rem;
          font-weight: 400;
          margin-left: 3px;
        }
      }
    }

    &__description {
      font-size: clamp(0.8rem, 1vw, 0.9rem);
      font-weight: 400;
      padding: 3px;
      margin: 10px 0;
    }

    &__information {
      display: flex;
      justify-content: space-around;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 30px;

      > * {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1 1 200px;

        > * {
          margin: 5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }
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

.clickable {
  cursor: pointer;

  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
}

.short-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
}

.without-border {
  border: none;
}
</style>
