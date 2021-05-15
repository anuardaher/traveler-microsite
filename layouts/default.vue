<template>
  <div class="template">
    <header>
      <Header />
    </header>
    <main>
      <Nuxt keep-alive />
    </main>
    <footer>
      <p>Created by <a href="http://anuardaher.com">Anuar Daher</a></p>
    </footer>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'

export default {
  components: {
    Header,
  },
}
</script>

<style lang="scss" scoped>
.template {
  min-height: 100vh;
  width: 100vw;

  header {
    height: 15vh;
  }

  main {
    min-height: 80vh;
  }

  footer {
    height: 5vh;
    display: grid;
    place-items: center;

    a {
      text-decoration: none;
      color: inherit;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: red;
      }
    }
  }
}
</style>
