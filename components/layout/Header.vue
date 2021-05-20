<template>
  <nav class="nav">
    <nuxt-link to="/" class="nav__logo">
      <img src="/logo_desktop.png" alt="logo" />
    </nuxt-link>
    <div class="nav__actions">
      <ul>
        <li class="nav__actions__search" @click="setStateSearch()">
          <span class="material-icons">create</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
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

  &__actions {
    display: none;
    font-size: 1.2rem;
    text-decoration: none;

    ul {
      display: flex;

      li {
        list-style: none;
        margin: 20px;

        a {
          text-decoration: none;
          transition: color 0.3s;
          color: var(--primary);

          &:hover {
            color: var(--secondary);
          }

          &:active {
            text-decoration: var(--secondary);
          }
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
      width: 50%;

      img {
        height: auto;
        width: 100%;
      }
    }

    &__actions {
      display: flex;

      &__search {
        height: 40px;
        width: 40px;
        display: grid;
        place-items: center;
        background-color: var(--secondary);
        color: var(--light);
        border-radius: 50%;
      }
    }
  }
}
</style>
