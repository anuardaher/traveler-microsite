<template>
  <div class="template">
    <header>
      <Header />
      <Languages v-if="showSelectLanguage" @close="setSelectLanguageValue" />
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
  data: () => ({
    showSelectLanguage: false,
  }),
  mounted() {
    this.$root.$on('select-language', () => this.setSelectLanguageValue())
  },
  methods: {
    setSelectLanguageValue() {
      this.showSelectLanguage = !this.showSelectLanguage
    },
  },
}
</script>

<style lang="scss" scoped>
.template {
  min-height: 100vh;
  width: 100vw;

  header {
    min-height: 10vh;
  }

  main {
    min-height: 85vh;
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
