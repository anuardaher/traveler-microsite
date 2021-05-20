<template>
  <div class="error">
    <div class="error__container">
      <h1>{{ title }}</h1>
      <h4>{{ subtitle }}</h4>
    </div>
    <div
      v-if="returnOption"
      class="error__container__return"
      @click="$router.push('/')"
    >
      <span class="material-icons">cottage</span>
      <span>Return to home page</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    returnOption: Boolean,
  },
}
</script>

<style lang="scss">
.error {
  display: grid;
  place-items: center;

  &__container {
    text-align: center;
    padding: 10px;

    > * {
      margin: 10px 0;
    }
    h1 {
      font-size: clamp(1.3rem, 4vw, 3rem);
    }

    h4 {
      font-size: clamp(0.9rem, 2vw, 1.5rem);
    }

    &__return {
      display: flex;
      align-items: center;
      gap: 10px;
      transition: color 0.3s;

      &:hover {
        cursor: pointer;
        color: var(--secondary);
      }
    }
  }
}
</style>
