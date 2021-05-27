<template>
  <nav class="nav">
    <nuxt-link :to="localePath('/')" class="nav__logo">
      <img src="/logo_desktop.png" alt="logo" />
    </nuxt-link>
    <div class="nav__actions">
      <ul>
        <li
          class="nav__actions__language"
          @click="$root.$emit('select-language')"
        >
          <span class="material-icons">language</span>
        </li>
        <li
          v-if="showSearchButtom"
          class="nav__actions__search"
          @click="setStateSearch()"
        >
          <span class="material-icons">create</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    showSearchButtom() {
      return window.screen.width < 600 && /index/.test(this.$route.name)
    },
  },
  methods: {
    setStateSearch() {
      this.$root.$emit('search')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    img {
      max-width: 100%;
    }
  }

  &__actions {
    font-size: 1.2rem;
    text-decoration: none;

    ul {
      display: flex;

      li {
        list-style: none;
        margin: 10px;
        height: 40px;
        width: 40px;
        display: grid;
        place-items: center;
        color: var(--light);
        border-radius: 50%;
        text-decoration: none;
        transition: color 0.3s;
        color: var(--light);

        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }

        &:nth-child(1) {
          background-color: var(--primary);
        }

        &:nth-child(2) {
          background-color: var(--secondary);
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .nav {
    justify-content: space-around;
    padding: 6px;
    &__logo {
      max-width: 50%;

      img {
        height: auto;
        width: 100%;
      }
    }
  }
}
</style>
