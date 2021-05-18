<template>
  <div class="base">
    <base-input
      :value="input"
      placeholder="Search for citys..."
      v-bind="$attrs"
      icon
      @focus="focus = true"
      @blur="onBlur"
      @input="setInput"
    >
      <base-icon> <icon-write /> </base-icon>
    </base-input>
    <div v-show="options.length && focus" class="base__list">
      <div
        v-for="option in options"
        :key="option"
        class="base__list__option"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '~/components/form/baseInput'
import BaseIcon from '~/components/icons/BaseIcon'
import IconWrite from '~/components/icons/IconWrite'

export default {
  components: { BaseInput, BaseIcon, IconWrite },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    focus: false,
    input: '',
  }),

  methods: {
    setInput(value) {
      this.input = value
      this.$emit('input', value)
    },
    onBlur() {
      setTimeout(() => (this.focus = false), 100)
    },
    selectOption(option) {
      this.input = option
      this.$emit('input', option)
    },
  },
}
</script>

<style lang="scss">
.base {
  position: relative;
  width: 100%;

  &__list {
    position: absolute;
    top: 55px;
    width: 100%;
    text-align: left;
    max-height: 400px;
    overflow-y: auto;
    z-index: 2;
    background-color: snow;
    transition: all 0.3s;

    &__option {
      padding: 5px;

      &:hover {
        background-color: var(--secondary);
        color: var(--light);
      }
    }
  }
}
</style>
