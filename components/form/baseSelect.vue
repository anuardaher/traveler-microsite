<template>
  <div class="base">
    <label v-if="label" for="base-input">{{ formatLabel }}</label>
    <select
      id="base-select"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    >
      <option value="" />
      <option
        v-for="option in orderedOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
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
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatLabel() {
      return (
        this.label.charAt(0).toUpperCase() + this.label.slice(1).toLowerCase()
      )
    },
    orderedOptions() {
      const optionsCopy = [...this.options]
      return optionsCopy.sort((a, b) => {
        if (a.text > b.text) return 1
        if (a.text < b.text) return -1
        return 0
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.base {
  position: relative;
  width: 100%;

  label {
    position: absolute;
    left: 10px;
    top: 3px;
  }

  select {
    padding: 25px 0 5px 6px;
  }
}
</style>
