<template>
  <nav class="nav">
    <nuxt-link to="/" class="nav__logo">
      <img src="/logo_desktop.png" alt="logo" />
    </nuxt-link>
    <!-- <div class="nav__actions">
      <ul>
        <li>
          <NuxtLink to="/hotels">Hotels</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/hotels">Contrys</NuxtLink>
        </li>
      </ul>
    </div> -->
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;

  &__actions {
    flex: 1 1;
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
    &__logo {
      margin: 0 auto;
      width: 50%;

      img {
        height: auto;
        width: 100%;
      }
    }
  }
}
</style>
