<template>
  <div class="base">
    <label v-if="label" for="base-input">{{ formatLabel }}</label>
    <div :class="{ base__icon: icon, 'base__icon__with-label': label }">
      <slot />
    </div>
    <input
      id="base-input"
      :class="{
        'base__input-label': label,
        'base__input-icon': icon,
      }"
      v-bind="$attrs"
      :value="value"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formatLabel() {
      return (
        this.label.charAt(0).toUpperCase() + this.label.slice(1).toLowerCase()
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.base {
  position: relative;
  width: 100%;

  &__icon {
    position: absolute;
    width: 20px;
    z-index: 1;
    top: 18px;
    left: 12px;

    &__with-label {
      top: 27px;
    }
  }

  label {
    position: absolute;
    left: 10px;
    top: 3px;
  }

  &__input-label {
    padding: 25px 0 5px 6px;
  }

  &__input-icon {
    padding-left: 40px;
  }
}
</style>
