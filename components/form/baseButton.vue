<template>
  <div class="base">
    <button v-bind="$attrs" :style="{ backgroundColor, color }">
      <slot />
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    backgroundColor: {
      type: String,
      default: () => 'var(--secondary)',
    },
    color: {
      type: String,
      default: () => 'var(--light)',
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.base {
  width: 100%;
}
button {
  padding: 10px;
  font-weight: 600;
  font-size: 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: opacity 0.2s;
  width: 100%;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
