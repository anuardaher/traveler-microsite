<template>
  <div class="template">
    <header>
      <Header />
      <Languages />
    </header>
    <main>
      <Nuxt keep-alive />
    </main>
    <footer>
      <p>
        {{ $t('created_by') }} <a href="http://anuardaher.com">Anuar Daher</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Languages from '~/components/layout/Languages'

export default {
  components: {
    Header,
    Languages,
  },
}
</script>

<style lang="scss" scoped>
.template {
  min-height: 100vh;
  width: 100vw;

  header {
    min-height: 15vh;
  }

  main {
    min-height: 75vh;
  }

  footer {
    min-height: 5vh;
    display: grid;
    place-items: center;

    a {
      text-decoration: none;
      color: inherit;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: var(--secondary);
      }
    }
  }
}
</style>
