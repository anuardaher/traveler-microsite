<template>
  <div class="container">
    <base-input placeholder="Search for citys..." v-bind="$attrs" icon>
      <base-icon> <icon-write /> </base-icon>
    </base-input>
  </div>
</template>

<script>
import BaseInput from '~/components/form/baseInput'
import BaseIcon from '~/components/icons/BaseIcon'
import IconWrite from '~/components/icons/IconWrite'

export default {
  components: { BaseInput, BaseIcon, IconWrite },
}
</script>

<style lang="scss">
.container {
  position: relative;
  top: 5px;
}
</style>
