<template>
  <div class="container">
    <label v-if="label" for="base-input">{{ formatLabel }}</label>
    <select id="base-select" v-bind="$attrs">
      <option
        v-for="option in options"
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
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  label {
    position: absolute;
    left: 10px;
    top: 3px;
  }

  select {
    padding: 25px 0 5px 6px;
  }

  option {
    color: black;
  }
}
</style>
